import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ParticleBackground from '../components/ParticleBackground';
import { getCharacters, getStories, getUsers } from '../services/api';
import './Dashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    characters: 0,
    stories: 0,
    users: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charRes = await getCharacters();
        const storyRes = await getStories();
        const userRes = await getUsers();
        
        setStats({
          characters: charRes.data.length,
          stories: storyRes.data.length,
          users: userRes.data.length
        });

        const combined = [
          ...charRes.data.map(c => ({ type: 'Character', name: c.name, time: '2h' })),
          ...storyRes.data.map(s => ({ type: 'Story', name: s.title, time: '5h' }))
        ].slice(0, 4);
        setRecentActivity(combined);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-root-container">
      <ParticleBackground count={10} />
      <Sidebar />
      
      <main className="admin-main-wrapper">
        <div className="admin-page-header">
          <div className="header-text">
            <h1>Platform Overview</h1>
            <div className="status-indicator">
              <span className="pulse-dot"></span>
              Live System
            </div>
          </div>
          <div className="header-date-box">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="stats-row-pro">
          <div className="stat-box-pro">
            <span className="stat-label-pro">Characters</span>
            <div className="stat-content-pro">
              <span className="stat-icon-pro">🎭</span>
              <h2 className="stat-number-pro">{stats.characters}</h2>
            </div>
          </div>
          <div className="stat-box-pro">
            <span className="stat-label-pro">Stories</span>
            <div className="stat-content-pro">
              <span className="stat-icon-pro">📖</span>
              <h2 className="stat-number-pro">{stats.stories}</h2>
            </div>
          </div>
          <div className="stat-box-pro">
            <span className="stat-label-pro">Users</span>
            <div className="stat-content-pro">
              <span className="stat-icon-pro">👥</span>
              <h2 className="stat-number-pro">{stats.users}</h2>
            </div>
          </div>
        </div>

        <div className="analytics-grid-pro">
          <div className="analytics-card-pro chart-main">
            <h3>Weekly Content Activity</h3>
            <div className="pro-bar-chart">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="pro-bar-column">
                  <div className="pro-bar-fill" style={{ height: `${h}%` }}></div>
                  <span className="pro-bar-day">{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card-pro chart-side">
            <h3>Growth Rate</h3>
            <div className="growth-circle-box">
              <div className="growth-ring">
                 <svg viewBox="0 0 36 36" className="growth-svg">
                    <circle className="ring-bg" cx="18" cy="18" r="16" />
                    <circle className="ring-fill" cx="18" cy="18" r="16" strokeDasharray="75, 100" />
                 </svg>
                 <span className="ring-text">75%</span>
              </div>
              <p className="growth-subtext">+12% this month</p>
            </div>
          </div>
        </div>

        <div className="bottom-sections-pro">
          <div className="activity-card-pro">
            <h3>Recent Updates</h3>
            <div className="activity-list-pro">
              {recentActivity.map((act, i) => (
                <div key={i} className="activity-row-pro">
                  <div className="row-dot"></div>
                  <div className="row-info">
                    <p>{act.type}: <strong>{act.name}</strong></p>
                    <small>{act.time} ago</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-card-pro">
            <h3>System Status</h3>
            <div className="system-meter">
               <div className="meter-info"><span>CPU Usage</span><span>14%</span></div>
               <div className="meter-track"><div className="meter-bar" style={{width: '14%'}}></div></div>
            </div>
            <div className="system-meter">
               <div className="meter-info"><span>RAM Usage</span><span>48%</span></div>
               <div className="meter-track"><div className="meter-bar" style={{width: '48%'}}></div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
