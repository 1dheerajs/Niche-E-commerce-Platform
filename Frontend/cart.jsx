import React, { createContext, useState } from 'react';
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = product => setCart([...cart, product]);
  const removeFromCart = id => setCart(cart.filter(p => p._id !== id));
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  return (
    <div>
      <h4>{product.name}</h4>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
