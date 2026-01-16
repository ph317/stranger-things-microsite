import React, { useEffect, useState } from 'react';
import './Hero.css';
// import hawkinsBg from '../../images/hawkins-bg.png';
// import upsidedownBg from '../../images/upsidedown-bg.png';
import mainLogo from '../../images/main-logo.jpg';

const Hero = ({ isUpsideDown }) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Small parallax effect
            setOffset({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            className={`hero-section ${isUpsideDown ? 'upside-down' : 'hawkins'}`}
            style={{
                // Fallback to CSS gradients since assets failed to copy
                background: isUpsideDown
                    ? 'linear-gradient(to bottom, #0B0C15, #1F2933)'
                    : 'radial-gradient(circle, #F5E0B3, #D15840)',
                backgroundPosition: `center calc(50% + ${offset.y}px)`
            }}
        >
            <div className="hero-content" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
                {/* Placeholder for Main Logo - using text if image not suitable transparently */}
                <h1 className="hero-title">
                    <span className="stranger">STRANGER</span>
                    <br />
                    <span className="things">THINGS</span>
                </h1>

                <p className="hero-subtitle">
                    {isUpsideDown ? "THE GATE HAS OPENED" : "A QUIET TOWN WITH A DARK SECRET"}
                </p>

                <div className="scroll-indicator">
                    <span>Scroll to Explore</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
