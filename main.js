/*jslint white: true */

var paused = true;
var died = false;
var levelOver = false;

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
  // check game conditions and update messages
  if (paused) {
    managePause();
    return;
  }
  // clear the canvas
  checkLevelEndConditions();
  startNextFrame();
  updateHud();
  // make things happen
  checkCollisions();
  manageMushrooms();
  manageCentipedes();
  manageWorms();
  manageSpiders();
  manageLasers();
  manageGamePiece();
  if (levelOver) {
    setLevelOverText();
    wait(2000);
    manageLevel();
    return;
  }
  if (died) {
    setDiedText();
    wait(2000);
    manageDeath();
    return;
  }
  updateFloatingPoints();
}

function checkLevelEndConditions() {
  if (centipedesSpawned === centipedesKilled && gameArea.frameNo !== 0) {
    levelOver = true;
  }
}

function startNextFrame() {
  gameArea.clear();
  gameArea.frameNo += 1;
}

function setLevelOverText() {
  levelOverText.text = "Level clear! Loading next level...";
  levelOverText.update();
}

function manageLevel() {
  resetEverything();
  currentLevel += 1;
  levelOverText.text = "";
  levelOver = false;
}

function setDiedText() {
  diedText.text = "You died.";
  diedText.update();
}

function manageDeath() {
  resetEverything();
  diedText.text = "";
  died = false;
}

function managePause() {
  pausedMessage.text = "Paused: Spacebar to Continue";
  if (gameArea.frameNo === 0) {
    pausedMessage.text = "Press Spacebar to Start";
  }
  pausedMessage.update();
}

function resetEverything() {
  gameArea.frameNo = 0;
  clearCentipedes();
  clearSpiders();
  clearWorms();
  clearLasers();
  resetGamePiecePosition();
}
