import React, { useEffect, useState } from 'react';
import axios from 'axios';
function ArtisanDashboard() {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/artisan/products', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setMyProducts(res.data));
  }, []);

  return (
    <div>
      <h2>My Products</h2>
      {myProducts.map(p => (
        <div key={p._id}>
          <span>{p.name}</span> - <span>₹{p.price}</span>
        </div>
      ))}
    </div>
  );
}
