/*jslint white: true */
var lasers = Object.create(displayObjectPrototype, {
  laserSounds : {
    value : [],
    writable : true,
    enumerable : true
  },
  lasers : {
    value : [],
    writable : true,
    enumerable : true
  },
  spawn : {
    value : function() {
      let gamePiece = gamePieceHandler.gamePiece;
      let laserArgs = knobsAndLevers.laser.args;
      let keysDown = gameHandler.keysDown;
      laserArgs.extraArgs.speed.y = 0;
      laserArgs.x = gamePiece.x + gamePiece.width / 2;
      laserArgs.y = gamePiece.y + gamePiece.height / 2;
      if (this.lasers.length === knobsAndLevers.laser.maxNumber || !keysDown || !everyinterval(knobsAndLevers.laser.interval)) {
        return;
      }
      if (keysDown[16] || keysDown[37] || keysDown[38] || keysDown[39] || keysDown[40] || keysDown['LMB']) {
        laserArgs.extraArgs.speed.y = -1 * knobsAndLevers.laser.speed;
      }
      if (laserArgs.extraArgs.speed.y !== 0) {
        getAvailableLaserSound().play();
        this.lasers.push(new component(laserArgs));
      }
    },
    writable : false,
    enumerable : true
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
    writable : false,
    enumerable : true
  }
});
