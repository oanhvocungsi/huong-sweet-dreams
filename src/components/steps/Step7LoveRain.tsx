import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronRight } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Step7Props {
  onNext: () => void;
}

interface FallingPhoto {
  id: number;
  src: string;
  x: number; // percentage
  size: number;
  speed: number;
  rotationSpeed: number;
  rotation: number;
  y: number;
}

export const Step7LoveRain: React.FC<Step7Props> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cakeImgUrl = `${import.meta.env.BASE_URL}assets/cake-dream.jpg`;
  const huongImgUrl = `${import.meta.env.BASE_URL}assets/huong.jpg`;

  // Falling 3D Photos Simulation
  const photosRef = useRef<FallingPhoto[]>([
    { id: 1, src: huongImgUrl, x: 12, size: 110, speed: 1.1, rotationSpeed: 0.4, rotation: -8, y: -80 },
    { id: 2, src: cakeImgUrl, x: 38, size: 100, speed: 0.9, rotationSpeed: -0.3, rotation: 6, y: -220 },
    { id: 3, src: huongImgUrl, x: 65, size: 115, speed: 1.2, rotationSpeed: 0.5, rotation: 12, y: -120 },
    { id: 4, src: cakeImgUrl, x: 84, size: 95, speed: 0.85, rotationSpeed: -0.4, rotation: -10, y: -280 },
  ]);

  const photosContainerRef = useRef<HTMLDivElement | null>(null);

  // Background Falling Heart & Star Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Create 45 heart and star particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 4 + Math.random() * 8,
      speedY: 1 + Math.random() * 2.2,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: 0.3 + Math.random() * 0.6,
      isHeart: Math.random() > 0.4,
      hue: Math.random() > 0.5 ? 345 : 30, // pink or peach
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background ambient stars
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 75%, ${p.opacity})`;
        ctx.shadowColor = 'rgba(255, 100, 150, 0.4)';
        ctx.shadowBlur = 8;

        if (p.isHeart) {
          // Draw mini glowing heart
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-s / 2, -s / 2, -s, s / 3, 0, s);
          ctx.bezierCurveTo(s, s / 3, s / 2, -s / 2, 0, 0);
          ctx.fill();
        } else {
          // Draw diamond star
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Update falling 3D photos
      const container = photosContainerRef.current;
      if (container) {
        photosRef.current.forEach((photo) => {
          photo.y += photo.speed;
          photo.rotation += photo.rotationSpeed;

          if (photo.y > height + 100) {
            photo.y = -120;
          }

          const el = document.getElementById(`falling-photo-${photo.id}`);
          if (el) {
            el.style.transform = `translate3d(0, ${photo.y}px, 0) rotate(${photo.rotation}deg)`;
          }
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

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
        overflow: 'hidden',
      }}
    >
      {/* Background Starry & Heart Rain Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Falling 3D Memory Photos Layer */}
      <div
        ref={photosContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        {photosRef.current.map((p) => (
          <div
            id={`falling-photo-${p.id}`}
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: 0,
              width: `${p.size}px`,
              height: `${p.size * 1.15}px`,
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '6px',
              boxShadow: '0 16px 36px rgba(220, 90, 130, 0.28), 0 0 20px rgba(255, 182, 193, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
              willChange: 'transform',
            }}
          >
            <div
              style={{
                width: '100%',
                height: `${p.size * 0.9}px`,
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <img
                src={p.src}
                alt="Memory"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p
              style={{
                fontSize: '9px',
                fontWeight: 700,
                color: '#C72557',
                marginTop: '3px',
                textAlign: 'center',
              }}
            >
              Hương 💖 20/10
            </p>
          </div>
        ))}
      </div>

      {/* Center Cinematic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.7 }}
        className="glass-card-glow"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '560px',
          width: '100%',
          padding: '36px 28px',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '2px solid rgba(255, 200, 220, 0.85)',
          boxShadow: '0 25px 60px rgba(220, 90, 130, 0.22)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '50px',
            background: 'rgba(255, 230, 240, 0.9)',
            fontSize: '12.5px',
            fontWeight: 700,
            color: '#C72557',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={14} color="#FF5A87" />
          <span>Mưa Kỷ Niệm & Ngàn Sao 20/10</span>
          <Heart size={13} fill="#FF5A87" color="#FF5A87" />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 5vw, 36px)',
            fontWeight: 700,
            color: '#2A1728',
            lineHeight: 1.3,
            marginBottom: '12px',
          }}
        >
          Chúc Hương Ngày 20/10 Ngập Tràn{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF4572 0%, #FF8A5C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Yêu Thương & Vị Ngọt
          </span>{' '}
          🌸
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.65,
            color: '#6B4D66',
            marginBottom: '26px',
          }}
        >
          Những mảnh ghép kỷ niệm ngọt ngào và những nốt nhạc chill êm dịu nhất đều đang rơi nhẹ quanh Hương — như một lời nhắc rằng cậu luôn xứng đáng với những điều tuyệt vời nhất!
        </p>

        {/* CTA to Step 8 (Candle Ceremony) */}
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
            boxShadow: '0 8px 24px rgba(255, 90, 135, 0.4)',
            cursor: 'pointer',
          }}
        >
          <span>Thắp Nến Ước Nguyện 🕯️</span>
          <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
};
