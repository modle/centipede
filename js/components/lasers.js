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
      if (lasers.length === knobsAndLevers.maxLasers || !gameArea.keysDown || !everyinterval(knobsAndLevers.laserInterval)) {
        return;
      }
      // if fire key is pressed
      if (gameArea.keysDown[16] || gameArea.keysDown[37] || gameArea.keysDown[38] || gameArea.keysDown[39] || gameArea.keysDown[40] || gameArea.keysDown['LMB']) {
        laserArgs.extraArgs.speed.y = -1 * knobsAndLevers.laserSpeed;
      }
      if (laserArgs.extraArgs.speed.y !== 0) {
        // could not follow the create once and toggle on/off pattern, since it would not allow overlapping laser fire sounds
        // have to create each time a new laser is added
        if (this.laserSounds.length < 3) {
          laserSound = new sound("media/sounds/laser.mp3", 0.5);
          this.laserSounds.push(laserSound);
        }
        lasers.push(new component(laserArgs));
      }
      // this should limit the number of laserSounds that exist at once
      this.laserSounds.forEach(function(sound, index, object) {
        sound.play();
        object.splice(index, 1);
      });
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
