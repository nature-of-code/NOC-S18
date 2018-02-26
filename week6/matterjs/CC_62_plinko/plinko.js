// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

class Plinko {
  constructor(x, y, r) {
    let options = {
      restitution: 1,
      friction: 0,
      isStatic: true
    }
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "plinko";
    this.r = r;
    World.add(world, this.body);
  }

  show() {
    noStroke();
    fill(127);
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}