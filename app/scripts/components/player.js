/*jslint white: true */
var player = {
  activeDirection : undefined,
  boundaries : {},
  died : false,
  eligibleDirections : {},
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
    this.stop();
    this.setBoundaries();
    this.setEligibleDirections();
    this.moveTheThing(controls.getPositionModifiers(knobsAndLevers.gamePieceSpeed, this.eligibleDirections));
  },
  moveTheThing : function(speed) {
    if (!speed) {
      return;
    };
    this.updatePosition(speed);
    if (collisions.withMushrooms(this.gamePiece)) {
      this.revertPosition(speed);
    };
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
  setBoundaries : function() {
    this.boundaries.belowTop = this.gamePiece.getTop() > game.gameArea.gamePieceTopLimit;
    this.boundaries.insideRight = this.gamePiece.getRight() < game.gameArea.canvas.width;
    this.boundaries.aboveBottom = this.gamePiece.getBottom() < game.gameArea.canvas.height;
    this.boundaries.insideLeft = this.gamePiece.getLeft() > 0;
  },
  setEligibleDirections : function() {
    let watchPositions = {
      'up' : ['belowTop'],
      'right' : ['insideRight'],
      'down' : ['aboveBottom'],
      'left' : ['insideLeft'],
      'upRight' : ['belowTop', 'insideRight'],
      'downRight' : ['aboveBottom', 'insideRight'],
      'downLeft' : ['aboveBottom', 'insideLeft'],
      'upLeft' : ['belowTop', 'insideLeft'],
    };
    Array.from(Object.keys(watchPositions)).forEach(direction => {
        this.eligibleDirections[direction] = true;
        watchPositions[direction].forEach(playerPosition =>
          this.eligibleDirections[direction] = this.boundaries[playerPosition] && this.eligibleDirections[direction]
        );
      });
  },
};

player.init();
