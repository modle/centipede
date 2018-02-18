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
    if (lasers.length === knobsAndLevers.maxLasers || !gameArea.keys || !everyinterval(knobsAndLevers.laserInterval)) {
      return;
    }
    var speedX = 0;
    var speedY = 0;
    // up
    if (gameArea.keys[16] || gameArea.keys[37] || gameArea.keys[38] || gameArea.keys[39] || gameArea.keys[40]) {
      speedY = -1 * knobsAndLevers.laserSpeed;
    }
    let gamePiece = gamePieceHandler.gamePiece;
    if (speedY !== 0) {
      lasers.push(new component(knobsAndLevers.laserSideLength, knobsAndLevers.laserSideLength, "purple", gamePiece.x + gamePiece.width / 2, gamePiece.y + gamePiece.height / 2, "laser", speedX, speedY));
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
