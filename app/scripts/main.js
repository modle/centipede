/*jslint white: true */
var showMenu = true;
var showInstructions = false;
var basePath = "app/static/media/images/";
var menuOrder = ['play', 'instructions'];
var instructionsOrder = ['back'];

var menuImages = {
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
};

var pointerImages = {
  before : {
    image : new Image(),
    file : "ship.png",
    offset : -35,
  },
  after : {
    image : new Image(),
    file : "ship.png",
    offset : 0,
  },
};

var instructionsImages = {
  back : {
    image : new Image(),
    file : "back.png",
    position : {x : 268, y : 490},
    dimensions : {width : 260, height : 40}
  },
};

// this gets executed every interval
function updateGameState() {
  detectGamePad();
  if (showMenu) {
    drawMenu();
    return;
  };
  if (showInstructions) {
    drawInstructions();
    return;
  };
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

function drawMenu() {
  prepTheCanvas();
  setMenuOrder(menuOrder);
  setImageFiles(pointerImages);
  setImageFiles(menuImages);
  drawImages(menuImages, menuOrder);
  checkForSelection();
};

function drawInstructions() {
  console.log('drawing the instructions');
  prepTheCanvas();
  setMenuOrder(instructionsOrder);
  setImageFiles(instructionsImages);
  drawImages(instructionsImages, instructionsOrder);
};

function setMenuOrder(order) {
  if (supporting.everyinterval(game.gameArea.frameNo, 30)) {
    let keysPushed = controls.getMenuKeyPush();
    let direction = "";
    keysPushed.forEach(key => direction = direction == "" && controls.menuKeys.up.includes(parseInt(key)) ? "up" : direction);
    keysPushed.forEach(key => direction = direction == "" && controls.menuKeys.down.includes(parseInt(key)) ? "down" : direction);
    if (direction == "up") {
      order.push(order.shift());
    } else if (direction == "down") {
      order.unshift(order.pop());
    };
  };
};

function setImageFiles(images) {
  if (game.gameArea.frameNo !== 1) {
    return;
  };
  Array.from(Object.keys(images)).forEach(entry =>
    images[entry].image.src = basePath + images[entry].file
  );
};

function drawImages(images, order) {
  Array.from(Object.keys(images)).forEach(entry => {
    game.gameArea.context.drawImage(images[entry].image, images[entry].position.x, images[entry].position.y)
  });
  Array.from(Object.keys(pointerImages)).forEach(entry => {
    let offset = pointerImages[entry].offset ? pointerImages[entry].offset : images[order[0]].dimensions.width;
    game.gameArea.context.drawImage(pointerImages[entry].image, images[order[0]].position.x + offset, images[order[0]].position.y);
  });
};

function checkForSelection() {
  if (controls.keysDown[controls.enterKeyCode]) {
    let selection = menuOrder[0];
    if (selection == 'play') {
      prepTheCanvas();
      game.paused = false;
      showMenu = false;
    } else if (selection == 'instructions') {
      prepTheCanvas();
      showMenu = false;
      showInstructions = true;
    };
  };
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
