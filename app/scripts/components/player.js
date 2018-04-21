/*jslint white: true */
var player = {
  activeDirection : undefined,
  boundaries : {},
  died : false,
  eligibleDirections : {},
  watchPositions : {
    'up' : ['belowTop'],
    'right' : ['insideRight'],
    'down' : ['aboveBottom'],
    'left' : ['insideLeft'],
    'upRight' : ['belowTop', 'insideRight'],
    'downRight' : ['aboveBottom', 'insideRight'],
    'downLeft' : ['aboveBottom', 'insideLeft'],
    'upLeft' : ['belowTop', 'insideLeft'],
  },
  init : function() {
    this.areaHeight = knobsAndLevers.player.areaHeight;
    this.topLimit = knobsAndLevers.player.topLimit;
    let gamePieceArgs = {
      width: knobsAndLevers.player.width,
      height : knobsAndLevers.player.height,
      color : "red",
      x : knobsAndLevers.player.startX,
      y : knobsAndLevers.player.startY,
      extraArgs : {type : "player", speed : {x : 0, y : 0}}
    };
    this.gamePiece = new Component(gamePieceArgs);
    console.log("player initialized");
  },
  manage : function() {
    this.move();
    this.update();
  },
  update : function() {
    this.gamePiece.update();
  },
  reset : function() {
    this.gamePiece.x = knobsAndLevers.player.startX;
    this.gamePiece.y = knobsAndLevers.player.startY;
  },
  move : function() {
    this.stop();
    this.setBoundaries();
    this.determineEligibleDirections();
    this.moveTheThing(controls.getPositionModifiers(this.boundaries, knobsAndLevers.player.speed.value, this.eligibleDirections));
  },
  stop : function() {
    this.gamePiece.speedX = 0;
    this.gamePiece.speedY = 0;
  },
  setBoundaries : function() {
    this.boundaries.belowTop = this.gamePiece.getTop() > player.topLimit;
    this.boundaries.insideRight = this.gamePiece.getRight() < game.gameArea.canvas.width;
    this.boundaries.aboveBottom = this.gamePiece.getBottom() < game.gameArea.canvas.height;
    this.boundaries.insideLeft = this.gamePiece.getLeft() > 0;
  },
  determineEligibleDirections : function() {
    this.setEligibleDirectionsToDefault();
    Array.from(Object.keys(this.watchPositions)).forEach(direction => {
      this.watchPositions[direction].forEach(playerPosition =>
        this.eligibleDirections[direction] = this.boundaries[playerPosition] && this.eligibleDirections[direction]
      );
    });
  },
  setEligibleDirectionsToDefault : function() {
    Array.from(Object.keys(this.watchPositions)).forEach(direction => {
      this.eligibleDirections[direction] = true;
    });
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
  revertPosition : function(modifier) {
    this.gamePiece.speedX = -1 * (modifier.x ? modifier.x : this.gamePiece.speedX);
    this.gamePiece.speedY = -1 * (modifier.y ? modifier.y : this.gamePiece.speedY);
    this.gamePiece.newPos();
  },
};
