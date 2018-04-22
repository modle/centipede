menus = {
  leaderboards : undefined,
  currentSelection : undefined,
  init : function() {
    Object.assign(this, menusProps);
    this.selectionMarker = Object.assign({}, templates.marker);
    console.log('menus initialized');
  },
  areActive : function() {
    supporting.getFirstTruthy(this.show);
  },
  reset : function() {
    game.gameOver = false;
    this.init();
    this.screens.initials.text.entries[2].text = '';
    this.display(metrics.lastScore ? 'initials' : 'main');
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
    this.checkForCheats();
    if (this.show.initials) {
      this.manageInitials();
    } else if (this.show.main) {
      this.leaderboards = main.readLeaderboard();
      this.setLeaderboardTexts();
    } else if (this.show.playerActivate) {
      this.setGamepadText();
    };
    let screen = this.getCurrentScreen();
    this.drawMenu(screen);
  },
  checkForCheats : function() {
    if (this.show.initials && game.cheatsAreActive()) {
      this.show.initials = false;
      this.show.main = true;
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
      metrics.lastScore = 0;
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
  getCurrentScreen : function() {
    let activeScreen = supporting.getFirstTruthy(this.show);
    let screen = {};
    if (activeScreen) {
      screen = this.screens[activeScreen];
    };
    return screen;
  },
  hasElements : function(object) {
    return Array.from(Object.keys(object)).length > 0;
  },
  drawMenu : function(screen) {
    if (!this.hasElements(screen)) {
      return;
    };
    main.prepTheCanvas();
    if (screen.update) {
      screen.update();
    };
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
    let direction = controls.checkMenuDirection();
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
    Array.from(Object.keys(entries)).forEach((entry, index) => {
      let menuElement = entries[entry];
      if (!menuElement.component) {
        menuElement.component = this.buildDefaultComponent();
      };
      menuElement.component.x = menuDefaults.entries.x + (menuElement.xAdjust ? menuElement.xAdjust : 0);
      menuElement.component.y = menuDefaults.entries.y + menuDefaults.yDivider * index;
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
    if (!this.currentSelection.entry) {
      return;
    };
    this.selectionMarker.x = this.currentSelection.entry.component.x - templates.baseMarkerParams.width * 2;
    this.selectionMarker.y = this.currentSelection.entry.component.y - templates.baseMarkerParams.height;
    this.selectionMarker.update();
  },
  drawTexts : function(texts) {
    texts.entries.forEach((entry, index) => {
      if (!entry.component) {
        entry.component = this.buildDefaultComponent();
      };
      entry.component.x = menuDefaults.text.x + (entry.xAdjust ? entry.xAdjust : 0);
      entry.component.y = menuDefaults.text.y + (entry.yAdjust ? entry.yAdjust : 0) + menuDefaults.yDivider * index;
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
      (controls.keyboard.flowControlButtonPressed() || controls.menuSelect())
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
      this.show.main = true;
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
    supporting.fieldToCompare = 'score';
    this.leaderboards.sort(supporting.compare).forEach((entry, index) => {
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
      xAdjust : 175,
    };
  },
  setGamepadText : function() {
    let gamepadsEnabled = controls.gamepad.enabledGamepadIndices.size;
    let playerActivateEntries = this.screens.playerActivate.text.entries;
    playerActivateEntries[1].text = "Active gamepads: " + gamepadsEnabled;
    if (gamepadsEnabled > 0) {
      entry = playerActivateEntries[2];
      game.activePlayers = 1;
      entry.text = entry.base + 'GAMEPAD';
    };
    if (gamepadsEnabled > 1) {
      entry = playerActivateEntries[3];
      game.activePlayers = 2;
      entry.text = entry.base + 'GAMEPAD';
    };
  },
};
