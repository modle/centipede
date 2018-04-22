/*jslint white: true */
var lasers = {
  lasers : {player1 : [], player2 : []},
  manage : function() {
    Array.from(Object.keys(this.lasers)).forEach(key => {
      let player = players.players[key];
      if (!player) {
        return;
      };
      this.spawn(player);
      this.update(key);
      this.clearOutsideCanvas(key);
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
    let eligible = this.lasers[player.name].length < knobsAndLevers.laser.quantity.value
      && supporting.everyinterval(
        game.gameArea.frameNo, knobsAndLevers.laser.interval
      )
      && controls.isFiring(player);
    return eligible;
  },
  add : function(player) {
    this.lasers[player.name].push(this.make(player));
  },
  make : function(player) {
    let laserArgs = knobsAndLevers.laser.args;
    laserArgs.extraArgs.speed.y = -1 * knobsAndLevers.laser.speed.value;
    laserArgs.x = player.x + player.width / 2;
    laserArgs.y = player.y;
    return new Component(laserArgs);
  },


  update : function(playerName) {
    for (i = 0; i < this.lasers[playerName].length; i += 1) {
      this.lasers[playerName][i].y += this.lasers[playerName][i].speedY;
      this.lasers[playerName][i].update();
    }
  },


  clearOutsideCanvas : function(playerName) {
    this.lasers[playerName] = this.lasers[playerName].filter(laser => laser.y > 0);
  },


  clear : function() {
    this.lasers = {player1 : [], player2 : []};
  },
};
