class SParticle extends Particle {

  constructor(x,y) {
    super(x,y);
    this.angle = 0;
  }

  update() {
    super.update();
    this.angle += 0.1;
  }

  // Method to display
  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    stroke(255, this.lifespan);
    strokeWeight(2);
    fill(255, this.lifespan);
    rect(0, 0, 12, 12);
    line(-100, 0, 100, 0);
    pop();
  }
}
