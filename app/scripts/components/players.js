/*jslint white: true */
var playerConstants = {
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
  eligibleDirections : {
    'up' : true,
    'right' : true,
    'down' : true,
    'left' : true,
    'upRight' : true,
    'downRight' : true,
    'downLeft' : true,
    'upLeft' : true,
  },
};

var players = {
  players : {},
  activeDirection : undefined,
  boundaries : {},
  died : false,
  init : function() {
    while (Object.keys(this.players).length < game.numberOfPlayers) {
      let player = new Component(this.getPlayerArgs());
      player.name = 'player' + (Object.keys(this.players).length + 1);
      player.eligibleDirections = supporting.clone(playerConstants.eligibleDirections);
      this.players[player.name] = player;
    };
    console.log('players initialized', this.players);
  },
  getPlayerArgs : function() {
    let defaults = knobsAndLevers.player;
    return {
      width: defaults.dimensions.width,
      height : defaults.dimensions.height,
      color : defaults.colors[Object.keys(this.players).length],
      x : defaults.startX[Object.keys(this.players).length],
      y : defaults.startY,
      extraArgs : {type : "player", speed : {x : 0, y : 0}}
    };
  },
  manage : function() {
    Object.keys(this.players).forEach(key => {
      let player = this.players[key];
      this.move(player);
      this.update(player);
    });
  },
  update : function(player) {
    player.update();
  },
  reset : function() {
    this.players.forEach(player => {
      player.x = knobsAndLevers.player.startX[0];
      player.y = knobsAndLevers.player.startY;
    });
  },
  move : function(player) {
    this.stop(player);
    this.setBoundaries(player);
    this.determineEligibleDirections(player);
    this.moveTheThing(player);
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
  determineEligibleDirections : function(player) {
    player.eligibleDirections = supporting.clone(playerConstants.eligibleDirections);
    Array.from(Object.keys(playerConstants.watchPositions)).forEach(direction => {
      playerConstants.watchPositions[direction].forEach(playerPosition =>
        player.eligibleDirections[direction] = this.boundaries[playerPosition] && player.eligibleDirections[direction]
      );
    });
  },
  moveTheThing : function(player) {
    let speed = this.determineSpeed(player);
    if (!speed) {
      return;
    };
    this.updatePosition(player, speed);
    if (collisions.withMushrooms(player)) {
      this.revertPosition(player, speed);
    };
  },
  determineSpeed : function(player) {
    return controls.getPositionModifiers(this.boundaries, knobsAndLevers.player.speed.value, player)
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
