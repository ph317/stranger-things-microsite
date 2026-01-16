import React from 'react';
import './GlitchButton.css';

const GlitchButton = ({ children, onClick, variant = 'primary' }) => {
    return (
        <button className={`glitch-btn ${variant}`} onClick={onClick} data-text={children}>
            {children}
        </button>
    );
};

export default GlitchButton;
