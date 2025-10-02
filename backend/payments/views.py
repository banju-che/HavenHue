import base64
import stripe
import requests
from datetime import datetime
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Payment

# Stripe API configuration
stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['POST'])
def pay_with_mpesa(request):
    """
    Handle M-Pesa payment initiation (STK Push).
    """
    amount = request.data.get('amount')
    phone = request.data.get('phone')  # format: 2547XXXXXXXX

    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    base_url = "https://sandbox.safaricom.co.ke"

    # Step 1: Get Access Token
    auth = (consumer_key, consumer_secret)
    token_response = requests.get(f"{base_url}/oauth/v1/generate?grant_type=client_credentials", auth=auth)
    access_token = token_response.json().get("access_token")

    if not access_token:
        return Response({"error": "Unable to get access token."}, status=400)

    # Step 2: Prepare for STK Push
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    passkey = settings.MPESA_PASSKEY
    business_shortcode = settings.MPESA_SHORTCODE
    password = base64.b64encode((business_shortcode + passkey + timestamp).encode()).decode()

    payload = {
        "BusinessShortCode": business_shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": business_shortcode,
        "PhoneNumber": phone,
        "CallBackURL": "https://yourdomain.com/api/pay/mpesa/confirm/",  # Replace with your actual callback URL
        "AccountReference": "HavenHue",
        "TransactionDesc": "Payment for order"
    }

    headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}
    response = requests.post(f"{base_url}/mpesa/stkpush/v1/processrequest", headers=headers, json=payload)

    # Check if the response is successful and return the appropriate response
    if response.status_code == 200:
        return Response(response.json())
    else:
        return Response({"error": "M-Pesa payment initiation failed."}, status=500)


@api_view(['POST'])
def mpesa_callback(request):
    """
    Handle M-Pesa payment callback.
    """
    data = request.data  # Callback data from M-Pesa
    transaction_id = data.get('CheckoutRequestID')
    result_code = data.get('ResultCode')  # Result code to determine success or failure
    
    # Log or update payment status
    if result_code == 0:  # Assuming 0 means successful transaction
        Payment.objects.create(
            method='mpesa',
            transaction_id=transaction_id,
            amount=data.get('Amount'),
            is_successful=True
        )
        return Response({"message": "Payment successful"})
    else:
        Payment.objects.create(
            method='mpesa',
            transaction_id=transaction_id,
            amount=data.get('Amount'),
            is_successful=False
        )
        return Response({"message": "Payment failed"}, status=400)


@api_view(['POST'])
def create_stripe_checkout_session(request):
    """
    Create Stripe Checkout session for payment.
    """
    try:
        amount = request.data.get('amount')

        # Create Stripe session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Your Cart Items',
                    },
                    'unit_amount': int(float(amount) * 100),  # Amount in cents
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:5173/success',
            cancel_url='http://localhost:5173/cancel',
        )
        return Response({'url': session.url})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
def pay_with_paypal(request):
    """
    Handle PayPal payment simulation (can be replaced with real PayPal API integration).
    """
    amount = request.data.get('amount')

    # For real PayPal integration, you would use PayPal's SDK or REST API here.
    # For now, we simulate a successful PayPal payment.

    transaction_id = "PAYPAL91011"  # Simulated transaction ID (replace with real transaction ID)

    # Save payment details to the database
    Payment.objects.create(
        method='paypal',
        transaction_id=transaction_id,
        amount=amount,
        is_successful=True  # Assume payment is successful for now
    )

    return Response({"message": "PayPal payment successful", "transaction_id": transaction_id})


# Optional: View for listing payments (for debugging or monitoring purposes)
@api_view(['GET'])
def list_payments(request):
    payments = Payment.objects.all()
    return Response([{
        'method': payment.method,
        'transaction_id': payment.transaction_id,
        'amount': payment.amount,
        'is_successful': payment.is_successful,
        'created_at': payment.created_at,
    } for payment in payments])
