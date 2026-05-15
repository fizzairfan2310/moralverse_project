import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { login } from '../services/api';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      
      // 🚀 Auto-Redirection based on Role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-page-container">
      <ParticleBackground count={15} />
      <div className="auth-card-landing">
        <div className="auth-brand-side">
          <div className="brand-logo-large">🌟 <span>Moralverse</span></div>
          <p className="brand-tagline">Enter the magical world of storytelling and discover lessons that shape the future.</p>
        </div>

        <div className="auth-form-side">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Please enter your details to continue</p>
          
          {error && <p style={{color: '#ef4444', marginBottom: '20px', fontWeight: '700'}}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>Username</label>
              <input 
                type="text" 
                placeholder="e.g. magic_reader" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required 
              />
            </div>
            <div className="auth-input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
            <button type="submit" className="btn-auth-primary">Login to Dashboard</button>
          </form>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/signup" className="auth-link">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;