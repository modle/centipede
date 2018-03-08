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
    if (controllerEnabled && controllerIndex >= 0) {
      movementAxes = navigator.getGamepads()[controllerIndex].axes;
      leftStick = {
        x : Math.abs(movementAxes[0]) > 0.5 ? knobsAndLevers.gamePieceSpeed * movementAxes[0] : 0,
        y : Math.abs(movementAxes[1]) > 0.5 ? knobsAndLevers.gamePieceSpeed * movementAxes[1] : 0
      };
      if (leftStick.x || leftStick.y) {
        this.moveTheThing(leftStick);
        return;
      }
    };
    this.activeDirection = this.getActiveDirection();
    if (this.activeDirection) {
      this.moveTheThing(this.getPositionModifiers()[this.activeDirection]);
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
  moveTheThing : function(speed) {
    this.updatePosition(speed);
    if (collisions.withMushrooms(this.gamePiece)) {
      this.revertPosition(speed);
    };
    if (this.collidesWithEdges()) {
      this.revertPosition(speed);
    };
  },
  collidesWithEdges : function() {
    return false;
  },
  updatePosition : function(modifier) {
    this.gamePiece.speedX = modifier.x ? modifier.x : this.gamePiece.speedX;
    this.gamePiece.speedY = modifier.y ? modifier.y : this.gamePiece.speedY;
    this.gamePiece.newPos();
  },
  getPositionModifiers : function() {
    speedModifier = knobsAndLevers.gamePieceSpeed;
    return {
      upRight: {x : speedModifier, y : -speedModifier},
      upLeft: {x : -speedModifier, y : -speedModifier},
      downRight: {x : speedModifier, y : speedModifier},
      downLeft: {x : -speedModifier, y : speedModifier},
      right: {x : speedModifier},
      down: {y : speedModifier},
      left: {x : -speedModifier},
      up: {y : -speedModifier},
    };
  },
  revertPosition : function(positionModifiers) {
    this.gamePiece.speedX = positionModifiers.x ? -positionModifiers.x : this.gamePiece.speedX;
    this.gamePiece.speedY = positionModifiers.y ? -positionModifiers.y : this.gamePiece.speedY;
    this.gamePiece.newPos();
  },
}

gamePiece.init();
