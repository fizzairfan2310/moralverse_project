import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Characters', icon: '🎭', path: '/admin/characters' },
    { name: 'Stories', icon: '📖', path: '/admin/stories' },
    { name: 'User Base', icon: '👥', path: '/admin/users' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🌟</span>
        <h2>Moralverse</h2>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div 
            key={item.name}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="item-icon">{item.icon}</span>
            <span className="item-name">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="admin-user-info">
          <div className="user-avatar">{typeof user?.username === 'string' ? user.username[0]?.toUpperCase() : 'A'}</div>
          <div className="user-details">
            <span className="user-name">{typeof user?.username === 'string' ? user.username : 'Admin'}</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
