import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState('http://127.0.0.1:8001/api/products/');
  const [loading, setLoading] = useState(false);

  const loadProducts = () => {
    if (!nextUrl) return;

    setLoading(true);
    axios.get(nextUrl)
      .then((response) => {
        const newProducts = response.data.results;

        setProducts((prevProducts) => {
          const existingIds = new Set(prevProducts.map(p => p.id));
          const filtered = newProducts.filter(p => !existingIds.has(p.id));
          return [...prevProducts, ...filtered];
        });

        setNextUrl(response.data.next);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className="py-16 bg-gray-50 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-serif text-brand-gold mb-10 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-700">${parseFloat(product.price).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {nextUrl && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadProducts}
              disabled={loading}
              className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
