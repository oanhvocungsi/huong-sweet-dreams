import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flame, RotateCcw, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/soundEngine';

interface Step8Props {
  onReplay: () => void;
}

export const Step8FinaleCandle: React.FC<Step8Props> = ({ onReplay }) => {
  const [candlesLit, setCandlesLit] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLightCandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCandlesLit(true);
    soundEngine.playSparkle();

    const end = Date.now() + 1500;
    const interval = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 90,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#FF5A87', '#FF9A76', '#F5B041', '#E8DFF5', '#FFFFFF'],
      });
    }, 180);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
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
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.7 }}
        className="glass-card-glow"
        style={{
          maxWidth: '620px',
          width: '100%',
          padding: '38px 28px',
          borderRadius: '32px',
          background: 'rgba(255, 255, 255, 0.94)',
          border: '2px solid rgba(255, 200, 220, 0.85)',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Heart Icon Badge */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
            color: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(255, 90, 135, 0.4)',
            marginBottom: '18px',
          }}
        >
          <Heart size={28} fill="#FFFFFF" />
        </motion.div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 5vw, 36px)',
            fontWeight: 700,
            color: '#2A1728',
            lineHeight: 1.25,
            marginBottom: '10px',
          }}
        >
          Lời Chúc Trọn Vẹn Dành Cho{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF4572 0%, #FF8A5C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hương
          </span>
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.65,
            color: '#6B4D66',
            marginBottom: '26px',
            maxWidth: '500px',
            marginInline: 'auto',
          }}
        >
          Mong rằng thế giới này sẽ luôn đối xử với cậu thật dịu dàng, mỗi ngày trôi qua đều có bánh ngon, nhạc chill và những niềm vui bất ngờ gõ cửa!
        </p>

        {/* Interactive Candle Visual */}
        <div
          style={{
            padding: '20px',
            borderRadius: '20px',
            background: 'rgba(255, 240, 245, 0.85)',
            border: '1px solid rgba(255, 180, 205, 0.4)',
            marginBottom: '26px',
          }}
        >
          <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#C72557', marginBottom: '14px' }}>
            {candlesLit ? '✨ Ngọn nến ước nguyện đã được thắp sáng và gửi tới các vì sao!' : '🕯️ Thắp một ngọn nến và nhắm mắt ước một điều nhé:'}
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
              boxShadow: candlesLit ? '0 6px 20px rgba(245, 176, 65, 0.4)' : '0 6px 20px rgba(255, 90, 135, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: candlesLit ? 'default' : 'pointer',
            }}
          >
            <Flame size={18} fill={candlesLit ? '#FFD700' : 'none'} />
            <span>{candlesLit ? 'Đã Thắp Sáng Ước Nguyện' : 'Thắp Nến Ước Nguyện 🕯️'}</span>
          </motion.button>
        </div>

        {/* Replay & Share Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playClick();
              onReplay();
            }}
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid #FF85A1',
              color: '#C72557',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={15} />
            <span>Trải nghiệm lại từ đầu 💖</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 18px rgba(255, 90, 135, 0.3)',
              cursor: 'pointer',
            }}
          >
            {copiedLink ? <Check size={15} color="#FFF" /> : <Share2 size={15} />}
            <span>{copiedLink ? 'Đã sao chép link!' : 'Chia sẻ món quà 🎁'}</span>
          </motion.button>
        </div>

        {/* Footer Signature */}
        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255, 180, 205, 0.4)', paddingTop: '16px', fontSize: '12px', color: '#8C6787' }}>
          <p>Project <strong>Huong Sweet Dreams</strong> • Dành riêng cho Hương nhân ngày 20/10 💖</p>
        </div>
      </motion.div>
    </div>
  );
};
