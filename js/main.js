/*jslint white: true */

var paused = true;
var died = false;
var levelOver = false;
var gameOver = false;
var delayed = 0;
var delayEndTime = 300;

var gameHandler = {
  start : function() {
    if (isMobile()) {
      showMobile();
      return;
    }
    initSounds();
    gameArea.start();
  },
  reset : function() {
    gameArea.stop();
    hudHandler.reset();
    this.start();
  },
  checkLevelEndConditions : function() {
    if (centipedes.numberSpawned === centipedes.numberKilled && gameArea.frameNo !== 0) {
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
    metrics.currentLevel += 1;
  },
  setDiedText : function() {
    texts.diedText.text = "You died.";
    texts.diedText.update();
  },
  playDiedSound : function() {
    playerDiedSound.play();
  },
  managePause : function() {
    texts.pausedMessage.text = "Paused: Spacebar to Continue";
    if (gameArea.frameNo === 0) {
      texts.pausedMessage.text = "Press Spacebar to Start";
    }
    texts.pausedMessage.update();
    stopAllSounds();
  },
  manageDeath : function() {
    this.resetMoreThings();
    texts.diedText.text = "";
    died = false;
  },
  manageGameOver : function() {
    if (gameOver) {
      stopAllSounds();
      this.showGameOver();
    };
  },
  showGameOver : function() {
    texts.gameOver.text = "Game Over";
    texts.gameOver.update();
    gameArea.stop();
  },
  resetSomeThings : function() {
    gameArea.frameNo = 0;
    centipedes.clear();
    lasers.clear();
  },
  resetMoreThings : function() {
    this.resetSomeThings();
    worms.clear();
    spiders.clear();
    gamePieceHandler.reset();
  }
}

function updateGameState() {
  // this gets executed every interval
  // check game conditions and update messages
  gameHandler.manageGameOver();
  if (paused) {
    centipedeSound.stop();
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
  manageSounds();
  hudHandler.update();
  // make things happen
  mushrooms.manage();
  centipedes.manage();
  worms.manage();
  spiders.manage();
  lasers.manage();
  gamePieceHandler.manage();
  // check game conditions
  collisions.check();
  metrics.updateFloatingPoints();
  if (died) {
    gameHandler.setDiedText();
    gameHandler.playDiedSound();
    return;
  }
  if (levelOver) {
    gameHandler.manageLevel();
  }
}
