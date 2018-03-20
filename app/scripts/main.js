/*jslint white: true */
// this gets executed every interval
function updateGameState() {
  detectGamePad();
  if (processTriggers()) {
    return;
  };
  prepTheCanvas();
  manageGameObjects();
};

function detectGamePad() {
  controls.checkControllerState();
  controls.handleGamePause();
};

function processTriggers() {
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
  if (game.levelIsOver()) {
    game.manageLevel();
    return true;
  };
  if (game.gameOver) {
    game.manageGameOver();
    return true;
  }
  if (game.paused) {
    game.managePause();
    return true;
  };
  return false;
};

function prepTheCanvas() {
  game.startNextFrame();
  manageSounds();
  hud.update();
};

function manageGameObjects() {
  mushrooms.manage();
  centipedes.manage();
  intervalCreatures.manage();
  spiders.manage();
  lasers.manage();
  player.manage();
  collisions.check();
  metrics.manage();
};
