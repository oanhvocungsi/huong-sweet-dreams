import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc3, ChevronDown, ChevronUp } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

const TRACK_NAMES = [
  'Chill Sunset Lofi 🌇',
  'Sweet Music Box 🎶',
  'Pastel Dream Waltz 🍰',
];

export const AudioPlayerFloating: React.FC = () => {
  const [audioState, setAudioState] = useState(soundEngine.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((st) => {
      setAudioState({ ...st });
    });
    return unsubscribe;
  }, []);

  // Real-time canvas visualizer loop
  useEffect(() => {
    let animId: number;

    const renderVisualizer = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const data = soundEngine.getAnalyserData();
          const barWidth = 4;
          const gap = 3;
          const barCount = 6;
          const totalWidth = barCount * barWidth + (barCount - 1) * gap;
          const startX = (canvas.width - totalWidth) / 2;

          for (let i = 0; i < barCount; i++) {
            // Get frequency level or subtle simulated idle wave if paused
            let val = data[i * 2] || 0;
            if (!audioState.isPlaying || audioState.isMuted) {
              val = 8 + Math.sin(Date.now() * 0.003 + i) * 6;
            }

            const barHeight = Math.max(3, Math.min(canvas.height, (val / 255) * canvas.height * 1.1));
            const x = startX + i * (barWidth + gap);
            const y = (canvas.height - barHeight) / 2;

            const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
            grad.addColorStop(0, '#FF5A87');
            grad.addColorStop(1, '#FF9A76');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, 2);
            ctx.fill();
          }
        }
      }
      animId = requestAnimationFrame(renderVisualizer);
    };

    renderVisualizer();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [audioState.isPlaying, audioState.isMuted]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
      }}
    >
      {/* Expanded Track Settings Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-card-glow"
            style={{
              padding: '16px 20px',
              borderRadius: '20px',
              width: '280px',
              marginBottom: '6px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#2A1728',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Music size={14} color="#FF5A87" />
                Giai Điệu Dành Cho Hương
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                style={{
                  background: 'transparent',
                  padding: '2px',
                  color: '#6B4D66',
                  borderRadius: '50%',
                }}
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Track Selection Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
              {TRACK_NAMES.map((name, idx) => (
                <button
                  key={name}
                  onClick={() => {
                    soundEngine.setTrack(idx);
                    if (!audioState.isPlaying) soundEngine.play();
                    soundEngine.playSparkle();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '12.5px',
                    textAlign: 'left',
                    background: audioState.currentTrack === idx ? 'rgba(255, 90, 135, 0.15)' : 'rgba(255, 255, 255, 0.6)',
                    color: audioState.currentTrack === idx ? '#C72557' : '#55334E',
                    border: audioState.currentTrack === idx ? '1px solid #FF85A1' : '1px solid transparent',
                    fontWeight: audioState.currentTrack === idx ? 600 : 400,
                  }}
                >
                  <span>{name}</span>
                  {audioState.currentTrack === idx && audioState.isPlaying && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF5A87' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Volume Slider Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => soundEngine.toggleMute()}
                style={{ background: 'transparent', color: '#FF5A87', padding: '4px' }}
                title={audioState.isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
              >
                {audioState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioState.isMuted ? 0 : audioState.volume}
                onChange={(e) => soundEngine.setVolume(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: '#FF5A87',
                  height: '4px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '11px', color: '#6B4D66', width: '28px', textAlign: 'right' }}>
                {audioState.isMuted ? '0%' : `${Math.round(audioState.volume * 100)}%`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Pill Player */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card-glow"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px 8px 12px',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(220, 90, 130, 0.18)',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Spinning Vinyl Disc */}
        <motion.div
          animate={audioState.isPlaying && !audioState.isMuted ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2A1728 0%, #4A2E46 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FF85A1',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <Disc3 size={18} />
        </motion.div>

        {/* Real-time Frequency Waveform Canvas */}
        <canvas
          ref={canvasRef}
          width={45}
          height={20}
          style={{ display: 'block' }}
        />

        {/* Track Label */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#C72557' }}>
            {TRACK_NAMES[audioState.currentTrack].split(' ')[0]}
          </span>
          <span style={{ fontSize: '9.5px', color: '#6B4D66' }}>
            {audioState.isPlaying ? 'Đang phát chill beats' : 'Tạm dừng'}
          </span>
        </div>

        {/* Quick Play/Pause Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.togglePlay();
          }}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(255, 90, 135, 0.35)',
            marginLeft: '4px',
          }}
          title={audioState.isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
        >
          {audioState.isPlaying ? <Pause size={13} /> : <Play size={13} style={{ marginLeft: '1px' }} />}
        </button>

        {/* Toggle Expand Icon */}
        <div style={{ color: '#9F7A99', display: 'flex', alignItems: 'center' }}>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>
      </motion.div>
    </div>
  );
};
