import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import vecnaImg from '../images/vecna.png';
import ParticleSystem from '../components/ParticleSystem';

const VecnaPage = () => {
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const [fadeIn, setFadeIn] = useState(false);
    const [showText, setShowText] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const fullText = "WELCOME BACK TO THE UPSIDE DOWN";

    useEffect(() => {
        // Fade in on mount
        setTimeout(() => setFadeIn(true), 100);

        // Show text after 3 seconds (halfway through the 6s fade)
        setTimeout(() => setShowText(true), 3000);
    }, []);

    const handleMouseMove = (e) => {
        if (!pageRef.current) return;
        const { clientX, clientY } = e;
        pageRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        pageRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };

    // Typewriter effect
    useEffect(() => {
        if (showText && displayedText.length < fullText.length) {
            const timer = setTimeout(() => {
                setDisplayedText(fullText.slice(0, displayedText.length + 1));
            }, 80);
            return () => clearTimeout(timer);
        } else if (displayedText === fullText) {
            // Show code input after text completes
            setTimeout(() => setShowCodeInput(true), 1000);
        }
    }, [showText, displayedText, fullText]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.toLowerCase() === '011' || code.toLowerCase() === 'eleven') {
            // Correct code - fade out and return
            setFadeIn(false);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            setError('INCORRECT CODE');
            setTimeout(() => setError(''), 1500);
        }
    };

    return (
        <div
            ref={pageRef}
            onMouseMove={handleMouseMove}
            className={`vecna-page ${fadeIn ? 'fade-in' : ''}`}
        >
            {/* Custom Spotlight Cursor */}
            <div className="flashlight-cursor" />

            {/* Particle System (Masked) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                opacity: 0.6,
                maskImage: 'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)'
            }}>
                <ParticleSystem />
            </div>

            {/* Animated Vecna */}
            <div className="vecna-container">
                <img src={vecnaImg} alt="Vecna" className="vecna-image" />
            </div>

            {/* Red particles */}
            <div className="red-particles"></div>

            {/* Vecna's message */}
            {showText && (
                <div className="vecna-message">
                    <h1 className="glitch-text">{displayedText}</h1>
                </div>
            )}

            {/* Escape code input */}
            {showCodeInput && (
                <div className="escape-panel">
                    <p className="escape-hint">Enter the code to escape...</p>
                    <form onSubmit={handleSubmit} className="code-form">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="_ _ _"
                            className="code-input"
                            autoFocus
                            maxLength={10}
                        />
                        <button type="submit" className="submit-code-btn">ESCAPE</button>
                    </form>
                    {error && <p className="code-error">{error}</p>}
                    <p className="code-clue">Hint: Subject number...</p>
                </div>
            )}
        </div>
    );
};

export default VecnaPage;
