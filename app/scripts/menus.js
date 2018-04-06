menus = {
  init : function() {
    Object.assign(this, menusProps);
  },
  areActive : function() {
    return Array.from(Object.keys(menus.show)).find(key => menus.show[key]);
  },
  reset : function() {
    game.gameOver = false;
    this.init();
    this.disableMenus();
    this.show.main = true;
  },
  disableMenus : function() {
    if (game.gameArea.frameNo > 0) {
      main.prepTheCanvas();
    };
    this.timeSinceSelection = 0;
    this.show.initials = false;
    this.show.main = false;
    this.show.playerSelect = false;
    this.show.settings = false;
    this.show.instructions = false;
  },
  processMenus : function() {
    if (game.gameArea.frameNo == 1) {
      this.setImages();
    };
    if (this.show.initials) {
      this.drawMenu(menus.screens.initials);
      let initialsText = this.screens.initials.text.entries[2].text;
      this.screens.initials.text.entries[1].text = 'your score: ' + metrics.lastScore;
      if (initialsText.length >= 3) {
        main.saveScore(initialsText);
        this.reset();
      };
      return true;
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
      images[entry].image.src = knobsAndLevers.mediaPath + images[entry].file
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
    let direction = controls.getDirection();
    if (direction == "up") {
      order.unshift(order.pop());
    } else if (direction == "down") {
      order.push(order.shift());
    };
    this.currentSelection.name = order[0];
  },
  drawImages : function(images) {
    this.drawEntries(images.entries);
    this.drawSelectionMarker(menus.screens.pointers.entries);
    this.drawTexts(images);
  },
  drawEntries : function(entries) {
    Array.from(Object.keys(entries)).forEach(entry => {
      if (!entries[entry].enabled) {
        return;
      };
      if (this.currentSelection.name == entry) {
        this.currentSelection.entry = entries[entry];
      };
      game.gameArea.context.drawImage(entries[entry].image, entries[entry].position.x, entries[entry].position.y)
    });
  },
  drawSelectionMarker : function(entries) {
    Array.from(Object.keys(entries)).forEach(entry => {
      game.gameArea.context.fillRect(
        this.currentSelection.entry.position.x - knobsAndLevers.player.width,
        this.currentSelection.entry.position.y + this.currentSelection.entry.dimensions.height / 2.5,
        knobsAndLevers.player.width,
        knobsAndLevers.player.height
      );
    });
  },
  drawTexts : function(images) {
    if (images['text']) {
      images.text.entries.forEach(entry => {
        entry.component = this.buildDefaultComponent();
        entry.component.x = entry.position.x;
        entry.component.y = entry.position.y;
        entry.component.text = entry.text;
        if (entry.fontSize) {
          entry.component.fontSize = entry.fontSize;
        };
        entry.component.update();
      });
    };
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
};
