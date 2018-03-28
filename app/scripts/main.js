/*jslint white: true */
// this gets executed every interval
function updateGameState() {
};

var main = {
  updateGameState : function() {
    main.detectGamePad();
    if (processMenus()) {
      return;
    };
    if (main.processTriggers()) {
      return;
    };
    main.prepTheCanvas();
    main.manageGameObjects();
  },
  detectGamePad : function() {
    controls.checkControllerState();
    controls.handleGamePause();
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
    manageSounds();
    if (showMenu || showInstructions) {
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
