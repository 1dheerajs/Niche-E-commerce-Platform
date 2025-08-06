import React, { useContext, useState } from 'react';
import { CartContext } from './src/CartContext';
import axios from 'axios';

function Checkout() {
  const { cart } = useContext(CartContext);
  const [address, setAddress] = useState('');

  const handleCheckout = async () => {
    await axios.post('/api/orders', { cart, address });
    alert('Order placed!');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input
        placeholder="Shipping Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <button onClick={handleCheckout}>Pay & Place Order</button>
    </div>
  );
}
