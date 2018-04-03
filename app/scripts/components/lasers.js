/*jslint white: true */
var lasers = Object.create(displayObjectPrototype, {
  lasers : {
    value : [],
    writable : true,
    enumerable : true
  },
  spawn : {
    value : function() {
      if (!this.eligibleToSpawn()) {
        return;
      };
      this.add(this.make());
      sounds.playAvailableLaserSound();
    },
    writable : false,
    enumerable : true
  },
  eligibleToSpawn : {
    value : function() {
      let eligible = this.lasers.length < knobsAndLevers.laser.maxNumber
        && supporting.everyinterval(
          game.gameArea.frameNo, knobsAndLevers.laser.interval
        )
        && controls.isFiring();
      return eligible;
    },
    writable : false,
    enumerable : true
  },
  make : {
    value : function() {
      let laserArgs = knobsAndLevers.laser.args;
      laserArgs.extraArgs.speed.y = -1 * knobsAndLevers.laser.speed;
      if (player.gamePiece == undefined) {
        throw('player.gamePiece is undefined');
      };
      laserArgs.x = player.gamePiece.x + player.gamePiece.width / 2;
      laserArgs.y = player.gamePiece.y;
      return new Component(laserArgs);
    },
    writable : true,
    enumerable : true,
  },
  add : {
    value : function() {
      this.lasers.push(this.make());
    },
    writable : true,
    enumerable : true,
  },
  update : {
    value : function() {
      for (i = 0; i < this.lasers.length; i += 1) {
        this.lasers[i].y += this.lasers[i].speedY;
        this.lasers[i].update();
      }
    },
    writable : false,
    enumerable : true
  },
  clearOutsideCanvas : {
    value : function() {
      this.lasers = this.lasers.filter(laser => laser.y > 0);
    },
    writable : false,
    enumerable : true
  },
  clear : {
    value : function() {
      this.lasers = [];
    },
    writable : true,
    enumerable : true
  }
});
