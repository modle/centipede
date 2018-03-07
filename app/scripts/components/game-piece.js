/*jslint white: true */
var gamePiece = {
  activeDirection : undefined,
  init : function() {
    let gamePieceArgs = {
      width: knobsAndLevers.gamePieceWidth,
      height : knobsAndLevers.gamePieceHeight,
      color : "red",
      x : knobsAndLevers.gamePieceStartX,
      y : knobsAndLevers.gamePieceStartY,
      extraArgs : {type : "gamePiece", speed : {x : 0, y : 0}}
    };
    this.gamePiece = new Component(gamePieceArgs);
    this.calculateStartingArea();
    console.log("gamePiece initialized");
  },
  calculateStartingArea : function() {
    this.gamePieceStartingArea = new Component(
      {
        x : knobsAndLevers.gamePieceStartX - knobsAndLevers.gamePieceWidth * 5,
        y : knobsAndLevers.gamePieceTopLimit,
        width : knobsAndLevers.gamePieceWidth * 10,
        height : knobsAndLevers.canvasHeight - knobsAndLevers.gamePieceTopLimit,
        color : "orange",
        extraArgs : {type : "startingArea"},
      }
    );
  },
  manage : function() {
    this.move();
    this.update();
  },
  update : function() {
    this.gamePiece.update();
  },
  reset : function() {
    this.gamePiece.x = knobsAndLevers.gamePieceStartX;
    this.gamePiece.y = knobsAndLevers.gamePieceStartY;
    this.removeMushroomsFromStartingArea();
  },
  removeMushroomsFromStartingArea : function() {
    mushrooms.mushrooms = mushrooms.mushrooms.filter(mushroom => !mushroom.crashWith(this.gamePieceStartingArea));
  },
  stop : function() {
    this.gamePiece.speedX = 0;
    this.gamePiece.speedY = 0;
  },
  move : function() {
    if (!controls.keysDown) {
      return;
    }
    this.stop();
    this.setPositionFlags();
    this.activeDirection = this.getActiveDirection();
    if (this.activeDirection) {
      this.moveTheThing(this.activeDirection);
    };
  },
  setPositionFlags : function() {
    controls.movementCodes.belowTop = this.gamePiece.getTop() > game.gameArea.gamePieceTopLimit;
    controls.movementCodes.insideRight = this.gamePiece.getRight() < game.gameArea.canvas.width;
    controls.movementCodes.aboveBottom = this.gamePiece.getBottom() < game.gameArea.canvas.height;
    controls.movementCodes.insideLeft = this.gamePiece.getLeft() > 0;
  },
  getActiveDirection : function() {
    movementKeys = controls.movementCodes;
    directionResults = {
      upRight : this.keysPressed(movementKeys['upRight']) && movementKeys.belowTop && movementKeys.insideRight,
      upLeft : this.keysPressed(movementKeys['upLeft']) && movementKeys.belowTop && movementKeys.insideLeft,
      downRight : this.keysPressed(movementKeys['downRight']) && movementKeys.aboveBottom && movementKeys.insideRight,
      downLeft : this.keysPressed(movementKeys['downLeft']) && movementKeys.aboveBottom && movementKeys.insideLeft,
      up : this.keysPressed(movementKeys['up']) && movementKeys.belowTop,
      down : this.keysPressed(movementKeys['down']) && movementKeys.aboveBottom,
      right : this.keysPressed(movementKeys['right']) && movementKeys.insideRight,
      left : this.keysPressed(movementKeys['left']) && movementKeys.insideLeft,
    };
    return Array.from(Object.keys(directionResults)).find(direction => directionResults[direction]);
  },
  keysPressed : function(needles) {
    haystack = controls.keysDown;
    for (var i = 0; i < needles.length; i++) {
      if (!haystack[needles[i]]) {
        return false;
      }
    }
    return true;
  },
  moveTheThing : function(direction) {
    this.updatePosition(this.positionModifiers[direction]);
    if (collisions.withMushrooms(this.gamePiece)) {
      this.revertPosition(this.positionModifiers[direction]);
    }
  },
  updatePosition : function(positionModifiers) {
    this.gamePiece.speedX = positionModifiers.x ? positionModifiers.x : this.gamePiece.speedX;
    this.gamePiece.speedY = positionModifiers.y ? positionModifiers.y : this.gamePiece.speedY;
    this.gamePiece.newPos();
  },
  positionModifiers : {
    upRight: {x : knobsAndLevers.gamePieceSpeed, y : -knobsAndLevers.gamePieceSpeed},
    upLeft: {x : -knobsAndLevers.gamePieceSpeed, y : -knobsAndLevers.gamePieceSpeed},
    downRight: {x : knobsAndLevers.gamePieceSpeed, y : knobsAndLevers.gamePieceSpeed},
    downLeft: {x : -knobsAndLevers.gamePieceSpeed, y : knobsAndLevers.gamePieceSpeed},
    right: {x : knobsAndLevers.gamePieceSpeed},
    down: {y : knobsAndLevers.gamePieceSpeed},
    left: {x : -knobsAndLevers.gamePieceSpeed},
    up: {y : -knobsAndLevers.gamePieceSpeed},
  },
  revertPosition : function(positionModifiers) {
    this.gamePiece.speedX = positionModifiers.x ? -positionModifiers.x : this.gamePiece.speedX;
    this.gamePiece.speedY = positionModifiers.y ? -positionModifiers.y : this.gamePiece.speedY;
    this.gamePiece.newPos();
  },
}

gamePiece.init();
