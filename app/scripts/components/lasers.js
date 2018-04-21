/*jslint white: true */
var lasers = {
  lasers : [],
  manage : function() {
    this.spawn();
    this.update();
    this.clearOutsideCanvas();
  },
  spawn : function() {
    if (!this.eligibleToSpawn()) {
      return;
    };
    this.add(this.make());
    sounds.playAvailableLaserSound();
  },
  eligibleToSpawn : function() {
    let eligible = this.lasers.length < knobsAndLevers.laser.quantity.value
      && supporting.everyinterval(
        game.gameArea.frameNo, knobsAndLevers.laser.interval
      )
      && controls.isFiring();
    return eligible;
  },
  make : function() {
    let laserArgs = knobsAndLevers.laser.args;
    laserArgs.extraArgs.speed.y = -1 * knobsAndLevers.laser.speed.value;
    let player = players.players[0];
    if (player == undefined) {
      throw('player is undefined');
    };
    laserArgs.x = player.x + player.width / 2;
    laserArgs.y = player.y;
    return new Component(laserArgs);
  },
  add : function() {
    this.lasers.push(this.make());
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
