/*jslint white: true */

/* Worms */
/***********************************/

var wormPointValue = 50;
var worms = [];
var wormMinInterval = 5000;
var wormMaxInterval = 8000;
var wormInterval = getRandom(wormMinInterval, wormMaxInterval);

function manageWorms() {
  clearWormsOutsideCanvas();
  if (everyinterval(wormInterval)) {
    wormInterval = getRandom(wormMinInterval, wormMaxInterval);
    spawnWorm();
  }
  updateWorms();
}

function spawnWorm() {
  x = -canvasWidth / 10;
  y = canvasHeight / 10;
  var worm = new component(gridSquareSide * 2, gridSquareSide / 2, "orange", x, y, "worm");
  worm.speedX = 0.5;
  worm.pointValue = wormPointValue * currentLevel;
  worm.hitPoints = 1;
  worms.push(worm);
}

function updateWorms() {
  for (i = 0; i < worms.length; i += 1) {
    worms[i].newPos();
    worms[i].update();
  }
}

function clearWormsOutsideCanvas() {
  if (!worms) { return; }
  for (i = 0; i < worms.length; i += 1) {
    if (worms[i].x > canvasWidth) {
      worms.splice(i, 1);
    }
  }
}

function clearWorms() {
  worms = [];
}
