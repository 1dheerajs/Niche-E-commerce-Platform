import React, { useState } from 'react';

function ProductList({ products, addToCart }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(prod => {
    const matchesCategory = category === 'all' || prod.category === category;
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase()) ||
                          prod.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main style={{ padding: '2rem' }}>
      <section>
        <h2>Our Handmade Products</h2>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '0.5rem', minWidth: 200 }}
          />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '0.5rem' }}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map(prod => (
              <article key={prod._id} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: '200px',
                textAlign: 'center',
                background: '#fafafa'
              }}>
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '1rem' }}
                />
                <h3>{prod.name}</h3>
                <p>{prod.description}</p>
                <strong>₹{prod.price}</strong>
                <br />
                <button onClick={() => addToCart(prod)} style={{ marginTop: '0.5rem' }}>
                  Add to Cart
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default ProductList;
