import React from 'react';
import './DimensionalToggle.css';

const DimensionalToggle = ({ isUpsideDown, toggleTheme }) => {
    return (
        <div className="rift-switch-container">
            <label className="switch" aria-label="Toggle Reality">
                <input
                    type="checkbox"
                    checked={isUpsideDown}
                    onChange={toggleTheme}
                />
                <span className="slider">
                    <span className="rift-crack"></span>
                </span>
                <span className="status-label">
                    {isUpsideDown ? "UPSIDE DOWN" : "HAWKINS"}
                </span>
            </label>
        </div>
    );
};

export default DimensionalToggle;
