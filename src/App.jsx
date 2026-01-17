import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import RevealLens from './components/RevealLens';
import ParticleSystem from './components/ParticleSystem';
import CharacterCarousel from './components/CharacterCarousel';
import FlickeringTitle from './components/FlickeringTitle';
import VecnaVines from './components/VecnaVines';
import LightningEffect from './components/LightningEffect';
import VoidPage from './pages/VoidPage';
import VecnaPage from './pages/VecnaPage';
import TimelinePage from './pages/TimelinePage';
import RestrictedArea from './components/RestrictedArea';
import ConversationSequence from './components/ConversationSequence';
import ScreenCrackEffect from './components/ScreenCrackEffect';
import CinematicIntro from './components/CinematicIntro';
import normalImage from './images/characters.jpg';
import upsideDownImage from './images/duffer-brothers.png';
import './styles/vecna-sequence.css';

function HomePage() {
  const navigate = useNavigate();
  const [showConversation, setShowConversation] = useState(false);
  const [showCracks, setShowCracks] = useState(false);
  const [introActive, setIntroActive] = useState(() => {
    // Check if intro has already played in this session
    return !sessionStorage.getItem('introPlayed');
  });
  const [pageFadeIn, setPageFadeIn] = useState(false);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introPlayed', 'true');
    setIntroActive(false);
    // Start page fade-in immediately after intro is removed
    setTimeout(() => setPageFadeIn(true), 100);
  };

  const startSequence = () => {
    setShowConversation(true);
  };

  const onConversationComplete = () => {
    setShowConversation(false);
    setShowCracks(true);
  };

  const onCracksComplete = () => {
    // Navigate immediately to Vecna page
    // The ScreenCrackEffect ends with a solid red screen
    navigate('/vecna');
    setShowCracks(false);
  };

  return (
    <div className={`App ${pageFadeIn ? 'cinematic-reveal' : ''}`}>
      {introActive && <CinematicIntro onComplete={handleIntroComplete} />}

      {!introActive && (
        <>
          {showConversation && <ConversationSequence onComplete={onConversationComplete} />}
          {showCracks && <ScreenCrackEffect onComplete={onCracksComplete} />}

          {/* Background Layer: Truly Global & Viewport-filling */}
          <div className="vecna-bg" />
          <div className="vecna-bloom" />
          <VecnaVines />
          <LightningEffect />
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}>
            <ParticleSystem />
          </div>

          {/* Foreground Layer: Centered and Restricted Width */}
          <div className="content-wrapper">
            {/* Hero Section: Landscape Glass Card */}
            <section className="hero-section">
              <div className="hero-card glass">
                <RevealLens mainImage={normalImage} altImage={upsideDownImage} />
              </div>
            </section>

            {/* Welcome Content (Now below hero) */}
            <section className="welcome-section">
              <div className="glass-content glass">
                <div>
                  <h2>Welcome to Hawkins</h2>
                  <p>
                    Experience the dual nature of our reality. One moment you are safe in the suburbs,
                    and the next, you are trapped in a dark reflection.
                  </p>
                  <div className="actions">
                    <a href="https://hawkins-map.vercel.app/" target="_blank" rel="noopener noreferrer">
                      <button className="cta-button glass">Explore Map</button>
                    </a>
                    <Link to="/timeline">
                      <button className="cta-button secondary glass">Timeline</button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider-glass" />
            <CharacterCarousel />

            <div className="divider-glass" />
            <RestrictedArea onActivate={startSequence} />
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/void" element={<VoidPage />} />
        <Route path="/vecna" element={<VecnaPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
