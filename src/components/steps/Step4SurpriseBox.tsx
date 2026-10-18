import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Star, CheckCircle, ChevronRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/soundEngine';

interface Step4Props {
  onNext: () => void;
}

interface DessertTreat {
  id: string;
  name: string;
  badge: string;
  desc: string;
  emoji: string;
  color: string;
}

const TREATS: DessertTreat[] = [
  { id: 'cake', name: 'Strawberry Cake', badge: 'Ngọt Ngào 100%', desc: 'Mọi dự định của Hương đều trọn vẹn và mềm mịn như kem sữa tươi.', emoji: '🧁', color: '#FFE4ED' },
  { id: 'macaron', name: 'Rose Macaron', badge: 'An Yên Thư Thái', desc: 'Gấp đôi sự kiên định, giảm 50% áp lực, ngày nào cũng nhẹ nhõm như mây xốp.', emoji: '🍬', color: '#EADCF8' },
  { id: 'tea', name: 'Peach Milk Tea', badge: 'Hợp Gu Tuyệt Đối', desc: 'Mọi thứ trong đời đều vừa vặn và dễ chịu như ly trà đúng lượng đường đá.', emoji: '🧋', color: '#FFE8D6' },
  { id: 'honey', name: 'Honey Parfait', badge: 'May Mắn Toàn Diện', desc: 'Tài chính rủng rỉnh, đi đâu cũng gặp người tốt và luôn được thần may mắn mỉm cười.', emoji: '🍯', color: '#FFF3CD' },
];

export const Step4SurpriseBox: React.FC<Step4Props> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTreat, setSelectedTreat] = useState<DessertTreat | null>(null);

  const handleOpenBox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
    soundEngine.playBoxOpen();

    const count = 180;
    const defaults = { origin: { y: 0.65 }, colors: ['#FF5A87', '#FF9A76', '#F5B041', '#E8DFF5', '#FFFFFF'] };
    confetti({ ...defaults, particleCount: Math.floor(count * 0.4), spread: 60 });
    confetti({ ...defaults, particleCount: Math.floor(count * 0.6), spread: 100, scalar: 1.1 });
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
      <div style={{ maxWidth: '680px', width: '100%', margin: 'auto' }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Box State */
            <motion.div
              key="closed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={handleOpenBox}
            >
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
                  marginBottom: '16px',
                }}
              >
                <Gift size={15} color="#FF5A87" />
                <span>Hộp Quà Patisserie Bí Mật</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(26px, 4.5vw, 36px)',
                  fontWeight: 700,
                  color: '#2A1728',
                  marginBottom: '8px',
                }}
              >
                Hương ơi, hãy chạm để mở hộp quà!
              </h2>

              <p style={{ fontSize: '14.5px', color: '#6B4D66', marginBottom: '28px' }}>
                Một món quà ngọt ngào và những đặc quyền đặc biệt đang nằm bên trong.
              </p>

              {/* 3D Box Visual */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card-glow"
                style={{
                  width: '260px',
                  height: '220px',
                  borderRadius: '26px',
                  background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 50%, #FFD6E0 100%)',
                  border: '3px solid #FFF',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 25px 60px rgba(220, 90, 130, 0.25)',
                  cursor: 'pointer',
                }}
              >
                {/* Horizontal Ribbon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '34px',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(90deg, #F5B041 0%, #FFD700 50%, #F5B041 100%)',
                  }}
                />
                {/* Vertical Ribbon */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: '34px',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(180deg, #F5B041 0%, #FFD700 50%, #F5B041 100%)',
                  }}
                />

                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ position: 'absolute', top: '-24px', zIndex: 10, fontSize: '48px' }}
                >
                  🎀
                </motion.div>

                <div
                  style={{
                    zIndex: 5,
                    padding: '6px 16px',
                    borderRadius: '50px',
                    background: '#FFFFFF',
                    border: '1.5px solid #FF85A1',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#C72557',
                  }}
                >
                  Dành Cho Hương ✨
                </div>
              </motion.div>

              <p style={{ marginTop: '24px', fontSize: '13px', color: '#9F7A99', fontWeight: 600 }}>
                👆 Chạm vào hộp quà để mở
              </p>
            </motion.div>
          ) : (
            /* Opened Box Surprise State */
            <motion.div
              key="opened"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="glass-card-glow"
              style={{
                padding: '28px 24px',
                borderRadius: '28px',
                background: 'rgba(255, 255, 255, 0.94)',
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
                  background: 'rgba(255, 230, 240, 0.9)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#C72557',
                  marginBottom: '12px',
                }}
              >
                <Star size={14} fill="#F5B041" color="#F5B041" />
                <span>Bất Ngờ Đã Mở Ra!</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(22px, 3.8vw, 28px)',
                  fontWeight: 700,
                  color: '#2A1728',
                  marginBottom: '6px',
                }}
              >
                Bữa Tiệc Bánh Ngọt Cho Hương 🍰
              </h3>

              <p style={{ fontSize: '13.5px', color: '#6B4D66', marginBottom: '18px' }}>
                Chọn một món bánh yêu thích để nhận thông điệp may mắn:
              </p>

              {/* 4 Treats Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                {TREATS.map((t) => (
                  <motion.div
                    key={t.id}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      soundEngine.playSparkle();
                      setSelectedTreat(t);
                    }}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '16px',
                      background: selectedTreat?.id === t.id ? 'rgba(255, 90, 135, 0.15)' : t.color,
                      border: selectedTreat?.id === t.id ? '2px solid #FF5A87' : '1px solid rgba(255, 255, 255, 0.8)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>{t.emoji}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#2A1728' }}>{t.name}</span>
                    <span style={{ fontSize: '10px', color: '#C72557', background: 'rgba(255,255,255,0.85)', padding: '2px 6px', borderRadius: '8px' }}>
                      {t.badge}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Selected Treat Notice */}
              {selectedTreat && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: '#FFF0F5',
                    border: '1px dashed #FF85A1',
                    marginBottom: '16px',
                    textAlign: 'left',
                    fontSize: '13.5px',
                  }}
                >
                  <p style={{ fontWeight: 700, color: '#FF5A87' }}>✨ Lời chúc từ {selectedTreat.name}:</p>
                  <p style={{ color: '#2A1728' }}>"{selectedTreat.desc}"</p>
                </motion.div>
              )}

              {/* VIP Privileges */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(255, 240, 245, 0.85)',
                  textAlign: 'left',
                  fontSize: '13px',
                  marginBottom: '22px',
                }}
              >
                <p style={{ fontWeight: 700, color: '#C72557', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="#FF5A87" /> Đặc Quyền Của Hương Hôm Nay:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#4A2E46' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} color="#FF5A87" /> Ăn đồ ngọt thỏa thích không lo calo</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} color="#FF5A87" /> Nghe nhạc chill cả ngày không ai làm phiền</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} color="#FF5A87" /> Được mọi người yêu thương và nuông chiều hết nấc!</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '50px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1.5px solid #FF85A1',
                    color: '#C72557',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Đóng hộp</span>
                </button>

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
                    boxShadow: '0 6px 18px rgba(255, 90, 135, 0.35)',
                    cursor: 'pointer',
                  }}
                >
                  <span>Gắp Kẹo May Mắn</span>
                  <ChevronRight size={17} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
