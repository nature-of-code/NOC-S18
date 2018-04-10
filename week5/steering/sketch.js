let p;

function setup() {
  createCanvas(640, 360);
  p = new Particle(200, 200);
}

function draw() {
  background(51);
  let mouse = createVector(mouseX, mouseY);
  p.seek(mouse);
  p.update();
  p.show();
}
