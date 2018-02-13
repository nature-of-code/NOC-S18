class CParticle extends Particle {


  // Method to display
  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }
}
