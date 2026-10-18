import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Step1Props {
  onNext: () => void;
}

export const Step1Invitation: React.FC<Step1Props> = ({ onNext }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playBoxOpen();
    soundEngine.play(); // Auto-start the chill music after user gesture
    onNext();
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
      {/* Background Soft Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          width: 'min(90vw, 500px)',
          height: 'min(90vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 182, 193, 0.45) 0%, rgba(255, 218, 185, 0.25) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Invitation Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 25 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 1.08, opacity: 0, y: -20 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card-glow"
        style={{
          position: 'relative',
          maxWidth: '520px',
          width: '100%',
          padding: '44px 32px 36px',
          borderRadius: '28px',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '2px solid rgba(255, 210, 225, 0.85)',
          boxShadow: '0 25px 60px rgba(220, 100, 140, 0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Ribbon Accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            borderTopLeftRadius: '28px',
            borderTopRightRadius: '28px',
            background: 'linear-gradient(90deg, #FF9A76 0%, #FF5A87 50%, #F5B041 100%)',
          }}
        />

        {/* Small Cute Stamp */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            background: 'rgba(255, 230, 240, 0.85)',
            border: '1px solid rgba(255, 160, 190, 0.4)',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#C72557',
            letterSpacing: '0.04em',
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} color="#FF5A87" />
          <span>Gửi Hương • 20 Tháng 10</span>
          <Heart size={13} fill="#FF5A87" color="#FF5A87" />
        </motion.div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 6vw, 38px)',
            fontWeight: 700,
            lineHeight: 1.25,
            color: '#2A1728',
            marginBottom: '16px',
          }}
        >
          Hương ơi, hôm nay có một điều{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF4572 0%, #FF8A5C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ngọt ngào
          </span>{' '}
          dành riêng cho cậu.
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: '15.5px',
            lineHeight: 1.65,
            color: '#6B4D66',
            marginBottom: '32px',
            maxWidth: '420px',
            marginInline: 'auto',
          }}
        >
          Một không gian êm dịu, chứa đầy kẹo ngọt, những giai điệu chill ấm áp và những bất ngờ đang chờ cậu khám phá theo từng cú chạm.
        </p>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(255, 90, 135, 0.45)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
            color: '#FFFFFF',
            padding: '16px 38px',
            borderRadius: '50px',
            fontSize: '16.5px',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(255, 90, 135, 0.35)',
            cursor: 'pointer',
          }}
        >
          <Gift size={20} />
          <span>Chạm để mở món quà</span>
          <span>🎀</span>
        </motion.button>

        {/* Audio note */}
        <p
          style={{
            marginTop: '20px',
            fontSize: '12px',
            color: '#9F7A99',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span>🎧 Nhạc chill remix sẽ tự động phát sau cú chạm đầu tiên</span>
        </p>
      </motion.div>
    </div>
  );
};
