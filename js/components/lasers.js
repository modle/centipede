/*jslint white: true */
var lasers = Object.create(displayObjectPrototype, {
  lasers : {
    value : [],
    writable : true,
    enumerable : true
  },
  spawn : {
    value : function() {
      let lasers = this.lasers;
      let gamePiece = gamePieceHandler.gamePiece;
      let laserArgs = {
        width: knobsAndLevers.laserSideLength,
        height : knobsAndLevers.laserSideLength,
        color : "purple",
        x : gamePiece.x + gamePiece.width / 2,
        y : gamePiece.y + gamePiece.height / 2,
        extraArgs : {type : "laser", speed : {x : 0, y : 0}}
      };
      if (lasers.length === knobsAndLevers.maxLasers || !gameArea.keys || !everyinterval(knobsAndLevers.laserInterval)) {
        return;
      }
      // if fire key is pressed
      if (gameArea.keys[16] || gameArea.keys[37] || gameArea.keys[38] || gameArea.keys[39] || gameArea.keys[40] || gameArea.keys['LMB']) {
        laserArgs.extraArgs.speed.y = -1 * knobsAndLevers.laserSpeed;
      }
      if (laserArgs.extraArgs.speed.y !== 0) {
        lasers.push(new component(laserArgs));
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
      this.lasers = this.lasers.filter(object => object.y > 0);
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
