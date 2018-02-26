/*jslint white: true */
var gamePieceHandler = {
  init : function() {
    let gamePieceArgs = {
      width: knobsAndLevers.gamePieceWidth,
      height : knobsAndLevers.gamePieceHeight,
      color : "red",
      x : knobsAndLevers.gamePieceStartX,
      y : knobsAndLevers.gamePieceStartY,
      extraArgs : {type : "gamePiece", speed : {x : 0, y : 0}}
    };
    this.gamePiece = new component(gamePieceArgs);
    this.calculateStartingArea();
    console.log("gamePiece initialized");
  },
  calculateStartingArea : function() {
    this.gamePieceStartingArea = new component(
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
    if (!game.keysDown) {
      return;
    }
    this.stop();
    this.setPositionFlags();
    this.setActiveDirections();
    if (this.activeDirections.length > 0) {
      this.moveTheThing(this.activeDirections[0]);
      return;
    }
  },
  setPositionFlags : function() {
    this.positionFlags = {
      belowTop : this.gamePiece.getTop() > game.gameArea.gamePieceTopLimit,
      insideRight : this.gamePiece.getRight() < game.gameArea.canvas.width,
      aboveBottom : this.gamePiece.getBottom() < game.gameArea.canvas.height,
      insideLeft : this.gamePiece.getLeft() > 0,
      upRight : [68, 87],
      downRight : [68, 83],
      downLeft : [83, 65],
      upLeft : [65, 87],
      up : [87],
      right : [68],
      down : [83],
      left : [65],
    }
  },
  setActiveDirections : function() {
    directionResults = {
      upRight : this.keysPressed(this.positionFlags['upRight']) && this.positionFlags.belowTop && this.positionFlags.insideRight,
      upLeft : this.keysPressed(this.positionFlags['upLeft']) && this.positionFlags.belowTop && this.positionFlags.insideLeft,
      downRight : this.keysPressed(this.positionFlags['downRight']) && this.positionFlags.aboveBottom && this.positionFlags.insideRight,
      downLeft : this.keysPressed(this.positionFlags['downLeft']) && this.positionFlags.aboveBottom && this.positionFlags.insideLeft,
      up : this.keysPressed(this.positionFlags['up']) && this.positionFlags.belowTop,
      down : this.keysPressed(this.positionFlags['down']) && this.positionFlags.aboveBottom,
      right : this.keysPressed(this.positionFlags['right']) && this.positionFlags.insideRight,
      left : this.keysPressed(this.positionFlags['left']) && this.positionFlags.insideLeft,
    };
    this.activeDirections = Array.from(Object.keys(directionResults)).filter(direction => directionResults[direction]);
  },
  keysPressed : function(needles) {
    haystack = game.keysDown;
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

gamePieceHandler.init();
