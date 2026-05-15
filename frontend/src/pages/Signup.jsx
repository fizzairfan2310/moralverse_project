import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { signup } from '../services/api';
import './Auth.css';

function Signup() {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '', 
    role: 'user' // 👈 Fixed role as 'user' by default
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert('Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      setError('Username already exists or invalid data');
    }
  };

  return (
    <div className="auth-page-container">
      <ParticleBackground count={15} />
      <div className="auth-card-landing">
        <div className="auth-brand-side">
          <div className="brand-logo-large">✨ <span>Moralverse</span></div>
          <p className="brand-tagline">Join thousands of readers and start your journey through the universe of moral stories.</p>
        </div>

        <div className="auth-form-side">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join the magical community today</p>
          
          {error && <p style={{color: '#ef4444', marginBottom: '20px', fontWeight: '700'}}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>Choose Username</label>
              <input 
                type="text" 
                placeholder="e.g. story_hero" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required 
              />
            </div>
            <div className="auth-input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Must be at least 8 characters" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
            {/* 🛑 Role selection removed for a real-world experience */}
            <button type="submit" className="btn-auth-primary">Start Your Journey</button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login" className="auth-link">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;