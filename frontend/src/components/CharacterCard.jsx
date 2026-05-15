import React from 'react';
import AnimatedCharacter from './AnimatedCharacter';
import './CharacterCard.css';

function CharacterCard({ character, onClick }) {
  return (
    <div className="character-card" onClick={onClick}>
      <div className="character-card-image">
        <AnimatedCharacter
          character={character}
          isPlaying={false}
          isPaused={false}
          size="small"
          showWaves={false}
        />
      </div>
      
      <div className="character-card-content">
        <h3>{character.name}</h3>
        <span className="character-badge">{character.role}</span>
        <p className="character-description">
          {character.description && character.description.length > 80 
            ? `${character.description.substring(0, 80)}...` 
            : character.description}
        </p>
      </div>
      
      <div className="character-card-footer">
        <button className="view-btn">View Details →</button>
      </div>
    </div>
  );
}

export default CharacterCard;