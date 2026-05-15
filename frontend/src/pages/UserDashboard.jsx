import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStories, getCharacters } from '../services/api';
import Navbar from '../components/Navbar';
import StoryCard from '../components/StoryCard';
import './UserDashboard.css';


function UserDashboard() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [storiesRes, charactersRes] = await Promise.all([
        getStories(),
        getCharacters(),
      ]);
      setStories(storiesRes.data || []);
      setCharacters(charactersRes.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getCharacter = (characterId) => {
    return characters.find(c => c.character_id === characterId);
  };

  const filteredStories = filter === 'all' 
    ? stories 
    : stories.filter(story => {
        const char = getCharacter(story.character_id);
        return char?.role.toLowerCase() === filter.toLowerCase();
      });

  if (loading) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="loading-screen-anime">
          <div className="loading-character">
            <div className="loading-circle"></div>
            <div className="loading-text">Loading magical stories...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />

      <div className="user-dashboard-anime">
        {/* Animated Background */}
        <div className="anime-background">
          <div className="floating-shapes">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`shape shape-${i % 5}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="hero-section-anime">
          <div className="hero-content">
            <div className="hero-badge">✨ Welcome to Moralverse</div>
            <h1 className="hero-title">
              <span className="gradient-text">Discover</span> Magical Stories
            </h1>
            <p className="hero-subtitle">
              Embark on adventures with animated storytellers who bring moral tales to life
            </p>
            
            {/* Stats */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <div className="stat-number">{stories.length}</div>
                  <div className="stat-label">Stories</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎭</div>
                <div className="stat-info">
                  <div className="stat-number">{characters.length}</div>
                  <div className="stat-label">Characters</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💡</div>
                <div className="stat-info">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Moral Lessons</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section-anime">
          <div className="filter-container">
            <h2 className="filter-title">Browse Stories</h2>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                <span className="filter-icon">🌟</span>
                All Stories
              </button>
              <button 
                className={`filter-btn ${filter === 'hero' ? 'active' : ''}`}
                onClick={() => setFilter('hero')}
              >
                <span className="filter-icon">🦸</span>
                Heroes
              </button>
              <button 
                className={`filter-btn ${filter === 'teacher' ? 'active' : ''}`}
                onClick={() => setFilter('teacher')}
              >
                <span className="filter-icon">👨‍🏫</span>
                Teachers
              </button>
              <button 
                className={`filter-btn ${filter === 'narrator' ? 'active' : ''}`}
                onClick={() => setFilter('narrator')}
              >
                <span className="filter-icon">📖</span>
                Narrators
              </button>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="stories-section-anime">
          <div className="stories-grid-anime">
            {filteredStories.length === 0 ? (
              <div className="empty-state-anime">
                <div className="empty-icon">📚</div>
                <h3>No stories found</h3>
                <p>Try selecting a different filter</p>
              </div>
            ) : (
              filteredStories.map((story) => {
                const character = getCharacter(story.character_id);
                return (
                  <StoryCard
                    key={story.story_id}
                    story={story}
                    character={character}
                    onRead={() => navigate(`/story/${story.story_id}`)}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;