import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface InvitationModalProps {
  isOpen: boolean;
  onOpenExperience: () => void;
}

export const InvitationModal: React.FC<InvitationModalProps> = ({ isOpen, onOpenExperience }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    soundEngine.playBoxOpen();
    soundEngine.play(); // Auto-start the chill music after user gesture

    setTimeout(() => {
      onOpenExperience();
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'radial-gradient(circle at center, rgba(255, 235, 242, 0.95) 0%, rgba(253, 242, 246, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 9999,
          }}
        >
          {/* Ambient sparkling floating orbs */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '10%',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(255, 182, 193, 0.45) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '10%',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(255, 218, 185, 0.4) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          {/* Invitation Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{
              scale: isOpening ? [1, 1.04, 0.92] : 1,
              opacity: isOpening ? [1, 0.9, 0] : 1,
              y: isOpening ? -25 : 0,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'relative',
              maxWidth: '520px',
              width: '100%',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid rgba(255, 210, 225, 0.8)',
              borderRadius: '28px',
              padding: '44px 32px 36px',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(220, 100, 140, 0.16), 0 0 40px rgba(255, 182, 193, 0.25)',
              overflow: 'hidden',
            }}
          >
            {/* Top Golden Ribbon Decor */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
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
                fontWeight: 600,
                color: '#C72557',
                letterSpacing: '0.04em',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(230, 90, 130, 0.08)',
              }}
            >
              <Sparkles size={14} color="#FF5A87" />
              <span>Gửi Hương • 20 Tháng 10</span>
              <Heart size={13} fill="#FF5A87" color="#FF5A87" />
            </motion.div>

            {/* Main Headline */}
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

            {/* Subtext description */}
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
              Một không gian nhỏ êm dịu, chứa đầy kẹo ngọt, những giai điệu chill ấm áp và lời chúc chân thành nhất cho ngày Phụ Nữ Việt Nam.
            </p>

            {/* Interactive Invitation Seal Button */}
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 12px 30px rgba(255, 90, 135, 0.45)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
                color: '#FFFFFF',
                padding: '16px 36px',
                borderRadius: '50px',
                fontSize: '16.5px',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(255, 90, 135, 0.35)',
                cursor: 'pointer',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Gift size={20} />
              <span>Mở món quà nhỏ</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                ✨
              </motion.span>
            </motion.button>

            {/* Audio notice reassurance */}
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
              <span>🎧 Nhạc chill lofi nhẹ nhàng sẽ tự động bật khi mở quà</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
