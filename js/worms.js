/*jslint white: true */

/* Worms */
/***********************************/

var wormPointValue = 50;
var worms = [];
var wormMinInterval = 2000;
var wormMaxInterval = 4000;
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
  x = -gameArea.canvas.width / 10;
  y = gameArea.canvas.height / 10;
  var worm = new component(gameArea.gridSquareSideLength * 2, gameArea.gridSquareSideLength / 2, "orange", x, y, "worm");
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
