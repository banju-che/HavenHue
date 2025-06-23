import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../contexts/CartContext';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8001/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  if (!product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  return (
    <section className="p-6 flex flex-col md:flex-row gap-8 mt-20 max-w-6xl mx-auto">
      <div className="flex-1 h-96 bg-gray-100 rounded overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-xl text-yellow-600 mb-4">${parseFloat(product.price).toFixed(2)}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
          >
            Add to Cart
          </button>

          <Link
            to="/cart"
            className="text-yellow-600 underline hover:text-yellow-700"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </section>
  );
}
