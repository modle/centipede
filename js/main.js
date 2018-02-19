/*jslint white: true */

var paused = true;
var died = false;
var levelOver = false;
var delayed = 0;
var delayEndTime = 300;

var gameHandler = {
  start : function() {
    if (isMobile()) {
      showMobile();
      return;
    }
    gameArea.start();
  },
  reset : function() {
    gameArea.stop();
    resetHud();
    this.start();
  },
  checkLevelEndConditions : function() {
    if (centipedeHandler.numberSpawned === centipedeHandler.numberKilled && gameArea.frameNo !== 0) {
      levelOver = true;
    }
  },
  startNextFrame : function() {
    gameArea.clear();
    gameArea.frameNo += 1;
  },
  manageLevel : function() {
    this.resetSomeThings();
    levelOver = false;
    currentLevel += 1;
  },
  setDiedText : function() {
    diedText.text = "You died.";
    diedText.update();
  },
  managePause : function() {
    pausedMessage.text = "Paused: Spacebar to Continue";
    if (gameArea.frameNo === 0) {
      pausedMessage.text = "Press Spacebar to Start";
    }
    pausedMessage.update();
  },
  manageDeath : function() {
    this.resetMoreThings();
    diedText.text = "";
    died = false;
  },
  resetSomeThings : function() {
    gameArea.frameNo = 0;
    centipedeHandler.clear();
    laserHandler.clear();
  },
  resetMoreThings : function() {
    this.resetSomeThings();
    wormHandler.clear();
    spiderHandler.clear();
    gamePieceHandler.reset();
  }
}

function updateGameState() {
  // this gets executed every interval
  // check game conditions and update messages
  if (paused) {
    gameHandler.managePause();
    return;
  }
  if (died && delayed < delayEndTime) {
    delayed++;
    return;
  }
  if (died) {
    gameHandler.manageDeath();
    delayed = 0;
    return;
  }
  // clear the canvas
  gameHandler.checkLevelEndConditions();
  gameHandler.startNextFrame();
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
    gameHandler.setDiedText();
    return;
  }
  if (levelOver) {
    gameHandler.manageLevel();
  }
}
