/*jslint white: true */
var lasers = {
  lasers : {player1 : [], player2 : []},
  manage : function() {
    Array.from(Object.keys(this.lasers)).forEach(player => {
      this.spawn();
      this.update();
      this.clearOutsideCanvas();
    });
  },


  spawn : function(player) {
    if (!this.eligibleToSpawn(player)) {
      return;
    };
    this.add(player);
    sounds.playAvailableLaserSound();
  },
  eligibleToSpawn : function(player) {
    let eligible = this.lasers[player].length < knobsAndLevers.laser.quantity.value
      && supporting.everyinterval(
        game.gameArea.frameNo, knobsAndLevers.laser.interval
      )
      && controls.isFiring(player);
    return eligible;
  },
  add : function(player) {
    this.lasers.push(this.make(player));
  },
  make : function(player) {
    let laserArgs = knobsAndLevers.laser.args;
    laserArgs.extraArgs.speed.y = -1 * knobsAndLevers.laser.speed.value;
    if (player == undefined) {
      throw('player is undefined');
    };
    laserArgs.x = player.x + player.width / 2;
    laserArgs.y = player.y;
    return new Component(laserArgs);
  },


  update : function() {
    for (i = 0; i < this.lasers.length; i += 1) {
      this.lasers[i].y += this.lasers[i].speedY;
      this.lasers[i].update();
    }
  },


  clearOutsideCanvas : function() {
    this.lasers = this.lasers.filter(laser => laser.y > 0);
  },
  clear : function() {
    this.lasers = [];
  },
};
