// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/uITcoKpbQq4

class Circle {
  constructor(x, y, r) {
    let options = {
      friction: 0,
      restitution: 0.95
    }
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    ellipse(0, 0, this.r * 2);
    pop();
  }

}