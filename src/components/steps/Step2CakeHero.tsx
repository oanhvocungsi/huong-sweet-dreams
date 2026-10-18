import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronRight } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Step2Props {
  onNext: () => void;
}

const FLOATING_TREATS = [
  { emoji: '🧁', top: '15%', left: '8%', name: 'Cupcake Dâu' },
  { emoji: '🍬', top: '30%', right: '10%', name: 'Kẹo Bông' },
  { emoji: '🍓', top: '75%', left: '12%', name: 'Dâu Tây Mọng' },
  { emoji: '🧋', top: '72%', right: '10%', name: 'Trà Sữa' },
];

export const Step2CakeHero: React.FC<Step2Props> = ({ onNext }) => {
  const cakeImgUrl = `${import.meta.env.BASE_URL}assets/cake-dream.jpg`;

  const handleSweetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSparkle();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: ['#FF85A1', '#FFDAC1', '#FFF', '#F5B041', '#E8DFF5'],
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      {/* Floating Interactive Treats */}
      {FLOATING_TREATS.map((t, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + idx * 0.15, type: 'spring' }}
          whileHover={{ scale: 1.3, rotate: 12 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSweetClick}
          title={`${t.name} (Chạm để nổ kẹo!)`}
          style={{
            position: 'absolute',
            top: t.top,
            left: t.left,
            right: t.right,
            fontSize: '32px',
            padding: '10px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0 8px 24px rgba(220, 100, 140, 0.15)',
            border: '1.5px solid rgba(255, 255, 255, 0.9)',
            cursor: 'pointer',
            zIndex: 10,
          }}
          className="animate-float"
        >
          <span>{t.emoji}</span>
        </motion.div>
      ))}

      {/* Main Content Stage */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '680px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Stage Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 180, 205, 0.5)',
            fontSize: '13px',
            fontWeight: 700,
            color: '#C72557',
            marginBottom: '14px',
            boxShadow: '0 4px 12px rgba(220, 90, 130, 0.08)',
          }}
        >
          <Sparkles size={14} color="#FF5A87" />
          <span>Chào mừng đến với Hương's Sweet Dreams</span>
          <Heart size={13} fill="#FF5A87" color="#FF5A87" />
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 700,
            color: '#2A1728',
            marginBottom: '8px',
          }}
        >
          Chiếc Bánh Giấc Mơ Của{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF4572 0%, #FF8A5C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hương
          </span>{' '}
          🍰
        </h2>

        <p style={{ fontSize: '15px', color: '#6B4D66', maxWidth: '520px', marginBottom: '20px' }}>
          Được làm từ mây bồng bềnh, macaron cầu vồng và những nốt nhạc chill êm dịu nhất dành cho ngày 20/10.
        </p>

        {/* The Dream Cake Image Card */}
        <div
          className="glass-card-glow"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '460px',
            borderRadius: '24px',
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.92)',
            boxShadow: '0 20px 50px rgba(220, 100, 140, 0.18)',
            marginBottom: '24px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: '100%',
              height: 'clamp(240px, 35vh, 320px)',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={cakeImgUrl}
              alt="Hương's Sweet Dreams Cake"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                background: 'linear-gradient(to top, rgba(42, 23, 40, 0.75) 0%, transparent 100%)',
                color: '#FFF',
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#FFD2BC' }}>SUGAR DREAMS EDITION • 20.10</p>
              <p style={{ fontSize: '16px', fontWeight: 700 }}>Ngọt ngào, êm dịu & ngập tràn may mắn</p>
            </div>
          </div>
        </div>

        {/* Next Click Prompt Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playSparkle();
            onNext();
          }}
          style={{
            padding: '14px 34px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
            color: '#FFFFFF',
            fontSize: '15.5px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(255, 90, 135, 0.35)',
            cursor: 'pointer',
          }}
        >
          <span>Khám phá bức thư gửi Hương</span>
          <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
};
