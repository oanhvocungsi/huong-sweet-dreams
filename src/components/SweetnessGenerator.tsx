import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Dices } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface SweetWish {
  id: number;
  flavor: string;
  emoji: string;
  color: string;
  content: string;
  sub: string;
}

const SWEET_WISHES: SweetWish[] = [
  {
    id: 1,
    flavor: 'Dâu Tây Ngọt Dịu',
    emoji: '🍓',
    color: '#FFE3EC',
    content: 'Hương ơi, nụ cười của cậu mang chỉ số ngọt ngào vượt mức cho phép rồi đấy! Cứ tiếp tục rạng rỡ như thế nhé.',
    sub: 'Vị ngọt tự nhiên • 100% vitamin vui vẻ',
  },
  {
    id: 2,
    flavor: 'Trà Sữa Khoai Môn',
    emoji: '🧋',
    color: '#EADCF8',
    content: 'Mong hôm nay mọi deadline và áp lực tự động bật chế độ "Do Not Disturb" để Hương thong thả tận hưởng trọn vẹn 24 giờ.',
    sub: 'Full trân châu đen • Êm dịu tâm trí',
  },
  {
    id: 3,
    flavor: 'Bánh Mì Bơ Tỏi Nướng',
    emoji: '🥐',
    color: '#FFEACB',
    content: 'Chúc Hương gặp được những con người chân thành, uống được những ly nước vừa ý và luôn có một ngày nhẹ nhõm.',
    sub: 'Giòn rụm bên ngoài • Ấm áp bên trong',
  },
  {
    id: 4,
    flavor: 'Kẹo Dẻo Cầu Vồng',
    emoji: '🍬',
    color: '#D8F3DC',
    content: 'Cậu xứng đáng với tất cả những điều dịu dàng nhất trên thế giới này — hệt như hương vị chiếc bánh vừa mới ra lò.',
    sub: 'May mắn bất ngờ • Ngọt ngào lan tỏa',
  },
  {
    id: 5,
    flavor: 'Kem Vani Hạt Dẻ',
    emoji: '🍨',
    color: '#FFF3CD',
    content: 'Chúc số dư tài khoản của Hương tăng trưởng ngọt ngào và dồi dào hệt như lượng topping trong ly nước cậu thích!',
    sub: 'Tài chính rực rỡ • Vạn sự như ý',
  },
  {
    id: 6,
    flavor: 'Socola Hạnh Nhân',
    emoji: '🍫',
    color: '#EED9C4',
    content: 'Nếu có lúc nào mệt mỏi, Hương hãy cứ bật một bản lofi chill, tự thưởng cho mình một món ngon — cậu đã làm rất tốt rồi.',
    sub: 'Đậm đà năng lượng • Bình yên trong tim',
  },
  {
    id: 7,
    flavor: 'Macaron Hoa Hồng',
    emoji: '🌸',
    color: '#FFD6E0',
    content: 'Chúc Hương luôn giữ được nét đáng yêu riêng biệt, không cần phải chạy theo tiêu chuẩn của ai, vì chính cậu đã là một phiên bản tuyệt vời.',
    sub: 'Dịu dàng tỏa hương • Kiêu hãnh rạng ngời',
  },
  {
    id: 8,
    flavor: 'Pudding Xoài Mềm Mịn',
    emoji: '🍮',
    color: '#FFF0C2',
    content: 'Mong đường về nhà hôm nay của Hương không kẹt xe, gió thu mát rượi và hoàng hôn buông xuống đẹp như tranh vẽ.',
    sub: 'Thảnh thơi từng bước • Bình an trọn vẹn',
  },
  {
    id: 9,
    flavor: 'Bánh Kem Bắp Thơm Lừng',
    emoji: '🍰',
    color: '#FFF6E0',
    content: 'Chúc mọi mong ước nhỏ xíu mà Hương thầm nghĩ trong đầu hôm nay đều sẽ thành hiện thực một cách thần kỳ nhất!',
    sub: 'Phép màu giản đơn • Hạnh phúc tròn đầy',
  },
  {
    id: 10,
    flavor: 'Sữa Chua Trái Cây Tuyết',
    emoji: '🍧',
    color: '#E2F0CB',
    content: 'Chúc Hương có những giấc ngủ thật sâu, không mộng mị, và mỗi sớm mai thức dậy đều tràn đầy cảm hứng mới.',
    sub: 'Thanh mát tinh thần • Tràn đầy sức sống',
  },
  {
    id: 11,
    flavor: 'Kẹo Mút Trăng Sao',
    emoji: '🍭',
    color: '#FDE2E4',
    content: 'Hương cứ an tâm làm những điều mình thích, vì sự chăm chỉ và trái tim chân thành của cậu sẽ được đền đáp xứng đáng.',
    sub: 'Tỏa sáng lấp lánh • Tự tin dẫn lối',
  },
  {
    id: 12,
    flavor: 'Bánh Meringue Mây Bồng',
    emoji: '☁️',
    color: '#E0FAFF',
    content: '20/10 chúc Hương một ngày ngập tràn hoa, quà và nụ cười không bao giờ tắt trên môi!',
    sub: 'Đặc quyền công chúa • Yêu thương ngập tràn',
  },
];

export const SweetnessGenerator: React.FC = () => {
  const [currentWish, setCurrentWish] = useState<SweetWish>(SWEET_WISHES[0]);
  const [collectedIds, setCollectedIds] = useState<Set<number>>(new Set([1]));
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDispense = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    soundEngine.playBubblePop();

    setTimeout(() => {
      // Pick a random wish (different from current if possible)
      let nextWish: SweetWish;
      do {
        const randomIndex = Math.floor(Math.random() * SWEET_WISHES.length);
        nextWish = SWEET_WISHES[randomIndex];
      } while (nextWish.id === currentWish.id && SWEET_WISHES.length > 1);

      setCurrentWish(nextWish);
      setCollectedIds((prev) => new Set(prev).add(nextWish.id));
      setIsSpinning(false);
      soundEngine.playSparkle();
    }, 600);
  };

  const handleCopy = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(`"${currentWish.content}" — Gửi Hương ngày 20/10 🌸`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="sweetness-generator"
      style={{
        position: 'relative',
        padding: '90px 20px',
        maxWidth: '920px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      {/* Badge */}
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
        <Sparkles size={14} color="#FF5A87" />
        <span>Góc Nhận Vị Ngọt Ngẫu Nhiên</span>
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
        Máy Phát Lời Chúc Kẹo Ngọt Cho Hương 🍬
      </h2>

      <p style={{ fontSize: '15.5px', color: '#6B4D66', maxWidth: '560px', margin: '0 auto 36px' }}>
        Mỗi lần bấm nút, chiếc máy sẽ trao cho Hương một viên kẹo may mắn mang thông điệp tích cực và ấm áp nhất!
      </p>

      {/* Main Dispenser Machine Card */}
      <div
        className="glass-card-glow"
        style={{
          maxWidth: '620px',
          margin: '0 auto',
          padding: '36px 28px',
          borderRadius: '32px',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '2px solid rgba(255, 200, 220, 0.7)',
          position: 'relative',
        }}
      >
        {/* Progress Tracker Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '50px',
            background: 'rgba(255, 240, 245, 0.8)',
            border: '1px solid rgba(255, 160, 190, 0.4)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#C72557',
            marginBottom: '24px',
          }}
        >
          <span>Đã nếm thử {collectedIds.size}/{SWEET_WISHES.length} vị ngọt kẹo</span>
          <div
            style={{
              width: '45px',
              height: '6px',
              borderRadius: '3px',
              background: '#FFE0E9',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(collectedIds.size / SWEET_WISHES.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #FF5A87, #FF8A5C)',
                borderRadius: '3px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Candy Capsule Animated Stage */}
        <div
          style={{
            position: 'relative',
            height: '110px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <motion.div
            animate={isSpinning ? { rotate: [0, 180, 360, 720], scale: [1, 1.25, 0.9, 1] } : { y: [0, -6, 0] }}
            transition={isSpinning ? { duration: 0.6, ease: 'easeInOut' } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, #FFF, ${currentWish.color})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '44px',
              boxShadow: '0 12px 28px rgba(220, 90, 130, 0.22)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <span>{currentWish.emoji}</span>
          </motion.div>
        </div>

        {/* Revealed Wish Message Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWish.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '24px 20px',
              borderRadius: '24px',
              background: currentWish.color,
              border: '1.5px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 700,
                color: '#C72557',
                background: 'rgba(255, 255, 255, 0.85)',
                padding: '4px 14px',
                borderRadius: '50px',
                marginBottom: '12px',
              }}
            >
              Vị: {currentWish.flavor}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(17px, 2.8vw, 20px)',
                fontWeight: 600,
                color: '#2A1728',
                lineHeight: 1.6,
                marginBottom: '10px',
              }}
            >
              "{currentWish.content}"
            </p>

            <p style={{ fontSize: '12px', color: '#6B4D66', fontWeight: 500 }}>
              {currentWish.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Buttons: Dispense & Copy */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDispense}
            disabled={isSpinning}
            style={{
              padding: '14px 30px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
              color: '#FFFFFF',
              fontSize: '15.5px',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(255, 90, 135, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              opacity: isSpinning ? 0.7 : 1,
            }}
          >
            <Dices size={18} />
            <span>{isSpinning ? 'Đang quay kẹo...' : 'Gắp viên kẹo khác'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            style={{
              padding: '14px 24px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1.5px solid rgba(255, 160, 190, 0.6)',
              color: '#C72557',
              fontSize: '14.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {copied ? <Check size={16} color="#2ECC71" /> : <Copy size={16} />}
            <span>{copied ? 'Đã sao chép!' : 'Lưu lời chúc này'}</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
