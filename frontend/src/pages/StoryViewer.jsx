import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStory, getCharacter } from '../services/api';
import Navbar from '../components/Navbar';
import AnimatedCharacter from '../components/AnimatedCharacter';
import './StoryViewer.css';

function StoryViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const storyRes = await getStory(id);
        const storyData = storyRes.data;
        setStory(storyData);

        const charRes = await getCharacter(storyData.character_id);
        setCharacter(charRes.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching story:', error);
        alert('Failed to load story');
        navigate('/user');
      }
    };

    fetchStoryData();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [id, navigate]);

  const handlePlayStory = () => {
    if (!story) return;

    if (isPlaying && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    const fullText = `${story.title}. ${story.story_text}. The moral of this story is: ${story.moral_lesson}`;
    const utterance = new SpeechSynthesisUtterance(fullText);

    const voiceType = character.voice_type || 'default';
    utterance.rate = 0.9;
    utterance.pitch = voiceType === 'child' ? 1.3 : voiceType === 'elder' ? 0.9 : 1.1;
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopStory = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="loading-screen-anime">
          <div className="loading-character">
            <div className="loading-circle"></div>
            <div className="loading-text">Opening the magical book...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />

      <div className="story-viewer-anime">
        <div className="viewer-content-glass">
          
          <button className="btn-back-anime" onClick={() => navigate('/user')}>
            ← Back to Stories
          </button>

          <div className="story-layout-side">
            {/* LEFT SIDE: CHARACTER PROFILE & CONTROLS */}
            <div className="character-sidebar-view">
              <div className="character-spotlight-anime">
                <div className="spotlight-platform"></div>
                <div className="character-viewer-wrapper">
                    <AnimatedCharacter
                      character={character}
                      isPlaying={isPlaying}
                      isPaused={isPaused}
                      size="large"
                      showWaves={true}
                    />
                </div>
              </div>

              <div className="character-details-view">
                <h3>{character.name}</h3>
                <span className="role-badge">{character.role}</span>
                <p className="char-bio-view">{character.description}</p>
                
                <div className="viewer-controls-sidebar">
                  <button 
                    className={`read-btn-anime ${isPlaying && !isPaused ? 'playing' : ''}`}
                    onClick={handlePlayStory}
                  >
                    {isPaused ? '▶️ Resume' : isPlaying ? '⏸️ Pause' : '🎙️ Listen Story'}
                  </button>
                  
                  {isPlaying && (
                    <button 
                      className="read-btn-anime stop" 
                      onClick={handleStopStory}
                    >
                      ⏹️ Stop
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: STORY TEXT */}
            <div className="story-main-view">
              <div className="story-paper-anime">
                <h1 className="story-title-view">{story.title}</h1>
                
                <div className="story-text-view small-text">
                  {story.story_text.split('\n\n').map((para, i) => para.trim() && (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="moral-reveal-anime">
                  <div className="moral-label-view">The Moral Lesson</div>
                  <div className="moral-text-view">"{story.moral_lesson}"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryViewer;