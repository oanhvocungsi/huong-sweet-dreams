// Web Audio API Procedural Chill Engine & Sound FX
// Zero external network dependency, 100% legal, zero buffering delay

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private currentTrack: number = 0; // 0: Chill Lofi Sunset, 1: Sweet Music Box, 2: Pastel Dream Waltz
  
  private timerId: number | null = null;
  private step: number = 0;
  private tempo: number = 72; // BPM

  // Listeners for UI state sync
  private listeners: Set<(state: { isPlaying: boolean; isMuted: boolean; volume: number; currentTrack: number }) => void> = new Set();

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (state: { isPlaying: boolean; isMuted: boolean; volume: number; currentTrack: number }) => void) {
    this.listeners.add(fn);
    fn(this.getState());
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    const st = this.getState();
    this.listeners.forEach((l) => l(st));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      currentTrack: this.currentTrack,
    };
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  // --- Track Chord Projections & Melodies ---
  // Track 0: Lofi Chill Sunset (Fmaj9 -> Am9 -> Bbmaj9 -> C13sus)
  // Track 1: Sweet Music Box (Sparkling celesta Cmaj7 -> G/B -> Am7 -> Fmaj7)
  // Track 2: Pastel Cloud Waltz (Dreamy 3/4 feel Ebmaj7 -> Cm7 -> Fm7 -> Bb7)

  private getTrackChords(): { bass: number; notes: number[]; melody: number[] }[] {
    if (this.currentTrack === 0) {
      // 4 bars of chill neo-soul
      return [
        {
          bass: 87.31, // F2
          notes: [174.61, 261.63, 329.63, 392.0, 523.25], // F3, C4, E4, G4, C5
          melody: [523.25, 587.33, 659.25, 523.25],
        },
        {
          bass: 110.0, // A2
          notes: [164.81, 246.94, 329.63, 392.0, 493.88], // E3, B3, E4, G4, B4
          melody: [493.88, 440.0, 392.0, 440.0],
        },
        {
          bass: 116.54, // Bb2
          notes: [174.61, 220.0, 293.66, 349.23, 440.0], // F3, A3, D4, F4, A4
          melody: [440.0, 523.25, 587.33, 659.25],
        },
        {
          bass: 98.0, // G2
          notes: [174.61, 233.08, 293.66, 349.23, 440.0], // F3, Bb3, D4, F4, A4
          melody: [659.25, 587.33, 523.25, 392.0],
        },
      ];
    } else if (this.currentTrack === 1) {
      // Sweet Music Box
      return [
        {
          bass: 130.81, // C3
          notes: [261.63, 329.63, 392.0, 493.88], // C4, E4, G4, B4
          melody: [523.25, 659.25, 783.99, 987.77],
        },
        {
          bass: 123.47, // B2
          notes: [246.94, 293.66, 392.0, 493.88], // B3, D4, G4, B4
          melody: [783.99, 659.25, 587.33, 493.88],
        },
        {
          bass: 110.0, // A2
          notes: [220.0, 261.63, 329.63, 440.0], // A3, C4, E4, A4
          melody: [880.0, 783.99, 659.25, 523.25],
        },
        {
          bass: 87.31, // F2
          notes: [174.61, 261.63, 329.63, 440.0], // F3, C4, E4, A4
          melody: [659.25, 587.33, 523.25, 392.0],
        },
      ];
    } else {
      // Pastel Dreamscape
      return [
        {
          bass: 155.56, // Eb3
          notes: [233.08, 311.13, 392.0, 466.16], // Bb3, Eb4, G4, Bb4
          melody: [622.25, 698.46, 783.99, 932.33],
        },
        {
          bass: 130.81, // C3
          notes: [196.0, 261.63, 311.13, 392.0], // G3, C4, Eb4, G4
          melody: [783.99, 698.46, 622.25, 523.25],
        },
        {
          bass: 87.31, // F2
          notes: [174.61, 261.63, 311.13, 415.3], // F3, C4, Eb4, Ab4
          melody: [523.25, 622.25, 698.46, 783.99],
        },
        {
          bass: 116.54, // Bb2
          notes: [233.08, 293.66, 349.23, 466.16], // Bb3, D4, F4, Bb4
          melody: [698.46, 622.25, 587.33, 466.16],
        },
      ];
    }
  }

  // Synthesize Rhodes-style electric piano note
  private playEPianoNote(freq: number, duration: number, time: number, velocity: number = 0.5) {
    if (!this.ctx || !this.musicGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time); // Subtle overtone

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 4.5, 3000), time);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.5, 300), time + duration);

    gainNode.gain.setValueAtTime(0.0001, time);
    gainNode.gain.exponentialRampToValueAtTime(velocity * 0.16, time + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(velocity * 0.09, time + 0.35);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.musicGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Synthesize Music Box / Celesta Bell Sparkle
  private playBellNote(freq: number, time: number, velocity: number = 0.35) {
    if (!this.ctx || !this.musicGain) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gainNode.gain.setValueAtTime(0.0001, time);
    gainNode.gain.exponentialRampToValueAtTime(velocity * 0.18, time + 0.008);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, time + 1.2);

    osc.connect(gainNode);
    gainNode.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 1.2);
  }

  // Gentle soft brush / lofi kick beat
  private playSoftBeat(time: number, isSnare: boolean = false) {
    if (!this.ctx || !this.musicGain) return;

    if (!isSnare) {
      // Soft warm kick
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, time);
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.14);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(time);
      osc.stop(time + 0.2);
    } else {
      // Soft rim click / brush
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, time);
      osc.frequency.exponentialRampToValueAtTime(90, time + 0.06);

      gain.gain.setValueAtTime(0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(time);
      osc.stop(time + 0.1);
    }
  }

  private tick = () => {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const chords = this.getTrackChords();
    const chordIndex = Math.floor(this.step / 4) % chords.length;
    const beatInBar = this.step % 4;
    const currentChord = chords[chordIndex];

    const beatDuration = 60 / this.tempo;

    // Beat 0: Play Bass & Chord Pad
    if (beatInBar === 0) {
      // Bass
      this.playEPianoNote(currentChord.bass, beatDuration * 3.8, now, 0.45);

      // Pad chord notes (slightly arpeggiated)
      currentChord.notes.forEach((noteFreq, idx) => {
        this.playEPianoNote(noteFreq, beatDuration * 3.2, now + idx * 0.035, 0.28);
      });
    }

    // Melodic Sparkle
    const melFreq = currentChord.melody[beatInBar];
    if (melFreq) {
      // Play sparkle bell
      this.playBellNote(melFreq, now + 0.1, 0.32);
    }

    // Gentle rhythm for lofi vibe
    if (this.currentTrack === 0) {
      if (beatInBar === 0 || beatInBar === 2) {
        this.playSoftBeat(now, false);
      }
      if (beatInBar === 1 || beatInBar === 3) {
        this.playSoftBeat(now, true);
      }
    }

    this.step++;

    // Schedule next beat
    const nextInterval = (60 / this.tempo) * 1000;
    this.timerId = window.setTimeout(this.tick, nextInterval);
  };

  public play() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.step = 0;
    this.tick();
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public setTrack(idx: number) {
    this.currentTrack = idx % 3;
    this.step = 0;
    this.notify();
  }

  // --- INTERACTIVE SOUND EFFECTS (SFX) ---

  // Sparkle chime when user hovers or taps sweet candy
  public playSparkle() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.0001, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.05 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.55);
    });
  }

  // Magical box opening flourish
  public playBoxOpen() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5 to G6 shimmer
    const now = this.ctx.currentTime;

    chords.forEach((f, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + idx * 0.07);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + idx * 0.07 + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 1.3);
    });
  }

  // Cute pop bubble when dispensing candy
  public playBubblePop() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.09);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Soft click
  public playClick() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }
}

export const soundEngine = new SoundEngine();
