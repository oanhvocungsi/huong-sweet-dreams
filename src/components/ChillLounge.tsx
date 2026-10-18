import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc, Headphones } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

const TRACKS = [
  {
    id: 0,
    title: 'Chill Sunset Remix',
    artist: 'Lofi Chords for Hương',
    desc: 'Âm sắc Rhodes ấm áp, nhịp trống lofi nhẹ tênh cho buổi chiều hoàng hôn.',
    bpm: '72 BPM',
    vibe: 'Êm dịu & Thư thái',
  },
  {
    id: 1,
    title: 'Sweet Music Box',
    artist: 'Celesta & Bell Harmonies',
    desc: 'Tiếng chuông pha lê trong trẻo gợi nhớ những giấc mơ kẹo ngọt tuổi thơ.',
    bpm: '65 BPM',
    vibe: 'Ngọt ngào & Mộng mơ',
  },
  {
    id: 2,
    title: 'Pastel Dream Waltz',
    artist: 'Soft Ambient Breeze',
    desc: 'Lớp mây synth bồng bềnh đưa tâm trí lơ lửng giữa tiệm bánh ngập nắng.',
    bpm: '80 BPM',
    vibe: 'Bay bổng & Tươi sáng',
  },
];

export const ChillLounge: React.FC = () => {
  const [audioState, setAudioState] = useState(soundEngine.getState());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const huongImgUrl = `${import.meta.env.BASE_URL}assets/huong.jpg`;

  useEffect(() => {
    const unsub = soundEngine.subscribe((st) => setAudioState({ ...st }));
    return unsub;
  }, []);

  // Visualizer loop for the turntable display
  useEffect(() => {
    let animId: number;
    const render = () => {
      const cvs = canvasRef.current;
      if (cvs) {
        const ctx = cvs.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, cvs.width, cvs.height);
          const data = soundEngine.getAnalyserData();
          const count = 16;
          const barW = (cvs.width / count) - 4;

          for (let i = 0; i < count; i++) {
            let val = data[i] || 0;
            if (!audioState.isPlaying || audioState.isMuted) {
              val = 10 + Math.sin(Date.now() * 0.004 + i * 0.8) * 8;
            }
            const barH = Math.max(4, Math.min(cvs.height, (val / 255) * cvs.height * 1.15));
            const x = i * (barW + 4);
            const y = cvs.height - barH;

            const grad = ctx.createLinearGradient(0, y, 0, cvs.height);
            grad.addColorStop(0, '#FF5A87');
            grad.addColorStop(0.5, '#FF8A5C');
            grad.addColorStop(1, '#F5B041');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, y, barW, barH, 4);
            ctx.fill();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [audioState.isPlaying, audioState.isMuted]);

  return (
    <section
      id="chill-lounge"
      style={{
        position: 'relative',
        padding: '90px 20px',
        maxWidth: '1050px',
        margin: '0 auto',
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
          <Headphones size={15} color="#FF5A87" />
          <span>Góc Nhạc Chill Dành Riêng Cho Hương</span>
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
          Giai Điệu Thư Giãn • Chill Remix Lounge
        </h2>

        <p style={{ fontSize: '15.5px', color: '#6B4D66', maxWidth: '560px', margin: '0 auto' }}>
          Được thiết kế riêng theo sở thích nghe nhạc chill của Hương — hãy đeo tai nghe để tận hưởng trọn vẹn những nốt nhạc êm ru nhé!
        </p>
      </div>

      <div
        className="glass-card-glow"
        style={{
          padding: '36px 32px',
          borderRadius: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.92)',
        }}
      >
        {/* Left Column: Interactive Vinyl Turntable Visual */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Vinyl Record */}
          <motion.div
            animate={audioState.isPlaying && !audioState.isMuted ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            style={{
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #2A1728 0%, #150A14 65%, #351C33 100%)',
              border: '6px solid #4A2E46',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), 0 0 30px rgba(255, 90, 135, 0.2)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Vinyl Grooves Rings */}
            <div
              style={{
                position: 'absolute',
                inset: '25px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '55px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                pointerEvents: 'none',
              }}
            />

            {/* Center Label featuring Hương's photo */}
            <div
              style={{
                width: '92px',
                height: '92px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #FF85A1',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                position: 'relative',
              }}
            >
              <img
                src={huongImgUrl}
                alt="Hương"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#FFF',
                  border: '2px solid #2A1728',
                }}
              />
            </div>
          </motion.div>

          {/* Real-time Equalizer Waveform */}
          <div style={{ marginTop: '24px', width: '100%', maxWidth: '260px' }}>
            <canvas ref={canvasRef} width={260} height={36} style={{ width: '100%', height: '36px' }} />
          </div>
        </div>

        {/* Right Column: Track Switcher & Audio Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#FF5A87',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Đang phát bài • {TRACKS[audioState.currentTrack].vibe}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                fontWeight: 700,
                color: '#2A1728',
                marginTop: '4px',
              }}
            >
              {TRACKS[audioState.currentTrack].title}
            </h3>
            <p style={{ fontSize: '13.5px', color: '#6B4D66', marginTop: '4px' }}>
              {TRACKS[audioState.currentTrack].desc}
            </p>
          </div>

          {/* 3 Selectable Tracks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {TRACKS.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  soundEngine.setTrack(t.id);
                  if (!audioState.isPlaying) soundEngine.play();
                  soundEngine.playSparkle();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: audioState.currentTrack === t.id ? 'rgba(255, 90, 135, 0.14)' : 'rgba(255, 255, 255, 0.7)',
                  border: audioState.currentTrack === t.id ? '1.5px solid #FF85A1' : '1px solid rgba(255, 200, 220, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: audioState.currentTrack === t.id ? '#FF5A87' : 'rgba(255, 180, 205, 0.3)',
                      color: audioState.currentTrack === t.id ? '#FFF' : '#C72557',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Disc size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#2A1728' }}>{t.title}</p>
                    <p style={{ fontSize: '11.5px', color: '#6B4D66' }}>{t.artist}</p>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#C72557',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '3px 10px',
                    borderRadius: '50px',
                  }}
                >
                  {t.bpm}
                </span>
              </div>
            ))}
          </div>

          {/* Audio Controls Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 200, 220, 0.5)',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => soundEngine.togglePlay()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #FF5A87 0%, #FF8A5C 100%)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                boxShadow: '0 6px 18px rgba(255, 90, 135, 0.3)',
              }}
            >
              {audioState.isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{audioState.isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc chill'}</span>
            </motion.button>

            {/* Volume Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => soundEngine.toggleMute()}
                style={{ background: 'transparent', color: '#FF5A87', padding: '4px' }}
                title={audioState.isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
              >
                {audioState.isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioState.isMuted ? 0 : audioState.volume}
                onChange={(e) => soundEngine.setVolume(parseFloat(e.target.value))}
                style={{
                  width: '100px',
                  accentColor: '#FF5A87',
                  height: '4px',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
