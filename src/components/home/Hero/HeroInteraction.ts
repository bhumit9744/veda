import { clamp, distance, lerp, noise, Spring } from './DistortionField';
import { HeroParticles } from './HeroParticles';

export interface LetterNode {
  el: HTMLElement;
  char: string;
  originalRect: DOMRect;
  x: Spring;
  y: Spring;
  rotation: Spring;
  scale: Spring;
  blur: Spring;
  opacity: Spring;
  isHovered: boolean;
}

export class HeroInteraction {
  private letters: LetterNode[] = [];
  private particles: HeroParticles;
  private rafId: number = 0;
  
  private mouse = { x: -1000, y: -1000 };
  private smoothMouse = { x: -1000, y: -1000 };
  private velocity = { x: 0, y: 0, magnitude: 0 };
  
  private time = 0;
  private isInteractive = true;
  private isMobile = false;

  constructor(canvas: HTMLCanvasElement) {
    this.particles = new HeroParticles(canvas);
    this.isMobile = !window.matchMedia('(pointer: fine)').matches;
    
    this.onMouseMove = this.onMouseMove.bind(this);
    this.update = this.update.bind(this);
    
    if (!this.isMobile) {
      window.addEventListener('mousemove', this.onMouseMove);
    }
  }

  public setInteractive(val: boolean) {
    this.isInteractive = val;
    if (!val) {
      // Return everything to normal when scrolling
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    }
  }

  public registerLetter(el: HTMLElement, char: string) {
    if (this.isMobile) return;
    
    const rect = el.getBoundingClientRect();
    this.letters.push({
      el,
      char,
      originalRect: rect,
      x: new Spring(0, 0.08, 0.75),
      y: new Spring(0, 0.08, 0.75),
      rotation: new Spring(0, 0.06, 0.8),
      scale: new Spring(1, 0.1, 0.7),
      blur: new Spring(0, 0.1, 0.7),
      opacity: new Spring(0.7, 0.05, 0.8), // Default opacity is slightly subdued
      isHovered: false
    });
  }

  public recalculateRects() {
    if (this.isMobile) return;
    this.letters.forEach(l => {
      // Reset transform to get accurate rect
      l.el.style.transform = 'none';
      l.originalRect = l.el.getBoundingClientRect();
    });
  }

  private onMouseMove(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  public start() {
    if (this.isMobile) return;
    this.time = performance.now();
    this.rafId = requestAnimationFrame(this.update);
  }

  public stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    if (!this.isMobile) {
      window.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  private update(now: number) {
    const dt = now - this.time;
    this.time = now;
    
    // Snap smoothMouse on first interaction to prevent huge velocity spike
    if (this.smoothMouse.x === -1000 && this.mouse.x !== -1000) {
      this.smoothMouse.x = this.mouse.x;
      this.smoothMouse.y = this.mouse.y;
    }

    // Smooth velocity
    const dx = this.mouse.x - this.smoothMouse.x;
    const dy = this.mouse.y - this.smoothMouse.y;
    this.smoothMouse.x += dx * 0.15;
    this.smoothMouse.y += dy * 0.15;
    
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.velocity.magnitude = Math.hypot(dx, dy);

    const radius = 240;
    const clampedVel = clamp(this.velocity.magnitude, 0, 50);

    let anyHovered = false;

    this.letters.forEach(l => {
      const centerX = l.originalRect.left + l.originalRect.width / 2;
      const centerY = l.originalRect.top + l.originalRect.height / 2;
      
      const dist = distance(this.smoothMouse.x, this.smoothMouse.y, centerX, centerY);
      
      if (dist < radius && this.isInteractive) {
        anyHovered = true;
        l.isHovered = true;
        
        const strength = 1 - (dist / radius);
        
        // Wave equation
        const waveDistance = dist;
        const frequency = 0.02;
        const speed = 0.005;
        const wave = Math.sin(waveDistance * frequency - now * speed);
        
        // Organic Noise
        const nx = noise(centerX, centerY, now * 0.001);
        const ny = noise(centerX + 100, centerY + 100, now * 0.001);
        
        // Target calculations
        const maxDisplacement = lerp(20, 45, clampedVel / 50);
        
        l.x.target = (dx * 0.1) + (wave * nx * maxDisplacement * strength);
        l.y.target = (dy * 0.1) + (wave * ny * maxDisplacement * strength);
        
        l.rotation.target = wave * nx * 15 * strength; // max 15 deg
        l.scale.target = 1 + (strength * wave * 0.1);
        l.blur.target = Math.abs(wave * strength * 4); // max 4px blur
        l.opacity.target = 1; // Brighter when active
        
        // Spawn particles
        if (strength > 0.5 && Math.random() > 0.8 && l.char.trim() !== '') {
          this.particles.spawn(
            centerX + l.x.value, 
            centerY + l.y.value,
            dx * 0.05 + nx * 2,
            dy * 0.05 + ny * 2
          );
        }
      } else {
        l.isHovered = false;
        l.x.target = 0;
        l.y.target = 0;
        l.rotation.target = 0;
        l.scale.target = 1;
        l.blur.target = 0;
        // If anything is hovered, dim others. Else return to 0.7
        l.opacity.target = anyHovered ? 0.3 : 0.7;
      }
      
      // Update springs
      l.x.update();
      l.y.update();
      l.rotation.update();
      l.scale.update();
      l.blur.update();
      l.opacity.update();
      
      // Apply transforms
      const transform = `translate3d(${l.x.value}px, ${l.y.value}px, 0) rotate(${l.rotation.value}deg) scale(${l.scale.value})`;
      const filter = l.blur.value > 0.1 ? `blur(${l.blur.value}px)` : 'none';
      
      l.el.style.transform = transform;
      l.el.style.filter = filter;
      l.el.style.opacity = l.opacity.value.toFixed(3);
    });

    this.particles.update(dt);
    this.particles.draw();

    this.rafId = requestAnimationFrame(this.update);
  }
}
