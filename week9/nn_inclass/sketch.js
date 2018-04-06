let brain;

// let training_data = [{
//     r: 255,
//     g: 100,
//     b: 50,
//     overlay: "black"
//   },
//   {
//     r: 0,
//     g: 0,
//     b: 50,
//     overlay: "white"
//   }
// ]
//
//
// let cleaned_training_data = [{
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }, {
//   inputs: [0, 0.1, 0.1],
//   targets: [1, 0]
// }, {
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }, {
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }, {
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }, {
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }, {
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }, {
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }, {
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }, {
//   inputs: [1, 0.9, 0.9],
//   targets: [0, 1]
// }];


function setup() {
  createCanvas(400, 400);
  // let color = colorPredictor(255, 100, 50);

  // NeuralNetwork(a, b, c)
  // a: how many inputs
  // c: how many outputs
  // b: how many hidden nodes
  brain = new NeuralNetwork(3, 3, 2);

  let inputs = [1, 0.9, 0.9];
  let outputs = brain.predict(inputs);
  console.log(outputs[0], outputs[1]);

  // Correct Answer for inputs above
  for (let i = 0; i < 10000; i++) {
    let targets = [0, 1];
    brain.train(inputs, targets);
  }

  outputs = brain.predict(inputs);
  console.log(outputs[0], outputs[1]);


  // if (outputs[1] > outputs[0]) {
  //   console.log('use white');
  // } else {
  //   console.log('use black');
  // }

  // Supervised learning
  // train() function
}


// function colorPredictor(r, g, b) {
//   if (r + g + b > 300) {
//     return "black";
//   } else {
//     return "white";
//   }
// }