import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders/history', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order._id}>
          <span>Order #{order._id}</span> - <span>{order.status}</span>
        </div>
      ))}
    </div>
  );
}
