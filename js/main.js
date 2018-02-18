/*jslint white: true */

var paused = true;
var died = false;
var levelOver = false;
var delayed = 0;
var delayEndTime = 300;

// invoked on page load
function startGame() {
  if (isMobile()) {
    showMobile();
    return;
  }
  gameArea.start();
}

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
  if (died && delayed < delayEndTime) {
    delayed++;
    return;
  }
  if (died) {
    manageDeath();
    delayed = 0;
    return;
  }
  // clear the canvas
  checkLevelEndConditions();
  startNextFrame();
  updateHud();
  // make things happen
  mushroomHandler.manage();
  centipedeHandler.manage();
  wormHandler.manage();
  spiderHandler.manage();
  laserHandler.manage();
  gamePieceHandler.manage();
  // check game conditions
  checkCollisions();
  updateFloatingPoints();
  if (died) {
    setDiedText();
    return;
  }
  if (levelOver) {
    manageLevel();
  }
}

function checkLevelEndConditions() {
  if (centipedeHandler.numberSpawned === centipedeHandler.numberKilled && gameArea.frameNo !== 0) {
    levelOver = true;
  }
}

function startNextFrame() {
  gameArea.clear();
  gameArea.frameNo += 1;
}

function manageLevel() {
  resetSomeThings();
  levelOver = false;
  currentLevel += 1;
}

function setDiedText() {
  diedText.text = "You died.";
  diedText.update();
}

function manageDeath() {
  resetMoreThings();
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

function resetSomeThings() {
  gameArea.frameNo = 0;
  centipedeHandler.clear();
  laserHandler.clear();
}

function resetMoreThings() {
  resetSomeThings();
  wormHandler.clear();
  spiderHandler.clear();
  gamePieceHandler.reset();
}
