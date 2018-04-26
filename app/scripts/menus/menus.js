menus = {
  currentSelection : undefined,
  init : function() {
    Object.assign(this, menusProps);
    this.screens.initials = initials;
    this.screens.main = mainMenu;
    this.selectionMarker = Object.assign({}, templates.marker);
    console.log('menus initialized');
  },
  areActive : function() {
    supporting.getFirstTruthy(this.show);
  },
  reset : function() {
    game.gameOver = false;
    this.init();
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
    Object.keys(this.show).forEach(menu => this.show[menu] = false);
  },
  processMenus : function() {
    this.checkForCheats();
    if (this.show.initials) {
      this.manageInitials();
    } else if (this.show.main) {
      this.screens.main.refresh();
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
    if (!this.currentSelection.entry || this.timeSinceMenuMove < this.minTimeToMove) {
      return;
    };
    let texts = this.screens.initials.text;
    this.setTexts(texts);
    this.setPositions(texts);
  },
  setTexts : function(texts) {
    this.screens.initials.text.currentScore.text = 'your score ' + metrics.lastScore;
    this.screens.initials.letterDisplays.forEach(entry =>
      texts[entry].text = 'DONE'
    );
    if (this.currentSelection.entry.options) {
      this.shiftListOrder(this.currentSelection.entry.options);
      let order = this.currentSelection.entry.options.slice();
      texts.previouser.text = order[order.length - 2];
      texts.previous.text = order[order.length - 1];
      texts.next.text = order[1];
      texts.nexter.text = order[2];
      this.screens.initials.entries[this.currentSelection.name].text = order[0];
    };
  },
  setPositions : function(texts) {
    let xPosition = this.currentSelection.entry.component.x;
    let yPosition = this.currentSelection.entry.component.y;
    this.screens.initials.letterDisplays.forEach(entry => {
      texts[entry].xOverride = xPosition;
      texts[entry].yOverride = yPosition;
    });
  },
  selectNextInitial : function() {
    let list = this.screens.initials.order;
    let direction = controls.checkMenuDirection();
    if (['left'].includes(direction)) {
      list.unshift(list.pop());
    } else if (['right'].includes(direction)) {
      list.push(list.shift());
    };
    this.timeSinceMenuMove = 0;
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
    return Object.keys(object).length > 0;
  },
  drawMenu : function(screen) {
    if (!this.hasElements(screen)) {
      return;
    };
    main.prepTheCanvas();
    if (screen.update) {
      screen.update();
    };
    this.drawTexts(menus.commonTexts);
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
    if (this.timeSinceMenuMove > this.minTimeToMove) {
      this.shiftListOrder(order);
    };
    this.currentSelection.name = order[0];
  },
  shiftListOrder : function(list) {
    let direction = controls.checkMenuDirection();
    if (list.length > 1) {
      if (['up'].includes(direction)) {
        this.timeSinceMenuMove = 0;
        list.unshift(list.pop());
      } else if (['down'].includes(direction)) {
        list.push(list.shift());
        this.timeSinceMenuMove = 0;
      };
    };
  },
  drawEntries : function(entries) {
    Object.keys(entries).forEach((entry, index) => {
      let menuElement = entries[entry];
      if (!menuElement.component) {
        menuElement.component = this.buildDefaultComponent();
      };
      menuElement.component.x = menuDefaults.entries.x + (menuElement.xAdjust ? menuElement.xAdjust : 0);
      menuElement.component.y = menuDefaults.entries.y + (menuElement.yAdjust ? menuElement.yAdjust : 0) + menuDefaults.yDivider * index;
      menuElement.component.text = menuElement.text;
      if (menuElement.fontSize) {
        menuElement.component.fontSize = menuElement.fontSize;
      };
      if (menuElement.color) {
        menuElement.component.color = menuElement.color;
      };
      if (this.currentSelection.name == entry && !menuElement.noSelection) {
        this.currentSelection.entry = menuElement;
        this.currentSelection.color = this.selectedEntryColor;
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
    Object.keys(texts).forEach((key, index) => {
      let entry = texts[key];
      if (!entry.component) {
        entry.component = this.buildDefaultComponent();
      };
      entry.component.x = (entry.xOverride ? entry.xOverride : menuDefaults.text.x) + (entry.xAdjust ? entry.xAdjust : 0);
      entry.component.y = (entry.yOverride ? entry.yOverride : menuDefaults.text.y) + (entry.yAdjust ? entry.yAdjust : 0) + menuDefaults.yDivider * index;
      entry.component.text = entry.text ? entry.text : entry.base;
      if (entry.fontSize) {
        entry.component.fontSize = entry.fontSize;
      };
      entry.component.update();
    });
  },
  buildDefaultComponent : function() {
    return new Component(knobsAndLevers.text.baseParams);
  },
  checkForSubmit : function() {
    this.timeSinceSelection += 1;
    if (
      this.timeSinceSelection > this.minTimeToSelect
        &&
      controls.submitIsPressed()
        &&
      this.currentSelection.entry.submit
    ) {
    };
  },
  checkForSelection : function() {
    this.timeSinceSelection += 1;
    if (this.timeSinceSelection > this.minTimeToSelect) {
      if (controls.menuSelect()) {
        this.currentSelection.entry.action();
      } else if (controls.submitIsPressed() && this.currentSelection.entry.submit) {
        this.currentSelection.entry.submit();
      };
    };
  },
  setGamepadText : function() {
    let gamepadsEnabled = controls.gamepad.enabledGamepadIndices.size;
    let playerActivateEntries = this.screens.playerActivate.text;
    playerActivateEntries.gamepadCount.text = "Active gamepads: " + gamepadsEnabled;
    if (gamepadsEnabled) {
      game.activePlayers = gamepadsEnabled;
      let key = 'player' + gamepadsEnabled + 'Check';
      entry = playerActivateEntries[key];
      entry.text = entry.base + 'ACTIVE';
    };
  },
};
