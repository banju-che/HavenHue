// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">HavenHue</h3>
          <p className="text-sm text-gray-300">
            Transform your living space with timeless decor, elegant furnishings, and curated style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-gold transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold transition">About Us</Link></li>
            <li><Link to="/shop" className="hover:text-brand-gold transition">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition">Contact</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-brand-gold transition">FAQs</Link></li>
            <li><Link to="/policies" className="hover:text-brand-gold transition">Policies</Link></li>
            <li><Link to="/services" className="hover:text-brand-gold transition">Services</Link></li>
            <li><Link to="/checkout" className="hover:text-brand-gold transition">Checkout</Link></li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Connect</h4>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-brand-gold"><FaFacebookF /></a>
            <a href="#" className="hover:text-brand-gold"><FaInstagram /></a>
            <a href="#" className="hover:text-brand-gold"><FaTwitter /></a>
            <a href="#" className="hover:text-brand-gold"><FaPinterestP /></a>
          </div>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md bg-white text-gray-800 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-brand-gold text-brand-dark py-2 rounded-md hover:bg-yellow-400 transition text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} HavenHue. All rights reserved.
      </div>
    </footer>
  );
}
