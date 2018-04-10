menus = {
  leaderboards : undefined,
  show : {
    initials : false,
    main : false,
    playerSelect : false,
    settings : false,
    instructions : false
  },
  init : function() {
    Object.assign(this, menusProps);
    this.selectionMarker = Object.assign({}, templates.marker);
    console.log('menus initialized');
  },
  areActive : function() {
    return Array.from(Object.keys(this.show)).find(key => this.show[key]);
  },
  reset : function() {
    game.gameOver = false;
    this.init();
    this.disableMenus();
    this.screens.initials.text.entries[2].text = '';
    this.show.main = true;
  },
  display : function(menu) {
    menus.disableMenus();
    menus.show[menu] = true;
  },
  disableMenus : function() {
    if (game.gameArea.frameNo > 0) {
      main.prepTheCanvas();
    };
    this.timeSinceSelection = 0;
    Array.from(Object.keys(this.show)).forEach(menu => this.show[menu] = false);
  },
  processMenus : function() {
    let screen = undefined;
    if (this.show.initials) {
      this.manageInitials();
      screen = this.screens.initials;
      this.drawMenu(screen);
      return;
    };
    if (this.show.main) {
      this.leaderboards = main.readLeaderboard();
      this.setLeaderboardTexts();
      screen = this.screens.main;
    };
    if (this.show.instructions) {
      screen = this.screens.instructions;
    };
    if (this.show.settings) {
      screen = this.screens.settings;
    };
    if (this.show.cheats) {
      screen = this.screens.cheats;
    };
    if (this.show.playerSelect) {
      screen = this.screens.playerSelect;
    };
    if (screen) {
      this.drawMenu(screen);
    };
  },
  manageInitials : function() {
    this.setInitialsMenuEntries();
    this.timeSinceMenuMove += 1;
    this.shiftListOrder(this.screens.initials.options);
    let initialsText = this.screens.initials.text.entries[2].text;
    this.screens.initials.text.entries[1].text = 'your score: ' + metrics.lastScore;
    if (initialsText.length >= 3) {
      main.saveScore(initialsText);
      this.reset();
    };
  },
  setInitialsMenuEntries : function() {
    let order = this.screens.initials.options.slice();
    this.screens.initials.entries.previous.text = order.pop();
    this.screens.initials.entries.previouser.text = order.pop();
    this.screens.initials.entries.current.text = order.shift();
    this.screens.initials.entries.next.text = order.shift();
    this.screens.initials.entries.nexter.text = order.shift();
  },
  drawMenu : function(screen) {
    main.prepTheCanvas();
    this.drawTexts(menus.title);
    this.drawEntries(screen.entries);
    if (screen.order) {
      this.setMenuOrder(screen.order);
    };
    this.checkForSelection();
    if (!screen.ignoreMarker) {
      this.drawSelectionMarker();
    };
    if (screen.text) {
      this.drawTexts(screen.text);
    };
  },
  setMenuOrder : function(order) {
    this.timeSinceMenuMove += 1;
    this.shiftListOrder(order);
    this.currentSelection.name = order[0];
  },
  shiftListOrder : function(list) {
    if (this.timeSinceMenuMove < this.minTimeToMove) {
      return;
    };
    let direction = controls.getDirection();
    if (list.length > 1) {
      if (direction == "up") {
        list.unshift(list.pop());
      } else if (direction == "down") {
        list.push(list.shift());
      };
    };
    this.timeSinceMenuMove = 0;
  },
  drawEntries : function(entries) {
    Array.from(Object.keys(entries)).forEach(entry => {
      let menuElement = entries[entry];
      if (!menuElement.component) {
        menuElement.component = this.buildDefaultComponent();
      };
      menuElement.component.x = menuElement.position.x;
      menuElement.component.y = menuElement.position.y;
      menuElement.component.text = menuElement.text;
      if (menuElement.fontSize) {
        menuElement.component.fontSize = menuElement.fontSize;
      };
      if (menuElement.color) {
        menuElement.component.color = menuElement.color;
      };
      if (this.currentSelection.name == entry && !menuElement.noSelection) {
        this.currentSelection.entry = menuElement;
      };
      menuElement.component.update();
    });
  },
  drawSelectionMarker : function() {
    this.selectionMarker.x = this.currentSelection.entry.position.x - knobsAndLevers.player.width * 2;
    this.selectionMarker.y = this.currentSelection.entry.position.y - 15;
    this.selectionMarker.update();
  },
  drawTexts : function(texts) {
    texts.entries.forEach(entry => {
      if (!entry.component) {
        entry.component = this.buildDefaultComponent();
      }
      entry.component.x = entry.position.x;
      entry.component.y = entry.position.y;
      entry.component.text = entry.text;
      if (entry.fontSize) {
        entry.component.fontSize = entry.fontSize;
      };
      entry.component.update();
    });
  },
  buildDefaultComponent : function() {
    return new Component(knobsAndLevers.text.baseParams);
  },
  checkForSelection : function() {
    this.timeSinceSelection += 1;
    if (
      this.timeSinceSelection > this.minTimeToSelect
        &&
      (controls.keyboard.flowControlButtonPressed() || controls.isFiring())
    ) {
      this.currentSelection.entry.action();
    };
  },
  addInitials : function(initial) {
    let theText = this.screens.initials.text.entries[2].text;
    if (theText.length < 3) {
      theText += initial;
    } else {
      main.saveScore(theText);
      this.reset();
    };
    this.screens.initials.text.entries[2].text = theText;
  },
  setLeaderboardTexts : function() {
    if (!this.leaderboards) {
      return;
    };
    this.screens.main.text.entries = [];
    let entriesSoFar = 0;
    let text = '';
    this.leaderboards.sort(compare).forEach((entry, index) => {
      entriesSoFar = this.screens.main.text.entries.length;
      text = entry.initials + ': ' + entry.score;
      if (index < 10) {
        this.screens.main.text.entries.push(this.buildEntry(text, entriesSoFar));
      };
    });
  },
  buildEntry : function(text, count) {
    return {
      text : text,
      component : undefined,
      position : {x : 250, y : 175 + 25 * count},
      fontSize : '15px',
    };
  },
};

function compare(a, b) {
  if (a.score < b.score) {
    return 1;
  } else if (a.score > b.score) {
    return -1;
  } else {
    return 0;
  };
};
