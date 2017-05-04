/*jslint white: true */

/* Lasers */
/***********************************/

var lasers = [];
var laserSpeed = 5;
var laserSideLength = 5;
var laserInterval = 10;
var maxLasers = 1;

function manageLasers() {
  makeLasers();
  updateLasers();
  clearLasersOutsideCanvas();
}

function makeLasers() {
  if (!lasers || lasers.length === maxLasers || !gameArea.keys || !everyinterval(laserInterval)) {
    return;
  }
  var speedX = 0;
  var speedY = 0;
  // up
  if (gameArea.keys[16] || gameArea.keys[37] || gameArea.keys[38] || gameArea.keys[39] || gameArea.keys[40]) {
    speedY = -1 * laserSpeed;
  }
  if (speedY !== 0) {
    lasers.push(new component(laserSideLength, laserSideLength, "purple", gamePiece.x + gamePiece.width / 2, gamePiece.y + gamePiece.height / 2, "laser", speedX, speedY));
  }
}

function updateLasers() {
  for (i = 0; i < lasers.length; i += 1) {
    lasers[i].y += lasers[i].speedY;
    lasers[i].update();
  }
}

function clearLasersOutsideCanvas() {
  if (!lasers) { return; }
  for (i = 0; i < lasers.length; i += 1) {
    if (lasers[i].y < 0) {
      // laser
      lasers.splice(i, 1);
    }
  }
}

function clearLasers() {
  lasers = [];
}
