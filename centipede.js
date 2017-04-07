/* Centipedes */
/***********************************/

var centipedes = [];
var centipedeInterval = 10;
var centipedeBaseSpeed = 2;
var maxCentipedes = 1;
var centipedePointValue = 1;

function manageCentipedes() {
  if (gameArea.frameNo == 1 || everyinterval(centipedeInterval)) {
    spawnCentipedes();
  }
  updateCentipedes();
}

function spawnCentipedes() {
  while (centipedes.length < maxCentipedes) {
    x = canvasWidth / 2;
    y = 0;
    centipede = new component(gridSquareSide, gridSquareSide, "blue", x, y);
    centipede.directionY = 1;
    centipede.directionX = 1;
    centipedes.push(centipede);
  }
}

function updateCentipedes() {
  for (i = 0; i < centipedes.length; i += 1) {
    // from spawn until it reaches the first layer of mushrooms, just move down
    if (centipedes[i].y < firstMushroomLayer - 1) {
        centipedes[i].y += getCentipedeSpeed();
        continue;
    }
    // at first layer of mushrooms, move right
    if (centipedes[i].getRight() > canvasWidth) {
      centipedes[i].directionX = -1;
    }
    if (centipedes[i].getLeft() < 0) {
      centipedes[i].directionX = 1;
    }
    centipedes[i].x += getCentipedeSpeed() * centipedes[i].directionX;
  }
  for (i = 0; i < centipedes.length; i += 1) {
    centipedes[i].update();
  }
}

function getCentipedeSpeed() {
  return centipedeBaseSpeed + currentLevel;
}

function clearCentipedes() {
  centipedes = [];
}
