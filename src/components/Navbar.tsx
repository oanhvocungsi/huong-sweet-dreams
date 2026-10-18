import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const Navbar: React.FC = () => {
  const [audioState, setAudioState] = useState(soundEngine.getState());

  useEffect(() => {
    const unsub = soundEngine.subscribe((st) => setAudioState({ ...st }));
    return unsub;
  }, []);

  const scrollTo = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        className="glass-card"
        style={{
          pointerEvents: 'auto',
          maxWidth: '960px',
          width: '100%',
          padding: '10px 20px',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 8px 24px rgba(220, 90, 130, 0.1)',
        }}
      >
        {/* Brand / Title */}
        <div
          onClick={() => scrollTo('hero-scene')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '20px' }}>🧁</span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontWeight: 700,
              color: '#2A1728',
              letterSpacing: '-0.01em',
            }}
          >
            Hương's Sweet Dreams
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#C72557',
              background: '#FFE0E9',
              padding: '2px 8px',
              borderRadius: '20px',
              marginLeft: '4px',
            }}
          >
            20/10
          </span>
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            fontSize: '13.5px',
            fontWeight: 600,
            color: '#6B4D66',
          }}
        >
          <button
            onClick={() => scrollTo('greeting-section')}
            style={{ background: 'transparent', color: 'inherit' }}
            className="hover:text-pink-600"
          >
            Thư 20/10
          </button>
          <button
            onClick={() => scrollTo('surprise-box-section')}
            style={{ background: 'transparent', color: 'inherit' }}
            className="hover:text-pink-600"
          >
            Hộp Quà
          </button>
          <button
            onClick={() => scrollTo('sweetness-generator')}
            style={{ background: 'transparent', color: 'inherit' }}
            className="hover:text-pink-600"
          >
            Kẹo Ngọt
          </button>
          <button
            onClick={() => scrollTo('chill-lounge')}
            style={{ background: 'transparent', color: 'inherit' }}
            className="hover:text-pink-600"
          >
            Nhạc Chill
          </button>
        </nav>

        {/* Quick Audio Mute / Sound Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => soundEngine.togglePlay()}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              background: audioState.isPlaying ? 'rgba(255, 90, 135, 0.15)' : 'rgba(0, 0, 0, 0.05)',
              color: audioState.isPlaying ? '#C72557' : '#6B4D66',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title={audioState.isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
          >
            <Music size={13} />
            <span>{audioState.isPlaying ? 'Chill Beats On' : 'Bật Nhạc'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
