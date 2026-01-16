import React from 'react';
import { useNavigate } from 'react-router-dom';
import DimensionalPortal from '../components/DimensionalPortal';

const VoidPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            <DimensionalPortal />

            {/* Back button */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'fixed',
                    top: '2rem',
                    left: '2rem',
                    zIndex: 1000,
                    padding: '1rem 2rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.transform = 'scale(1)';
                }}
            >
                ← Back to Reality
            </button>

            {/* Page title */}
            <h1
                style={{
                    position: 'fixed',
                    bottom: '3rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    color: '#e50914',
                    fontFamily: 'ITC Benguiat, serif',
                    fontSize: '3rem',
                    textTransform: 'uppercase',
                    textShadow: '0 0 20px rgba(229, 9, 20, 0.8), 0 0 40px rgba(229, 9, 20, 0.6)',
                    letterSpacing: '4px',
                    margin: 0,
                    opacity: 0.9,
                }}
            >
                The Void
            </h1>
        </div>
    );
};

export default VoidPage;
