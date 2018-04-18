// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Evolutionary "Steering Behavior" Simulation


class Sensor {
  constructor(angle) {
    this.angle = angle;
    this.val = 0;
  }
}

// Create a new vehicle
class Vehicle {
  constructor(x, y, brain) {

    // All the physics stuff
    this.acceleration = createVector();
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 4;
    this.maxforce = 0.1;
    this.maxspeed = 4;
    this.minspeed = 0.25;
    this.velocity.setMag(this.maxspeed);
    this.score = 0;

    this.sensorAngle = TWO_PI / totalSensors;
    this.sensors = [];
    for (let angle = 0; angle < TWO_PI; angle += this.sensorAngle) {
      this.sensors.push(new Sensor(angle));
    }

    if (arguments[2] instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(0.1);
    } else {
      let inputs = this.sensors.length + 6;
      this.brain = new NeuralNetwork(inputs, 32, 2);
    }

    // Health
    this.health = 1;
  }


  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    if (this.velocity.mag() < this.minspeed) {
      this.velocity.setMag(this.minspeed);
    }
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);

    // Slowly die unless you eat
    this.health -= 0.005;
    this.score += 1;
  }

  // Return true if health is less than zero
  dead() {
    return (this.health < 0 ||
      this.position.x > width + this.r ||
      this.position.x < -this.r ||
      this.position.y > height + this.r ||
      this.position.y < -this.r
    );
  }

  // Small chance of returning a new child vehicle
  birth(prob) {
    let r = random(1);
    if (r < prob) {
      // Same location, same DNA
      //return new Vehicle(this.position.x, this.position.y, this.brain);
      return new Vehicle(random(width), random(height), this.brain);
    }
  }

  // Function to calculate all sensor readings
  // And predict a "desired velocity"
  think(list) {
    // All sensors start with maximum length
    for (let j = 0; j < this.sensors.length; j++) {
      this.sensors[j].val = sensorLength;
    }

    for (let i = 0; i < list.length; i++) {
      // Where is the food
      let otherPosition = list[i];
      // How far away?
      let dist = p5.Vector.dist(this.position, otherPosition);
      // Skip if it's close
      if (dist > sensorLength) {
        continue;
      }

      // What's the angle of the food
      let angle = p5.Vector.sub(otherPosition, this.position).heading();

      // Check all the sensors
      for (let j = 0; j < this.sensors.length; j++) {
        // Check bounds
        let lower = this.sensors[j].angle - this.sensorAngle / 2;
        let higher = this.sensors[j].angle + this.sensorAngle / 2;
        // If the relative angle of the food is in between the range
        if (
          (angle > lower && angle < higher) ||
          (angle > lower + TWO_PI && angle < higher + TWO_PI) ||
          (angle > lower - TWO_PI && angle < higher - TWO_PI)
        ) {
          // Sensor value is the closest food
          this.sensors[j].val = min(this.sensors[j].val, dist);
        }
      }
    }

    // Create inputs
    let inputs = [];
    // Position in canvas
    inputs[0] = constrain(map(this.position.x, 50, 0, 0, 1), 0, 1);
    inputs[1] = constrain(map(this.position.y, 50, 0, 0, 1), 0, 1);
    inputs[2] = constrain(map(this.position.x, width - 50, width, 0, 1), 0, 1);
    inputs[3] = constrain(map(this.position.y, height - 50, height, 0, 1), 0, 1);
    // Current velocity
    inputs[4] = 0; //this.velocity.x / this.maxspeed;
    inputs[5] = 0; //this.velocity.y / this.maxspeed;

    // All the sensor readings
    for (let j = 0; j < this.sensors.length; j++) {
      inputs[j + 6] = map(this.sensors[j].val, 0, sensorLength, 1, 0);
    }

    // Get two outputs
    let outputs = this.brain.predict(inputs);
    // Turn it into a desired velocity and apply steering formula
    let desired = createVector(2 * outputs[0] - 1, 2 * outputs[1] - 1);
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  // Check against array of food or poison
  // index = 0 for food, index = 1 for poison
  eat(list) {
    // Look at everything
    for (let i = list.length - 1; i >= 0; i--) {
      // Calculate distance
      let d = p5.Vector.dist(list[i], this.position);
      // If we're withing 5 pixels, eat it!
      if (d < foodRadius) {
        list.splice(i, 1);
        // Add health when it eats food
        this.health++;
      }
    }
  }

  // Add force to acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }

  display() {

    // Color based on health
    let green = color(0, 255, 255, 255);
    let red = color(255, 0, 100, 100);
    let col = lerpColor(red, green, this.health)

    push();
    translate(this.position.x, this.position.y);
    // Extra info for sensors
    if (debug.checked()) {
      for (let i = 0; i < this.sensors.length; i++) {
        let val = this.sensors[i].val;
        if (val > 0) {
          stroke(col);
          strokeWeight(map(val, 0, sensorLength, 4, 0));
          let angle = this.sensors[i].angle;
          line(0, 0, cos(angle) * val, sin(angle) * val);
        }
      }
      noStroke();
      fill(255, 200);
      text(int(this.score), 10, 0);
    }
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + PI / 2;
    rotate(theta);
    // Draw the vehicle itself
    fill(col);
    strokeWeight(1);
    stroke(col);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

  highlight() {
    fill(255, 255, 255, 50);
    stroke(255);
    ellipse(this.position.x, this.position.y, 32, 32);
  }
}