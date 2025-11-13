import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err?.response?.data?.message || 'Failed to register.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          style={{
            background: '#007bff',
            color: '#fff',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
