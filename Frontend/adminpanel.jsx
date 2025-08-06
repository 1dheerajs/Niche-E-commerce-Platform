import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [pendingArtisans, setPendingArtisans] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/pending-artisans', {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }).then(res => setPendingArtisans(res.data));
  }, []);

  const approve = id => {
    axios.post(`/api/admin/approve-artisan/${id}`)
      .then(() => setPendingArtisans(pendingArtisans.filter(a => a._id !== id)));
  };

  return (
    <div>
      <h2>Pending Artisans</h2>
      {pendingArtisans.map(a => (
        <div key={a._id}>
          <span>{a.name}</span>
          <button onClick={() => approve(a._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
