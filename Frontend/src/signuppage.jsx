import React, { useState } from 'react';
import './forms.css';

function SignUpPage({ onSignUp, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' or 'artisan'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password, role })
});

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (onSignUp) onSignUp({ name, email, role });
      } else {
        setError(data.msg || 'Sign up failed');
      }
    } catch (err) {
      setError('Sign up failed');
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Your Account</h2>
      <form onSubmit={handleSignUp} className={loading ? 'form-loading' : ''}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
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
            placeholder="Create a password"
          />
        </div>
        <div className="form-group">
          <label className="form-label">I want to</label>
          <select
            className="form-select"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="user">Shop for Products</option>
            <option value="artisan">Sell My Crafts</option>
          </select>
        </div>
        <div className="form-button-group">
          <button
            type="submit"
            className="form-button form-button-primary"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <button
            type="button"
            className="form-button form-button-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
        {error && <div className="form-error">{error}</div>}
      </form>
      <div className="form-footer">
        Already have an account?{' '}
        <button className="form-link" onClick={onCancel}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
