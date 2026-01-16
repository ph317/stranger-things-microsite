import React, { useState, useRef, useEffect } from 'react';
import CharacterCard from './CharacterCard';

// Import individual character images
import elImg from '../images/El.png';
import mikeImg from '../images/Mike.png';
import willImg from '../images/Will.png';
import lucasImg from '../images/Lucas.png';
import maxImg from '../images/Max.png';
import dustinImg from '../images/Dustin.png';
import steveImg from '../images/Steve.png';
import robinImg from '../images/Robin.png';
import nancyImg from '../images/Nancy.png';
import jonathanImg from '../images/Jonathan.png';
import joyceImg from '../images/Joyce.png';
import hopperImg from '../images/Hopper.png';

const characters = [
    { id: 1, name: 'Eleven', spriteSheet: elImg, spritePosition: 'center', isSprite: false, role: 'Mage / Telekinetic', status: 'Unknown', quote: "Friends don't lie." },
    { id: 2, name: 'Mike Wheeler', spriteSheet: mikeImg, spritePosition: 'center', isSprite: false, role: 'Paladin / Leader', status: 'Alive', quote: "If we're both going crazy, then we'll go crazy together, right?" },
    { id: 3, name: 'Will Byers', spriteSheet: willImg, spritePosition: 'center', isSprite: false, role: 'Cleric / The Wise', status: 'Alive', quote: "It's like when you have a dream and you can't remember it." },
    { id: 4, name: 'Lucas Sinclair', spriteSheet: lucasImg, spritePosition: 'center', isSprite: false, role: 'Ranger', status: 'Alive', quote: "We are not kids anymore." },
    { id: 5, name: 'Max Mayfield', spriteSheet: maxImg, spritePosition: 'center', isSprite: false, role: 'Zoomer', status: 'Alive', quote: "There's more to life than stupid boys." },
    { id: 6, name: 'Dustin Henderson', spriteSheet: dustinImg, spritePosition: 'center', isSprite: false, role: 'Bard', status: 'Alive', quote: "If you die, I die" },
    { id: 7, name: 'Steve Harrington', spriteSheet: steveImg, spritePosition: 'center', isSprite: false, role: 'The Babysitter', status: 'Alive', quote: "Always the babysitter, always the goddamn babysitter!" },
    { id: 8, name: 'Robin Buckley', spriteSheet: robinImg, spritePosition: 'center', isSprite: false, role: 'Code Breaker', status: 'Alive', quote: "We all die, my strange little child friend." },
    { id: 9, name: 'Nancy Wheeler', spriteSheet: nancyImg, spritePosition: 'center', isSprite: false, role: 'Investigative Journalist', status: 'Alive', quote: "Ask for forgiveness, not permission." },
    { id: 10, name: 'Jonathan Byers', spriteSheet: jonathanImg, spritePosition: 'center', isSprite: false, role: 'Photographer', status: 'Alive', quote: "Nobody normal ever accomplished anything meaningful in this world." },
    { id: 11, name: 'Joyce Byers', spriteSheet: joyceImg, spritePosition: 'center', isSprite: false, role: 'Protective Mother', status: 'Alive', quote: "I don't care if anyone believes me." },
    { id: 12, name: 'Jim Hopper', spriteSheet: hopperImg, spritePosition: 'center', isSprite: false, role: 'Chief of Police', status: 'Alive', quote: "Mornings are for coffee and contemplation." }
];

const CharacterCarousel = () => {
    const [currIndex, setCurrIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const sceneRef = useRef(null);

    const count = characters.length;
    const cardWidth = 300;
    const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / count)) + 350;
    const anglePerCard = 360 / count;

    const currentRotation = -currIndex * anglePerCard + dragOffset;

    // Normalize rotation to find the focused index
    // We want to find which index is "in front" (at 0 degrees rotation in the world)
    const normalizedRotation = (-currentRotation % 360 + 360) % 360;
    const focusedIndex = Math.round(normalizedRotation / anglePerCard) % count;

    const next = () => {
        if (isDragging) return;
        setCurrIndex(prev => prev + 1);
    };

    const prev = () => {
        if (isDragging) return;
        setCurrIndex(prev => prev - 1);
    };

    const handleStart = (clientX) => {
        setIsDragging(true);
        startX.current = clientX;
    };

    const handleMove = (clientX) => {
        if (!isDragging) return;
        const diff = clientX - startX.current;
        // Convert pixel drag distance to rotation degrees
        // Arbitrary divisor to control sensitivity
        setDragOffset(diff / 5);
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        // Calculate how many cards we've dragged
        const cardsSwiped = Math.round(dragOffset / anglePerCard);
        setCurrIndex(prev => prev - cardsSwiped);
        setDragOffset(0);
    };

    // Global listeners for mouse up to ensure we stop dragging even if mouse leaves carousel
    useEffect(() => {
        const globalEnd = () => handleEnd();
        window.addEventListener('mouseup', globalEnd);
        window.addEventListener('touchend', globalEnd);
        return () => {
            window.removeEventListener('mouseup', globalEnd);
            window.removeEventListener('touchend', globalEnd);
        };
    }, [isDragging, dragOffset]);

    return (
        <div className="character-carousel-section">
            <h2 className="section-title">The Party & Allies</h2>
            <div className="divider-red"></div>

            <div
                className={`carousel-scene ${isDragging ? 'dragging' : ''}`}
                ref={sceneRef}
                onMouseDown={(e) => handleStart(e.clientX)}
                onMouseMove={(e) => handleMove(e.clientX)}
                onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            >
                <div
                    className="carousel-ring"
                    style={{
                        transform: `translateZ(-${radius}px) rotateY(${currentRotation}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                >
                    {characters.map((char, index) => {
                        const angle = index * anglePerCard;
                        const isFocused = index === focusedIndex;

                        return (
                            <CharacterCard
                                key={char.id}
                                character={char}
                                isFocused={isFocused}
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px) ${!isFocused ? 'scale(0.85)' : ''}`,
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="carousel-nav">
                <button className="nav-btn" onClick={prev} disabled={isDragging}>&#8592;</button>
                <button className="nav-btn" onClick={next} disabled={isDragging}>&#8594;</button>
            </div>
        </div>
    );
};

export default CharacterCarousel;
