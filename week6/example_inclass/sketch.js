// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// TODO: Make the attractor a Matter Body

const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const World = Matter.World;
const Vector = Matter.Vector;

let mover;

let movers = [];

let attractor;
let engine;
let world;

let ground;

function setup() {
  // This should be first
  let options = {
    velocityIterations: 4,
    timing: {
      timeScale: 1
    }
  }
  engine = Engine.create(options);
  world = engine.world;
  // Quick way to turn off default gravity
  world.gravity.y = 0;

  createCanvas(640, 360);

  // mover = new Mover();
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover();
  }


  attractor = new Attractor();



  let bOptions = {
    isStatic: true
  }
  ground = Bodies.rectangle(width / 2, height + 5, width, 10, bOptions);
  World.add(world, ground);
  Engine.run(engine);

}

function draw() {
  background(200);


  // if (mouseIsPressed) {
  //   let wind = Matter.Vector.create(-0.01, 0);
  //   console.log(wind);
  //   mover.applyForce(wind);
  // }

  attractor.display();

  for (let mover of movers) {
    let force = attractor.calculateAttraction(mover);
    mover.applyForce(force);
    mover.display();
  }
}

function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}