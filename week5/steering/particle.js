// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

class Particle {

  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector();
    this.velocity = createVector();
    this.maxspeed = 5;
    this.maxforce = 0.01;

  }

  seek(target) {
    // Step 1 the desired velocity
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);

    // Step 2 calculate the steering
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    this.applyForce(steer);

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
    this.acceleration.mult(0);
  }

  show() {
    fill(255);
    ellipse(this.position.x, this.position.y, 20);
  }


}
