import React, { useEffect, useState } from 'react';
import './FlashlightCursor.css';

const FlashlightCursor = ({ isActive }) => {
    const [position, setPosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        if (!isActive) return;

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div
            className="flashlight-overlay"
            style={{
                background: `radial-gradient(circle 200px at ${position.x}px ${position.y}px, transparent 10%, rgba(11, 12, 21, 0.95) 100%)`
            }}
        />
    );
};

export default FlashlightCursor;
