import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface FloatingSweetProps {
  emoji: string;
  name: string;
  top: string;
  left?: string;
  right?: string;
  delay: number;
}

const FloatingSweet: React.FC<FloatingSweetProps> = ({ emoji, name, top, left, right, delay }) => {
  const handleClick = (e: React.MouseEvent) => {
    soundEngine.playSparkle();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 15,
      spread: 60,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: ['#FF85A1', '#FFDAC1', '#FFF', '#F5B041', '#E8DFF5'],
      ticks: 120,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, type: 'spring' }}
      whileHover={{ scale: 1.25, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      title={`${name} (Bấm vào để nổ kẹo!)`}
      style={{
        position: 'absolute',
        top,
        left,
        right,
        cursor: 'pointer',
        fontSize: '28px',
        padding: '10px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 20px rgba(220, 100, 140, 0.14)',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        zIndex: 10,
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="animate-float"
    >
      <span>{emoji}</span>
    </motion.div>
  );
};

export const HeroScene: React.FC = () => {
  const cakeImgUrl = `${import.meta.env.BASE_URL}assets/cake-dream.jpg`;

  const scrollToSection = (id: string) => {
    soundEngine.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-scene"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px 60px',
        overflow: 'hidden',
      }}
    >
      {/* Background Soft Pastel Clouds */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90vw',
          maxWidth: '1100px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(255, 220, 235, 0.6) 0%, rgba(255, 240, 225, 0.4) 45%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Floating Confections Decor */}
      <FloatingSweet emoji="🧁" name="Cupcake Dâu Mọng" top="18%" left="8%" delay={0.4} />
      <FloatingSweet emoji="🍬" name="Kẹo Bông Ngọt Lịm" top="35%" left="4%" delay={0.6} />
      <FloatingSweet emoji="🍓" name="Dâu Tây Tươi" top="75%" left="9%" delay={0.8} />
      <FloatingSweet emoji="🍩" name="Donut Kem Bơ" top="16%" right="8%" delay={0.5} />
      <FloatingSweet emoji="✨" name="Bụi Sao Lấp Lánh" top="42%" right="5%" delay={0.7} />
      <FloatingSweet emoji="🧋" name="Trà Sữa Full Topping" top="76%" right="9%" delay={0.9} />

      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1080px',
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Top Celebration Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 22px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 180, 205, 0.5)',
            boxShadow: '0 6px 18px rgba(220, 90, 130, 0.08)',
            marginBottom: '28px',
          }}
        >
          <Sparkles size={16} color="#FF5A87" />
          <span
            style={{
              fontSize: '13.5px',
              fontWeight: 700,
              color: '#C72557',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Món Quà Kỷ Niệm 20 Tháng 10
          </span>
          <Heart size={14} fill="#FF5A87" color="#FF5A87" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(38px, 8vw, 68px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#2A1728',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          Hương's Sweet{' '}
          <span
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '1.25em',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FF4572 0%, #FF8A5C 50%, #F5B041 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              paddingInline: '6px',
            }}
          >
            Dreams
          </span>
        </motion.h1>

        {/* Subtitle / Personal Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontSize: 'clamp(16px, 2.5vw, 19px)',
            color: '#6B4D66',
            lineHeight: 1.65,
            maxWidth: '680px',
            margin: '0 auto 36px',
          }}
        >
          Gửi tới <strong>Hương</strong> — cô gái yêu đồ ngọt và mê những bản chill remix. Hôm nay, một góc thế giới ngọt lành được dựng riêng để cậu thư giãn, mỉm cười và đón nhận những điều dịu dàng nhất.
        </motion.p>

        {/* Cake Showcase Centerpiece Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          style={{
            position: 'relative',
            maxWidth: '640px',
            margin: '0 auto 40px',
            borderRadius: '32px',
            padding: '16px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 245, 0.8))',
            border: '2px solid rgba(255, 210, 225, 0.7)',
            boxShadow: '0 25px 60px rgba(220, 100, 140, 0.16), 0 0 50px rgba(255, 180, 205, 0.25)',
          }}
        >
          {/* Top Label */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
              color: '#FFF',
              padding: '6px 20px',
              borderRadius: '50px',
              fontSize: '12.5px',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(255, 90, 135, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>🎂 Chiếc Bánh Giấc Mơ Của Hương</span>
          </div>

          {/* Actual Cake Image */}
          <div
            style={{
              width: '100%',
              height: 'clamp(280px, 42vw, 420px)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={cakeImgUrl}
              alt="Hương's Sweet Dreams Pastel Cake"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = 'scale(1.0)')}
            />

            {/* Subtle Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 20px 16px',
                background: 'linear-gradient(to top, rgba(42, 23, 40, 0.75) 0%, transparent 100%)',
                color: '#FFF',
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#FFD2BC', marginBottom: '2px' }}>
                SUGAR DREAMS EDITION • 20.10
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Bánh Kem Mây Bồng Bềnh & Macaron Cầu Vồng
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('greeting-section')}
            style={{
              padding: '14px 32px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
              color: '#FFFFFF',
              fontSize: '15.5px',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(255, 90, 135, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>Đọc Thư Gửi Hương</span>
            <span>💌</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('surprise-box-section')}
            style={{
              padding: '14px 28px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#C72557',
              border: '1.5px solid rgba(255, 160, 190, 0.6)',
              fontSize: '15.5px',
              fontWeight: 600,
              boxShadow: '0 6px 18px rgba(220, 90, 130, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>Mở Hộp Quà Bí Mật</span>
            <span>🎁</span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          onClick={() => scrollToSection('greeting-section')}
          style={{
            marginTop: '50px',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: '#9F7A99',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          <span>Cuộn xuống để khám phá tiếp</span>
          <ChevronDown size={18} color="#FF5A87" />
        </motion.div>
      </div>
    </section>
  );
};
