/*jslint white: true */
// TODO convert gamePiece to a list of players

var players = {
  players : [],
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
    this.players = [];
    while (this.players.length < game.numberOfPlayers) {
      this.players.push(new Component(this.getPlayerArgs()));
    };
    console.log('players initialized', this.players);
  },
  getPlayerArgs : function() {
    let defaults = knobsAndLevers.player;
    console.log(defaults);
    return {
      width: defaults.dimensions.width,
      height : defaults.dimensions.height,
      color : defaults.colors[this.players.length],
      x : defaults.startX[this.players.length],
      y : defaults.startY,
      extraArgs : {type : "player", speed : {x : 0, y : 0}}
    };
  },
  manage : function() {
    this.players.forEach(player => {
      this.move(player);
      this.update(player);
    });
  },
  update : function(player) {
    player.update();
  },
  reset : function() {
    this.players.forEach(player => {
      player.x = knobsAndLevers.player.startX;
      player.y = knobsAndLevers.player.startY;
    });
  },
  move : function(player) {
    this.stop(player);
    this.setBoundaries(player);
    this.determineEligibleDirections();
    this.moveTheThing(player, controls.getPositionModifiers(this.boundaries, knobsAndLevers.player.speed.value, this.eligibleDirections));
  },
  stop : function(player) {
    player.speedX = 0;
    player.speedY = 0;
  },
  setBoundaries : function(player) {
    this.boundaries.belowTop = player.getTop() > knobsAndLevers.player.topLimit;
    this.boundaries.insideRight = player.getRight() < game.gameArea.canvas.width;
    this.boundaries.aboveBottom = player.getBottom() < game.gameArea.canvas.height;
    this.boundaries.insideLeft = player.getLeft() > 0;
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
  moveTheThing : function(player, speed) {
    if (!speed) {
      return;
    };
    this.updatePosition(player, speed);
    if (collisions.withMushrooms(player)) {
      this.revertPosition(player, speed);
    };
  },
  updatePosition : function(player, modifier) {
    player.speedX = modifier.x ? modifier.x : player.speedX;
    player.speedY = modifier.y ? modifier.y : player.speedY;
    player.newPos();
  },
  revertPosition : function(player, modifier) {
    player.speedX = -1 * (modifier.x ? modifier.x : player.speedX);
    player.speedY = -1 * (modifier.y ? modifier.y : player.speedY);
    player.newPos();
  },
};
