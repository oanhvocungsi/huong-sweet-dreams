import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { Step1Invitation } from './steps/Step1Invitation';
import { Step2CakeHero } from './steps/Step2CakeHero';
import { Step3HuongLetter } from './steps/Step3HuongLetter';
import { Step4SurpriseBox } from './steps/Step4SurpriseBox';
import { Step5SweetnessMachine } from './steps/Step5SweetnessMachine';
import { Step6ChillLounge } from './steps/Step6ChillLounge';
import { Step7LoveRain } from './steps/Step7LoveRain';
import { Step8FinaleCandle } from './steps/Step8FinaleCandle';
import { AudioPlayerFloating } from './AudioPlayerFloating';

const TOTAL_STEPS = 8;

const STEP_LABELS = [
  'Thư Mời',
  'Bánh Giấc Mơ',
  'Thư Gửi Hương',
  'Hộp Quà 3D',
  'Máy Kẹo May Mắn',
  'Nhạc Chill Lounge',
  'Mưa Kỷ Niệm 3D',
  'Thắp Nến Ước Nguyện',
];

export const ChainController: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const goToStep = (step: number) => {
    if (step < 1 || step > TOTAL_STEPS) return;
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
    soundEngine.playSparkle();
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // Keyboard navigation (Arrow keys & Spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  // Stage click: advances to next step (just like in 20-10-gift)
  const handleStageClick = () => {
    if (currentStep < TOTAL_STEPS) {
      nextStep();
    }
  };

  return (
    <div
      onClick={handleStageClick}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'radial-gradient(ellipse at 50% 30%, #FFF0F5 0%, #FFFDF9 60%, #FFF5EC 100%)',
      }}
    >
      {/* Top Header: Step Indicator & Breadcrumb Dots */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          className="glass-card"
          style={{
            pointerEvents: 'auto',
            padding: '8px 20px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(255, 255, 255, 0.88)',
            boxShadow: '0 8px 24px rgba(220, 90, 130, 0.1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '18px' }}>🧁</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, color: '#2A1728' }}>
              Hương's Sweet Dreams
            </span>
          </div>

          {/* Dots Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => goToStep(stepNum)}
                title={`Bước ${stepNum}: ${STEP_LABELS[stepNum - 1]}`}
                style={{
                  width: currentStep === stepNum ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentStep === stepNum
                    ? 'linear-gradient(90deg, #FF5A87, #FF8A5C)'
                    : 'rgba(255, 180, 205, 0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Step Count Label */}
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#C72557' }}>
            {currentStep}/{TOTAL_STEPS}
          </span>
        </div>
      </header>

      {/* Main Interactive Stage for the active step */}
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -direction * 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {currentStep === 1 && <Step1Invitation onNext={nextStep} />}
            {currentStep === 2 && <Step2CakeHero onNext={nextStep} />}
            {currentStep === 3 && <Step3HuongLetter onNext={nextStep} />}
            {currentStep === 4 && <Step4SurpriseBox onNext={nextStep} />}
            {currentStep === 5 && <Step5SweetnessMachine onNext={nextStep} />}
            {currentStep === 6 && <Step6ChillLounge onNext={nextStep} />}
            {currentStep === 7 && <Step7LoveRain onNext={nextStep} />}
            {currentStep === 8 && <Step8FinaleCandle onReplay={() => goToStep(1)} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Hint & Arrow Navigation */}
      <footer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Left Arrow (Previous Step) */}
        <div style={{ pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
          {currentStep > 1 ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevStep}
              className="glass-card"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C72557',
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 14px rgba(220, 90, 130, 0.15)',
                cursor: 'pointer',
              }}
              title="Quay lại bước trước"
            >
              <ChevronLeft size={20} />
            </motion.button>
          ) : (
            <div style={{ width: '42px' }} />
          )}
        </div>

        {/* Center Floating Hint ("Chạm để tiếp tục") */}
        {currentStep < TOTAL_STEPS && (
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#8C5A7E',
              background: 'rgba(255, 255, 255, 0.75)',
              padding: '6px 16px',
              borderRadius: '50px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}
          >
            <Sparkles size={12} color="#FF5A87" />
            <span>Chạm vào màn hình để tiếp tục dây chuyền ✨</span>
          </motion.div>
        )}

        {/* Right Arrow (Next Step) */}
        <div style={{ pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
          {currentStep < TOTAL_STEPS ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextStep}
              className="glass-card"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C72557',
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 14px rgba(220, 90, 130, 0.15)',
                cursor: 'pointer',
              }}
              title="Bước tiếp theo"
            >
              <ChevronRight size={20} />
            </motion.button>
          ) : (
            <div style={{ width: '42px' }} />
          )}
        </div>
      </footer>

      {/* Persistent Floating Music Controller */}
      <AudioPlayerFloating />
    </div>
  );
};
