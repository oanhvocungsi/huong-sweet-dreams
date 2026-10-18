import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Coffee, Music2, Smile } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const GreetingEditorial: React.FC = () => {
  const huongImgUrl = `${import.meta.env.BASE_URL}assets/huong.jpg`;

  return (
    <section
      id="greeting-section"
      style={{
        position: 'relative',
        padding: '90px 20px',
        maxWidth: '1120px',
        margin: '0 auto',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Hương's Portrait in Luxury Editorial Polaroid */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Subtle Warm Halo Background */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(255, 218, 185, 0.5) 0%, rgba(255, 182, 193, 0.3) 60%, transparent 80%)',
              filter: 'blur(30px)',
              zIndex: 1,
            }}
          />

          {/* Polaroid Frame */}
          <div
            className="glass-card-glow"
            style={{
              position: 'relative',
              zIndex: 2,
              background: '#FFFFFF',
              padding: '18px 18px 24px',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(184, 69, 102, 0.16), 0 0 35px rgba(255, 182, 193, 0.3)',
              transform: 'rotate(-2deg)',
              transition: 'transform 0.4s ease',
              maxWidth: '420px',
              width: '100%',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) scale(1.02)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'rotate(-2deg) scale(1)')}
          >
            {/* Gold Corner Clip */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                right: '30px',
                width: '38px',
                height: '14px',
                background: 'linear-gradient(135deg, #F5B041 0%, #D4AF37 100%)',
                borderRadius: '4px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            />

            {/* Photo Container */}
            <div
              style={{
                width: '100%',
                height: '420px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#FFF5F7',
              }}
            >
              <img
                src={huongImgUrl}
                alt="Chân dung Hương"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Soft Warm Film Tint */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(255, 235, 240, 0.05) 0%, rgba(255, 180, 205, 0.15) 100%)',
                  mixBlendMode: 'soft-light',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Polaroid Bottom Caption */}
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingInline: '8px',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#C72557',
                    lineHeight: 1.1,
                  }}
                >
                  Hương xinh xắn
                </p>
                <p style={{ fontSize: '11px', color: '#9F7A99', fontWeight: 600 }}>
                  October 20 • Happy Vietnamese Women's Day
                </p>
              </div>

              <div
                onClick={() => soundEngine.playSparkle()}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 230, 240, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF5A87',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 160, 190, 0.4)',
                }}
                title="Bấm để bắn tim!"
              >
                <Heart size={18} fill="#FF5A87" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Natural, Heartwarming Letter to Hương */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.2 }}
        >
          {/* Section Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(255, 180, 205, 0.5)',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#C72557',
              marginBottom: '18px',
            }}
          >
            <Sparkles size={14} color="#FF5A87" />
            <span>Thư Gửi Ngày 20/10</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 5vw, 42px)',
              fontWeight: 700,
              color: '#2A1728',
              lineHeight: 1.25,
              marginBottom: '22px',
            }}
          >
            Gửi một ngày dịu êm nhất đến{' '}
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

          <div
            className="glass-card"
            style={{
              padding: '28px',
              borderRadius: '24px',
              fontSize: '15.5px',
              lineHeight: 1.8,
              color: '#4A2E46',
              boxShadow: '0 12px 35px rgba(220, 100, 140, 0.08)',
              position: 'relative',
            }}
          >
            <p style={{ marginBottom: '16px' }}>
              <strong>Chào Hương,</strong>
            </p>
            <p style={{ marginBottom: '16px' }}>
              Ngày 20/10, người ta thường dành tặng nhau những lời chúc thật trang trọng và hoa mỹ. Nhưng với một cô gái yêu đồ ngọt, thích sự êm ả của những giai điệu chill remix và luôn tỏa ra nguồn năng lượng dễ thương như cậu, tớ tin những điều giản dị và ngọt lành nhất mới là điều Hương xứng đáng nhận được:
            </p>

            {/* List of 3 genuine wishes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    background: 'rgba(255, 90, 135, 0.12)',
                    color: '#FF5A87',
                    marginTop: '2px',
                  }}
                >
                  <Coffee size={18} />
                </div>
                <p style={{ fontSize: '15px' }}>
                  <strong>Vị ngọt vừa vặn:</strong> Mong rằng mỗi ly trà sữa cậu uống đều đậm vị béo ngậy, chiếc bánh kem cậu chọn luôn mềm xốp tan ngay đầu lưỡi, và đồ ngọt cậu thích sẽ chẳng bao giờ làm cậu tăng cân!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    background: 'rgba(255, 138, 92, 0.12)',
                    color: '#FF8A5C',
                    marginTop: '2px',
                  }}
                >
                  <Music2 size={18} />
                </div>
                <p style={{ fontSize: '15px' }}>
                  <strong>Giai điệu êm đềm:</strong> Mong playlist của Hương luôn chọn đúng bài hát cậu thích vào những buổi chiều hoàng hôn tan ca, để mọi áp lực hay mệt mỏi đều dịu lại thành một nốt nhạc thư thái.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    background: 'rgba(247, 200, 68, 0.2)',
                    color: '#C69A20',
                    marginTop: '2px',
                  }}
                >
                  <Smile size={18} />
                </div>
                <p style={{ fontSize: '15px' }}>
                  <strong>Nụ cười rạng rỡ:</strong> Chúc Hương luôn tự tin, luôn xinh đẹp theo cách riêng của mình, và mỗi ngày bước ra đường đều có ít nhất một lý do ngọt lịm để nở nụ cười thật tươi.
                </p>
              </div>
            </div>

            <p style={{ fontStyle: 'italic', color: '#6B4D66', borderTop: '1px dashed rgba(255, 180, 205, 0.5)', paddingTop: '16px' }}>
              "Hạnh phúc đôi khi không cần quá lớn lao, chỉ cần vừa vặn như một chiếc macaron dâu tây và một bản nhạc êm dịu."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
