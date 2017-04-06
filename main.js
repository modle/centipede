var paused = true;

// invoked on page load
function startGame() {
  gamePiece = new component(gamePieceWidth, gamePieceHeight, "red", gamePieceStartX, gamePieceStartY, 0, 0);
  gameArea.start();
}

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32) {
    paused = !paused;
  }
})

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    reset()
  }
})

function reset() {
  gameArea.stop();
  resetHud();
  startGame();
}

// this gets executed every interval
function updateGameArea() {
  // check game conditions
  if (paused) {
    managePause();
    return;
  }
  manageLevel();
  manageDeath();
  // clear the canvas
  clearGameAreaAndBumpFrame();
  // make things happen
  manageMushrooms();
  manageGamePiece();
  manageLasers();
  checkCollisions();
  updateHud();
  checkLevelEndConditions();
}

function clearGameAreaAndBumpFrame() {
  gameArea.clear();
  gameArea.frameNo += 1;
}

function checkLevelEndConditions() {
  if (getTime() < 1) {
    levelOver.text = "Time's up! Loading next level...";
  }
  levelOver.update();
}

function loadNextLevel() {
  gameArea.frameNo = 0;
  resetGamePiecePosition();
  currentLevel += 1;
}
