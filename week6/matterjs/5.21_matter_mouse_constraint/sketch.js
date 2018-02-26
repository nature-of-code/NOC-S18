// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/W-ou_sVlTWk

// module aliases
// module aliases
const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine;
let world;
let particles = [];
let boundaries = [];

let ground;

let mConstraint;


function setup() {
  let canvas = createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);

  let prev = null;
  for (let x = 200; x < 400; x += 20) {

    let fixed = false;
    if (!prev) {
      fixed = true;
    }
    let p = new Particle(x, 100, 10, fixed);
    // let p2 = new Particle(200, 150, 10);
    particles.push(p);

    if (prev) {
      let options = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 20,
        stiffness: 0.4
      }
      let constraint = Constraint.create(options);
      World.add(world, constraint);
    }

    prev = p;
  }


  boundaries.push(new Boundary(200, height, width, 50, 0));

  let canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  //console.log(canvasmouse);
  let options = {
    mouse: canvasmouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  console.log(mConstraint);
}

// function keyPressed() {
//   if (key == ' ') {
//   }
// }

// function mouseDragged() {
//   circles.push(new Circle(mouseX, mouseY, random(5, 10)));
// }

function draw() {
  background(51);
  Engine.update(engine);
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
  }

  //line(particles[0].body.position.x, particles[0].body.position.y, particles[1].body.position.x, particles[1].body.position.y);

  if (mConstraint.body) {
    let pos = mConstraint.body.position;
    let offset = mConstraint.constraint.pointB;
    let m = mConstraint.mouse.position;
    stroke(0, 255, 0);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}