// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Mover {

  constructor() {
    this.r = random(10, 40);
    let params = {
      friction: 0.3,
      restitution: 0.6
    }
    this.body = Bodies.rectangle(random(width), random(height), this.r, this.r, params);
    World.add(world, this.body);
  }

  display() {
    let pos = this.body.position;
    let angle = this.body.angle;
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rect(0, 0, this.r, this.r);
    pop();
  }


  applyForce(force) {
    Body.applyForce(this.body, this.body.position, force)
    // var f = p5.Vector.div(force, this.mass);
    // this.acceleration.add(f);
  }
}
