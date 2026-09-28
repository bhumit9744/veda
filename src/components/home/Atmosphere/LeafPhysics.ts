export type LeafDepth = 'bg' | 'mid' | 'fg';

export interface LeafNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  angularVelocity: number;
  mass: number;
  phase: number;
  scale: number;
  flipPhase: number;
  flipSpeed: number;
  depth: LeafDepth;
  active: boolean;
  shapeVariant: number; 
}

const GRAVITY = 15; // Base downward force
const DRAG = 0.98; // Air resistance (closer to 1 = less drag)

export class LeafPhysicsSystem {
  leaves: LeafNode[] = [];
  width: number = 0;
  height: number = 0;
  maxLeaves: number = 4; // Default max for desktop
  
  // Track scroll velocity for wind
  lastScrollY: number = 0;
  scrollVelocity: number = 0;
  targetWind: number = 0;
  currentWind: number = 0;
  
  constructor() {
    this.updateDimensions();
    // Default leaf counts based on screen size
    this.maxLeaves = window.innerWidth < 768 ? 2 : 5;
    
    // Setup scroll listener for wind influence
    this.lastScrollY = window.scrollY;
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const currentY = window.scrollY;
    const dy = currentY - this.lastScrollY;
    
    // Add scroll velocity to target wind (capped)
    this.targetWind += dy * 0.05;
    this.targetWind = Math.max(-150, Math.min(150, this.targetWind));
    
    this.lastScrollY = currentY;
  };

  updateDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  spawnLeaf(): LeafNode {
    // Randomize depth to get varied sizes
    const r = Math.random();
    let depth: LeafDepth = 'mid';
    let scale = 1;
    
    if (r < 0.2) {
      depth = 'bg';
      scale = 0.2 + Math.random() * 0.15; // 20-35px approx
    } else if (r < 0.7) {
      depth = 'mid';
      scale = 0.4 + Math.random() * 0.3; // 40-70px approx
    } else {
      depth = 'fg';
      scale = 0.8 + Math.random() * 0.6; // 80-140px approx
    }

    // Spawn somewhere at the top, or sometimes on the sides
    const spawnSide = Math.random();
    let x, y;
    if (spawnSide < 0.2) {
      x = -100; // Left side
      y = Math.random() * this.height * 0.5;
    } else if (spawnSide < 0.4) {
      x = this.width + 100; // Right side
      y = Math.random() * this.height * 0.5;
    } else {
      x = Math.random() * this.width; // Top edge
      y = -150;
    }

    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 50,
      vy: Math.random() * 20,
      rotation: Math.random() * Math.PI * 2,
      angularVelocity: (Math.random() - 0.5) * 2,
      mass: 0.8 + Math.random() * 0.4,
      phase: Math.random() * 1000,
      scale,
      flipPhase: Math.random() * Math.PI * 2,
      flipSpeed: 0.5 + Math.random() * 1.5,
      depth,
      active: true,
      shapeVariant: Math.floor(Math.random() * 3) // 0, 1, 2
    };
  }

  update(dt: number, time: number) {
    // Decay scroll wind back to 0
    this.targetWind *= 0.95; 
    this.currentWind += (this.targetWind - this.currentWind) * 0.05;

    // Spawn new leaves if we have room
    if (this.leaves.length < this.maxLeaves && Math.random() < 0.02) {
      this.leaves.push(this.spawnLeaf());
    }

    for (let i = 0; i < this.leaves.length; i++) {
      const leaf = this.leaves[i];
      if (!leaf.active) continue;

      // 1. Gravity & Mass
      leaf.vy += GRAVITY * leaf.mass * dt;

      // 2. Wind
      // Base wind is a slow sine wave
      const baseWind = Math.sin(time * 0.5 + leaf.phase) * 30;
      const flutterWind = Math.sin(time * 2 + leaf.phase) * 15; // Fast flutter
      
      const totalWind = baseWind + flutterWind + this.currentWind;
      
      // Depth affects wind (fg gets blown more)
      const depthMultiplier = leaf.depth === 'fg' ? 1.2 : leaf.depth === 'mid' ? 1 : 0.7;
      leaf.vx += totalWind * depthMultiplier * dt;

      // 3. Air resistance (Drag)
      leaf.vx *= DRAG;
      leaf.vy *= Math.min(DRAG + 0.01, 0.99); // Slightly less drag vertically so it always falls

      // 4. Update Position
      leaf.x += leaf.vx * dt;
      leaf.y += leaf.vy * dt;

      // 5. Rotation & Flip
      // Angular velocity affected by horizontal movement
      leaf.angularVelocity += leaf.vx * 0.01 * dt;
      leaf.angularVelocity *= 0.98; // Rotation drag
      leaf.rotation += leaf.angularVelocity * dt;
      
      leaf.flipPhase += leaf.flipSpeed * dt;

      // 6. Recycling
      // If it falls far out of bounds, recycle it
      if (leaf.y > this.height + 200 || leaf.x < -300 || leaf.x > this.width + 300) {
        this.leaves[i] = this.spawnLeaf();
      }
    }
  }
}
