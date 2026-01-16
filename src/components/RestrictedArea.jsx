import React, { useState } from 'react';

const RestrictedArea = ({ onActivate }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="restricted-area-section">
            <div className="restricted-container glass">
                <div className="warning-header">
                    <span className="warning-icon">⚠️</span>
                    <h2 className="restricted-title">RESTRICTED AREA</h2>
                    <span className="warning-icon">⚠️</span>
                </div>

                <p className="warning-text">
                    Access to this area is strictly forbidden. Unauthorized entry may result in
                    <span className="danger-text"> dimensional anomalies</span>,
                    <span className="danger-text"> reality distortion</span>, or
                    <span className="danger-text"> irreversible consequences</span>.
                </p>

                <button
                    className={`forbidden-button ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={onActivate}
                >
                    <span className="button-glow"></span>
                    <span className="button-text">DO NOT PRESS THIS BUTTON</span>
                    <span className="button-warning">⚠️ SERIOUSLY DON'T ⚠️</span>
                </button>

                <p className="fine-print">
                    By clicking this button, you acknowledge that you were explicitly warned
                    and accept all responsibility for what happens next.
                </p>
            </div>
        </section>
    );
};

export default RestrictedArea;
