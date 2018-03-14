/*jslint white: true */
function updateGameState() {
  // this gets executed every interval
  // check game conditions and update messages
  game.manageGameOver();
  controls.checkControllerState();
  controls.handleGamePause();
  if (game.paused) {
    game.managePause();
    return;
  };
  if (player.died && game.delayed < game.delayEndTime) {
    game.delayed++;
    return;
  };
  if (player.died) {
    game.manageDeath();
    game.delayed = 0;
    return;
  };
  // clear the canvas
  game.checkLevelEndConditions();
  game.startNextFrame();
  manageSounds();
  hud.update();
  // make things happen
  mushrooms.manage();
  centipedes.manage();
  intervalCreatures.manage();
  spiders.manage();
  lasers.manage();
  player.manage();
  // check game conditions
  collisions.check();
  metrics.updateFloatingPoints();
  if (player.died) {
    game.setDiedText();
    game.playDiedSound();
    return;
  };
  if (game.levelOver) {
    game.manageLevel();
  }
};
