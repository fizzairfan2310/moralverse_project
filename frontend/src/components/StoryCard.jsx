import React, { useState } from 'react';
import AnimatedCharacter from './AnimatedCharacter';
import './StoryCard.css';

function StoryCard({ story, onRead, character }) {
  const [isHovered, setIsHovered] = useState(false);

  // Get first 150 characters of story — safe against null/undefined
  const storyPreview = (story.story_text || '').substring(0, 150);
  const narratorName = character?.name || 'Unknown';
  const storyTitle = story.title || 'Untitled Story';
  const moralLesson = story.moral_lesson || 'A story with a lesson to discover.';

  return (
    <div 
      className="story-card-anime"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Glow Effect */}
      <div className={`card-glow-anime ${isHovered ? 'active' : ''}`}></div>
      
      {/* Floating Character Avatar */}
      <div className={`character-float-anime ${isHovered ? 'bounce-anime' : ''}`}>
        <div className="character-ring-anime"></div>
        {character ? (
          <div className="character-avatar-wrapper">
             <AnimatedCharacter
                character={character}
                isPlaying={isHovered}
                isPaused={false}
                size="small"
                showWaves={false}
              />
          </div>
        ) : (
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${narratorName}`}
            alt={narratorName}
            className="character-avatar-anime"
          />
        )}
        {isHovered && (
          <div className="character-sparkles-anime">
            <span className="sparkle">✨</span>
            <span className="sparkle">⭐</span>
            <span className="sparkle">💫</span>
          </div>
        )}
      </div>

      {/* Glass Card Content */}
      <div className="story-card-glass-anime">
        {/* Header */}
        <div className="story-header-anime">
          <h3 className="story-title-anime">{storyTitle}</h3>
          <div className="narrator-badge-anime">
            <span className="narrator-icon">🎭</span>
            {narratorName}
          </div>
        </div>

        {/* Story Preview */}
        <p className="story-preview-anime">
          {storyPreview}...
        </p>

        {/* Moral Tag */}
        <div className="moral-section-anime">
          <div className="moral-icon-anime">💡</div>
          <div className="moral-content-anime">
            <span className="moral-label">Moral Lesson</span>
            <p className="moral-text">{moralLesson}</p>
          </div>
        </div>

        {/* Action Button */}
        <button className="read-btn-anime" onClick={onRead}>
          <span className="btn-text-anime">Read Story</span>
          <span className="btn-icon-anime">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-dots-anime">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default StoryCard;