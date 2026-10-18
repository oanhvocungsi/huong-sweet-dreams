import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dices, Copy, Check, ChevronRight } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Step5Props {
  onNext: () => void;
}

interface SweetWish {
  id: number;
  flavor: string;
  emoji: string;
  color: string;
  content: string;
  sub: string;
}

const SWEET_WISHES: SweetWish[] = [
  { id: 1, flavor: 'Dâu Tây Ngọt Dịu', emoji: '🍓', color: '#FFE3EC', content: 'Hương ơi, nụ cười của cậu mang chỉ số ngọt ngào vượt mức cho phép rồi đấy! Cứ tiếp tục rạng rỡ như thế nhé.', sub: 'Vị ngọt tự nhiên • 100% vitamin vui vẻ' },
  { id: 2, flavor: 'Trà Sữa Khoai Môn', emoji: '🧋', color: '#EADCF8', content: 'Mong hôm nay mọi deadline và áp lực tự động bật chế độ "Do Not Disturb" để Hương thong thả tận hưởng trọn vẹn 24 giờ.', sub: 'Full trân châu đen • Êm dịu tâm trí' },
  { id: 3, flavor: 'Bánh Mì Bơ Tỏi Nướng', emoji: '🥐', color: '#FFEACB', content: 'Chúc Hương gặp được những con người chân thành, uống được những ly nước vừa ý và luôn có một ngày nhẹ nhõm.', sub: 'Giòn rụm bên ngoài • Ấm áp bên trong' },
  { id: 4, flavor: 'Kẹo Dẻo Cầu Vồng', emoji: '🍬', color: '#D8F3DC', content: 'Cậu xứng đáng với tất cả những điều dịu dàng nhất trên thế giới này — hệt như hương vị chiếc bánh vừa mới ra lò.', sub: 'May mắn bất ngờ • Ngọt ngào lan tỏa' },
  { id: 5, flavor: 'Kem Vani Hạt Dẻ', emoji: '🍨', color: '#FFF3CD', content: 'Chúc số dư tài khoản của Hương tăng trưởng ngọt ngào và dồi dào hệt như lượng topping trong ly nước cậu thích!', sub: 'Tài chính rực rỡ • Vạn sự như ý' },
  { id: 6, flavor: 'Socola Hạnh Nhân', emoji: '🍫', color: '#EED9C4', content: 'Nếu có lúc nào mệt mỏi, Hương hãy cứ bật một bản lofi chill, tự thưởng cho mình một món ngon — cậu đã làm rất tốt rồi.', sub: 'Đậm đà năng lượng • Bình yên trong tim' },
  { id: 7, flavor: 'Macaron Hoa Hồng', emoji: '🌸', color: '#FFD6E0', content: 'Chúc Hương luôn giữ được nét đáng yêu riêng biệt, không cần phải chạy theo tiêu chuẩn của ai, vì chính cậu đã là một phiên bản tuyệt vời.', sub: 'Dịu dàng tỏa hương • Kiêu hãnh rạng ngời' },
  { id: 8, flavor: 'Pudding Xoài Mềm Mịn', emoji: '🍮', color: '#FFF0C2', content: 'Mong đường về nhà hôm nay của Hương không kẹt xe, gió thu mát rượi và hoàng hôn buông xuống đẹp như tranh vẽ.', sub: 'Thảnh thơi từng bước • Bình an trọn vẹn' },
  { id: 9, flavor: 'Bánh Kem Bắp Thơm Lừng', emoji: '🍰', color: '#FFF6E0', content: 'Chúc mọi mong ước nhỏ xíu mà Hương thầm nghĩ trong đầu hôm nay đều sẽ thành hiện thực một cách thần kỳ nhất!', sub: 'Phép màu giản đơn • Hạnh phúc tròn đầy' },
  { id: 10, flavor: 'Sữa Chua Trái Cây', emoji: '🍧', color: '#E2F0CB', content: 'Chúc Hương có những giấc ngủ thật sâu, không mộng mị, và mỗi sớm mai thức dậy đều tràn đầy cảm hứng mới.', sub: 'Thanh mát tinh thần • Tràn đầy sức sống' },
  { id: 11, flavor: 'Kẹo Mút Trăng Sao', emoji: '🍭', color: '#FDE2E4', content: 'Hương cứ an tâm làm những điều mình thích, vì sự chăm chỉ và trái tim chân thành của cậu sẽ được đền đáp xứng đáng.', sub: 'Tỏa sáng lấp lánh • Tự tin dẫn lối' },
  { id: 12, flavor: 'Meringue Mây Bồng', emoji: '☁️', color: '#E0FAFF', content: '20/10 chúc Hương một ngày ngập tràn hoa, quà và nụ cười không bao giờ tắt trên môi!', sub: 'Đặc quyền công chúa • Yêu thương ngập tràn' },
];

export const Step5SweetnessMachine: React.FC<Step5Props> = ({ onNext }) => {
  const [currentWish, setCurrentWish] = useState<SweetWish>(SWEET_WISHES[0]);
  const [collectedIds, setCollectedIds] = useState<Set<number>>(new Set([1]));
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDispense = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpinning) return;
    setIsSpinning(true);
    soundEngine.playBubblePop();

    setTimeout(() => {
      let nextWish: SweetWish;
      do {
        const randomIndex = Math.floor(Math.random() * SWEET_WISHES.length);
        nextWish = SWEET_WISHES[randomIndex];
      } while (nextWish.id === currentWish.id && SWEET_WISHES.length > 1);

      setCurrentWish(nextWish);
      setCollectedIds((prev) => new Set(prev).add(nextWish.id));
      setIsSpinning(false);
      soundEngine.playSparkle();
    }, 550);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    navigator.clipboard.writeText(`"${currentWish.content}" — Gửi Hương 20/10 🌸`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        transition={{ duration: 0.6 }}
        className="glass-card-glow"
        style={{
          maxWidth: '580px',
          width: '100%',
          padding: '28px 24px',
          borderRadius: '28px',
          background: 'rgba(255, 255, 255, 0.94)',
          margin: 'auto',
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
            marginBottom: '10px',
          }}
        >
          <Sparkles size={13} color="#FF5A87" />
          <span>Gắp Kẹo May Mắn Cho Hương</span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(22px, 3.8vw, 30px)',
            fontWeight: 700,
            color: '#2A1728',
            marginBottom: '4px',
          }}
        >
          Máy Phát Vị Ngọt Tự Động 🍬
        </h3>

        {/* Counter Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9F7A99', fontWeight: 600, marginBottom: '16px' }}>
          <span>Đã khám phá {collectedIds.size}/{SWEET_WISHES.length} vị ngọt kẹo</span>
        </div>

        {/* Capsule Stage */}
        <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
          <motion.div
            animate={isSpinning ? { rotate: [0, 360, 720], scale: [1, 1.25, 1] } : { y: [0, -6, 0] }}
            transition={isSpinning ? { duration: 0.55 } : { repeat: Infinity, duration: 2.5 }}
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, #FFF, ${currentWish.color})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '38px',
              boxShadow: '0 10px 24px rgba(220, 90, 130, 0.22)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
            }}
          >
            <span>{currentWish.emoji}</span>
          </motion.div>
        </div>

        {/* Revealed Wish */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWish.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            style={{
              padding: '18px 16px',
              borderRadius: '20px',
              background: currentWish.color,
              border: '1.5px solid rgba(255, 255, 255, 0.9)',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#C72557', background: 'rgba(255, 255, 255, 0.85)', padding: '3px 12px', borderRadius: '50px', display: 'inline-block', marginBottom: '8px' }}>
              Vị: {currentWish.flavor}
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16.5px', fontWeight: 600, color: '#2A1728', lineHeight: 1.5, marginBottom: '6px' }}>
              "{currentWish.content}"
            </p>
            <p style={{ fontSize: '11.5px', color: '#6B4D66' }}>{currentWish.sub}</p>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDispense}
            disabled={isSpinning}
            style={{
              padding: '12px 22px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid #FF85A1',
              color: '#C72557',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Dices size={16} />
            <span>{isSpinning ? 'Đang quay...' : 'Gắp viên kẹo khác'}</span>
          </motion.button>

          <button
            onClick={handleCopy}
            style={{
              padding: '12px 18px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(255, 160, 190, 0.5)',
              color: '#6B4D66',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {copied ? <Check size={14} color="#2ECC71" /> : <Copy size={14} />}
            <span>{copied ? 'Đã sao chép!' : 'Lưu lại'}</span>
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
              padding: '12px 26px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 6px 18px rgba(255, 90, 135, 0.35)',
              cursor: 'pointer',
            }}
          >
            <span>Phòng Nhạc Chill Beats</span>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
