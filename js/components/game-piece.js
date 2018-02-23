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
    console.log("gamePiece initialized");
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
  },
  move : function() {
    if (!gameArea.keysDown) {
      return;
    }
    let gamePiece = this.gamePiece;
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
    let gamePieceSpeed = knobsAndLevers.gamePieceSpeed;
    this.positionFlags = this.getPositionFlags();
    directionResults = this.evaluateDirections();
    activeDirections = Array.from(Object.keys(directionResults)).filter(direction => directionResults[direction]);
    moved = false;
    if (activeDirections.length > 0) {
      this.moveTheThing(activeDirections[0]);
      return;
    }
  },
  getPositionFlags : function() {
    return {
      belowTop : this.gamePiece.getTop() > gameArea.gamePieceTopLimit,
      insideRight : this.gamePiece.getRight() < gameArea.canvas.width,
      aboveBottom : this.gamePiece.getBottom() < gameArea.canvas.height,
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
  keysPressed : function(needles) {
    haystack = gameArea.keysDown;
    for (var i = 0; i < needles.length; i++) {
      if (!haystack[needles[i]]) {
        return false;
      }
    }
    return true;
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
  updatePosition : function(positionModifiers) {
    this.gamePiece.speedX = positionModifiers.x ? positionModifiers.x : this.gamePiece.speedX;
    this.gamePiece.speedY = positionModifiers.y ? positionModifiers.y : this.gamePiece.speedY;
    this.gamePiece.newPos();
  },
  revertPosition : function(positionModifiers) {
    this.gamePiece.speedX = positionModifiers.x ? -positionModifiers.x : this.gamePiece.speedX;
    this.gamePiece.speedY = positionModifiers.y ? -positionModifiers.y : this.gamePiece.speedY;
    this.gamePiece.newPos();
  },
  moveTheThing : function(direction) {
    this.updatePosition(this.positionModifiers[direction]);
    if (collisions.withMushrooms(this.gamePiece)) {
      this.revertPosition(this.positionModifiers[direction]);
    }
  },
  evaluateDirections : function() {
    return {
      'upRight' : this.keysPressed(this.positionFlags['upRight']) && this.positionFlags.belowTop && this.positionFlags.insideRight, 
      'upLeft' : this.keysPressed(this.positionFlags['upLeft']) && this.positionFlags.belowTop && this.positionFlags.insideLeft,
      'downRight' : this.keysPressed(this.positionFlags['downRight']) && this.positionFlags.aboveBottom && this.positionFlags.insideRight,
      'downLeft' : this.keysPressed(this.positionFlags['downLeft']) && this.positionFlags.aboveBottom && this.positionFlags.insideLeft,
      'up' : this.keysPressed(this.positionFlags['up']) && this.positionFlags.belowTop,
      'down' : this.keysPressed(this.positionFlags['down']) && this.positionFlags.aboveBottom,
      'right' : this.keysPressed(this.positionFlags['right']) && this.positionFlags.insideRight,
      'left' : this.keysPressed(this.positionFlags['left']) && this.positionFlags.insideLeft,
    }
  }
}

gamePieceHandler.init();
