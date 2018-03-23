var game = {
  paused : true,
  gameOver : false,
  delayed : 0,
  delayEndTime : 300,
  keysDown : {},
  init : function() {
    this.gameArea = new GameArea();
  },
  start : function() {
    if (supporting.isMobile()) {
      this.gameArea.stop();
      return;
    };
    this.paused = true;
    this.gameArea.start();
  },
  reset : function() {
    this.gameArea.stop();
    hud.reset();
    this.start();
  },
  levelIsOver : function() {
    return centipedes.numberSpawned === centipedes.numberKilled && this.gameArea.frameNo !== 0;
  },
  startNextFrame : function() {
    this.gameArea.clear();
    this.gameArea.frameNo += 1;
  },
  getFrameNo : function() {
    return this.gameArea.frameNo;
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
    texts.pausedMessage.text = "Paused";
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
