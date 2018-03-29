var menus = {
  show : {
    main : true,
    instructions : false,
    settings : false,
    playerSelect : false,
  },
  mediaPath : "app/static/media/images/",
  timeSinceSelection : 100,
  timeSinceMenuMove : 100,
  minTimeToSelect : 90,
  minTimeToMove : 30,
  currentSelection : {
    name : '',
    entry : {
      position : {x : 0, y : 0},
      dimensions : {width : 0, height : 0},
    }
  },
  screens : {
    main : {
      order : ['play', 'instructions', 'settings'],
      entries : {
        play : {
          image : new Image(),
          file : "play.png",
          position : {x : 350, y : 450},
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.playerSelect = true;
          },
        },
        instructions : {
          image : new Image(),
          file : "instructions.png",
          position : {x : 268, y : 490},
          dimensions : {width : 260, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.instructions = true;
          },
        },
        settings : {
          image : new Image(),
          file : "settings.png",
          position : {x : 305, y : 530},
          dimensions : {width : 182, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.settings = true;
          },
        },
      },
      text : {
        entries : [
          {
            name : 'title',
            text : 'CENTIPEDE! (warblegarble)',
            component : new Component(knobsAndLevers.baseTextParams),
            position : {x : 115, y : 100},
            fontSize : '50px',
          },
        ],
      },
    },
    playerSelect : {
      order : ['selectOnePlayer', 'back'],
      entries : {
        selectOnePlayer : {
          image : new Image(),
          file : "logo.png",
          position : {x : 350, y : 450},
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            game.paused = false;
          },
        },
        back : {
          image : new Image(),
          file : "back.png",
          position : {x : 350, y : 490},
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.main = true;
          },
        },
      },
      text : {
        entries : [
          {
            name : 'playerSelect',
            text : 'Choose number of players',
            component : new Component(knobsAndLevers.baseTextParams),
            position : {x : 115, y : 100},
          },
        ],
      },
    },
    settings : {
      order : ['doTheThing', 'back'],
      entries : {
        doTheThing : {
          image : new Image(),
          file : "credits.png",
          position : {x : 350, y : 450},
          dimensions : {width : 96, height : 40},
          action : function() {
            console.log('doTheThing clicked');
          },
        },
        back : {
          image : new Image(),
          file : "back.png",
          position : {x : 350, y : 490},
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.main = true;
          },
        },
      },
      text : {
        entries : [
          {
            name : 'settings',
            text : 'Settings Are Thither',
            component : new Component(knobsAndLevers.baseTextParams),
            position : {x : 115, y : 100},
            fontSize : '50px',
          },
        ],
      },
    },
    instructions : {
      order : ['back'],
      entries : {
        back : {
          image : new Image(),
          file : "back.png",
          position : {x : 350, y : 490},
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.main = true;
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
    pointers : {
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
  },
  init : function() {
    this.reset();
  },
  reset : function() {
    game.gameOver = false;
    this.disableMenus();
    this.show.main = true;
  },
  disableMenus : function() {
    if (game.gameArea.frameNo > 0) {
      main.prepTheCanvas();
    };
    this.timeSinceSelection = 0;
    this.show.main = false;
    this.show.playerSelect = false;
    this.show.settings = false;
    this.show.instructions = false;
  },
  processMenus : function() {
    if (game.gameArea.frameNo == 1) {
      this.setImages();
    };
    if (this.show.main) {
      this.drawMenu(menus.screens.main);
      return true;
    };
    if (this.show.instructions) {
      this.drawMenu(menus.screens.instructions);
      return true;
    };
    if (this.show.settings) {
      this.drawMenu(menus.screens.settings);
      return true;
    };
    if (this.show.playerSelect) {
      this.drawMenu(menus.screens.playerSelect);
      return true;
    };
    return false;
  },
  setImages : function() {
    Array.from(Object.keys(menus.screens)).forEach(screen => this.setImageFiles(menus.screens[screen].entries));
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
    if (this.timeSinceMenuMove > this.minTimeToMove) {
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
    this.drawSelectionMarker(menus.screens.pointers.entries);
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
    if (this.timeSinceSelection > this.minTimeToSelect && controls.keyBoardFlowControlButtonPressed()) {
      this.currentSelection.entry.action();
    };
  },
};
