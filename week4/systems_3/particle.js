// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

class Particle {

  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector();
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.lifespan = 255.0;

  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  // Method to display


  // Is the particle still useful?
  isFinished() {
    return (this.lifespan < 0.0);
  }
}
