// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Evolutionary "Steering Behavior" Simulation

// An array of vehicles
let population = [];

// An array of "food"
let food = [];

// Show additional sensor info
let debug;

let speedSlider;
let speedSpan;

let foodRadius = 4;
let foodAmount = 50;
let sensorLength = 75;


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
  }
}

function draw() {
  background(0);

  let cycles = speedSlider.value();
  speedSpan.html(cycles);

  let best = null;

  for (let n = 0; n < cycles; n++) {
    // 10% chance of new food, always keep 25
    while (food.length < 50) {
      food.push(createVector(random(50, width - 50), random(50, height - 50)));
    }

    // Eat any food
    for (let v of population) {
      v.eat(food);
    }

    // Go through all vehicles and find the best!
    let record = -1;
    for (let i = population.length - 1; i >= 0; i--) {
      let v = population[i];
      // Eat the food (index 0)
      v.think(food);
      v.update(food);

      // If the vehicle has died, remove
      if (v.dead()) {
        population.splice(i, 1);
      } else {
        // Is it the vehicles that has lived the longest?
        if (v.score > record) {
          record = v.score;
          best = v;
        }
      }
    }

    // If there is less than 20 apply reproduction
    if (population.length < 20) {
      for (let v of population) {
        // Every vehicle has a chance of cloning itself according to score
        let child = v.birth(0.1 * v.score / record);
        if (child != null) {
          population.push(child);
        }
      }
    }
  }


  // Draw all the food and all the poison
  for (let i = 0; i < food.length; i++) {
    fill(100, 255, 100, 200);
    stroke(100, 255, 100);
    ellipse(food[i].x, food[i].y, foodRadius * 2);
  }

  if (debug.checked()) {
    best.highlight();
  }

  for (let v of population) {
    v.display();
  }
}