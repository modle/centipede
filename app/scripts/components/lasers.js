/*jslint white: true */
var lasers = {
  lasers : {player1 : [], player2 : []},
  init : function() {
    Object.assign(this, gameObjectsBase);
    supporting.applyOverrides(this);
    console.log('lasers initialized');
  },
  functionOverrides : {
    manage : function() {
      Object.keys(this.lasers).forEach(key => {
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
      sounds.playSound('laser');
    },
    add : function(player) {
      this.lasers[player.name].push(this.make(player));
    },
    make : function(player) {
      let laserArgs = dials.lasers.args;
      laserArgs.extraArgs.speed.y = -1 * dials.lasers.speed.value;
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
      this.lasers[playerName] = this.lasers[playerName].filter(laser => laser.y > 0 && !laser.remove);
    },
    clear : function() {
      this.lasers = {player1 : [], player2 : []};
    },
  },
  eligibleToSpawn : function(player) {
    let eligible = this.lasers[player.name].length < dials.lasers.quantity.value
      && supporting.everyinterval(
        game.gameArea.frameNo, dials.lasers.interval
      )
      && controls.isFiring(player);
    return eligible;
  },
};
