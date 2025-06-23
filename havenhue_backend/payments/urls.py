from django.urls import path
from . import views

urlpatterns = [
    path('mpesa/', views.pay_with_mpesa),
    path('card/', views.create_stripe_checkout_session),
    path('paypal/', views.pay_with_paypal),
]
