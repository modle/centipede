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
    centipede.distanceMovedY = 0;
    centipedes.push(centipede);
  }
}

function updateCentipedes() {
  for (i = 0; i < centipedes.length; i += 1) {
    // from spawn until it reaches the first layer of mushrooms, just move down
    console.log(centipedes[i].distanceMovedY);
    if (centipedes[i].distanceMovedY == gridSquareSide) {
      centipedes[i].directionY = 0;
      centipedes[i].distanceMovedY = 0;
      // don't change directions at canvas edge here
      if (centipedes[i].getLeft() > 10 || centipedes[i].getRight() < canvasWidth - 10) {
        centipedes[i].directionX *= -1;
      }
      continue;
    }
    if (centipedes[i].y < firstMushroomLayer - 1) {
      centipedes[i].y += centipedes[i].directionY;
      continue;
    }
    if (centipedes[i].directionY != 0) {
      centipedes[i].y += centipedes[i].directionY;
      centipedes[i].distanceMovedY += 1;
      continue;
    }
    // at first layer of mushrooms, move right
    if (centipedes[i].getRight() > canvasWidth) {
      centipedes[i].directionX = -1;
      centipedes[i].directionY = 1;
      if (centipedes[i].getBottom() > canvasHeight) {
        centipedes[i].directionY = -1;
      }
    }
    if (centipedes[i].getLeft() < 0) {
      centipedes[i].directionX = 1;
      centipedes[i].directionY = 1;
      if (centipedes[i].getBottom() > canvasHeight) {
        centipedes[i].directionY = -1;
      }
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
