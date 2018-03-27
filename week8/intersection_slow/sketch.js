// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The old way to do intersection tests, look how slow!!

let totalThings = 2000;

let particles = []; // ArrayList for all "things"


function setup() {
  createCanvas(400, 400);

  // Put 2000 Things in the system
  for (let i = 0; i < totalThings; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

}

function draw() {
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qtree = new QuadTree(boundary, 4);


  background(0);
  fill(255);
  noStroke();
  // Run through the Grid
  stroke(255);

  // Display and move all Things
  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);
  }



  for (let p of particles) {
    p.highlight = false;
    let range = new Circle(p.x, p.y, p.r * 2);

    let points = qtree.query(range);
    for (let point of points) {
      let other = point.parent;
      // As long as its not the same one
      if (p != other) {
        // Check to see if they are touching
        // (We could do many other things here besides just intersection tests, such
        // as apply forces, etc.)
        let d = dist(p.x, p.y, other.x, other.y);
        if (d < p.r / 2 + other.r / 2) {
          p.highlight = true;
        }
      }
    }
  }


  for (let p of particles) {
    p.render();
    p.move();
  }


  //show(qtree);






  noStroke();
  fill(0);
  rect(0, height - 20, width, 20);
  fill(255);
  text("Framerate: " + floor(frameRate()), 10, height - 6);
}

function show(qtree) {
  stroke(255);
  noFill();
  strokeWeight(1);
  rectMode(CENTER);
  rect(qtree.boundary.x, qtree.boundary.y, qtree.boundary.w * 2, qtree.boundary.h * 2);
  // for (let p of qtree.points) {
  //   strokeWeight(2);
  //   point(p.x, p.y);
  // }

  if (qtree.divided) {
    show(qtree.northeast);
    show(qtree.northwest);
    show(qtree.southeast);
    show(qtree.southwest);
  }
}
