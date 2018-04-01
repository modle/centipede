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
    let direction = controls.getDirection();
    // console.log(direction);
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
      (controls.keyBoardFlowControlButtonPressed() || controls.isFiring())
    ) {
      this.currentSelection.entry.action();
    };
  },
};
