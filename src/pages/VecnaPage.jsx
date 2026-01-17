import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import vecnaImg from '../images/vecna.png';
import ParticleSystem from '../components/ParticleSystem';

const VecnaPage = () => {
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const [fadeIn, setFadeIn] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fade in on mount
        setTimeout(() => setFadeIn(true), 100);

        // Show code input after 2 seconds
        const timer = setTimeout(() => setShowCodeInput(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseMove = (e) => {
        if (!pageRef.current) return;
        const { clientX, clientY } = e;
        pageRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        pageRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };

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

            {/* Escape code input - Wrapped in a reveal layer */}
            {showCodeInput && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 20,
                    pointerEvents: 'none', // Allow clicks to pass through to the form below if needed, but the form will have its own pointerEvents
                    maskImage: 'radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)'
                }}>
                    <div className="escape-panel" style={{ pointerEvents: 'auto' }}>
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
                </div>
            )}
        </div>
    );
};

export default VecnaPage;
