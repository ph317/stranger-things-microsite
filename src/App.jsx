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
import RestrictedArea from './components/RestrictedArea';
import ConversationSequence from './components/ConversationSequence';
import ScreenCrackEffect from './components/ScreenCrackEffect';
import normalImage from './images/st_normal_world_no_sign.jpeg';
import upsideDownImage from './images/st_upside_down_no_sign.jpeg';
import './styles/vecna-sequence.css';

function HomePage() {
  const navigate = useNavigate();
  const [showConversation, setShowConversation] = useState(false);
  const [showCracks, setShowCracks] = useState(false);

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
    <div className="App">
      {showConversation && <ConversationSequence onComplete={onConversationComplete} />}
      {showCracks && <ScreenCrackEffect onComplete={onCracksComplete} />}

      <div className="vecna-bloom" />
      <VecnaVines />
      <LightningEffect />
      {/* Global Particle System */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}>
        <ParticleSystem />
      </div>

      <header className="site-header">
        <FlickeringTitle />
      </header>

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
              <Link to="/void">
                <button className="cta-button glass">Enter the Void</button>
              </Link>
              <button className="cta-button secondary glass">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-glass" />
      <CharacterCarousel />

      <div className="divider-glass" />
      <RestrictedArea onActivate={startSequence} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
