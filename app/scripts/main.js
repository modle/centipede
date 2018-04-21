/*jslint white: true */
var main = {
  framesToWaitToPauseAgain : 0,
  updateGameState : function() {
    // this gets executed every interval
    main.updateGamepad();
    if (!game.running) {
      game.gameArea.loadBackground();
      controls.gamepad.checkState();
      menus.processMenus();
      return;
    };
    if (players.players.length == 0) {
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
  // TODO leaderboard functions only work on chrome
  // either disable the leaderboard menu option when not in chrome
  // or figure out firefox storage usage
  saveScore : function(initials) {
    console.log('saving score');
    try {
      let currentLeaderboard = this.readLeaderboard();
      let score = {initials : initials, score : metrics.lastScore, when : Date.now()};
      if (currentLeaderboard) {
        currentLeaderboard.push(score);
      } else {
        currentLeaderboard = [score];
      };
      localStorage.setItem('centipedeLeaderboard', JSON.stringify(currentLeaderboard));
    } catch(e) {
      console.log('could not save leaderboard to localStorage', e);
    };
  },
  readLeaderboard : function() {
    try {
      return JSON.parse(localStorage.getItem('centipedeLeaderboard'));
    } catch(e) {
      console.log('could not load leaderBoard from localStorage', e);
    };
  },
  clearLeaderboard : function() {
    let key = 'centipedeLeaderboard';
    try {
      localStorage.removeItem(key);
      console.log(key, 'removed from local storage');
    } catch(e) {
      console.log(key, 'not found in localStorage', e);
    };
  },
};
