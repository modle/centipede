var game = {
  gameArea : new GameArea(),
  paused : true,
  levelOver : false,
  gameOver : false,
  delayed : 0,
  delayEndTime : 300,
  keysDown : {},
  start : function() {
    if (supporting.isMobile()) {
      this.gameArea.stop();
      return;
    };
    sounds.init();
    this.paused = true;
    this.gameArea.start();
  },
  reset : function() {
    this.gameArea.stop();
    hud.reset();
    this.start();
  },
  checkLevelEndConditions : function() {
    if (centipedes.numberSpawned === centipedes.numberKilled && this.gameArea.frameNo !== 0) {
      this.levelOver = true;
    }
  },
  startNextFrame : function() {
    this.gameArea.clear();
    this.gameArea.frameNo += 1;
  },
  manageLevel : function() {
    this.resetSomeThings();
    this.levelOver = false;
    metrics.currentLevel += 1;
  },
  setDiedText : function() {
    texts.diedText.text = "You died.";
    texts.diedText.update();
  },
  playDiedSound : function() {
    sounds.playerDied.play();
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
    player.died = false;
  },
  manageGameOver : function() {
    if (this.gameOver) {
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
    intervalCreatures.clear();
    spiders.clear();
    player.reset();
  },
};
