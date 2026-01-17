import React, { useEffect, useState } from 'react';
import '../styles/CinematicIntro.css';

const CinematicIntro = ({ onComplete }) => {
    const [status, setStatus] = useState('playing'); // playing, fading, done

    useEffect(() => {
        // Start fading at 10s (8s settle + 2s hold)
        const fadeTimer = setTimeout(() => {
            setStatus('fading');
        }, 10000);

        // Entire intro ends at 14s (allows 4s for cinematic fade)
        const completeTimer = setTimeout(() => {
            setStatus('done');
            onComplete();
        }, 14000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className={`cinematic-intro ${status === 'fading' || status === 'done' ? 'fading' : ''}`}>
            <div className="intro-content">
                <div className="logo-bars top">
                    <div className="bar-line left"></div>
                    <div className="bar-line right"></div>
                </div>

                <div className="title-line top-line">
                    <span className="oversized">S</span>
                    <span>T</span>
                    <span>R</span>
                    <span>A</span>
                    <span>N</span>
                    <span>G</span>
                    <span>E</span>
                    <span className="oversized">R</span>
                </div>

                <div className="title-line bottom-line">
                    <div className="bar-bracket left"></div>
                    <span className="compact oversized">T</span>
                    <span className="compact">H</span>
                    <span className="compact">I</span>
                    <span className="compact">N</span>
                    <span className="compact">G</span>
                    <span className="compact oversized">S</span>
                    <div className="bar-bracket right"></div>
                </div>

                <div className="logo-bars bottom">
                    <div className="bar-line full"></div>
                </div>
            </div>
        </div>
    );
};

export default CinematicIntro;
