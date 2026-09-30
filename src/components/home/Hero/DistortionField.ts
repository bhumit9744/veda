export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

// Simple pseudo-random noise
export function noise(x: number, y: number, t: number) {
  const X = Math.sin(x * 0.1 + t) * Math.cos(y * 0.1 - t);
  const Y = Math.cos(x * 0.2 - t) * Math.sin(y * 0.2 + t);
  return (X + Y) * 0.5;
}

export class Spring {
  value: number;
  target: number;
  velocity: number;
  stiffness: number;
  damping: number;

  constructor(initial: number, stiffness = 0.1, damping = 0.8) {
    this.value = initial;
    this.target = initial;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  update() {
    const force = (this.target - this.value) * this.stiffness;
    this.velocity = (this.velocity + force) * this.damping;
    this.value += this.velocity;
    return this.value;
  }
}
