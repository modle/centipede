/*jslint white: true */

var paused = true;
var died = false;
var levelOver = false;
var gameOver = false;
var delayed = 0;
var delayEndTime = 300;

var game = {
  gameArea : new GameArea(),
  keysDown : {},
  init : function() {
    this.addEventListeners();
  },
  start : function() {
    if (isMobile()) {
      showMobile();
      return;
    }
    initSounds();
    paused = true;
    this.gameArea.start();
  },
  reset : function() {
    this.gameArea.stop();
    hudHandler.reset();
    this.start();
  },
  checkLevelEndConditions : function() {
    if (centipedes.numberSpawned === centipedes.numberKilled && this.gameArea.frameNo !== 0) {
      levelOver = true;
    }
  },
  startNextFrame : function() {
    this.gameArea.clear();
    this.gameArea.frameNo += 1;
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
    if (this.gameArea.frameNo === 0) {
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
    this.gameArea.stop();
  },
  resetSomeThings : function() {
    this.gameArea.frameNo = 0;
    centipedes.clear();
    lasers.clear();
  },
  resetMoreThings : function() {
    this.resetSomeThings();
    worms.clear();
    spiders.clear();
    gamePieceHandler.reset();
  },
  addEventListeners : function() {
    console.log("keysDown is", this.keysDown);
    window.addEventListener('mousedown', function (e) {
      game.keysDown['LMB'] = (e.type === "mousedown" && event.which === 1);
    });
    window.addEventListener('mouseup', function (e) {
      game.keysDown['LMB'] = (e.type === "mousedown" && event.which === 1);
    });
    window.addEventListener('keydown', function (e) {
      game.keysDown[e.keyCode] = (e.type == "keydown");
    });
    window.addEventListener('keyup', function (e) {
      game.keysDown[e.keyCode] = (e.type == "keydown");
    });
  },
};

game.init();

function updateGameState() {
  // this gets executed every interval
  // check game conditions and update messages
  game.manageGameOver();
  if (paused) {
    centipedeSound.stop();
    game.managePause();
    return;
  }
  if (died && delayed < delayEndTime) {
    delayed++;
    return;
  }
  if (died) {
    game.manageDeath();
    delayed = 0;
    return;
  }
  // clear the canvas
  game.checkLevelEndConditions();
  game.startNextFrame();
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
    game.setDiedText();
    game.playDiedSound();
    return;
  }
  if (levelOver) {
    game.manageLevel();
  }
};
