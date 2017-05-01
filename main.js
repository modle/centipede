/*jslint white: true */

var paused = true;

// invoked on page load
function startGame() {
  gamePiece = new component(gamePieceWidth, gamePieceHeight, "red", gamePieceStartX, gamePieceStartY, 0, 0);
  getGridVertices();
  console.log(yVertices);
  console.log(canvasWidth / gridDivisor);
  gameArea.start();
}

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32) {
    paused = !paused;
  }
});

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    reset();
  }
});

function reset() {
  gameArea.stop();
  resetHud();
  startGame();
}

// this gets executed every interval
function updateGameArea() {
  if (paused) {
    managePause();
    return;
  }
  // check game conditions
  if (died.text) {
    manageDeath();
    return;
  }
  if (levelOver.text) {
    manageLevel();
    return;
  }
  // clear the canvas
  clearGameAreaAndBumpFrame();
  // make things happen
  checkCollisions();
  manageMushrooms();
  manageCentipedes();
  manageLasers();
  manageGamePiece();
  updateHud();
  updateFloatingPoints();
}

function clearGameAreaAndBumpFrame() {
  gameArea.clear();
  gameArea.frameNo += 1;
}

function manageLevel() {
  wait(2000);
  loadNextLevel();
  levelOver.text = "";
}

function loadNextLevel() {
  gameArea.frameNo = 0;
  clearCentipedes();
  resetGamePiecePosition();
  currentLevel += 1;
}

function manageDeath() {
  wait(2000);
  clearCentipedes();
  resetGamePiecePosition();
  died.text = "";
}

function managePause() {
  pausedMessage.text = "Paused: Spacebar to Continue";
  if (gameArea.frameNo === 0) {
    pausedMessage.text = "Press Spacebar to Start";
  }
  pausedMessage.update();
  return;
}
