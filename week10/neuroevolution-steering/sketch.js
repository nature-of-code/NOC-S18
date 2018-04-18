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
let nutrition = [0.5, -1];

// Show additional info on DNA?
let debug;

let speedSlider;
let speedSpan;
let best = null;

function setup() {

  // Add canvas and grab checkbox
  let canvas = createCanvas(640, 360);
  canvas.parent('canvascontainer');
  debug = select('#debug');
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');

  // Create 10 vehicles
  angleMode(RADIANS);
  for (let i = 0; i < 10; i++) {
    population[i] = new Vehicle(width / 2, height / 2);
    //food[i] = createVector(width / 2 + 25, 0);
  }

  // Start with some food
  for (let i = 0; i < 25; i++) {
    food[i] = createVector(random(width), random(height));
  }
  // Start with some poison
  for (let i = 0; i < 5; i++) {
    //poison[i] = createVector(random(width), random(height));
  }
}

// Add new vehicles by dragging mouse
// function mouseDragged() {
//   population.push(new Vehicle(mouseX, mouseY));
// }

function draw() {
  background(0);

  // food[0].x = mouseX;
  // food[0].y = mouseY;

  let cycles = speedSlider.value();
  speedSpan.html(cycles);

  for (let n = 0; n < cycles; n++) {
    // 10% chance of new food
    if (random(1) < 0.1 || food.length < 25) {
      food.push(createVector(random(50, width - 50), random(50, height - 50)));
    }

    // 1% chance of new poison
    if (random(1) < 0.01) {
      //poison.push(createVector(random(width), random(height)));
    }

    best = null;
    let record = -1;

    // Go through all vehicles
    for (let i = population.length - 1; i >= 0; i--) {
      let v = population[i];

      // Eat the food (index 0)
      v.eat(food, 0);
      // Eat the poison (index 1)
      // v.eat(poison, 1);
      // Check boundaries
      // v.boundaries();
      // v.wrap();

      // Update and draw
      v.update(food, poison);
      // v.display();

      // If the vehicle has died, remove
      if (v.dead()) {
        population.splice(i, 1);
      } else {
        if (v.score > record) {
          record = v.score;
          best = v;
        }
      }
    }

    if (population.length < 20) {
      for(let v of population) {
        //Every vehicle has a chance of cloning itself
        let child = v.birth(0.1 * v.score / record);
        if (child != null) {
          population.push(child);
        }
      }
    }

    if (population.length < 3) {
      let child = best.birth(1);
      population.push(child);
    }
  }


  // Draw all the food and all the poison
  for (let i = 0; i < food.length; i++) {
    fill(0, 255, 0, 200);
    noStroke();
    ellipse(food[i].x, food[i].y, eat_threshold * 2);
  }

  for (let i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4);
  }

  best.highlight();
  for (let i = population.length - 1; i >= 0; i--) {
    let v = population[i];
    v.display();
  }
}
