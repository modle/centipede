/*jslint white: true */
var laserHandler = {
  lasers : [],
  manage : function() {
    this.spawn();
    this.update();
    this.clearOutsideCanvas();
  },
  spawn : function() {
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
  update : function() {
    let lasers = this.lasers;
    for (i = 0; i < lasers.length; i += 1) {
      lasers[i].y += lasers[i].speedY;
      lasers[i].update();
    }
  },
  clearOutsideCanvas : function() {
    let lasers = this.lasers;
    if (!lasers) { return; }
    for (i = 0; i < lasers.length; i += 1) {
      if (lasers[i].y < 0) {
        // laser
        lasers.splice(i, 1);
      }
    }
  },
  clear : function() {
    this.lasers = [];
  }
}
