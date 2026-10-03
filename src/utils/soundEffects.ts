// Web Audio API Synthesizer for Zero-Asset Luxury Sound Experience

class SoundController {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  constructor() {
    // Check localStorage
    const saved = localStorage.getItem('muscle_sound_enabled');
    this.isEnabled = saved === 'true';
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    localStorage.setItem('muscle_sound_enabled', enabled ? 'true' : 'false');
    if (enabled) {
      this.initContext();
      this.playSuccessChime();
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.isEnabled);
    return this.isEnabled;
  }

  public playClick() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore audio policy errors
    }
  }

  public playHover() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore audio policy errors
    }
  }

  public playSuccessChime() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.09);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + i * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.09 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.09);
        osc.stop(this.ctx.currentTime + i * 0.09 + 0.55);
      });
    } catch {
      // Ignore
    }
  }

  public playSuccess() {
    this.playSuccessChime();
  }


  public playNotification() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
      osc.frequency.setValueAtTime(1174.66, this.ctx.currentTime + 0.12); // D6

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.38);
    } catch {
      // Ignore
    }
  }

  private startAmbient() {
    if (!this.ctx || this.ambientGain) return;
    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 warm drone

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3 warm fifth

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, this.ctx.currentTime);

      this.ambientOsc1.connect(filter);
      this.ambientOsc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
    } catch {
      // Ignore
    }
  }

  private stopAmbient() {
    try {
      if (this.ambientOsc1) {
        this.ambientOsc1.stop();
        this.ambientOsc1.disconnect();
        this.ambientOsc1 = null;
      }
      if (this.ambientOsc2) {
        this.ambientOsc2.stop();
        this.ambientOsc2.disconnect();
        this.ambientOsc2 = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
    } catch {
      // Ignore
    }
  }
}

export const soundEffects = new SoundController();
