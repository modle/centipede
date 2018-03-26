/*jslint white: true */
var showMenu = true;
var basePath = "app/static/media/images/";
var menuOrder = ['play', 'instructions'];

var menu = {
  play : {
    image : new Image(),
    file : "play.png",
    position : {x : 350, y : 450},
    dimensions : {width : 96, height : 40}
  },
  instructions : {
    image : new Image(),
    file : "instructions.png",
    position : {x : 268, y : 490},
    dimensions : {width : 260, height : 40}
  },
  ship : {
    image : new Image(),
    file : "ship.png",
  },
};

// this gets executed every interval
function updateGameState() {
  detectGamePad();
  if (showMenu) {
    drawMenu();
    return;
  }
  prepTheCanvas();
  if (processTriggers()) {
    return;
  };
  manageGameObjects();
};

function drawMenu() {
  prepTheCanvas();
  setMenuOrder();
  setImageFiles();
  drawMenuImages();
};

function setMenuOrder() {
  if (supporting.everyinterval(game.gameArea.frameNo, 30)) {
    let keysPushed = controls.getMenuKeyPush();
    let direction = "";
    keysPushed.forEach(key => direction = direction == "" && controls.menuKeys.up.includes(parseInt(key)) ? "up" : direction);
    keysPushed.forEach(key => direction = direction == "" && controls.menuKeys.down.includes(parseInt(key)) ? "down" : direction);
    if (direction == "up") {
      menuOrder.push(menuOrder.shift());
    } else if (direction == "down") {
      menuOrder.unshift(menuOrder.pop());
    };
  };
};

function setImageFiles() {
  if (game.gameArea.frameNo !== 1) {
    return;
  };
  Array.from(Object.keys(menu)).forEach(entry =>
    menu[entry].image.src = basePath + menu[entry].file
  );
};

function drawMenuImages() {
  game.gameArea.context.drawImage(menu.ship.image, menu[menuOrder[0]].position.x - 40, menu[menuOrder[0]].position.y);
  game.gameArea.context.drawImage(menu.play.image, menu.play.position.x, menu.play.position.y);
  game.gameArea.context.drawImage(menu.instructions.image, menu.instructions.position.x, menu.instructions.position.y);
};

function detectGamePad() {
  controls.checkControllerState();
  controls.handleGamePause();
};

function processTriggers() {
  let triggered = (
    checkPlayerDied()
    || checkLevelOver()
    || checkGameOver()
    || checkPause()
  );
  return triggered;
};

function checkPlayerDied() {
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
};

function checkLevelOver() {
  if (game.levelIsOver()) {
    game.manageLevel();
    return true;
  };
  return false;
};

function checkGameOver() {
  if (game.gameOver) {
    game.manageGameOver();
    return true;
  };
  return false;
};

function checkPause() {
  if (game.paused) {
    game.managePause();
    return true;
  };
  return false;
};

function prepTheCanvas() {
  game.startNextFrame();
  manageSounds();
  if (!showMenu) {
    hud.update();
  };
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
