// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

//let p;
//let particles = [];

let system;

function setup() {
  createCanvas(640, 360);
  system = new ParticleSystem();
}

function draw() {
  background(51);

  if (mouseIsPressed) {
    let wind = createVector(1, 0);
    system.applyForce(wind);
  }

  system.addParticle(mouseX, mouseY);
  system.update();
  system.display();

}
