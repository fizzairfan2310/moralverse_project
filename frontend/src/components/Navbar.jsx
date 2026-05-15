import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>🌟 Moralverse</h2>
      </div>
      
      <div className="navbar-menu">
        {user && (
          <>
            <span className="user-info">
              Welcome, {typeof user?.username === 'string' ? user.username : 'User'} ({typeof user?.role === 'string' ? user.role : 'Member'})
            </span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;