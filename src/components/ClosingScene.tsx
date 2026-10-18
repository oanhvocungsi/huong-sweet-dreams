import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, RotateCcw, Check, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

interface ClosingSceneProps {
  onReplay: () => void;
}

export const ClosingScene: React.FC<ClosingSceneProps> = ({ onReplay }) => {
  const [candlesLit, setCandlesLit] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLightCandle = () => {
    setCandlesLit(true);
    soundEngine.playSparkle();

    // Floating heart confetti celebration
    const end = Date.now() + 1200;
    const interval = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 80,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#FF5A87', '#FF9A76', '#F5B041', '#E8DFF5', '#FFFFFF'],
      });
    }, 200);
  };

  const handleShare = () => {
    soundEngine.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  return (
    <footer
      id="closing-scene"
      style={{
        position: 'relative',
        padding: '100px 20px 80px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(255, 230, 240, 0.45) 50%, rgba(255, 218, 230, 0.8) 100%)',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Heart Stamp */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
            color: '#FFFFFF',
            boxShadow: '0 10px 28px rgba(255, 90, 135, 0.4)',
            marginBottom: '24px',
          }}
        >
          <Heart size={32} fill="#FFFFFF" />
        </motion.div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 700,
            color: '#2A1728',
            lineHeight: 1.25,
            marginBottom: '16px',
          }}
        >
          Chúc Hương Ngày 20/10{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF4572 0%, #FF8A5C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ngọt Ngào & Bình Yên Nhất
          </span>
        </h2>

        <p
          style={{
            fontSize: '16px',
            color: '#6B4D66',
            lineHeight: 1.7,
            maxWidth: '620px',
            margin: '0 auto 36px',
          }}
        >
          Mong rằng thế giới này sẽ luôn đối xử với cậu thật dịu dàng, mỗi ngày trôi qua đều có bánh ngon, nhạc chill và những niềm vui bất ngờ gõ cửa!
        </p>

        {/* Interactive Candle / Wish Card */}
        <div
          className="glass-card-glow"
          style={{
            maxWidth: '480px',
            margin: '0 auto 40px',
            padding: '24px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.88)',
          }}
        >
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: '#C72557', marginBottom: '14px' }}>
            {candlesLit ? '✨ Điều ước của Hương đã được thắp sáng và gửi tới các vì sao!' : '🕯️ Thắp một ngọn nến và nhắm mắt ước một điều nhé:'}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLightCandle}
            disabled={candlesLit}
            style={{
              padding: '12px 28px',
              borderRadius: '50px',
              background: candlesLit
                ? 'linear-gradient(135deg, #F5B041 0%, #FFD700 100%)'
                : 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
              color: candlesLit ? '#5C4000' : '#FFFFFF',
              fontSize: '15px',
              fontWeight: 700,
              boxShadow: candlesLit
                ? '0 6px 20px rgba(245, 176, 65, 0.4)'
                : '0 6px 20px rgba(255, 90, 135, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Flame size={18} fill={candlesLit ? '#FFD700' : 'none'} />
            <span>{candlesLit ? 'Đã Thắp Sáng Ước Nguyện' : 'Thắp Nến Ước Nguyện 🕯️'}</span>
          </motion.button>
        </div>

        {/* Action Controls: Share & Replay */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            marginBottom: '50px',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            style={{
              padding: '13px 26px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1.5px solid rgba(255, 160, 190, 0.6)',
              color: '#C72557',
              fontSize: '14.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
            }}
          >
            <RotateCcw size={16} />
            <span>Xem lại từ đầu 💖</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            style={{
              padding: '13px 26px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
              color: '#FFFFFF',
              fontSize: '14.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 18px rgba(255, 90, 135, 0.3)',
            }}
          >
            {copiedLink ? <Check size={16} color="#FFF" /> : <Share2 size={16} />}
            <span>{copiedLink ? 'Đã sao chép link quà!' : 'Chia sẻ món quà 🎁'}</span>
          </motion.button>
        </div>

        {/* Footer Signature */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 180, 205, 0.4)',
            paddingTop: '24px',
            fontSize: '13px',
            color: '#8C6787',
          }}
        >
          <p>
            Project <strong>Huong Sweet Dreams</strong> • A Little World Made For Hương
          </p>
          <p style={{ marginTop: '4px', fontSize: '12px', color: '#AF8AA9' }}>
            Vietnamese Women's Day 20.10 • Designed & coded with 💖
          </p>
        </div>
      </div>
    </footer>
  );
};
