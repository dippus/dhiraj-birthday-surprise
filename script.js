/**
 * A SPECIAL BIRTHDAY SURPRISE — FOR DHIRAJ · BY DIPPU
 * Responsive Steps Navigation, Web Audio, Cute Dog Bark, Pigeon Flight, Terminal Hack, Reasons Jar & Finale
 */

// ============================================================================
// 1. WEB AUDIO SYNTHESIZER
// ============================================================================
class BirthdayAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimeout = null;
    this.musicStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration = 0.4, type = 'triangle', gainVal = 0.15) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) { }
  }

  // Dog Bark Sound ("Bho Bho!")
  playDogBark() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [0, 0.18].forEach(offset => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now + offset);
      osc.frequency.exponentialRampToValueAtTime(140, now + offset + 0.12);
      gain.gain.setValueAtTime(0.3, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.13);
    });
  }

  // Realistic Loud Balloon Pop Explosion Sound
  playBalloonPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // 1. Sharp high-frequency pop blast
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.02));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);

      // 2. Deep acoustic thump
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);
      oscGain.gain.setValueAtTime(0.6, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) { }
  }

  playPigeonFlutter() {
    this.init();
    if (!this.ctx) return;
    for (let i = 0; i < 4; i++) {
      setTimeout(() => this.playTone(400 - i * 30, 0.08, 'sine', 0.08), i * 70);
    }
  }

  playBuzzer() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.setValueAtTime(110, now + 0.15);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playTypingBlip() {
    this.init();
    if (!this.ctx) return;
    this.playTone(600 + Math.random() * 400, 0.04, 'sine', 0.05);
  }

  playVaultUnlock() {
    this.init();
    if (!this.ctx) return;
    [180, 240, 360, 520].forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 0.25, 'triangle', 0.2), idx * 60);
    });
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    [659.25, 783.99, 987.77, 1318.51].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.5, 'sine', 0.12), idx * 80);
    });
  }

  playCandleBlow() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(250, now + 0.35);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (e) { }
  }

  playFanfare() {
    this.init();
    if (!this.ctx) return;
    [261.63, 329.63, 392.00, 523.25, 659.25, 783.99].forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.6, 'triangle', 0.18);
        this.playTone(freq * 0.5, 0.6, 'sine', 0.15);
      }, idx * 110);
    });
  }

  playPartyHorn() {
    this.init();
    if (!this.ctx) return;
    const freqs = [350, 440, 523];
    const now = this.ctx.currentTime;
    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.linearRampToValueAtTime(f * 1.08, now + 0.15);
      osc.frequency.linearRampToValueAtTime(f * 0.98, now + 0.45);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    });
  }

  // Cake Knife Slicing Sound
  playSliceSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Sacred Flame / Diya Ignition Warm Sound
  playFlameIgnite() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(280, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.5);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch(e) {}
  }

  // Firecracker / Patakha Crackle Sound (Series of rapid pops)
  playCrackerSound() {
    this.init();
    if (!this.ctx) return;
    const count = Math.floor(Math.random() * 5 + 4);
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.05;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) data[j] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000 + Math.random() * 800, now);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3 + Math.random() * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
      }, i * (50 + Math.random() * 80));
    }
  }

  // Grand Festival Cracker Barrage (Heavy bass boom + Rapid firecracker snaps)
  playGrandCrackerBarrage() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // 1. Deep Boom / Thud Impact (Rocket explosion bass)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.45);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);

      // 2. Continuous rapid firecracker snaps (Patakha ladi effect)
      const snapCount = 18 + Math.floor(Math.random() * 8);
      for (let i = 0; i < snapCount; i++) {
        setTimeout(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const bufSize = this.ctx.sampleRate * 0.04;
          const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let j = 0; j < bufSize; j++) data[j] = Math.random() * 2 - 1;
          const noise = this.ctx.createBufferSource();
          noise.buffer = buf;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(800 + Math.random() * 2400, t);
          filter.Q.setValueAtTime(3, t);
          const g = this.ctx.createGain();
          g.gain.setValueAtTime(0.4 + Math.random() * 0.25, t);
          g.gain.exponentialRampToValueAtTime(0.005, t + 0.04);
          noise.connect(filter);
          filter.connect(g);
          g.connect(this.ctx.destination);
          noise.start(t);
        }, i * (35 + Math.random() * 45));
      }
    } catch (e) {}
  }

  // Playful cartoon spring boing / dodge sound for Shararati button
  playPlayfulBoing() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      // Pitch bend upwards like cartoon spring
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.32);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // Warm acoustic music-box / celeste chime
  playChimeTone(freq, dur = 0.9, gainVal = 0.16, bassFreq = null) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Fundamental (Warm Sine)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(gainVal, now + 0.01);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + dur);

      // Sparkling Music-Box Tine Harmonic (Bell Chime overtone)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(gainVal * 0.35, now + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + (dur * 0.65));
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + (dur * 0.65));

      // Optional deep acoustic bass resonance
      if (bassFreq) {
        const oscBass = this.ctx.createOscillator();
        const gainBass = this.ctx.createGain();
        oscBass.type = 'sine';
        oscBass.frequency.setValueAtTime(bassFreq, now);
        gainBass.gain.setValueAtTime(0, now);
        gainBass.gain.linearRampToValueAtTime(gainVal * 0.45, now + 0.02);
        gainBass.gain.exponentialRampToValueAtTime(0.0001, now + dur * 1.2);
        oscBass.connect(gainBass);
        gainBass.connect(this.ctx.destination);
        oscBass.start(now);
        oscBass.stop(now + dur * 1.2);
      }
    } catch (e) { }
  }

  // Soft vintage typewriter key click
  playTypewriterKey() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 500, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.02);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.02);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) { }
  }

  startBirthdayMusic() {
    this.init();
    this.isPlayingMusic = true;
    this.musicStep = 0;

    // Classic Happy Birthday melody in Key of C with warm music-box harmony
    const G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;
    const C3 = 130.81, G2 = 98.00, F2 = 87.31;

    const melody = [
      // Line 1: Happy Birthday to you
      [G4, 0.28, C3], [G4, 0.24, null], [A4, 0.52, null], [G4, 0.52, null], [C5, 0.52, null], [B4, 0.95, G2],
      // Line 2: Happy Birthday to you
      [G4, 0.28, G2], [G4, 0.24, null], [A4, 0.52, null], [G4, 0.52, null], [D5, 0.52, null], [C5, 0.95, C3],
      // Line 3: Happy Birthday dear Dhiraj
      [G4, 0.28, C3], [G4, 0.24, null], [G5, 0.52, null], [E5, 0.52, null], [C5, 0.48, F2], [B4, 0.48, null], [A4, 0.85, null],
      // Line 4: Happy Birthday to you!
      [F5, 0.28, F2], [F5, 0.24, null], [E5, 0.52, null], [C5, 0.52, C3], [D5, 0.52, G2], [C5, 1.25, C3]
    ];

    const playNext = () => {
      if (!this.isPlayingMusic) return;
      const note = melody[this.musicStep % melody.length];
      const freq = note[0];
      const dur = note[1];
      const bass = note[2];
      this.playChimeTone(freq, dur * 1.4, 0.16, bass);
      this.musicStep++;

      // Small breathe pause after phrase ends
      const delay = (this.musicStep % melody.length === 0) ? (dur + 0.6) * 1000 : dur * 1000;
      this.musicTimeout = setTimeout(playNext, delay);
    };

    playNext();
  }

  stopBirthdayMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  toggleMusic() {
    this.init();
    if (this.isPlayingMusic) {
      this.stopBirthdayMusic();
      return false;
    } else {
      this.startBirthdayMusic();
      return true;
    }
  }
}

const audio = new BirthdayAudioSynthesizer();

// ============================================================================
// 2. AMBIENT STARS & CONFETTI PHYSICS CANVASES
// ============================================================================
const ambientCanvas = document.getElementById('ambientCanvas');
const ambientCtx = ambientCanvas.getContext('2d');
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');

let stars = [];
let confettiPieces = [];
let animWidth = window.innerWidth;
let animHeight = window.innerHeight;

function resizeCanvases() {
  animWidth = window.innerWidth;
  animHeight = window.innerHeight;
  ambientCanvas.width = animWidth;
  ambientCanvas.height = animHeight;
  confettiCanvas.width = animWidth;
  confettiCanvas.height = animHeight;

  stars = Array.from({ length: Math.min(80, Math.floor(animWidth / 14)) }, () => ({
    x: Math.random() * animWidth,
    y: Math.random() * animHeight,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.8 + 0.2,
    speed: Math.random() * 0.02 + 0.005,
    color: Math.random() > 0.5 ? '#ffd269' : '#00f0ff'
  }));
}
window.addEventListener('resize', resizeCanvases);
resizeCanvases();

function renderAmbient() {
  ambientCtx.clearRect(0, 0, animWidth, animHeight);
  stars.forEach(s => {
    s.alpha += s.speed;
    if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
    ambientCtx.beginPath();
    ambientCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ambientCtx.fillStyle = s.color;
    ambientCtx.globalAlpha = Math.abs(s.alpha);
    ambientCtx.shadowColor = s.color;
    ambientCtx.shadowBlur = s.radius * 3;
    ambientCtx.fill();
  });
  ambientCtx.globalAlpha = 1;
  requestAnimationFrame(renderAmbient);
}
renderAmbient();

const CONFETTI_COLORS = ['#ffd269', '#ff3e78', '#00f0ff', '#9d4edd', '#ffd23f', '#ffffff'];

// Sparkling Golden & Diamond Chamkila Rain (Falls gently like shimmering snow)
function triggerSparkleRain(durationSec = 6, density = 4) {
  let elapsed = 0;
  const interval = setInterval(() => {
    elapsed += 0.15;
    for (let i = 0; i < density; i++) {
      confettiPieces.push({
        x: Math.random() * animWidth,
        y: -10,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2.5 + 1.8,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.4 ? '#ffd269' : (Math.random() > 0.5 ? '#ffffff' : '#ff9f00'),
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 8,
        shape: 'circle',
        opacity: 1,
        decay: 0.004
      });
    }
    if (elapsed >= durationSec) clearInterval(interval);
  }, 150);
}

// Balloon Pop Explosion (Spawns colorful shrapnel bursting from center)
function triggerBalloonPopExplosion(originX, originY) {
  const popColors = ['#ff3e78', '#ffd269', '#00f0ff', '#a855f7', '#ff6b8b', '#22c55e'];
  for (let i = 0; i < 70; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 18 + 6;
    confettiPieces.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: Math.random() * 10 + 6,
      color: popColors[Math.floor(Math.random() * popColors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 20,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      opacity: 1,
      decay: Math.random() * 0.015 + 0.01
    });
  }
}

function triggerConfettiBurst(originX = animWidth / 2, originY = animHeight / 2, count = 100) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 16 + 5;
    confettiPieces.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: Math.random() * 8 + 5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.3 ? 'rect' : 'circle',
      opacity: 1,
      decay: Math.random() * 0.012 + 0.008
    });
  }
}

function triggerDualCannons() {
  triggerConfettiBurst(animWidth * 0.1, animHeight * 0.85, 120);
  triggerConfettiBurst(animWidth * 0.9, animHeight * 0.85, 120);
}

// renderConfetti is replaced by renderConfettiAndRockets (defined later, after rocket engine setup).
// This stub exists only for reference — do NOT call renderConfetti() directly.
function renderConfetti() { /* handled by renderConfettiAndRockets */ }

// ============================================================================
// 3. STEP PROGRESS TRACKER MANAGEMENT (PHONE & PC)
// ============================================================================
const STEP_TITLES = {
  1: "🕊️ Key Delivery",
  2: "🗝️ Unlock Vault",
  3: "🪔 Sky Lantern",
  4: "🎂 Wish & Cake",
  5: "💌 Dippu's Wish"
};

const STEP_SCENES = {
  1: "scene-messenger",
  2: "scene-terminal",
  3: "scene-jar",
  4: "scene-cake",
  5: "scene-finale"
};

let currentStep = 1;
let highestStepUnlocked = 1;

try {
  const savedCurrent = parseInt(localStorage.getItem('dhiraj_birthday_saved_step'), 10);
  const savedHighest = parseInt(localStorage.getItem('dhiraj_birthday_highest_step'), 10);
  if (savedCurrent >= 1 && savedCurrent <= 5) currentStep = savedCurrent;
  if (savedHighest >= 1 && savedHighest <= 5) highestStepUnlocked = savedHighest;
  if (highestStepUnlocked < currentStep) highestStepUnlocked = currentStep;
} catch (e) {}

function updateStepTracker(stepNumber, skipCurtain = false) {
  currentStep = stepNumber;
  if (stepNumber > highestStepUnlocked) {
    highestStepUnlocked = stepNumber;
  }

  try {
    localStorage.setItem('dhiraj_birthday_saved_step', currentStep);
    localStorage.setItem('dhiraj_birthday_highest_step', highestStepUnlocked);
  } catch (e) {}

  const applyScene = () => {
    // Update desktop step nodes
    for (let i = 1; i <= 5; i++) {
      const node = document.getElementById(`stepNode${i}`);
      const line = document.getElementById(`stepLine${i}`);

      if (node) {
        node.classList.toggle('active', i === stepNumber);
        node.classList.toggle('completed', i < stepNumber);
      }
      if (line) {
        line.classList.toggle('active', i < stepNumber);
      }
    }

    // Update mobile pill
    const pillBadge = document.getElementById('pillBadge');
    const pillTitle = document.getElementById('pillTitle');
    if (pillBadge) pillBadge.textContent = `STEP ${stepNumber} OF 5`;
    if (pillTitle) pillTitle.textContent = STEP_TITLES[stepNumber];

    // Show active scene
    document.querySelectorAll('.scene').forEach(s => {
      s.classList.toggle('active', s.id === STEP_SCENES[stepNumber]);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Step 5: Prepare Golden Envelope
    if (stepNumber === 5) {
      resetGoldenEnvelope();
    }
  };

  if (skipCurtain) {
    applyScene();
  } else {
    // Golden Curtain Transition
    triggerGoldenCurtain(applyScene);
  }
}

// Allow clicking on previously unlocked steps
document.querySelectorAll('.step-node').forEach(node => {
  node.addEventListener('click', () => {
    const targetStep = parseInt(node.dataset.step, 10);
    if (targetStep <= highestStepUnlocked) {
      updateStepTracker(targetStep);
    }
  });
});

// ============================================================================
// GOLDEN CURTAIN TRANSITION HELPER
// ============================================================================
const goldenCurtain = document.getElementById('goldenCurtain');
function triggerGoldenCurtain(onMidpoint) {
  if (!goldenCurtain) { onMidpoint && onMidpoint(); return; }
  goldenCurtain.classList.add('active');
  // After curtain closes (600ms), run scene swap, then open curtain
  setTimeout(() => {
    if (onMidpoint) onMidpoint();
    setTimeout(() => {
      // Remove curtain-closed state — transition class drives opening
      goldenCurtain.classList.remove('active');
    }, 550);
  }, 620);
}

// ============================================================================
// 4. CEILING BALLOONS GENERATOR
// ============================================================================
const ceilingBalloons = document.getElementById('ceilingBalloons');
const BALLOON_COLORS = [
  'radial-gradient(circle at 35% 30%, #ff6b95, #c71648)',
  'radial-gradient(circle at 35% 30%, #ffd470, #c88909)',
  'radial-gradient(circle at 35% 30%, #4ae3ff, #0a89a8)',
  'radial-gradient(circle at 35% 30%, #b76bff, #621ba6)',
  'radial-gradient(circle at 35% 30%, #68ff8f, #0d9931)'
];

function spawnCeilingBalloons(count = 14) {
  if (!ceilingBalloons) return;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'c-balloon';
    b.style.left = `${(i / count) * 94 + 3}%`;
    b.style.top = `${Math.random() * 20 + 5}px`;
    b.style.background = BALLOON_COLORS[i % BALLOON_COLORS.length];
    b.style.animationDelay = `${(i * 0.4) % 3}s`;
    ceilingBalloons.appendChild(b);
  }
}
spawnCeilingBalloons(14);

const petCharacter = document.getElementById('petCharacter');

if (petCharacter) {
  petCharacter.addEventListener('click', () => {
    audio.playChime();
    petCharacter.style.transform = 'scale(1.12) rotate(4deg)';
    setTimeout(() => {
      petCharacter.style.transform = '';
    }, 280);
  });
}

// 4 Interactive Mystery Balloons Popping Logic
const SECRET_VIP_CODE = "7488";
let balloonCodeRevealed = false;
const droppedKeyCard = document.getElementById('droppedKeyCard');
const secretPasscode = document.getElementById('secretPasscode');
const allBalloons = Array.from(document.querySelectorAll('.tap-balloon'));

// Randomly choose EXACTLY ONE lucky balloon out of the 4 to secretly hold code 7488
const luckyBalloonIndex = Math.floor(Math.random() * allBalloons.length);

const emptyTeases = [
  "Empty! Try another 🎈",
  "Oops, not this one! 💨",
  "Almost! Try another one ✨"
];
let emptyIndex = 0;

allBalloons.forEach((balloon, index) => {
  balloon.addEventListener('click', () => {
    if (balloon.classList.contains('popped')) return;

    // Pop the balloon with sound & confetti
    balloon.classList.add('popped');
    audio.playBalloonPop();

    const rect = balloon.getBoundingClientRect();
    triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);

    // Is this the lucky balloon containing 7488?
    if (index === luckyBalloonIndex) {
      // 🌟 WINNING BALLOON: Reveal Code 7488
      balloonCodeRevealed = true;
      audio.playChime();
      audio.playFanfare();

      // Dog does a happy wag!
      if (petCharacter) {
        petCharacter.style.transform = 'scale(1.18) rotate(-8deg)';
        setTimeout(() => { petCharacter.style.transform = 'scale(1.1) rotate(8deg)'; }, 200);
        setTimeout(() => { petCharacter.style.transform = 'scale(1.18) rotate(-5deg)'; }, 400);
        setTimeout(() => { petCharacter.style.transform = ''; }, 600);
      }

      const codeTag = document.createElement('div');
      codeTag.className = 'balloon-floating-code';
      codeTag.innerHTML = `🔑 <b>7488</b>`;
      codeTag.style.position = 'absolute';
      codeTag.style.top = '10px';
      codeTag.style.left = '50%';
      codeTag.style.transform = 'translateX(-50%) scale(0.6)';
      codeTag.style.background = 'linear-gradient(135deg, #ffd269, #ff3e78)';
      codeTag.style.color = '#100b1a';
      codeTag.style.fontFamily = 'var(--font-heading)';
      codeTag.style.fontSize = '14px';
      codeTag.style.fontWeight = '900';
      codeTag.style.padding = '5px 12px';
      codeTag.style.borderRadius = '999px';
      codeTag.style.boxShadow = '0 0 25px rgba(255, 210, 105, 0.95)';
      codeTag.style.zIndex = '25';
      codeTag.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      balloon.appendChild(codeTag);

      setTimeout(() => {
        codeTag.style.transform = 'translateX(-50%) translateY(-38px) scale(1.18)';
      }, 20);

      // Reveal code card & Next Button
      if (droppedKeyCard) {
        droppedKeyCard.classList.add('revealed');
        droppedKeyCard.style.display = 'flex';
        setTimeout(() => {
          droppedKeyCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 250);
        triggerDualCannons();
      }
    } else {
      // 💨 EMPTY BALLOON: Show empty tease hint and encourage tapping remaining balloons
      audio.playCandleBlow();

      const teaseTag = document.createElement('div');
      teaseTag.className = 'balloon-tease-tag';
      teaseTag.textContent = emptyTeases[emptyIndex % emptyTeases.length];
      emptyIndex++;
      teaseTag.style.position = 'absolute';
      teaseTag.style.top = '10px';
      teaseTag.style.left = '50%';
      teaseTag.style.transform = 'translateX(-50%) scale(0.8)';
      teaseTag.style.background = 'rgba(25, 18, 45, 0.9)';
      teaseTag.style.border = '1px solid rgba(255, 255, 255, 0.3)';
      teaseTag.style.color = '#ffd269';
      teaseTag.style.fontFamily = 'var(--font-heading)';
      teaseTag.style.fontSize = '11px';
      teaseTag.style.fontWeight = '700';
      teaseTag.style.padding = '3px 9px';
      teaseTag.style.borderRadius = '999px';
      teaseTag.style.whiteSpace = 'nowrap';
      teaseTag.style.zIndex = '20';
      teaseTag.style.transition = 'all 0.5s ease';
      balloon.appendChild(teaseTag);

      setTimeout(() => {
        teaseTag.style.transform = 'translateX(-50%) translateY(-30px) scale(1)';
      }, 20);
    }
  });
});

const goToTerminalBtn = document.getElementById('goToTerminalBtn');
if (goToTerminalBtn) {
  goToTerminalBtn.addEventListener('click', () => {
    updateStepTracker(2);
    // User recalls and enters code discovered in Step 1 balloon pop!
  });
}

// ============================================================================
// 6. LIVE COUNTDOWN TIMER
// ============================================================================
let cdSeconds = 18;
let cdMinutes = 45;
let cdHours = 2;
const cdHoursEl = document.getElementById('cdHours');
const cdMinsEl = document.getElementById('cdMins');
const cdSecsEl = document.getElementById('cdSecs');
let countdownHacked = false;

setInterval(() => {
  if (countdownHacked) return;
  cdSeconds--;
  if (cdSeconds < 0) {
    cdSeconds = 59;
    cdMinutes--;
    if (cdMinutes < 0) {
      cdMinutes = 59;
      cdHours = Math.max(0, cdHours - 1);
    }
  }
  if (cdHoursEl) cdHoursEl.textContent = String(cdHours).padStart(2, '0');
  if (cdMinsEl) cdMinsEl.textContent = String(cdMinutes).padStart(2, '0');
  if (cdSecsEl) cdSecsEl.textContent = String(cdSeconds).padStart(2, '0');
}, 1000);

// ============================================================================
// 7. SCENE 2: DIGITAL TERMINAL & HACK OVERRIDE SEQUENCE (CODE 7488)
// ============================================================================
const injectKeyBtn = document.getElementById('injectKeyBtn');
const terminalLog = document.getElementById('terminalLog');
const countdownStatus = document.getElementById('countdownStatus');
const terminalIndicator = document.getElementById('terminalIndicator');
const terminalAction = document.getElementById('terminalAction');
let hackInProgress = false;

function appendLog(text, className = '') {
  if (!terminalLog) return;
  const p = document.createElement('p');
  p.className = `log-line ${className}`;
  p.textContent = text;
  terminalLog.appendChild(p);
  terminalLog.scrollTop = terminalLog.scrollHeight;
  try { audio.playTypingBlip(); } catch(e) {}
}

// Terminal elements
const terminalInput = document.getElementById('terminalInput');
const passcodeForm = document.getElementById('passcodeForm');
const numpadClear = document.getElementById('numpadClear');
const numpadEnter = document.getElementById('numpadEnter');

// Fast, responsive numpad key press handler
function handleNumpadInput(val) {
  if (hackInProgress) return;
  if (!terminalInput) return;
  try { audio.playTypingBlip(); } catch(e) {}
  if (terminalInput.value.length < 4) {
    terminalInput.value += val;
  }
}

// On-screen Numpad key clicking (Fast pointerdown + click support)
document.querySelectorAll('.numpad-key[data-val]').forEach(key => {
  let touchHandled = false;
  const triggerVal = (e) => {
    if (e.type === 'pointerdown') touchHandled = true;
    else if (e.type === 'click' && touchHandled) {
      touchHandled = false;
      return;
    }
    e.preventDefault();
    handleNumpadInput(key.dataset.val);
    key.classList.add('flashing');
    setTimeout(() => key.classList.remove('flashing'), 220);
  };
  key.addEventListener('pointerdown', triggerVal);
  key.addEventListener('click', triggerVal);
});

if (numpadClear) {
  let touchHandled = false;
  const triggerClear = (e) => {
    if (e.type === 'pointerdown') touchHandled = true;
    else if (e.type === 'click' && touchHandled) {
      touchHandled = false;
      return;
    }
    e.preventDefault();
    try { audio.playTypingBlip(); } catch(e) {}
    if (terminalInput) {
      terminalInput.value = terminalInput.value.slice(0, -1);
    }
    numpadClear.classList.add('flashing');
    setTimeout(() => numpadClear.classList.remove('flashing'), 220);
  };
  numpadClear.addEventListener('pointerdown', triggerClear);
  numpadClear.addEventListener('click', triggerClear);
}

if (numpadEnter) {
  let touchHandled = false;
  const triggerEnter = (e) => {
    if (e.type === 'pointerdown') touchHandled = true;
    else if (e.type === 'click' && touchHandled) {
      touchHandled = false;
      return;
    }
    e.preventDefault();
    numpadEnter.classList.add('flashing');
    setTimeout(() => numpadEnter.classList.remove('flashing'), 220);
    submitPasscode();
  };
  numpadEnter.addEventListener('pointerdown', triggerEnter);
  numpadEnter.addEventListener('click', triggerEnter);
}

// Support physical hardware keyboard for desktop without popping mobile keyboard
document.addEventListener('keydown', (e) => {
  const sceneTerminal = document.getElementById('scene-terminal');
  if (!sceneTerminal || !sceneTerminal.classList.contains('active')) return;
  if (hackInProgress) return;

  if (e.key >= '0' && e.key <= '9') {
    if (terminalInput && terminalInput.value.length < 4) {
      terminalInput.value += e.key;
      try { audio.playTypingBlip(); } catch(e) {}
      const keyEl = document.querySelector(`.numpad-key[data-val="${e.key}"]`);
      if (keyEl) {
        keyEl.classList.add('flashing');
        setTimeout(() => keyEl.classList.remove('flashing'), 280);
      }
    }
  } else if (e.key === 'Backspace') {
    if (terminalInput) {
      terminalInput.value = terminalInput.value.slice(0, -1);
      try { audio.playTypingBlip(); } catch(e) {}
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    submitPasscode();
  }
});

// Passcode Submission & Verification
function submitPasscode() {
  if (hackInProgress) return;
  const enteredCode = (terminalInput ? terminalInput.value.trim() : '');

  if (!enteredCode) {
    appendLog('> [ERROR]: PLEASE ENTER THE 4-DIGIT PASSCODE FOUND FROM STEP 1!', 'error');
    try { audio.playBuzzer(); } catch(e) {}
    return;
  }

  appendLog(`> PASSCODE ENTERED: "${enteredCode}"`);
  appendLog('> VERIFYING DHIRAJ VIP AUTHORIZATION...');

  if (enteredCode === "7488") {
    // Correct Passcode
    hackInProgress = true;
    if (injectKeyBtn) injectKeyBtn.disabled = true;
    if (terminalInput) terminalInput.disabled = true;

    setTimeout(() => {
      try { audio.playChime(); } catch(e) {}
      appendLog('> [PASSCODE 7488 MATCHED ⚡]: ACCESS AUTHORIZED!', 'success');
      appendLog('> VIP PASSCODE VERIFIED FOR THE BIRTHDAY BOY (DHIRAJ KUMAR)');

      const hackSteps = [
        '> BYPASSING SECURITY SCANNER... [##########] 100%',
        '> IDENTITY CONFIRMED: THE LEGEND (DHIRAJ KUMAR)',
        '> DISARMING COUNTDOWN TIMER...',
        '> [SUCCESS ⚡]: COUNTDOWN OVERRIDDEN & UNLOCKED!',
        '> DIGITAL VAULT UNLOCKED! WELCOME! 🔓'
      ];

      hackSteps.forEach((step, idx) => {
        setTimeout(() => {
          appendLog(step, idx >= 2 ? 'success' : 'hack');
          if (idx === 3) {
            countdownHacked = true;
            countdownStatus.textContent = 'STATUS: [UNLOCKED WITH CODE 7488 ⚡] VIP Entry Granted!';
            countdownStatus.classList.add('hacked');
            if (cdHoursEl) cdHoursEl.textContent = '00';
            if (cdMinsEl) cdMinsEl.textContent = '00';
            if (cdSecsEl) cdSecsEl.textContent = '00';
          }
          if (idx === hackSteps.length - 1) {
            try { audio.playVaultUnlock(); } catch(e) {}
            terminalIndicator.textContent = '● UNLOCKED';
            terminalIndicator.style.color = '#00ff66';
            terminalAction.style.display = 'block';
            triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.65, 50);
            if (terminalAction) {
              terminalAction.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }, idx * 450);
      });
    }, 600);

  } else {
    // Incorrect Passcode: Red Alert Feedback
    try { audio.playBuzzer(); } catch(e) {}
    appendLog(`> [SECURITY ALERT ❌]: "${enteredCode}" IS INVALID!`, 'error');
    appendLog('> HINT: Check the balloons in Step 1 for the lucky 4-digit code (7488).', 'error');

    // Shake input
    if (terminalInput) {
      terminalInput.style.borderColor = '#ff3e78';
      setTimeout(() => {
        terminalInput.style.borderColor = '';
      }, 800);
    }
  }
}

if (injectKeyBtn) {
  let unlockHandled = false;
  const triggerUnlock = (e) => {
    if (e.type === 'pointerdown') unlockHandled = true;
    else if (e.type === 'click' && unlockHandled) {
      unlockHandled = false;
      return;
    }
    e.preventDefault();
    submitPasscode();
  };
  injectKeyBtn.addEventListener('pointerdown', triggerUnlock);
  injectKeyBtn.addEventListener('click', triggerUnlock);
}

if (passcodeForm) {
  passcodeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitPasscode();
  });
}

const openVaultBtn = document.getElementById('openVaultBtn');
if (openVaultBtn) {
  openVaultBtn.addEventListener('click', () => {
    updateStepTracker(3);
  });
}

// ============================================================================
// 8. SCENE 3: INTERACTIVE 3D FLIP FLASH CARDS & MODAL READER
// ============================================================================
// 8. SCENE 3: REALISTIC SKY LANTERN CEREMONY (HOT AIR BUOYANCY & SACRED FLAME)
// ============================================================================
let lanternIgnited = false;
let lanternReleased = false;
let heatProgress = 0;
let heatInterval = null;

const mainSkyLantern = document.getElementById('mainSkyLantern');
const lanternFlame = document.getElementById('lanternFlame');
const lanternHeatHaze = document.getElementById('lanternHeatHaze');
const lanternTouchHint = document.getElementById('lanternTouchHint');
const igniteLanternBtn = document.getElementById('igniteLanternBtn');
const releaseLanternBtn = document.getElementById('releaseLanternBtn');
const heatProgressBox = document.getElementById('heatProgressBox');
const heatPercentage = document.getElementById('heatPercentage');
const heatFill = document.getElementById('heatFill');
const lanternWishText = document.getElementById('lanternWishText');
const lanternBlessingCard = document.getElementById('lanternBlessingCard');
const distantLanternsLayer = document.getElementById('distantLanternsLayer');
const goToCakeBtn = document.getElementById('goToCakeBtn');
const customWishInput = document.getElementById('customWishInput');
const lanternStage = document.getElementById('lanternStage');

// Wish Chips Selection & Custom Prayer Input
const wishChips = document.querySelectorAll('.wish-chip');
wishChips.forEach(chip => {
  chip.addEventListener('click', () => {
    wishChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    if (customWishInput) customWishInput.value = '';
    const selectedWish = chip.dataset.wish;
    if (lanternWishText) {
      lanternWishText.style.opacity = '0';
      lanternWishText.style.transform = 'translateY(4px)';
      setTimeout(() => {
        lanternWishText.textContent = selectedWish;
        lanternWishText.style.opacity = '1';
        lanternWishText.style.transform = 'translateY(0)';
      }, 200);
    }
    audio.playTypingBlip();
  });
});

if (customWishInput) {
  customWishInput.addEventListener('input', (e) => {
    wishChips.forEach(c => c.classList.remove('active'));
    const text = e.target.value.trim();
    if (lanternWishText) {
      lanternWishText.textContent = text || 'May Maha Dev always protect, guide and bless Dhiraj with infinite joy! 🙏✨';
    }
  });
}

// Function to ignite Diya and fill lantern with glowing hot air
function igniteLanternDiya() {
  if (lanternIgnited) return;
  lanternIgnited = true;
  
  // Enter Pure Sky Fullscreen Mode immediately!
  document.body.classList.add('pure-sky-mode');
  if (lanternStage) {
    lanternStage.classList.add('fullscreen-sky');
  }

  // Play sacred flame ignition sound
  audio.playFlameIgnite();

  if (igniteLanternBtn) {
    igniteLanternBtn.style.display = 'none';
  }
  if (heatProgressBox) {
    heatProgressBox.style.display = 'block';
  }
  if (lanternTouchHint) {
    lanternTouchHint.textContent = '🔥 Warm air is rising... Please wait a moment!';
  }

  // Ignite holy flame with realistic flicker & glow
  if (lanternFlame) {
    lanternFlame.classList.add('ignited');
  }
  if (mainSkyLantern) {
    mainSkyLantern.classList.add('warming-up');
  }
  if (lanternHeatHaze) {
    lanternHeatHaze.classList.add('active');
  }

  // Gradual Buoyancy filling (0% to 100% in approx 2.8 seconds)
  heatProgress = 0;
  heatInterval = setInterval(() => {
    heatProgress += 2.5;
    if (heatProgress > 100) heatProgress = 100;

    if (heatFill) heatFill.style.width = `${heatProgress}%`;
    if (heatPercentage) heatPercentage.textContent = `${Math.round(heatProgress)}%`;

    // Scale lantern slightly with hot air expansion
    const expandScale = 1 + (heatProgress / 100) * 0.08;
    if (mainSkyLantern && !lanternReleased) {
      mainSkyLantern.style.transform = `scale(${expandScale}) translateY(${-heatProgress * 0.12}px)`;
    }

    if (heatProgress >= 100) {
      clearInterval(heatInterval);
      heatInterval = null;
      lanternReadyForLaunch();
    }
  }, 70);
}

function lanternReadyForLaunch() {
  audio.playFanfare();
  triggerSparkleRain(10, 4);

  if (mainSkyLantern) {
    mainSkyLantern.classList.add('ready-to-float');
  }

  if (releaseLanternBtn) {
    releaseLanternBtn.style.display = 'inline-flex';
    releaseLanternBtn.classList.add('btn-pulse');
  }
  if (heatPercentage) {
    heatPercentage.textContent = '100% BUOYANCY REACHED!';
  }
  if (lanternTouchHint) {
    lanternTouchHint.textContent = '✨ Ready! Touch Diya or Button to Release 🌌';
  }
}

// Function to create realistic background constellation of floating lanterns
function spawnDistantLanterns() {
  if (!distantLanternsLayer) return;
  distantLanternsLayer.innerHTML = '';

  const colors = ['#ffd269', '#ff9800', '#ff6b35', '#fca311', '#ffe49e'];

  for (let i = 0; i < 28; i++) {
    const lantern = document.createElement('div');
    lantern.className = 'distant-lantern';
    const size = Math.floor(Math.random() * 16) + 12; // 12px to 28px
    const leftPercent = Math.random() * 94 + 3; // 3% to 97%
    const delay = Math.random() * 6.0;
    const duration = Math.random() * 6 + 14; // 14s to 20s calm slow float speed
    const color = colors[Math.floor(Math.random() * colors.length)];
    const sway = (Math.random() - 0.5) * 60; // gentle wind drift

    lantern.style.width = `${size}px`;
    lantern.style.height = `${size * 1.35}px`;
    lantern.style.left = `${leftPercent}%`;
    lantern.style.animationDelay = `${delay}s`;
    lantern.style.animationDuration = `${duration}s`;
    lantern.style.setProperty('--drift-x', `${sway}px`);
    lantern.style.setProperty('--lantern-tint', color);

    distantLanternsLayer.appendChild(lantern);
  }
}

// Function to launch the lantern into the starry night sky (Slow, peaceful 16-second ascent)
function launchSkyLantern() {
  if (lanternReleased) return;
  lanternReleased = true;

  audio.playChime();
  if (releaseLanternBtn) releaseLanternBtn.style.display = 'none';
  if (heatProgressBox) heatProgressBox.style.display = 'none';
  if (lanternTouchHint) lanternTouchHint.style.display = 'none';

  // Fade out control station completely so NOTHING is on screen except the night sky & lantern!
  const lcs = document.querySelector('.lantern-control-station');
  if (lcs) {
    lcs.classList.add('fade-out');
    setTimeout(() => { lcs.style.display = 'none'; }, 400);
  }

  // Clear inline transform so CSS @keyframes ascendToStars runs smoothly without conflicts
  if (mainSkyLantern) {
    mainSkyLantern.style.transform = '';
    mainSkyLantern.classList.remove('warming-up', 'ready-to-float');
    mainSkyLantern.classList.add('ascending-to-sky');
  }

  // Release flock of 28 floating background lanterns
  spawnDistantLanterns();

  // Gentle glitter shower as the prayer ascends
  triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45, 50);

  // Soft sparkle rain after 3.5s
  setTimeout(() => {
    triggerSparkleRain(10, 5);
  }, 3500);

  // After 8.5s (when lantern is gliding serenely across the stars), reveal the minimal blessing card
  setTimeout(() => {
    if (lanternBlessingCard) {
      lanternBlessingCard.style.display = 'block';
      lanternBlessingCard.classList.add('slide-up-glow');
      audio.playChime();
    }
    if (goToCakeBtn) {
      goToCakeBtn.style.display = 'inline-flex';
      goToCakeBtn.classList.add('btn-pulse');
    }
  }, 8500);
}

if (igniteLanternBtn) {
  igniteLanternBtn.addEventListener('click', igniteLanternDiya);
}
if (releaseLanternBtn) {
  releaseLanternBtn.addEventListener('click', launchSkyLantern);
}

// Clicking the lantern or Diya directly also triggers ignition or launch intuitively!
if (mainSkyLantern) {
  mainSkyLantern.addEventListener('click', () => {
    if (!lanternIgnited) {
      igniteLanternDiya();
    } else if (heatProgress >= 100 && !lanternReleased) {
      launchSkyLantern();
    }
  });
}

// Step 4 Navigation
if (goToCakeBtn) {
  goToCakeBtn.addEventListener('click', () => {
    // Exit pure sky mode smoothly
    document.body.classList.remove('pure-sky-mode');
    if (lanternStage) lanternStage.classList.remove('fullscreen-sky');
    audio.playFanfare();
    updateStepTracker(4);
  });
}

// ============================================================================
// 9. SCENE 4: INTERACTIVE CAKE CUTTING & SYSTEMATIC CANDLE BLOW
// ============================================================================
const cakeWrapper = document.getElementById('cakeWrapper');
const cakeKnife = document.getElementById('cakeKnife');
const cakeCutLine = document.getElementById('cakeCutLine');
const blowCandlesBtn = document.getElementById('blowCandlesBtn');
const cutCakeBtn = document.getElementById('cutCakeBtn');
const cakeInstructionBox = document.getElementById('cakeInstructionBox');
const cakeStageDesc = document.getElementById('cakeStageDesc');
const wishTip = document.getElementById('wishTip');
const wishStatusBox = document.getElementById('wishStatusBox');
const partyStatusPill = document.getElementById('partyStatusPill');
const cakeCelebrationBanner = document.getElementById('cakeCelebrationBanner');
const goToFinaleBtn = document.getElementById('goToFinaleBtn');

let candlesBlown = false;
let cakeSliced = false;
let continuousPartyInterval = null;
let rocketFireInterval = null;

// ── Rocket Fireworks Engine ──────────────────────────────────────────────────
const rockets = [];
function launchRocket() {
  const startX = Math.random() * animWidth;
  const targetY = Math.random() * (animHeight * 0.55) + 40;
  const colors = ['#ffd269', '#ff3e78', '#00f0ff', '#9d4edd', '#ff8c00', '#39ff14', '#ff61a6'];
  rockets.push({
    x: startX,
    y: animHeight + 10,
    tx: startX + (Math.random() - 0.5) * 180,
    ty: targetY,
    speed: Math.random() * 5 + 7,
    trail: [],
    exploded: false,
    color: colors[Math.floor(Math.random() * colors.length)],
    particles: [],
    explodeAge: 0
  });
}

function renderRockets() {
  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i];
    if (!r.exploded) {
      // Move toward target
      const dx = r.tx - r.x;
      const dy = r.ty - r.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < r.speed + 5) {
        // EXPLODE!
        r.exploded = true;
        const numParticles = 55 + Math.floor(Math.random() * 25);
        for (let j = 0; j < numParticles; j++) {
          const angle = (Math.PI * 2 / numParticles) * j;
          const speed = Math.random() * 5 + 2.5;
          r.particles.push({
            x: r.x, y: r.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1,
            life: 1,
            decay: Math.random() * 0.025 + 0.018,
            size: Math.random() * 3.5 + 1.5,
            color: r.color
          });
        }
        // Extra sparkles in random colors
        const sparkColors = ['#fff', '#ffd269', '#00f0ff'];
        for (let s = 0; s < 15; s++) {
          const angle = Math.random() * Math.PI * 2;
          r.particles.push({
            x: r.x, y: r.y,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            life: 1,
            decay: 0.04,
            size: Math.random() * 2 + 0.8,
            color: sparkColors[Math.floor(Math.random() * sparkColors.length)]
          });
        }
        audio.playCrackerSound();
      } else {
        // Store trail
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();
        r.x += (dx / dist) * r.speed;
        r.y += (dy / dist) * r.speed;
        // Draw trail
        r.trail.forEach((pt, ti) => {
          confettiCtx.beginPath();
          confettiCtx.arc(pt.x, pt.y, 2.5 - ti * 0.25, 0, Math.PI * 2);
          confettiCtx.fillStyle = r.color;
          confettiCtx.globalAlpha = (ti / r.trail.length) * 0.7;
          confettiCtx.fill();
        });
        // Draw rocket head
        confettiCtx.beginPath();
        confettiCtx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
        confettiCtx.fillStyle = '#fff';
        confettiCtx.globalAlpha = 1;
        confettiCtx.fill();
      }
    } else {
      // Render explosion particles
      r.explodeAge++;
      let allDead = true;
      r.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.97;
        p.life -= p.decay;
        if (p.life > 0) {
          allDead = false;
          confettiCtx.beginPath();
          confettiCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          confettiCtx.fillStyle = p.color;
          confettiCtx.globalAlpha = Math.max(0, p.life);
          confettiCtx.shadowColor = p.color;
          confettiCtx.shadowBlur = p.size * 4;
          confettiCtx.fill();
          confettiCtx.shadowBlur = 0;
        }
      });
      if (allDead) rockets.splice(i, 1);
    }
  }
  confettiCtx.globalAlpha = 1;
}

// Hook rocket rendering into confetti loop
(function patchConfettiLoop() {
  const origRender = renderConfetti;
  window._rocketRenderHooked = true;
})();

// We override confetti render to also draw rockets & glowing festival bokeh particles
const _origRenderConfetti = renderConfetti;
function renderConfettiAndRockets() {
  confettiCtx.clearRect(0, 0, animWidth, animHeight);
  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const p = confettiPieces[i];
    p.x += p.vx; p.y += p.vy;
    p.vy += (p.gravity !== undefined ? p.gravity : 0.28);
    p.vx *= (p.drag !== undefined ? p.drag : 0.985);
    p.rotation += p.vRot;
    p.opacity -= p.decay;
    if (p.opacity <= 0 || p.y > animHeight + 60) { confettiPieces.splice(i, 1); continue; }
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.globalAlpha = Math.max(0, p.opacity);
    if (p.glow) {
      confettiCtx.shadowColor = p.color;
      confettiCtx.shadowBlur = p.size * 2.5;
    }
    confettiCtx.fillStyle = p.color;
    if (p.shape === 'rect') {
      confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      confettiCtx.beginPath();
      confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      confettiCtx.fill();
    }
    confettiCtx.restore();
  }
  renderRockets();
  requestAnimationFrame(renderConfettiAndRockets);
}
renderConfettiAndRockets();

function startContinuousRockets() {
  if (rocketFireInterval) return;
  launchRocket();
  setTimeout(launchRocket, 300);
  setTimeout(launchRocket, 700);
  rocketFireInterval = setInterval(() => {
    launchRocket();
    if (Math.random() > 0.4) setTimeout(launchRocket, 350);
    if (Math.random() > 0.65) setTimeout(launchRocket, 700);
  }, 1200);
}

function stopContinuousRockets() {
  if (rocketFireInterval) {
    clearInterval(rocketFireInterval);
    rocketFireInterval = null;
  }
}

// ============================================================================
// MEGA FESTIVE CONFETTI & CRACKER STORM (Matches user image: dense glowing bokeh & rockets)
// ============================================================================
const FESTIVE_BOKEH_COLORS = [
  '#ff3e78', '#ff1493', '#ff69b4', // Vibrant Pinks
  '#00f0ff', '#00d2ff', '#38bdf8', // Electric Cyans
  '#ffd23f', '#ffd700', '#ffb703', // Radiant Golds / Yellows
  '#39ff14', '#22c55e', '#10b981', // Neon Lime Greens
  '#a855f7', '#c084fc', '#8338ec', // Royal Violets
  '#ff8c00', '#fb8500',           // Festive Oranges
  '#ffffff'                       // Shimmering Pure Whites
];

function triggerMegaFestiveStorm(totalCount = 480) {
  // 1. Play grand festival cracker sound & horn
  audio.playGrandCrackerBarrage();
  audio.playPartyHorn();

  // 2. Launch multiple rockets in rapid succession
  for (let k = 0; k < 6; k++) {
    setTimeout(() => launchRocket(), k * 160);
  }

  // 3. Multi-point epicenter explosions (spread across screen like in user's image)
  const epicenters = [
    { x: animWidth * 0.15, y: animHeight * 0.35 },
    { x: animWidth * 0.35, y: animHeight * 0.28 },
    { x: animWidth * 0.50, y: animHeight * 0.32 },
    { x: animWidth * 0.65, y: animHeight * 0.28 },
    { x: animWidth * 0.85, y: animHeight * 0.35 },
    { x: animWidth * 0.50, y: animHeight * 0.55 }
  ];

  epicenters.forEach((pt, eIdx) => {
    setTimeout(() => {
      const perPoint = Math.floor(totalCount / epicenters.length);
      for (let i = 0; i < perPoint; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 20 + 3.5;
        const isBokehOrb = Math.random() > 0.15; // 85% circles like in user's image!
        confettiPieces.push({
          x: pt.x + (Math.random() - 0.5) * 50,
          y: pt.y + (Math.random() - 0.5) * 50,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (Math.random() * 5 + 2),
          size: isBokehOrb ? (Math.random() * 10 + 4.5) : (Math.random() * 6 + 4),
          color: FESTIVE_BOKEH_COLORS[Math.floor(Math.random() * FESTIVE_BOKEH_COLORS.length)],
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 14,
          shape: isBokehOrb ? 'circle' : 'rect',
          opacity: 1,
          decay: Math.random() * 0.007 + 0.005, // Slower decay so screen stays flooded longer
          glow: true,
          gravity: Math.random() * 0.18 + 0.12,
          drag: 0.988
        });
      }
    }, eIdx * 110);
  });

  // Dual cannons from bottom
  setTimeout(triggerDualCannons, 200);
  setTimeout(triggerDualCannons, 700);
}

// ── Cake Typewriter ──────────────────────────────────────────────────────────
const HBD_TEXT = '🎉 HAPPY BIRTHDAY, DHIRAJ! 🎂';
const HBD_SUB = '✨ May all your biggest dreams come true! ✨';

function startCakeTypewriter() {
  const typedEl = document.getElementById('cakeHbdTyped');
  const cursorEl = document.getElementById('cakeHbdCursor');
  const subEl = document.getElementById('cakeHbdSub');

  if (!typedEl) return;
  typedEl.textContent = '';
  if (subEl) subEl.textContent = '';
  if (cursorEl) cursorEl.classList.remove('done');

  let i = 0;
  function typeNext() {
    if (i < HBD_TEXT.length) {
      const ch = HBD_TEXT[i];
      typedEl.textContent += ch;
      i++;
      // Speed: emoji & spaces fast, others normal
      const delay = (ch === ' ') ? 55 : (i % 3 === 0 ? 75 : 60);
      if (ch !== ' ' && ch !== '!' && ch !== '🎉' && ch !== '🎂') audio.playTypewriterKey();
      setTimeout(typeNext, delay);
    } else {
      // Done typing — hide cursor & reveal date subtitle
      if (cursorEl) cursorEl.classList.add('done');
      if (subEl) {
        subEl.textContent = HBD_SUB;
        subEl.classList.add('show');
      }
    }
  }
  setTimeout(typeNext, 300);
}

// 1. Systematic Candle Blow (One by One)
function blowOutCandlesSystematic() {
  if (candlesBlown) return;
  candlesBlown = true;
  if (blowCandlesBtn) blowCandlesBtn.disabled = true;

  const flames = [
    document.getElementById('flame1'),
    document.getElementById('flame2'),
    document.getElementById('flame3'),
    document.getElementById('flame4')
  ];

  flames.forEach((flame, idx) => {
    setTimeout(() => {
      if (flame) {
        flame.classList.add('extinguished');
        const candleParent = flame.closest('.candle');
        if (candleParent) candleParent.classList.add('blown');
      }
      audio.playCandleBlow();

      // When last candle is blown
      if (idx === flames.length - 1) {
        setTimeout(() => {
          audio.playChime();
          if (blowCandlesBtn) blowCandlesBtn.style.display = 'none';
          if (cutCakeBtn) {
            cutCakeBtn.style.display = 'inline-flex';
            cutCakeBtn.disabled = false;
          }
          if (wishTip) wishTip.textContent = "All candles blown! 🕯️ Now slice the cake with the knife!";
          if (cakeKnife) {
            cakeKnife.classList.add('visible');
            cakeKnife.style.pointerEvents = 'auto';
          }

          // Automatically erase/fade out STEP 04 header text as soon as all candles are off!
          if (cakeInstructionBox) {
            cakeInstructionBox.classList.add('fade-erase');
            setTimeout(() => {
              cakeInstructionBox.style.display = 'none';
            }, 500);
          }
        }, 300);
      }
    }, idx * 300);
  });
}

// 2. Interactive Cake Cutting Ceremony — FULLY FIXED
function cutTheCake() {
  if (cakeSliced) return;

  // If candles not blown yet, extinguish instantly first
  if (!candlesBlown) {
    candlesBlown = true;
    ['flame1', 'flame2', 'flame3', 'flame4'].forEach(id => {
      const f = document.getElementById(id);
      if (f) f.classList.add('extinguished');
    });
    if (blowCandlesBtn) blowCandlesBtn.style.display = 'none';
    if (cakeInstructionBox) {
      cakeInstructionBox.classList.add('fade-erase');
      setTimeout(() => { cakeInstructionBox.style.display = 'none'; }, 400);
    }
  }

  cakeSliced = true;
  if (cutCakeBtn) cutCakeBtn.disabled = true;

  // Knife: make visible, then animate cutting
  if (cakeKnife) {
    cakeKnife.classList.add('visible');
    cakeKnife.style.pointerEvents = 'none';
  }
  audio.playSliceSound();

  // Short delay then cutting animation
  setTimeout(() => {
    if (cakeKnife) cakeKnife.classList.add('cutting');
  }, 120);

  // After knife slices down, split cake open
  setTimeout(() => {
    // ① SPLIT the cake with realistic 3D gap
    if (cakeWrapper) cakeWrapper.classList.add('sliced');

    // ② HIDE instruction box & buttons completely
    if (cakeInstructionBox) cakeInstructionBox.style.display = 'none';
    if (wishStatusBox) wishStatusBox.style.display = 'none';

    // ③ Fanfare + Cracker audio + Music
    audio.playFanfare();
    audio.playCrackerSound();
    audio.startBirthdayMusic();
    updateMusicButtonState(true);

    // ④ Balloon Pop Explosions around cake
    const rect = cakeWrapper ? cakeWrapper.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    triggerBalloonPopExplosion(rect.left + 30, rect.top);
    triggerBalloonPopExplosion(rect.left + 210, rect.top);
    triggerBalloonPopExplosion(window.innerWidth * 0.15, window.innerHeight * 0.3);
    triggerBalloonPopExplosion(window.innerWidth * 0.85, window.innerHeight * 0.3);

    // ⑤ Chamkila / Glitter Shimmering Golden Rain (Falls gently like gold shine)
    triggerSparkleRain(10, 5);

    // ⑥ Show celebration banner
    if (cakeCelebrationBanner) {
      cakeCelebrationBanner.style.display = 'block';
    }

    // ⑦ Start typewriter Happy Birthday Dhiraj!
    startCakeTypewriter();

    // ⑧ Next button hidden initially for cake celebration
    if (goToFinaleBtn) {
      goToFinaleBtn.style.display = 'none';
      resetShararatiBtn();
    }

    // ⑨ Auto Super Confetti + GRAND CRACKER BARRAGE waves (Matching user image!)
    triggerMegaFestiveStorm(550);
    setTimeout(() => { triggerMegaFestiveStorm(480); }, 1400);
    setTimeout(() => { triggerMegaFestiveStorm(500); }, 2800);
    setTimeout(() => { triggerMegaFestiveStorm(450); }, 4200);

    // ⑩ CONTINUOUS rocket fireworks & confetti cannons
    triggerDualCannons();
    startContinuousRockets();

    // Keep confetti bursts going in background
    let confettiBurstCount = 0;
    if (continuousPartyInterval) clearInterval(continuousPartyInterval);
    continuousPartyInterval = setInterval(() => {
      confettiBurstCount++;
      triggerMegaFestiveStorm(220);
      if (confettiBurstCount >= 20) {
        clearInterval(continuousPartyInterval);
        continuousPartyInterval = null;
      }
    }, 2000);

    // ⑪ After 5.5 seconds of grand celebration — reveal the Shararati (playful) Next button!
    setTimeout(() => {
      revealShararatiFinaleBtn();
    }, 5500);

  }, 850);
}

if (blowCandlesBtn) blowCandlesBtn.addEventListener('click', blowOutCandlesSystematic);
if (cutCakeBtn) cutCakeBtn.addEventListener('click', cutTheCake);

// Clicking cake knife directly triggers cake cut
if (cakeKnife) {
  cakeKnife.addEventListener('click', () => cutTheCake());
}

// Clicking cake directly handles both steps intuitively
if (cakeWrapper) {
  cakeWrapper.addEventListener('click', () => {
    if (!candlesBlown) {
      blowOutCandlesSystematic();
    } else if (!cakeSliced) {
      cutTheCake();
    }
  });
}

// ============================================================================
// SHARARATI (PLAYFUL DODGING) NEXT BUTTON LOGIC
// ============================================================================
let finaleBtnDodges = 0;
let finaleBtnReady = false;

function resetShararatiBtn() {
  finaleBtnDodges = 0;
  finaleBtnReady = false;
  if (!goToFinaleBtn) return;
  goToFinaleBtn.style.transform = '';
  goToFinaleBtn.style.opacity = '';
  goToFinaleBtn.style.transition = '';
  goToFinaleBtn.classList.remove('btn-pulse', 'btn-ready-glow');
  goToFinaleBtn.innerHTML = '<span>Proceed to Step 5: Final Wish by Dippu 💌 →</span>';
}

function revealShararatiFinaleBtn() {
  if (!goToFinaleBtn) return;
  resetShararatiBtn();
  goToFinaleBtn.style.display = 'inline-flex';
  goToFinaleBtn.style.transform = 'scale(0.7)';
  goToFinaleBtn.style.opacity = '0';
  goToFinaleBtn.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  goToFinaleBtn.classList.add('btn-pulse');

  setTimeout(() => {
    goToFinaleBtn.style.transform = 'scale(1)';
    goToFinaleBtn.style.opacity = '1';
    audio.playChime();
  }, 40);
}

function handleShararatiDodge(e) {
  if (finaleBtnReady) return;

  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  finaleBtnDodges++;
  audio.playPlayfulBoing();

  const rect = goToFinaleBtn.getBoundingClientRect();
  const burstX = rect.left + rect.width / 2;
  const burstY = rect.top + rect.height / 2;
  triggerConfettiBurst(burstX, burstY, 35);

  if (finaleBtnDodges === 1) {
    // 1st Dodge: Jumps left with a funny tilt!
    goToFinaleBtn.style.transition = 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    goToFinaleBtn.style.transform = 'translate(-95px, -14px) rotate(-8deg) scale(0.95)';
    goToFinaleBtn.innerHTML = '<span>😜 Pakad ke dikhao! (Catch me!)</span>';
  } else if (finaleBtnDodges === 2) {
    // 2nd Dodge: Jumps right with a reverse tilt!
    goToFinaleBtn.style.transition = 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    goToFinaleBtn.style.transform = 'translate(100px, 14px) rotate(8deg) scale(0.95)';
    goToFinaleBtn.innerHTML = '<span>💃 Arey ruko, thoda celebration to dekh lo! 🎉</span>';

    // After 1.1s, settle smoothly back to center with success ready state!
    setTimeout(() => {
      finaleBtnReady = true;
      goToFinaleBtn.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      goToFinaleBtn.style.transform = 'translate(0, 0) scale(1.05)';
      goToFinaleBtn.classList.add('btn-ready-glow');
      goToFinaleBtn.innerHTML = '<span>💌 Achha ab pakad liya! Chalo Dippu Ka Letter Kholein! 🚀</span>';
      audio.playChime();
      triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.7, 50);
    }, 1100);
  }
}

// Hook hover and click/tap for Shararati button
if (goToFinaleBtn) {
  goToFinaleBtn.addEventListener('mouseenter', (e) => {
    if (!finaleBtnReady && goToFinaleBtn.style.display !== 'none' && goToFinaleBtn.style.opacity === '1') {
      handleShararatiDodge(e);
    }
  });

  goToFinaleBtn.addEventListener('click', (e) => {
    if (!finaleBtnReady) {
      handleShararatiDodge(e);
      return;
    }
    // Proceed to Step 5!
    updateStepTracker(5);
    triggerMegaFestiveStorm(550);
    setTimeout(() => {
      openEnvelopeSequence();
    }, 4500);
  });
}

// ============================================================================
// 10. SCENE 5: REALISTIC ANIMATED TYPEWRITER LETTER BY DIPPU & CONTROLS
// ============================================================================
const typewriterState = {
  running: false,
  completed: false,
  cancelled: false,
  timeoutIds: []
};

function clearTypewriterTimeouts() {
  typewriterState.cancelled = true;
  typewriterState.running = false;
  typewriterState.timeoutIds.forEach(id => clearTimeout(id));
  typewriterState.timeoutIds = [];
}

function typeWait(ms) {
  return new Promise(resolve => {
    if (typewriterState.cancelled) return;
    const tid = setTimeout(resolve, ms);
    typewriterState.timeoutIds.push(tid);
  });
}

async function typeTextAsync(targetEl, text, speed = 32, cursorEl) {
  for (let i = 0; i < text.length; i++) {
    if (typewriterState.cancelled) return;
    const ch = text[i];
    targetEl.textContent += ch;
    if (cursorEl && targetEl.parentNode) {
      targetEl.parentNode.appendChild(cursorEl);
    }
    // Subtle typewriter click
    if (ch !== ' ' && i % 2 === 0) {
      audio.playTypewriterKey();
    }
    // Natural human pauses on commas, periods, quotes
    let delay = speed;
    if (ch === ',' || ch === '—') delay = 180;
    else if (ch === '.' || ch === '!' || ch === '?' || ch === '”') delay = 260;
    await typeWait(delay);
  }
}

function renderFullLetterImmediately() {
  clearTypewriterTimeouts();
  typewriterState.completed = true;

  const container = document.getElementById('typewriterContent');
  const quillStatus = document.getElementById('quillStatus');
  const skipBtn = document.getElementById('skipTypingBtn');
  if (!container) return;

  container.innerHTML = `
    <div class="letter-royal-header">
      <div class="letter-star-title">💌 A Letter Written in the Stars 🌌</div>
      <div class="letter-sub-title">A LETTER, JUST FOR YOU ✦</div>
    </div>

    <div class="letter-salutation">Dear Dhiraj, ❤️</div>

    <p class="letter-para">Kabhi-kabhi life mein kuch log milte hain jo dheere-dheere hamari life ka ek special part ban jaate hain. And honestly, I'm grateful that I got a best friend like you.</p>

    <p class="letter-para">Maybe main hamesha express nahi karta, but your friendship means a lot to me. It's not about how often we talk or how much time we spend together; it's about the bond, the respect, and the memories that make a friendship special.</p>

    <p class="letter-para">On your birthday, I wish you more than just happiness. I wish you the courage to chase every dream you have, the strength to face every difficult day, and the peace to enjoy every little blessing life gives you.</p>

    <div class="letter-blessing-box">
      May Maha Dev always guide your path, protect you from negativity, bless you with good health and success, and keep that smile on your face. 🙏✨
    </div>

    <p class="letter-para">No matter where life takes us, I hope we keep making memories, laughing at random things, and standing by each other through life's different chapters.</p>

    <p class="letter-para">You deserve beautiful things, genuine happiness, and a future you're proud of.</p>

    <div class="letter-hbd-callout">
      <div class="letter-hbd-heading">🎂 Happy Birthday, mere bhai! 🎂</div>
      <p class="letter-cherish-text">“Some bonds don't need big promises. They just deserve to be cherished. And I'm glad our friendship is one of them.” 🌌</p>
    </div>

    <div class="letter-signoff">
      <div class="signoff-intro">With love and best wishes,</div>
      <div class="signoff-name">Your Best Friend 🤍</div>
    </div>
  `;

  if (quillStatus) quillStatus.textContent = "✨ Written with pure love · by your best friend 🤍";
  if (skipBtn) {
    skipBtn.textContent = "Replay Letter ✍️";
    skipBtn.style.display = 'inline-block';
  }
  audio.playChime();

  const tributeFrame = document.getElementById('tributeFrame');
  if (tributeFrame) {
    tributeFrame.style.display = 'block';
    tributeFrame.style.opacity = '1';
    tributeFrame.style.transform = 'scale(1) translateY(0)';
  }

  // Mega festive fireworks & confetti storm (matching user image!)
  triggerMegaFestiveStorm(550);
  setTimeout(() => triggerMegaFestiveStorm(450), 1500);
}

async function startTypewriterLetter() {
  if (typewriterState.running) return;
  clearTypewriterTimeouts();
  typewriterState.cancelled = false;
  typewriterState.running = true;
  typewriterState.completed = false;

  const container = document.getElementById('typewriterContent');
  const quillStatus = document.getElementById('quillStatus');
  const skipBtn = document.getElementById('skipTypingBtn');
  if (!container) return;

  container.innerHTML = '';
  if (skipBtn) {
    skipBtn.style.display = 'inline-block';
    skipBtn.textContent = 'Skip Typing ⏩';
  }

  // Create blinking cursor
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';

  if (quillStatus) quillStatus.textContent = "✍️ Writing a heartfelt message for you, Dhiraj...";
  await typeWait(200);
  if (typewriterState.cancelled) return;

  // Header Section
  const headerDiv = document.createElement('div');
  headerDiv.className = 'letter-royal-header';
  const title1 = document.createElement('div');
  title1.className = 'letter-star-title';
  headerDiv.appendChild(title1);
  headerDiv.appendChild(cursor);
  container.appendChild(headerDiv);

  await typeTextAsync(title1, "💌 A Letter Written in the Stars 🌌", 15, cursor);
  await typeWait(200);
  if (typewriterState.cancelled) return;

  const subTitle = document.createElement('div');
  subTitle.className = 'letter-sub-title';
  headerDiv.appendChild(subTitle);
  await typeTextAsync(subTitle, "A LETTER, JUST FOR YOU ✦", 12, cursor);
  await typeWait(300);
  if (typewriterState.cancelled) return;

  // Salutation
  const salutation = document.createElement('div');
  salutation.className = 'letter-salutation';
  container.appendChild(salutation);
  container.appendChild(cursor);
  await typeTextAsync(salutation, "Dear Dhiraj, ❤️", 16, cursor);
  await typeWait(350);
  if (typewriterState.cancelled) return;

  // Paragraph 1
  if (quillStatus) quillStatus.textContent = "✨ Remembering how special our friendship is...";
  const p1 = document.createElement('p');
  p1.className = 'letter-para';
  container.appendChild(p1);
  container.appendChild(cursor);
  await typeTextAsync(p1, "Kabhi-kabhi life mein kuch log milte hain jo dheere-dheere hamari life ka ek special part ban jaate hain. And honestly, I'm grateful that I got a best friend like you.", 14, cursor);
  await typeWait(380);
  if (typewriterState.cancelled) return;

  // Paragraph 2
  const p2 = document.createElement('p');
  p2.className = 'letter-para';
  container.appendChild(p2);
  container.appendChild(cursor);
  await typeTextAsync(p2, "Maybe main hamesha express nahi karta, but your friendship means a lot to me. It's not about how often we talk or how much time we spend together; it's about the bond, the respect, and the memories that make a friendship special.", 14, cursor);
  await typeWait(380);
  if (typewriterState.cancelled) return;

  // Paragraph 3
  if (quillStatus) quillStatus.textContent = "🎂 Penning warm birthday wishes...";
  const p3 = document.createElement('p');
  p3.className = 'letter-para';
  container.appendChild(p3);
  container.appendChild(cursor);
  await typeTextAsync(p3, "On your birthday, I wish you more than just happiness. I wish you the courage to chase every dream you have, the strength to face every difficult day, and the peace to enjoy every little blessing life gives you.", 14, cursor);
  await typeWait(380);
  if (typewriterState.cancelled) return;

  // Mahadev Blessing Box
  if (quillStatus) quillStatus.textContent = "🙏 Adding Mahadev's sacred blessings...";
  const blessBox = document.createElement('div');
  blessBox.className = 'letter-blessing-box';
  container.appendChild(blessBox);
  container.appendChild(cursor);
  await typeTextAsync(blessBox, "May Maha Dev always guide your path, protect you from negativity, bless you with good health and success, and keep that smile on your face. 🙏✨", 15, cursor);
  await typeWait(400);
  if (typewriterState.cancelled) return;

  // Paragraph 4
  const p4 = document.createElement('p');
  p4.className = 'letter-para';
  container.appendChild(p4);
  container.appendChild(cursor);
  await typeTextAsync(p4, "No matter where life takes us, I hope we keep making memories, laughing at random things, and standing by each other through life's different chapters.", 14, cursor);
  await typeWait(350);
  if (typewriterState.cancelled) return;

  // Paragraph 5
  const p5 = document.createElement('p');
  p5.className = 'letter-para';
  container.appendChild(p5);
  container.appendChild(cursor);
  await typeTextAsync(p5, "You deserve beautiful things, genuine happiness, and a future you're proud of.", 14, cursor);
  await typeWait(350);
  if (typewriterState.cancelled) return;

  // Birthday Callout Box
  const callout = document.createElement('div');
  callout.className = 'letter-hbd-callout';
  const hbdHead = document.createElement('div');
  hbdHead.className = 'letter-hbd-heading';
  callout.appendChild(hbdHead);
  callout.appendChild(cursor);
  container.appendChild(callout);

  await typeTextAsync(hbdHead, "🎂 Happy Birthday, mere bhai! 🎂", 16, cursor);
  await typeWait(300);
  if (typewriterState.cancelled) return;

  const cherishP = document.createElement('p');
  cherishP.className = 'letter-cherish-text';
  callout.appendChild(cherishP);
  await typeTextAsync(cherishP, "“Some bonds don't need big promises. They just deserve to be cherished. And I'm glad our friendship is one of them.” 🌌", 15, cursor);
  await typeWait(380);
  if (typewriterState.cancelled) return;

  // Sign-off
  if (quillStatus) quillStatus.textContent = "🤍 Signed with pure love...";
  const signoff = document.createElement('div');
  signoff.className = 'letter-signoff';
  const sIntro = document.createElement('div');
  sIntro.className = 'signoff-intro';
  signoff.appendChild(sIntro);
  signoff.appendChild(cursor);
  container.appendChild(signoff);

  await typeTextAsync(sIntro, "With love and best wishes,", 16, cursor);
  await typeWait(200);
  if (typewriterState.cancelled) return;

  const sName = document.createElement('div');
  sName.className = 'signoff-name';
  signoff.appendChild(sName);
  await typeTextAsync(sName, "Your Best Friend 🤍", 18, cursor);
  await typeWait(250);
  if (typewriterState.cancelled) return;

  // Celebration upon letter completion
  typewriterState.running = false;
  typewriterState.completed = true;
  if (quillStatus) quillStatus.textContent = "✨ Written with pure love · by your best friend 🤍";
  audio.playFanfare();

  // Mega festive fireworks & confetti storm (matching user image!)
  triggerMegaFestiveStorm(550);
  setTimeout(() => triggerMegaFestiveStorm(480), 1500);
  setTimeout(() => triggerMegaFestiveStorm(420), 3000);

  // Reveal golden photo-frame tribute card
  const tributeFrame = document.getElementById('tributeFrame');
  if (tributeFrame) {
    tributeFrame.style.display = 'block';
    tributeFrame.style.opacity = '0';
    tributeFrame.style.transform = 'scale(0.85) translateY(20px)';
    tributeFrame.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
      tributeFrame.style.opacity = '1';
      tributeFrame.style.transform = 'scale(1) translateY(0)';
      audio.playChime();
      triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.7, 80);
    }, 100);
  }
}

// ============================================================================
// GOLDEN ENVELOPE & WAX SEAL INTERACTION
// ============================================================================
const goldenEnvelope = document.getElementById('goldenEnvelope');
const waxSeal = document.getElementById('waxSeal');
const envelopeStage = document.getElementById('envelopeStage');
const starMessageCard = document.getElementById('starMessageCard');
let envelopeOpened = false;

function openEnvelopeSequence() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  // 1. Play wax seal breaking & magical chime sound
  audio.playChime();
  if (waxSeal) waxSeal.classList.add('broken');

  // 2. Open Flap after 300ms
  setTimeout(() => {
    if (goldenEnvelope) goldenEnvelope.classList.add('opened');
    audio.playPigeonFlutter();
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45, 60);

    // 3. Roll out parchment scroll letter after 600ms
    setTimeout(() => {
      // Hide envelope so ONLY the royal parchment paper is on display
      if (envelopeStage) envelopeStage.style.display = 'none';

      if (starMessageCard) {
        starMessageCard.style.display = 'block';
        starMessageCard.classList.add('slide-open');
        starMessageCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // 4. Once paper has finished unrolling (1.4s), start fast typewriter typing!
      setTimeout(() => {
        startTypewriterLetter();
      }, 1450);

    }, 600);
  }, 300);
}

function resetGoldenEnvelope() {
  envelopeOpened = false;
  if (envelopeStage) envelopeStage.style.display = 'flex';
  if (goldenEnvelope) goldenEnvelope.classList.remove('opened');
  if (waxSeal) waxSeal.classList.remove('broken');
  if (starMessageCard) {
    starMessageCard.style.display = 'none';
    starMessageCard.classList.remove('slide-open');
  }
  clearTypewriterTimeouts();
  const container = document.getElementById('typewriterContent');
  if (container) container.innerHTML = '';
  const tributeFrame = document.getElementById('tributeFrame');
  if (tributeFrame) {
    tributeFrame.style.display = 'none';
    tributeFrame.style.opacity = '0';
  }
  const skipBtn = document.getElementById('skipTypingBtn');
  if (skipBtn) {
    skipBtn.style.display = 'none';
    skipBtn.textContent = 'Skip Typing ⏩';
  }
}

if (waxSeal) {
  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelopeSequence();
  });
}
if (goldenEnvelope) {
  goldenEnvelope.addEventListener('click', () => {
    openEnvelopeSequence();
  });
}

const skipTypingBtn = document.getElementById('skipTypingBtn');
if (skipTypingBtn) {
  skipTypingBtn.addEventListener('click', () => {
    if (!typewriterState.completed) {
      renderFullLetterImmediately();
    } else {
      // If already done, replay the typewriter
      startTypewriterLetter();
      skipTypingBtn.textContent = 'Skip Typing ⏩';
    }
  });
}

const superConfettiBtn = document.getElementById('superConfettiBtn');

if (superConfettiBtn) {
  superConfettiBtn.addEventListener('click', () => {
    triggerMegaFestiveStorm(550);
  });
}

const hornBlastBtn = document.getElementById('hornBlastBtn');
if (hornBlastBtn) {
  hornBlastBtn.addEventListener('click', () => {
    audio.playPartyHorn();
    audio.playGrandCrackerBarrage();
    triggerDualCannons();
  });
}

const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicBtnLabel = document.getElementById('musicBtnLabel');
const partyHornBtn = document.getElementById('partyHornBtn');

function updateMusicButtonState(isPlaying) {
  if (isPlaying) {
    musicToggleBtn.classList.add('playing');
    musicBtnLabel.textContent = '🔊 Pause';
  } else {
    musicToggleBtn.classList.remove('playing');
    musicBtnLabel.textContent = '🎵 Music';
  }
}

if (musicToggleBtn) {
  musicToggleBtn.addEventListener('click', () => {
    const isPlaying = audio.toggleMusic();
    updateMusicButtonState(isPlaying);
  });
}

if (partyHornBtn) {
  partyHornBtn.addEventListener('click', () => {
    audio.playPartyHorn();
    triggerConfettiBurst(window.innerWidth * 0.5, 70, 45);
  });
}

// Replay Helper Function (Resets Everything Cleanly & clears storage)
function resetEntireExperience() {
  localStorage.removeItem('dhiraj_birthday_saved_step');
  localStorage.removeItem('dhiraj_birthday_highest_step');
  currentStep = 1;
  highestStepUnlocked = 1;

  candlesBlown = false;
  cakeSliced = false;
  hackInProgress = false;
  flippedCards.clear();

  // Reset Typewriter State
  clearTypewriterTimeouts();
  typewriterState.completed = false;
  const tc = document.getElementById('typewriterContent');
  if (tc) tc.innerHTML = '';
  const qs = document.getElementById('quillStatus');
  if (qs) qs.textContent = "Dippu is writing a message for you...";
  const sk = document.getElementById('skipTypingBtn');
  if (sk) { sk.textContent = "Skip Typing ⏩"; sk.style.display = 'none'; }

  // Hide tribute frame
  const tf = document.getElementById('tributeFrame');
  if (tf) tf.style.display = 'none';

  // Stop continuous fireworks
  if (continuousPartyInterval) {
    clearInterval(continuousPartyInterval);
    continuousPartyInterval = null;
  }
  stopContinuousRockets();
  rockets.length = 0;

  // Reset Candles & Flames
  ['flame1', 'flame2', 'flame3', 'flame4'].forEach(id => {
    const f = document.getElementById(id);
    if (f) f.classList.remove('extinguished');
  });
  document.querySelectorAll('.candle').forEach(c => c.classList.remove('blown'));

  // Reset Knife
  if (cakeKnife) cakeKnife.classList.remove('visible', 'cutting');

  // Reset cake split
  if (cakeWrapper) cakeWrapper.classList.remove('sliced');

  // Restore instruction box & buttons
  if (cakeInstructionBox) {
    cakeInstructionBox.classList.remove('fade-erase');
    cakeInstructionBox.style.display = '';
  }
  if (wishStatusBox) wishStatusBox.style.display = '';

  if (blowCandlesBtn) {
    blowCandlesBtn.disabled = false;
    blowCandlesBtn.style.display = 'inline-flex';
  }
  if (cutCakeBtn) {
    cutCakeBtn.disabled = false;
    cutCakeBtn.style.display = 'none';
  }
  if (wishTip) {
    wishTip.textContent = 'Tip: Candles systematically ek ke baad ek bujhengi!';
    wishTip.style.display = 'block';
  }

  // Reset HBD banner
  if (cakeCelebrationBanner) cakeCelebrationBanner.style.display = 'none';
  const hbdTyped = document.getElementById('cakeHbdTyped');
  if (hbdTyped) hbdTyped.textContent = '';
  const hbdCursor = document.getElementById('cakeHbdCursor');
  if (hbdCursor) hbdCursor.classList.remove('done');
  const hbdSub = document.getElementById('cakeHbdSub');
  if (hbdSub) { hbdSub.textContent = ''; hbdSub.classList.remove('show'); }

  if (partyStatusPill) partyStatusPill.style.display = 'none';

  // Reset Sky Lantern State
  lanternIgnited = false;
  lanternReleased = false;
  heatProgress = 0;
  if (heatInterval) { clearInterval(heatInterval); heatInterval = null; }
  if (mainSkyLantern) {
    mainSkyLantern.className = 'sky-lantern-wrapper';
    mainSkyLantern.style.transform = '';
  }
  if (lanternFlame) lanternFlame.classList.remove('ignited');
  if (lanternHeatHaze) lanternHeatHaze.classList.remove('active');
  if (heatProgressBox) heatProgressBox.style.display = 'none';
  if (heatFill) heatFill.style.width = '0%';
  if (igniteLanternBtn) igniteLanternBtn.style.display = 'inline-flex';
  if (releaseLanternBtn) releaseLanternBtn.style.display = 'none';
  if (lanternBlessingCard) {
    lanternBlessingCard.style.display = 'none';
    lanternBlessingCard.classList.remove('slide-up-glow');
  }
  if (distantLanternsLayer) distantLanternsLayer.innerHTML = '';
  if (lanternTouchHint) {
    lanternTouchHint.style.display = 'inline-block';
    lanternTouchHint.textContent = '👆 Touch Diya or Button to Light';
  }
  document.body.classList.remove('pure-sky-mode');
  if (lanternStage) lanternStage.classList.remove('fullscreen-sky');
  if (goToCakeBtn) goToCakeBtn.style.display = 'none';
  if (customWishInput) customWishInput.value = '';
  const lcs = document.querySelector('.lantern-control-station');
  if (lcs) {
    lcs.classList.remove('fade-out');
    lcs.style.display = '';
  }

  goToCakeBtn.style.display = 'none';
  goToFinaleBtn.style.display = 'none';
  resetShararatiBtn();
  terminalAction.style.display = 'none';
  if (injectKeyBtn) injectKeyBtn.disabled = false;
  if (terminalInput) { terminalInput.disabled = false; terminalInput.value = ''; }
  const termLog = document.getElementById('terminalLog');
  if (termLog) termLog.innerHTML = '<p class="log-line">> ENTER 4-DIGIT VIP PASSCODE TO UNLOCK THE VAULT...</p>';
  const termInd = document.getElementById('terminalIndicator');
  if (termInd) { termInd.textContent = '● STANDBY'; termInd.style.color = ''; }
  resetGoldenEnvelope();

  // Re-randomize lucky balloon for next play
  allBalloons.forEach(b => {
    b.classList.remove('popped');
    const floatingTags = b.querySelectorAll('.balloon-floating-code, .balloon-tease-tag');
    floatingTags.forEach(t => t.remove());
  });

  updateStepTracker(1);
}

const replayBtn = document.getElementById('replayBtn');
if (replayBtn) {
  replayBtn.addEventListener('click', resetEntireExperience);
}

const grandReplayBtn = document.getElementById('grandReplayBtn');
if (grandReplayBtn) {
  grandReplayBtn.addEventListener('click', () => {
    try { audio.playChime(); } catch(e) {}
    resetEntireExperience();
  });
}

// Remove any injected 3rd-party host watermarks / badges
(() => {
  const killBadges = () => {
    document.querySelectorAll('a[href*="netlify"], #netlify-badge, .netlify-badge, [data-netlify-badge], div[class*="netlify-badge"]').forEach(el => {
      try { el.remove(); } catch (e) { el.style.display = 'none'; }
    });
  };
  killBadges();
  window.addEventListener('DOMContentLoaded', killBadges);
  window.addEventListener('load', killBadges);
  setInterval(killBadges, 1000);
})();

// Restore saved step on initial page load (if user refreshed after Step 1)
window.addEventListener('DOMContentLoaded', () => {
  if (currentStep > 1) {
    updateStepTracker(currentStep, true);
  }
});