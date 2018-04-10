class ParticleSystem {

  constructor() {
    this.particles = [];
  }

  addParticle(x, y) {
    if (random(1) < 0.05) {
      this.particles.push(new SParticle(x,y));
    } else {
      this.particles.push(new CParticle(x,y));
    }
  }

  display() {
    for (let p of this.particles) {
      p.display();
    }
  }

  applyForce(force) {
    for (let p of this.particles) {
      p.applyForce(force);
    }
  }

  update() {
    this.particles = this.particles.filter(p => !p.isFinished());
    for (let p of this.particles) {
      p.update();
    }
  }



}
