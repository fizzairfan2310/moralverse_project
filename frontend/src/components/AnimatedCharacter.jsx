import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
// FIXED IMPORT - lowercase 'd'
import ThreeDCharacter from './ThreeDCharacter';
import './AnimatedCharacter.css';

/**
 * AnimatedCharacter Component - WITH 3D SUPPORT
 * Supports: Lottie, Static Images, Custom Images, and 3D GLB models
 */
function AnimatedCharacter({ 
  character, 
  isPlaying = false, 
  isPaused = false, 
  size = 'large',
  className = '',
  showWaves = true 
}) {
  const [lottieError, setLottieError] = useState(false);
  const lottieContainerRef = useRef(null);
  const lottieInstanceRef = useRef(null);

  // Load Lottie animation dynamically
  const loadLottieAnimation = useCallback(async () => {
    try {
      const lottie = await import('lottie-web');
      
      if (lottieInstanceRef.current) {
        lottieInstanceRef.current.destroy();
      }

      if (!lottieContainerRef.current) return;

      lottieInstanceRef.current = lottie.default.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: character.animation_url  // 👈 Using path directly
      });

      setLottieError(false);
    } catch (error) {
      console.error('Failed to load Lottie animation:', error);
      setLottieError(true);
    }
  }, [character.animation_url]);

  useEffect(() => {
    if (character.animation_type === 'lottie' && character.animation_url && lottieContainerRef.current) {
      loadLottieAnimation();
    }

    return () => {
      if (lottieInstanceRef.current) {
        lottieInstanceRef.current.destroy();
      }
    };
  }, [character.animation_url, character.animation_type, loadLottieAnimation]);

  // Render character based on animation type
  const renderCharacter = () => {
    const animationType = character.animation_type || 'static';

    switch (animationType) {
      // 3D GLB MODEL (Ready Player Me)
      case '3d':
        if (character.animation_url && character.animation_url.endsWith('.glb')) {
          return (
            <ThreeDCharacter
              modelUrl={character.animation_url}
              isPlaying={isPlaying && !isPaused}
              size={size}
            />
          );
        }
        return renderFallbackImage();

      // LOTTIE ANIMATION
      case 'lottie':
        if (lottieError) {
          return renderFallbackImage();
        }
        return (
          <div 
            ref={lottieContainerRef} 
            className="lottie-container"
            style={{ width: '100%', height: '100%' }}
          />
        );

      // CUSTOM IMAGE
      case 'custom':
        return (
          <img
            src={character.image_url}
            alt={character.name}
            className="character-image"
            onError={renderFallbackImage}
          />
        );

      // STATIC DICEBEAR
      case 'static':
      default:
        return renderFallbackImage();
    }
  };

  // Fallback to Dicebear
  const renderFallbackImage = () => {
    const dicebearUrl = character.image_url || 
      `https://api.dicebear.com/7.x/adventurer/svg?seed=${character.name}`;
    
    return (
      <img
        src={dicebearUrl}
        alt={character.name}
        className="character-image"
        onError={(e) => {
          e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${character.name}`;
        }}
      />
    );
  };

  // Don't animate 3D characters (they handle their own animation)
  const shouldAnimate = character.animation_type !== '3d';

  return (
    <motion.div 
      className={`animated-character ${size} ${isPlaying && !isPaused ? 'talking' : 'idle'} ${className}`}
      animate={shouldAnimate ? {
        scale: isPlaying && !isPaused ? [1, 1.05, 1] : 1,
        y: isPlaying && !isPaused ? [0, -5, 0] : 0,
      } : {}}
      transition={{
        duration: 0.6,
        repeat: isPlaying && !isPaused && shouldAnimate ? Infinity : 0,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <div className={`character-container ${character.animation_type === '3d' ? 'is-3d' : ''}`}>
        {renderCharacter()}
        
        {/* Voice waves (not for 3D) */}
        {isPlaying && !isPaused && character.animation_type !== '3d' && showWaves && (
          <motion.div 
            className="voice-waves-overlay"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.div
              className="wave wave-1"
              animate={{ height: [15, 35, 15] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="wave wave-2"
              animate={{ height: [15, 40, 15] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.15, ease: "easeInOut" }}
            />
            <motion.div
              className="wave wave-3"
              animate={{ height: [15, 30, 15] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
            />
          </motion.div>
        )}
        
        {/* Glow effect */}
        <div className={`character-glow ${isPlaying && !isPaused ? 'active' : ''}`}></div>
      </div>

      {/* Character name badge */}
      <div className="character-name-badge">
        {character.name}
      </div>
    </motion.div>
  );
}

export default AnimatedCharacter;