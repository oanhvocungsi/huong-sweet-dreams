import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, RotateCcw, Heart, Star, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

interface DessertTreat {
  id: string;
  name: string;
  badge: string;
  desc: string;
  emoji: string;
  color: string;
}

const TREATS: DessertTreat[] = [
  {
    id: 'cake',
    name: 'Strawberry Cloud Cake',
    badge: 'Ngọt Ngào 100%',
    desc: 'Mọi dự định sắp tới của Hương đều mềm mại và trọn vẹn như kem sữa tươi.',
    emoji: '🧁',
    color: '#FFE4ED',
  },
  {
    id: 'macaron',
    name: 'Rose Pastel Macaron',
    badge: 'An Yên & Thư Thái',
    desc: 'Gấp đôi sự kiên định, giảm 50% áp lực, ngày nào cũng nhẹ nhõm như mây xốp.',
    emoji: '🍬',
    color: '#EADCF8',
  },
  {
    id: 'tea',
    name: 'Peach Oolong Milk Tea',
    badge: 'Hợp Gu Tuyệt Đối',
    desc: 'Mọi thứ trong cuộc sống đều vừa vặn và dễ chịu, hệt như ly trà đúng lượng đường đá.',
    emoji: '🧋',
    color: '#FFE8D6',
  },
  {
    id: 'honey',
    name: 'Golden Honey Parfait',
    badge: 'May Mắn Toàn Diện',
    desc: 'Tài chính rủng rỉnh, đi đâu cũng gặp người tốt và luôn được thần may mắn mỉm cười.',
    emoji: '🍯',
    color: '#FFF3CD',
  },
];

export const DessertSurpriseBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTreat, setSelectedTreat] = useState<DessertTreat | null>(null);

  const handleOpenBox = () => {
    setIsOpen(true);
    soundEngine.playBoxOpen();

    // Multi-shot confetti burst with pastel colors
    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#FF5A87', '#FF9A76', '#F5B041', '#E8DFF5', '#FFFFFF'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleResetBox = () => {
    soundEngine.playClick();
    setIsOpen(false);
    setSelectedTreat(null);
  };

  const handleSelectTreat = (t: DessertTreat) => {
    soundEngine.playSparkle();
    setSelectedTreat(t);
  };

  return (
    <section
      id="surprise-box-section"
      style={{
        position: 'relative',
        padding: '90px 20px',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 180, 205, 0.5)',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#C72557',
            marginBottom: '16px',
          }}
        >
          <Gift size={15} color="#FF5A87" />
          <span>Hộp Quà Kỳ Diệu Của Hương</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 700,
            color: '#2A1728',
            marginBottom: '12px',
          }}
        >
          Mở Chiếc Hộp Patisserie Bí Mật
        </h2>

        <p style={{ fontSize: '15.5px', color: '#6B4D66', maxWidth: '540px', margin: '0 auto' }}>
          Chạm vào chiếc hộp quà thắt ruy băng dưới đây để mở ra món quà ngọt ngào và những đặc quyền dành riêng cho cậu hôm nay!
        </p>
      </div>

      {/* Main Interactive Gift Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '680px',
          margin: '0 auto',
          minHeight: '440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Gift Box Scene */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={handleOpenBox}
            >
              {/* Animated Gift Box Visual */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.96 }}
                className="glass-card-glow"
                style={{
                  width: '280px',
                  height: '240px',
                  borderRadius: '28px',
                  background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 50%, #FFD6E0 100%)',
                  border: '3px solid #FFF',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 25px 60px rgba(220, 90, 130, 0.25)',
                }}
              >
                {/* Horizontal Silk Ribbon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '36px',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(90deg, #F5B041 0%, #FFD700 50%, #F5B041 100%)',
                    boxShadow: '0 2px 10px rgba(212, 175, 55, 0.4)',
                  }}
                />

                {/* Vertical Silk Ribbon */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: '36px',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(180deg, #F5B041 0%, #FFD700 50%, #F5B041 100%)',
                    boxShadow: '0 2px 10px rgba(212, 175, 55, 0.4)',
                  }}
                />

                {/* Sparkling Bowknot */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    position: 'absolute',
                    top: '-25px',
                    zIndex: 10,
                    fontSize: '52px',
                    filter: 'drop-shadow(0 6px 12px rgba(212, 175, 55, 0.5))',
                  }}
                >
                  🎀
                </motion.div>

                {/* Center Tag */}
                <div
                  style={{
                    zIndex: 5,
                    padding: '8px 16px',
                    borderRadius: '50px',
                    background: '#FFFFFF',
                    border: '1.5px solid #FF85A1',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#C72557',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  Dành Cho Hương ✨
                </div>
              </motion.div>

              {/* Call to action instruction */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  marginTop: '32px',
                  padding: '14px 36px',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 700,
                  boxShadow: '0 8px 25px rgba(255, 90, 135, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Sparkles size={18} />
                <span>Chạm để mở hộp quà</span>
                <Heart size={16} fill="#FFF" />
              </motion.button>
            </motion.div>
          ) : (
            /* Opened Box & Revealed Surprise */
            <motion.div
              key="opened-box"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, type: 'spring', damping: 25 }}
              style={{ width: '100%' }}
            >
              <div
                className="glass-card-glow"
                style={{
                  padding: '36px 28px',
                  borderRadius: '32px',
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: '2px solid rgba(255, 180, 205, 0.6)',
                }}
              >
                {/* Top Success Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 18px',
                    borderRadius: '50px',
                    background: 'rgba(255, 230, 240, 0.9)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#C72557',
                    marginBottom: '20px',
                  }}
                >
                  <Star size={15} fill="#F5B041" color="#F5B041" />
                  <span>Bất Ngờ Đã Mở Ra!</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(24px, 4vw, 32px)',
                    fontWeight: 700,
                    color: '#2A1728',
                    marginBottom: '8px',
                  }}
                >
                  Bữa Tiệc Ngọt Ngào Dành Riêng Cho Hương 🍰
                </h3>

                <p style={{ fontSize: '15px', color: '#6B4D66', marginBottom: '28px' }}>
                  Hãy chọn một món bánh dưới đây để nhận thông điệp may mắn cho ngày 20/10 nhé:
                </p>

                {/* 4 Collectible Dessert Treats */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                    gap: '14px',
                    marginBottom: '32px',
                  }}
                >
                  {TREATS.map((treat) => (
                    <motion.div
                      key={treat.id}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelectTreat(treat)}
                      style={{
                        padding: '16px 12px',
                        borderRadius: '20px',
                        background: selectedTreat?.id === treat.id ? 'rgba(255, 90, 135, 0.15)' : treat.color,
                        border: selectedTreat?.id === treat.id ? '2px solid #FF5A87' : '1px solid rgba(255, 255, 255, 0.8)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
                        transition: 'border 0.2s',
                      }}
                    >
                      <span style={{ fontSize: '36px' }}>{treat.emoji}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#2A1728', textAlign: 'center' }}>
                        {treat.name}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#C72557',
                          background: 'rgba(255, 255, 255, 0.8)',
                          padding: '2px 8px',
                          borderRadius: '10px',
                        }}
                      >
                        {treat.badge}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Selected Treat Reveal Card */}
                {selectedTreat && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '18px 24px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #FFF0F5 0%, #FFFDF9 100%)',
                      border: '1.5px dashed #FF85A1',
                      marginBottom: '28px',
                      textAlign: 'left',
                    }}
                  >
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#FF5A87', marginBottom: '4px' }}>
                      ✨ Lời chúc từ {selectedTreat.name}:
                    </p>
                    <p style={{ fontSize: '15px', color: '#2A1728', fontWeight: 500 }}>
                      "{selectedTreat.desc}"
                    </p>
                  </motion.div>
                )}

                {/* Special VIP Privilege Card for Hương */}
                <div
                  style={{
                    padding: '24px',
                    borderRadius: '22px',
                    background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.9) 0%, rgba(255, 248, 235, 0.9) 100%)',
                    border: '1px solid rgba(255, 180, 205, 0.4)',
                    textAlign: 'left',
                    marginBottom: '28px',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#C72557',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Sparkles size={17} color="#FF5A87" />
                    Đặc Quyền Của Hương Trong Ngày 20/10:
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14.5px', color: '#4A2E46' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="#FF5A87" />
                      <span>Được phép ăn mọi món đồ ngọt yêu thích mà không cần bận tâm calo.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="#FF5A87" />
                      <span>Bật những bản nhạc chill remix cả ngày và thả lỏng tâm trí 100%.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="#FF5A87" />
                      <span>Được mọi người xung quanh yêu thương, nuông chiều và bao bọc hết mực!</span>
                    </div>
                  </div>
                </div>

                {/* Replay / Close Box Button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleResetBox}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '50px',
                    background: 'rgba(255, 255, 255, 0.85)',
                    border: '1.5px solid #FF85A1',
                    color: '#C72557',
                    fontSize: '14.5px',
                    fontWeight: 600,
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Đóng hộp & mở lại món quà</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
