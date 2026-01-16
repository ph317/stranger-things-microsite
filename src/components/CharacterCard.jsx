import React, { useState } from 'react';

const CharacterCard = ({ character, style, onClick, isFocused }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Fallback for missing images (Adults)
    const hasImage = !!character.spriteSheet;

    return (
        <div
            className={`character-card-container ${isFlipped ? 'flipped' : ''} ${!isFocused ? 'not-focused' : ''}`}
            style={style}
            onClick={onClick || (() => setIsFlipped(!isFlipped))}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className="character-card">
                {/* Front Side */}
                <div className="card-face card-front glass">
                    <div
                        className={`character-portrait ${!hasImage ? 'placeholder-portrait' : ''} ${!character.isSprite && hasImage ? 'retro-filter' : ''}`}
                        data-character={character.name.toLowerCase().replace(' ', '-')}
                        style={{
                            backgroundImage: hasImage ? `url(${character.spriteSheet})` : 'none',
                            backgroundPosition: character.spritePosition,
                            // Use cover for single images, 200% for the 2x2 sprite sheets
                            backgroundSize: character.isSprite ? '200% 200%' : 'cover'
                        }}
                    >
                        {!hasImage && <span className="no-signal">NO SIGNAL</span>}
                    </div>
                    <h3>{character.name}</h3>
                </div>

                {/* Back Side */}
                <div className="card-face card-back glass">
                    <div className="card-content">
                        <h4>"{character.quote}"</h4>
                        <div className="stats">
                            <p><strong>Role:</strong> {character.role}</p>
                            <p><strong>Status:</strong> {character.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
