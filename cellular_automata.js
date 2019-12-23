var WIDTH = 200;
var LENGTH = 100;
var DIM = 3;

var rule90 = {
  "111" : "0",
  "110" : "1",
  "101" : "0",
  "100" : "1",
  "011" : "1",
  "010" : "0",
  "001" : "1",
  "000" : "0"
};

function onDocumentReady() {
  runCA();
};

function initCA() {
  let initialState = '';
  for (i = 0; i < WIDTH; i++) {
    let cellState = Math.round(Math.random());
    initialState += cellState.toString();
  }
  return initialState;
}

function runCA() {
  // setup and draw starting state
  var currentState = initCA();
  drawState(currentState, 0);

  // evolve world
  evolve(currentState, 0);
};

function evolve(currentState, timeStep) {
  // update and draw state
  var currentState = updateState(currentState);
  drawState(currentState, timeStep);

  // evolve
  if (timeStep < LENGTH) {
    setTimeout(
      function() {
        evolve(currentState, timeStep + 1);
      }, 50);
  } else {
    console.log('fin');
  }

}

function updateState(state) {
  console.log(state);
  let newState = "";
  let paddedState = state.slice(-1) + state + state.slice(0, 1);

  for (cellIndex = 0; cellIndex < paddedState.length - 2; cellIndex++) {
    let neighborhood = paddedState.slice(cellIndex, cellIndex + 3);
    newState += rule90[neighborhood];
  }

  return newState;
};

function drawState(state, timeStep) {
  let canvas = document.querySelector("canvas");
  let context = canvas.getContext("2d");

  for (cellIndex = 0; cellIndex < state.length; cellIndex++) {
    if (state[cellIndex] == "0") {
      context.fillStyle = "white";
    } else {
      context.fillStyle = "black";
    }
    context.fillRect(cellIndex * DIM, timeStep * DIM, DIM, DIM);
  }
};
