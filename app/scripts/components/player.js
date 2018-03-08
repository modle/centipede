/*jslint white: true */
var player = {
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
    controls.setBoundaries();
    controls.detectControllerMovement();
    this.activeDirection = controls.getActiveDirection();
    if (this.activeDirection) {
      this.moveTheThing(controls.getPositionModifiers()[this.activeDirection]);
    };
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
  revertPosition : function(positionModifiers) {
    this.gamePiece.speedX = positionModifiers.x ? -positionModifiers.x : this.gamePiece.speedX;
    this.gamePiece.speedY = positionModifiers.y ? -positionModifiers.y : this.gamePiece.speedY;
    this.gamePiece.newPos();
  },
}

player.init();
