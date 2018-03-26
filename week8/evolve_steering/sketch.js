// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Evolutionary "Steering Behavior" Simulation

// An array of vehicles
let population = [];

// An array of "food"
let food = [];
// An array of "poison"
let poison = [];

// How good is food, how bad is poison?
let nutrition = [0.1, -1];

// Show additional info on DNA?
let debug;

function setup() {

  // Add canvas and grab checkbox
  let canvas = createCanvas(800, 600);
  canvas.parent('canvascontainer');
  debug = select('#debug');


  // Create 10 vehicles
  angleMode(RADIANS);
  for (let i = 0; i < 10; i++) {
    population[i] = new Vehicle(width / 2, height / 2);
  }
  // Start with some food
  for (let i = 0; i < 10; i++) {
    food[i] = createVector(random(width), random(height));
  }
  // Start with some poison
  for (let i = 0; i < 5; i++) {
    poison[i] = createVector(random(width), random(height));
  }
}

// Add new vehicles by dragging mouse
function mouseDragged() {
  population.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(0);

  // 10% chance of new food
  if (random(1) < 0.1) {
    food.push(createVector(random(width), random(height)));
  }

  // 1% chance of new poison
  if (random(1) < 0.01) {
    poison.push(createVector(random(width), random(height)));
  }

  // Go through all vehicles
  for (let i = population.length - 1; i >= 0; i--) {
    let v = population[i];

    // Eat the food (index 0)
    v.eat(food, 0);
    // Eat the poison (index 1)
    v.eat(poison, 1);
    // Check boundaries
    v.boundaries();

    // Update and draw
    v.update();
    v.display();

    // If the vehicle has died, remove
    if (v.dead()) {
      population.splice(i, 1);
    } else {
      // Every vehicle has a chance of cloning itself
      let child = v.birth();
      if (child != null) {
        population.push(child);
      }
    }
  }

  // Draw all the food and all the poison
  for (let i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4);
  }

  for (let i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4);
  }
}