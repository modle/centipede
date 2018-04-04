/*jslint white: true */
var main = {
  framesToWaitToPauseAgain : 0,
  updateGameState : function() {
    // this gets executed every interval
    if (!game.running) {
      controls.gamepad.checkState();
      menus.processMenus();
      return;
    };
    main.updateGamepad();
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
    controls.gamepad.captureAxes();
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
    if (player.died) {
      if (game.delayed === 0) {
        game.setDiedText();
        game.playDiedSound();
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
    if (menus.areActive()) {
      return;
    };
    hud.update();
  },
  manageGameObjects : function() {
    mushrooms.manage();
    centipedes.manage();
    intervalCreatures.manage();
    spiders.manage();
    lasers.manage();
    player.manage();
    collisions.check();
    metrics.manage();
  },
};
