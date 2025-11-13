import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!token) return null; // hide navbar on login page

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#282c34',
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link style={{ color: '#61dafb', textDecoration: 'none' }} to="/">
          Dashboard
        </Link>
        <Link style={{ color: '#61dafb', textDecoration: 'none' }} to="/departments">
          Departments
        </Link>
        <Link style={{ color: '#61dafb', textDecoration: 'none' }} to="/employees">
          Employees
        </Link>
      </div>
      <button
        onClick={logout}
        style={{
          backgroundColor: '#ff4d4f',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </nav>
  );
}
