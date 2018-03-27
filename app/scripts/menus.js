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
  text : {
    entries : [
      {
        name : 'winning',
        text : 'CENTIPEDE! (warblegarble)',
        component : new Component(knobsAndLevers.baseTextParams),
        position : {x : 115, y : 100},
        fontSize : '50px',
      },
    ],
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
  text : {
    entries : [
      {
        name : 'winning',
        text : 'Kill the centipede to advance to the next level',
        component : new Component(knobsAndLevers.baseTextParams),
        position : {x : 100, y : 100},
      },
      {
        name : 'losing',
        text : 'Avoid all bugs to stay alive',
        component : new Component(knobsAndLevers.baseTextParams),
        position : {x : 215, y : 150},
      },
      {
        name : 'move',
        text : 'WASD : move',
        component : new Component(knobsAndLevers.baseTextParams),
        position : {x : 300, y : 200},
      },
      {
        name : 'shoot',
        text : 'arrow keys or shift : shoot',
        component : new Component(knobsAndLevers.baseTextParams),
        position : {x : 225, y : 250},
      },
    ],
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
  drawImages(images);
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

function drawImages(images) {
  Array.from(Object.keys(images.entries)).forEach(entry => {
    if (currentSelection.name == entry) {
      currentSelection.action = images.entries[entry].action;
    };
    game.gameArea.context.drawImage(images.entries[entry].image, images.entries[entry].position.x, images.entries[entry].position.y)
  });
  if (images['text']) {
    images.text.entries.forEach(text => {
      text.component.x = text.position.x;
      text.component.y = text.position.y;
      text.component.text = text.text;
      if (text.fontSize) {
        text.component.fontSize = text.fontSize;
      };
      text.component.update();
    });
  };
  Array.from(Object.keys(pointerImages.entries)).forEach(entry => {
    let offset = pointerImages.entries[entry].offset ? pointerImages.entries[entry].offset : images.entries[images.order[0]].dimensions.width;
    game.gameArea.context.drawImage(pointerImages.entries[entry].image, images.entries[images.order[0]].position.x + offset, images.entries[images.order[0]].position.y);
  });
};

function checkForSelection() {
  timeSinceSelection += 1;
  if (timeSinceSelection > 60 && controls.keyBoardFlowControlButtonPressed()) {
    currentSelection.action();
  };
};
