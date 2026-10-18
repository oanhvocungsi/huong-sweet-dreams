import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Coffee, Music2, Smile, ChevronRight } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Step3Props {
  onNext: () => void;
}

export const Step3HuongLetter: React.FC<Step3Props> = ({ onNext }) => {
  const huongImgUrl = `${import.meta.env.BASE_URL}assets/huong.jpg`;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSparkle();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 25,
      spread: 70,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: ['#FF5A87', '#FF9A76', '#FFF', '#F5B041'],
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '880px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        {/* Left: Polaroid Frame with Huong's Photo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="glass-card-glow"
            style={{
              position: 'relative',
              background: '#FFFFFF',
              padding: '14px 14px 18px',
              borderRadius: '20px',
              boxShadow: '0 20px 48px rgba(184, 69, 102, 0.16)',
              transform: 'rotate(-1.5deg)',
              maxWidth: '340px',
              width: '100%',
            }}
          >
            {/* Gold Corner Clip */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                right: '24px',
                width: '32px',
                height: '12px',
                background: 'linear-gradient(135deg, #F5B041 0%, #D4AF37 100%)',
                borderRadius: '4px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            />

            <div
              style={{
                width: '100%',
                height: 'clamp(260px, 36vh, 340px)',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#FFF5F7',
              }}
            >
              <img
                src={huongImgUrl}
                alt="Chân dung Hương"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div
              style={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingInline: '6px',
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-script)', fontSize: '22px', fontWeight: 700, color: '#C72557' }}>
                  Hương xinh xắn
                </p>
                <p style={{ fontSize: '11px', color: '#9F7A99', fontWeight: 600 }}>
                  20.10 • Vietnamese Women's Day
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleHeartClick}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(255, 230, 240, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF5A87',
                  border: '1px solid rgba(255, 160, 190, 0.4)',
                  cursor: 'pointer',
                }}
                title="Bấm để thả tim cho Hương!"
              >
                <Heart size={16} fill="#FF5A87" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right: The Letter */}
        <div
          className="glass-card"
          style={{
            padding: '26px 24px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.92)',
            boxShadow: '0 12px 36px rgba(220, 100, 140, 0.08)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '50px',
              background: 'rgba(255, 230, 240, 0.8)',
              fontSize: '12px',
              fontWeight: 700,
              color: '#C72557',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={13} color="#FF5A87" />
            <span>Thư Gửi Ngày 20/10</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 3.5vw, 28px)',
              fontWeight: 700,
              color: '#2A1728',
              lineHeight: 1.25,
              marginBottom: '14px',
            }}
          >
            Gửi một ngày thật dịu êm đến{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF4572 0%, #FF8A5C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hương
            </span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#4A2E46', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Coffee size={16} color="#FF5A87" style={{ marginTop: '3px', flexShrink: 0 }} />
              <p><strong>Vị ngọt vừa vặn:</strong> Mong mỗi chiếc bánh kem cậu chọn đều mềm xốp tan ngay đầu lưỡi, và đồ ngọt cậu thích không bao giờ làm cậu lo tăng cân!</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Music2 size={16} color="#FF8A5C" style={{ marginTop: '3px', flexShrink: 0 }} />
              <p><strong>Giai điệu êm đềm:</strong> Mong playlist của Hương luôn chọn đúng bài hát cậu thích vào những buổi hoàng hôn để mọi mệt mỏi đều dịu lại.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Smile size={16} color="#C69A20" style={{ marginTop: '3px', flexShrink: 0 }} />
              <p><strong>Nụ cười rạng rỡ:</strong> Chúc Hương luôn tự tin, xinh đẹp theo cách riêng và mỗi ngày đều có lý do ngọt ngào để mỉm cười.</p>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.playSparkle();
                onNext();
              }}
              style={{
                padding: '12px 28px',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
                color: '#FFFFFF',
                fontSize: '14.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(255, 90, 135, 0.35)',
                cursor: 'pointer',
              }}
            >
              <span>Nhận Hộp Quà Bí Mật</span>
              <ChevronRight size={17} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
