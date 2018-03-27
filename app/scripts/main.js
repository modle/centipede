/*jslint white: true */
var showMenu = true;
var showInstructions = false;
var basePath = "app/static/media/images/";
var currentSelection = {name : '', action : function(){}};
var timeSinceSelection = 100;
var timeSinceMenuMove = 100;

var menuImages = {
  order : ['play', 'instructions'],
  entries : {
    play : {
      image : new Image(),
      file : "play.png",
      position : {x : 350, y : 450},
      dimensions : {width : 96, height : 40},
      action : function() {
        prepTheCanvas();
        game.paused = false;
        showMenu = false;
        timeSinceSelection = 0;
      },
    },
    instructions : {
      image : new Image(),
      file : "instructions.png",
      position : {x : 268, y : 490},
      dimensions : {width : 260, height : 40},
      action : function() {
        prepTheCanvas();
        showMenu = false;
        showInstructions = true;
        timeSinceSelection = 0;
      },
    },
  },
};

var instructionsImages = {
  order : ['back'],
  entries : {
    back : {
      image : new Image(),
      file : "back.png",
      position : {x : 350, y : 490},
      dimensions : {width : 96, height : 40},
      action : function() {
        currentSelection.name = menuImages.order[0];
        prepTheCanvas();
        showMenu = true;
        showInstructions = false;
        timeSinceSelection = 0;
      },
    },
  },
};

var pointerImages = {
  entries : {
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
  },
};

// this gets executed every interval
function updateGameState() {
  detectGamePad();
  setImages();
  if (showMenu) {
    drawMenu(menuImages);
    return;
  };
  if (showInstructions) {
    drawMenu(instructionsImages);
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

function setImages() {
  if (game.gameArea.frameNo !== 1) {
    return;
  };
  setImageFiles(pointerImages.entries);
  setImageFiles(menuImages.entries);
  setImageFiles(instructionsImages.entries);
};

function setImageFiles(images) {
  Array.from(Object.keys(images)).forEach(entry =>
    images[entry].image.src = basePath + images[entry].file
  );
};

function drawMenu(images) {
  prepTheCanvas();
  setMenuOrder(images.order);
  drawImages(images.entries, images.order);
  checkForSelection();
};

function setMenuOrder(order) {
  timeSinceMenuMove += 1;
  if (timeSinceMenuMove > 30) {
    let keysPushed = controls.getMenuKeyPush();
    let direction = "";
    keysPushed.forEach(key => direction = direction == "" && controls.menuKeys.up.includes(parseInt(key)) ? "up" : direction);
    keysPushed.forEach(key => direction = direction == "" && controls.menuKeys.down.includes(parseInt(key)) ? "down" : direction);
    if (direction == "up") {
      currentSelection.name = order.shift();
      order.push(currentSelection.name);
    } else if (direction == "down") {
      currentSelection.name = order.pop();
      order.unshift(currentSelection.name);
    } else {
      currentSelection.name = order[0];
    };
    timeSinceMenuMove = 0;
  };
};

function drawImages(images, order) {
  Array.from(Object.keys(images)).forEach(entry => {
    if (currentSelection.name == entry) {
      currentSelection.action = images[entry].action;
    };
    game.gameArea.context.drawImage(images[entry].image, images[entry].position.x, images[entry].position.y)
  });
  Array.from(Object.keys(pointerImages.entries)).forEach(entry => {
    let offset = pointerImages.entries[entry].offset ? pointerImages.entries[entry].offset : images[order[0]].dimensions.width;
    game.gameArea.context.drawImage(pointerImages.entries[entry].image, images[order[0]].position.x + offset, images[order[0]].position.y);
  });
};

function checkForSelection() {
  timeSinceSelection += 1;
  if (timeSinceSelection > 60 && controls.keysDown[controls.enterKeyCode]) {
    currentSelection.action();
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
  if (showMenu || showInstructions) {
    return;
  };
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
