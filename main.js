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
  if (paused) {
    pausedMessage.text = "Paused: Spacebar to Continue";
    if (gameArea.frameNo == 0) {
      pausedMessage.text = "Press Spacebar to Start";
    }
    pausedMessage.update();
    return;
  }
  if (died.text) {
    wait(2000);
    resetGamePiecePosition();
    died.text = "";
  }
  if (levelOver.text) {
    wait(2000);
    loadNextLevel();
    levelOver.text = "";
  }
  clearGameAreaAndBumpFrame();
  moveGamePiece();
  updateGamePiece();
  checkLevelEndConditions();
  updateHud();
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
