import React, { useState, useEffect } from 'react';
import AddProductPage from '../addproductpag';
import SignInModal from './signinmodel';
import SignUpPage from './signuppage';
import './App.css';

function useCart() {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) => setCart(cart.filter(item => item._id !== id));
  const clearCart = () => setCart([]);
  return { cart, addToCart, removeFromCart, clearCart };
}

function ProductList({ products, addToCart }) {
  return (
    <main>
      <section className="product-grid">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(prod => (
            <article key={prod._id} className="product-card">
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-title">{prod.name}</h3>
                <p>{prod.description}</p>
                <p className="product-price">₹{prod.price}</p>
                <button 
                  className="primary-button"
                  onClick={() => addToCart(prod)}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

function CartPage({ cart, removeFromCart, clearCart, goToCheckout }) {
  return (
    <main className="checkout-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>₹{item.price}</p>
                </div>
                <button 
                  className="secondary-button"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <button 
              className="secondary-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button 
              className="primary-button"
              onClick={goToCheckout}
            >
              Go to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function CheckoutPage({ cart, setPage }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <main className="checkout-container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. 
          <button 
            className="primary-button"
            onClick={() => setPage('home')}
          >
            Shop Now
          </button>
        </p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-summary">
            <p>Total: <strong>₹{total}</strong></p>
            <button 
              className="primary-button"
              onClick={() => { alert('Order placed!'); setPage('home'); }}
            >
              Place Order
            </button>
          </div>
          <button 
            className="secondary-button"
            onClick={() => setPage('cart')}
          >
            Back to Cart
          </button>
        </div>
      )}
    </main>
  );
}

function DashboardPage() {
  return (
    <main className="checkout-container">
      <h2>Dashboard</h2>
      <h1>About us</h1>
      <p>place to put about us our history or what ever else the client would like to display</p>
    </main>
  );
}

// Sign In Modal/Page


function App() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [page, setPage] = useState('home'); // 'home', 'cart', 'dashboard', 'checkout'
  const [showSignIn, setShowSignIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);
  

  let content;
  if(page== 'addproduct'){
    content = <AddProductPage user = {user}/>
  }
  if (page === 'cart') {
    content = <CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} goToCheckout={() => setPage('checkout')} />;
  } else if (page === 'dashboard') {
    content = <DashboardPage />;
  } else if (page === 'checkout') {
    content = <CheckoutPage cart={cart} setPage={setPage} />;
  }else if(page === 'addproduct'){
    content = <AddProductPage user = {user}/>
  } 
  else {
    content = <ProductList products={products} addToCart={addToCart} />
  }

  return (
    <div className="app-container">
      <header>
        <nav>
          <h1>Desi Etsy</h1>
          <div className="nav-buttons">
            {user && user.role === 'artisan' && (
              <button
                className="secondary-button"
                onClick={() => setPage('addproduct')}
              >
                Add Product
              </button>
            )}
            <button
              className="secondary-button"
              onClick={() => setPage('home')}
            >
              Home
            </button>
            <button
              className="secondary-button"
              onClick={() => setPage('cart')}
            >
              Cart ({cart.length})
            </button>
            <button
              className="secondary-button"
              onClick={() => setPage('dashboard')}
            >
              Dashboard
            </button>
            {user ? (
              <div className="user-section">
                <span>Welcome, <strong>{user.name || user.username || user}</strong>!</span>
                <button
                  className="secondary-button"
                  onClick={() => setUser(null)}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  className="secondary-button"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </button>
                <button
                  className="primary-button"
                  onClick={() => setShowSignUp(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="main-content">
        {content}
      </main>

      {showSignIn && (
        <SignInModal
          onSignIn={userObj => { setUser(userObj); setShowSignIn(false); }}
          onClose={() => setShowSignIn(false)}
        />
      )}

      {showSignUp && (
        <SignUpPage
          onSignUp={userObj => { setUser(userObj); setShowSignUp(false); }}
          onCancel={() => setShowSignUp(false)}
        />
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} Desi Etsy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
