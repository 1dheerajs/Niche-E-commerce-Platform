import React, { useState } from 'react';

function AddProductPage({ user, onProductAdded }) {
  // Only artisans can add products
  if (!user || user.role !== 'artisan') {
    return <p>You must be signed in as an artisan to add products.</p>;
  }

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Send JWT if your backend requires authentication
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          name,
          price,
          description,
          imageUrl
        })
      });

      if (response.ok) {
        setMessage('Product added successfully!');
        setName('');
        setPrice('');
        setDescription('');
        setImageUrl('');
        if (onProductAdded) onProductAdded();
      } else {
        const data = await response.json();
        setMessage(data.msg || 'Failed to add product.');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Add a New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input value={price} onChange={e => setPrice(e.target.value)} required type="number" />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: 10 }} disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddProductPage;
