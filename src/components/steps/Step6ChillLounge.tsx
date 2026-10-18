import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc, Headphones, ChevronRight } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Step6Props {
  onNext: () => void;
}

const TRACKS = [
  { id: 0, title: 'Chill Sunset Remix', desc: 'Âm sắc Rhodes ấm áp, nhịp trống lofi nhẹ tênh.', bpm: '72 BPM' },
  { id: 1, title: 'Sweet Music Box', desc: 'Tiếng chuông pha lê trong trẻo gợi nhớ những giấc mơ kẹo ngọt.', bpm: '65 BPM' },
  { id: 2, title: 'Pastel Dream Waltz', desc: 'Lớp mây synth bồng bềnh đưa tâm trí lơ lửng.', bpm: '80 BPM' },
];

export const Step6ChillLounge: React.FC<Step6Props> = ({ onNext }) => {
  const [audioState, setAudioState] = useState(soundEngine.getState());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const huongImgUrl = `${import.meta.env.BASE_URL}assets/huong.jpg`;

  useEffect(() => {
    const unsub = soundEngine.subscribe((st) => setAudioState({ ...st }));
    return unsub;
  }, []);

  // Visualizer loop
  useEffect(() => {
    let animId: number;
    const render = () => {
      const cvs = canvasRef.current;
      if (cvs) {
        const ctx = cvs.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, cvs.width, cvs.height);
          const data = soundEngine.getAnalyserData();
          const count = 14;
          const barW = (cvs.width / count) - 4;

          for (let i = 0; i < count; i++) {
            let val = data[i] || 0;
            if (!audioState.isPlaying || audioState.isMuted) {
              val = 8 + Math.sin(Date.now() * 0.004 + i * 0.8) * 6;
            }
            const barH = Math.max(3, Math.min(cvs.height, (val / 255) * cvs.height * 1.15));
            const x = i * (barW + 4);
            const y = cvs.height - barH;

            const grad = ctx.createLinearGradient(0, y, 0, cvs.height);
            grad.addColorStop(0, '#FF5A87');
            grad.addColorStop(1, '#FF8A5C');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, y, barW, barH, 3);
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
          maxWidth: '720px',
          width: '100%',
          padding: '30px 24px',
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
          <Headphones size={13} color="#FF5A87" />
          <span>Góc Nhạc Chill Dành Riêng Cho Hương</span>
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
          Giai Điệu Thư Giãn • Chill Remix Lounge
        </h3>

        <p style={{ fontSize: '13.5px', color: '#6B4D66', marginBottom: '20px' }}>
          Được thiết kế riêng theo sở thích nghe nhạc chill của Hương — đeo tai nghe để thư giãn trọn vẹn nhé!
        </p>

        {/* Center Turntable and Track layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          {/* Vinyl Record */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              animate={audioState.isPlaying && !audioState.isMuted ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              style={{
                width: '190px',
                height: '190px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #2A1728 0%, #150A14 65%, #351C33 100%)',
                border: '5px solid #4A2E46',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #FF85A1',
                }}
              >
                <img src={huongImgUrl} alt="Hương" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>

            <div style={{ marginTop: '14px', width: '100%', maxWidth: '190px' }}>
              <canvas ref={canvasRef} width={190} height={26} style={{ width: '100%', height: '26px' }} />
            </div>
          </div>

          {/* Track Switcher */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
            {TRACKS.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  soundEngine.setTrack(t.id);
                  if (!audioState.isPlaying) soundEngine.play();
                  soundEngine.playSparkle();
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '14px',
                  background: audioState.currentTrack === t.id ? 'rgba(255, 90, 135, 0.15)' : 'rgba(255, 255, 255, 0.7)',
                  border: audioState.currentTrack === t.id ? '1.5px solid #FF85A1' : '1px solid rgba(255, 200, 220, 0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Disc size={15} color={audioState.currentTrack === t.id ? '#FF5A87' : '#9F7A99'} />
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#2A1728' }}>{t.title}</p>
                    <p style={{ fontSize: '11px', color: '#6B4D66' }}>{t.desc}</p>
                  </div>
                </div>
                <span style={{ fontSize: '10.5px', color: '#C72557', background: 'rgba(255,255,255,0.8)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                  {t.bpm}
                </span>
              </div>
            ))}

            {/* Play/Pause & Volume */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px' }}>
              <button
                onClick={() => soundEngine.togglePlay()}
                style={{
                  padding: '8px 18px',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #FF5A87, #FF8A5C)',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {audioState.isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{audioState.isPlaying ? 'Tạm dừng' : 'Phát nhạc'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button onClick={() => soundEngine.toggleMute()} style={{ background: 'transparent', color: '#FF5A87' }}>
                  {audioState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioState.isMuted ? 0 : audioState.volume}
                  onChange={(e) => soundEngine.setVolume(parseFloat(e.target.value))}
                  style={{ width: '70px', accentColor: '#FF5A87' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Advance Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playSparkle();
            onNext();
          }}
          style={{
            padding: '12px 30px',
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
          <span>Khám Phá Mưa Kỷ Niệm 3D 🌠</span>
          <ChevronRight size={17} />
        </motion.button>
      </motion.div>
    </div>
  );
};
