var showMenu = true;
var showInstructions = false;
var showSettings = false;
var basePath = "app/static/media/images/";
var currentSelection = {
  name : '',
  entry : {
    position : {x : 0, y : 0},
    dimensions : {width : 0, height : 0},
  }
};
var timeSinceSelection = 100;
var timeSinceMenuMove = 100;

var menuImages = {
  order : ['play', 'instructions', 'settings'],
  entries : {
    play : {
      image : new Image(),
      file : "play.png",
      position : {x : 350, y : 450},
      dimensions : {width : 96, height : 40},
      action : function() {
        main.prepTheCanvas();
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
        main.prepTheCanvas();
        showMenu = false;
        showSettings = false;
        showInstructions = true;
        timeSinceSelection = 0;
      },
    },
    settings : {
      image : new Image(),
      file : "settings.png",
      position : {x : 305, y : 530},
      dimensions : {width : 182, height : 40},
      action : function() {
        main.prepTheCanvas();
        showMenu = false;
        showSettings = true;
        showInstructions = false;
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
        main.prepTheCanvas();
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

var menus = {
  init : function() {
    this.reset();
  },
  reset : function() {
    game.gameOver = false;
    showMenu = true;
    showInstructions = false;
    showSettings = false;
  },
  processMenus : function() {
    this.setImages();
    if (showMenu) {
      this.drawMenu(menuImages);
      return true;
    };
    if (showInstructions) {
      this.drawMenu(instructionsImages);
      return true;
    };
    return false;
  },
  setImages : function() {
    if (game.gameArea.frameNo !== 1) {
      return;
    };
    this.setImageFiles(pointerImages.entries);
    this.setImageFiles(menuImages.entries);
    this.setImageFiles(instructionsImages.entries);
  },
  setImageFiles : function(images) {
    Array.from(Object.keys(images)).forEach(entry =>
      images[entry].image.src = basePath + images[entry].file
    );
  },
  drawMenu : function(images) {
    main.prepTheCanvas();
    this.setMenuOrder(images.order);
    this.drawImages(images);
    this.checkForSelection();
  },
  setMenuOrder : function(order) {
    timeSinceMenuMove += 1;
    if (timeSinceMenuMove > 30) {
      this.shiftMenuListOrder(order);
      timeSinceMenuMove = 0;
    };
  },
  shiftMenuListOrder : function(order) {
    let direction = this.getDirection();
    if (direction == "up") {
      order.unshift(order.pop());
    } else if (direction == "down") {
      order.push(order.shift());
    };
    currentSelection.name = order[0];
  },
  getDirection : function() {
    let direction = "";
    let keysPushed = controls.getMenuKeyPush();
    keysPushed.forEach(key => direction = direction == "" && controls.menuKeys.up.includes(parseInt(key)) ? "up" : direction);
    keysPushed.forEach(key => direction = direction == "" && controls.menuKeys.down.includes(parseInt(key)) ? "down" : direction);
    return direction;
  },
  drawImages : function(images) {
    this.drawEntries(images.entries);
    this.drawSelectionMarker(pointerImages.entries);
    this.drawTexts(images);
  },
  drawEntries : function(entries) {
    Array.from(Object.keys(entries)).forEach(entry => {
      if (currentSelection.name == entry) {
        currentSelection.entry = entries[entry];
      };
      game.gameArea.context.drawImage(entries[entry].image, entries[entry].position.x, entries[entry].position.y)
    });
  },
  drawSelectionMarker : function(entries) {
    Array.from(Object.keys(entries)).forEach(entry => {
      let offset =
        entries[entry].offset
          ? entries[entry].offset
          : currentSelection.entry.dimensions.width;
      game.gameArea.context.drawImage(
        entries[entry].image,
        currentSelection.entry.position.x + offset,
        currentSelection.entry.position.y
      );
    });
  },
  drawTexts : function(images) {
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
  },
  checkForSelection : function() {
    timeSinceSelection += 1;
    if (timeSinceSelection > 60 && controls.keyBoardFlowControlButtonPressed()) {
      currentSelection.entry.action();
    };
  },
};
