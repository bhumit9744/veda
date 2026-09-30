export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export class HeroParticles {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  
  private colors = [
    'rgba(244, 241, 232, 0.6)', // warm ivory
    'rgba(180, 190, 175, 0.5)', // muted green
    'rgba(212, 175, 55, 0.4)'   // occasional gold
  ];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize = this.resize.bind(this);
    
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  public spawn(x: number, y: number, vx: number, vy: number) {
    if (this.particles.length > 200) return; // limit particles

    this.particles.push({
      x,
      y,
      vx: vx + (Math.random() - 0.5) * 2,
      vy: vy + (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: 40 + Math.random() * 40,
      size: 1 + Math.random() * 2,
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    });
  }

  public update(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      
      // friction
      p.vx *= 0.95;
      p.vy *= 0.95;
      
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      const progress = p.life / p.maxLife;
      // Fade in and out
      const alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
      
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    this.ctx.globalAlpha = 1;
  }

  public destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
