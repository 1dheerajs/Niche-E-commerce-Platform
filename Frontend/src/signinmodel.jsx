import React, { useState } from 'react';
import './forms.css';

function SignInModal({ onSignIn, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSignIn({ username, role: data.role || 'user' });
        onClose();
      } else {
        setError(data.msg || 'Sign in failed');
      }
    } catch (err) {
      setError('Sign in failed');
    }
  };

  // Handle Artisan Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: username, password, role: 'artisan' })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSignIn({ username, role: 'artisan' });
        onClose();
      } else {
        setError(data.msg || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="form-title">{isRegister ? 'Register as Artisan' : 'Sign In'}</h2>
        <form onSubmit={isRegister ? handleRegister : handleSignIn}>
          {isRegister && (
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-button-group">
            <button type="submit" className="form-button form-button-primary">
              {isRegister ? 'Register as Artisan' : 'Sign In'}
            </button>
            <button type="button" className="form-button form-button-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
          {error && <div className="form-error">{error}</div>}
        </form>
        <div className="form-footer">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button className="form-link" onClick={() => setIsRegister(false)}>
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Want to sell your crafts?{' '}
              <button className="form-link" onClick={() => setIsRegister(true)}>
                Register as Artisan
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
