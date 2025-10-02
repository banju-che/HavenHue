import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../contexts/CartContext";

const PayMpesa = () => {
  const { cartItems } = useContext(CartContext);
  const [transactionCode, setTransactionCode] = useState("");
  const [phone, setPhone] = useState(""); // Add phone input

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionCode || !phone) {
      toast.warn("Please enter both transaction code and phone number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/pay/mpesa/", {
        amount: total,
        transaction_code: transactionCode,
        phone: phone, // Pass the phone number for verification
      });

      if (response.data.success) {
        toast.success(response.data.message || "Payment confirmed successfully!");
      } else {
        toast.error(response.data.message || "Payment failed. Please try again.");
      }
      setTransactionCode(""); // Reset form
      setPhone(""); // Reset phone input
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <section className="p-6 max-w-xl mx-auto mt-20 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-green-600">Pay with M-Pesa</h2>
      <p className="mb-4">Follow the instructions below to complete your payment via M-Pesa:</p>
      <ol className="list-decimal list-inside space-y-2 mb-6">
        <li>Go to your M-Pesa menu on your phone.</li>
        <li>Select "Lipa na M-Pesa" then "Buy Goods and Services".</li>
        <li>
          Enter Till Number: <span className="font-semibold">123456</span>
        </li>
        <li>
          Enter Amount: <span className="font-semibold">KSh {total.toFixed(2)}</span>
        </li>
        <li>Enter your M-Pesa PIN and confirm.</li>
      </ol>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number (e.g., 2547XXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Transaction Code"
          value={transactionCode}
          onChange={(e) => setTransactionCode(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded w-full hover:bg-green-600 transition"
        >
          Confirm Payment
        </button>
      </form>
    </section>
  );
};

export default PayMpesa;
