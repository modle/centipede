/*jslint white: true */
var main = {
  framesToWaitToPauseAgain : 0,
  updateGameState : function() {
    main.updateGamepad();
    if (!game.running) {
      game.gameArea.loadBackground();
      controls.gamepad.checkState(game.numberOfPlayers);
      menus.processMenus();
      return;
    };
    if (Object.keys(players.players).length < game.numberOfPlayers) {
      players.init();
    };
    game.gameArea.removeBackground();
    main.handleGamePause();
    if (main.processTriggers()) {
      return;
    };
    main.prepTheCanvas();
    main.manageGameObjects();
  },
  updateGamepad : function() {
    if (controls.gamepad.enabledGamepadIndices.size <= 0) {
      return;
    };
    controls.gamepad.refreshGamepadData();
  },
  handleGamePause : function() {
    if (this.framesToWaitToPauseAgain > 0) {
      this.framesToWaitToPauseAgain--;
      return;
    };
    if (controls.pausedIsPressed()) {
      game.paused = !game.paused;
      this.framesToWaitToPauseAgain = 50;
    };
  },
  processTriggers : function() {
    let triggered = (
      this.checkPlayerDied()
      || this.checkLevelOver()
      || this.checkGameOver()
      || this.checkPause()
    );
    return triggered;
  },
  checkPlayerDied : function() {
    if (players.died) {
      if (game.delayed === 0) {
        game.setDiedText();
        sounds.playDiedSound();
        game.delayed++;
        return true;
      } else if (game.delayed < game.delayEndTime) {
        game.delayed++;
        return true;
      } else {
        game.delayed = 0;
        game.manageDeath();
        return true;
      };
    };
    return false;
  },
  checkLevelOver : function() {
    if (game.levelIsOver()) {
      game.manageLevel();
      return true;
    };
    return false;
  },
  checkGameOver : function() {
    if (game.gameOver) {
      game.manageGameOver();
      return true;
    };
    return false;
  },
  checkPause : function() {
    if (game.paused) {
      game.managePause();
      return true;
    };
    return false;
  },
  prepTheCanvas : function() {
    game.startNextFrame();
    sounds.manageSounds();
    if (game.running) {
      hud.update();
    };
  },
  manageGameObjects : function() {
    metrics.manage();
    mushrooms.manage();
    centipedes.manage();
    intervalCreatures.manage();
    spiders.manage();
    lasers.manage();
    players.manage();
    collisions.check();
  },
};
