var menus = {
  showMenu : true,
  showInstructions : false,
  showSettings : false,
  mediaPath : "app/static/media/images/",
  timeSinceSelection : 100,
  timeSinceMenuMove : 100,
  currentSelection : {
    name : '',
    entry : {
      position : {x : 0, y : 0},
      dimensions : {width : 0, height : 0},
    }
  },
  menuImages : {
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
          menus.showMenu = false;
          menus.timeSinceSelection = 0;
        },
      },
      instructions : {
        image : new Image(),
        file : "instructions.png",
        position : {x : 268, y : 490},
        dimensions : {width : 260, height : 40},
        action : function() {
          main.prepTheCanvas();
          menus.showMenu = false;
          menus.showSettings = false;
          menus.showInstructions = true;
          menus.timeSinceSelection = 0;
        },
      },
      settings : {
        image : new Image(),
        file : "settings.png",
        position : {x : 305, y : 530},
        dimensions : {width : 182, height : 40},
        action : function() {
          main.prepTheCanvas();
          menus.showMenu = false;
          menus.showSettings = true;
          menus.showInstructions = false;
          menus.timeSinceSelection = 0;
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
  },
  instructionsImages : {
    order : ['back'],
    entries : {
      back : {
        image : new Image(),
        file : "back.png",
        position : {x : 350, y : 490},
        dimensions : {width : 96, height : 40},
        action : function() {
          menus.currentSelection.name = menus.menuImages.order[0];
          main.prepTheCanvas();
          menus.showMenu = true;
          menus.showInstructions = false;
          menus.timeSinceSelection = 0;
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
  },
  pointerImages : {
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
  },
  init : function() {
    this.reset();
  },
  reset : function() {
    game.gameOver = false;
    this.showMenu = true;
    this.showInstructions = false;
    this.showSettings = false;
  },
  processMenus : function() {
    this.setImages();
    if (this.showMenu) {
      this.drawMenu(menus.menuImages);
      return true;
    };
    if (this.showInstructions) {
      this.drawMenu(menus.instructionsImages);
      return true;
    };
    return false;
  },
  setImages : function() {
    if (game.gameArea.frameNo !== 1) {
      return;
    };
    this.setImageFiles(menus.pointerImages.entries);
    this.setImageFiles(menus.menuImages.entries);
    this.setImageFiles(menus.instructionsImages.entries);
  },
  setImageFiles : function(images) {
    Array.from(Object.keys(images)).forEach(entry =>
      images[entry].image.src = this.mediaPath + images[entry].file
    );
  },
  drawMenu : function(images) {
    main.prepTheCanvas();
    this.setMenuOrder(images.order);
    this.drawImages(images);
    this.checkForSelection();
  },
  setMenuOrder : function(order) {
    this.timeSinceMenuMove += 1;
    if (this.timeSinceMenuMove > 30) {
      this.shiftMenuListOrder(order);
      this.timeSinceMenuMove = 0;
    };
  },
  shiftMenuListOrder : function(order) {
    let direction = this.getDirection();
    if (direction == "up") {
      order.unshift(order.pop());
    } else if (direction == "down") {
      order.push(order.shift());
    };
    this.currentSelection.name = order[0];
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
    this.drawSelectionMarker(menus.pointerImages.entries);
    this.drawTexts(images);
  },
  drawEntries : function(entries) {
    Array.from(Object.keys(entries)).forEach(entry => {
      if (this.currentSelection.name == entry) {
        this.currentSelection.entry = entries[entry];
      };
      game.gameArea.context.drawImage(entries[entry].image, entries[entry].position.x, entries[entry].position.y)
    });
  },
  drawSelectionMarker : function(entries) {
    Array.from(Object.keys(entries)).forEach(entry => {
      let offset =
        entries[entry].offset
          ? entries[entry].offset
          : this.currentSelection.entry.dimensions.width;
      game.gameArea.context.drawImage(
        entries[entry].image,
        this.currentSelection.entry.position.x + offset,
        this.currentSelection.entry.position.y
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
    this.timeSinceSelection += 1;
    if (this.timeSinceSelection > 60 && controls.keyBoardFlowControlButtonPressed()) {
      this.currentSelection.entry.action();
    };
  },
};
