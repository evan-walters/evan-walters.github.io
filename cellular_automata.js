const WIDTH = 200;
const LENGTH = 100;
const DIM = 6;
const SPEED = 10;

const rule90 = {
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

function runCA() {
  // init and draw starting state
  let state = initCA();
  draw(state, 0);

  // evolve world
  evolve(state, 0);
}

function initCA() {
  let initialState = '';
  for (i = 0; i < WIDTH; i++) {
    let cellState = Math.round(Math.random());
    initialState += cellState.toString();
  }
  return initialState;
}

function evolve(currentState, timeStep) {
  // update and draw state
  let state = update(currentState);
  draw(state, timeStep);

  // evolve
  if (timeStep < LENGTH) {
    setTimeout(
      function() {
        evolve(state, timeStep + 1);
      }, SPEED);
  }
}

function update(state) {
  let newState = "";
  let paddedState = state.slice(-1) + state + state.slice(0, 1);

  for (cellIndex = 0; cellIndex < paddedState.length - 2; cellIndex++) {
    let neighborhood = paddedState.slice(cellIndex, cellIndex + 3);
    newState += rule90[neighborhood];
  }

  return newState;
}

function draw(state, timeStep) {
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
}
