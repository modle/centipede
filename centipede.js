/* Centipedes */
/***********************************/

var centipedes = [];
var centipedeInterval = 10;
var centipedeBaseSpeed = 1;
var maxCentipedes = 1;
var centipedePointValue = 1;
var centipedeHorizontalDirection = 1;
var reverseDirection = false;
var moveDown = true;


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

function hasCollidedWithWall(centipede) {
  // don't change directions at canvas edge here
  if (centipede.getLeft() < 10 || centipede.getRight() > canvasWidth - 10) {
    return true
  }
  return false
}

function updateCentipedeCoordinates() {
  for (i = 0; i < centipedes.length; i += 1) {
    if (centipedes[i].directionY != 0) {
      centipedes[i].y += centipedes[i].directionY;
      centipedes[i].distanceMovedY += centipedes[i].directionY;
      centipedes[i].directionY = 0;
    } else {
      centipedes[i].x += getCentipedeSpeed() * centipedes[i].directionX;
    }
  }
}

function determineCentipedeDirections() {
  for (i = 0; i < centipedes.length; i += 1) {
    console.log("determineCentipedeDirections", moveDown, reverseDirection, centipedes[i].directionX, centipedes[i].distanceMovedY)
    if (centipedes[i].y < firstMushroomLayer - 1) {
      // move down after start until specified layer
      moveDown = true;
      return;
    }
    if (centipedes[i].distanceMovedY == 0) {
      // check collisions
      if (hasCollidedWithWall(centipedes[i])) {
        console.log("has collided with wall")
        reverseDirection = true;
        moveDown = true;
        return;
      }
      // if (hasCollidedWithMushroom(centipedes[i])) {
      //   reverseDirection = true;
      //   moveDown = true;
      //   return;
      // }
      return;
    }
    if (centipedes[i].distanceMovedY < gridSquareSide) {
      moveDown = true;
      return;
    }
    if (centipedes[i].distanceMovedY >= gridSquareSide) {
      reverseDirection = true;
      moveDown = false;
      centipedes[i].distanceMovedY = 0;
    }
  }
}

function updateCentipedeDirections() {
  if (moveDown) {
    for (i = 0; i < centipedes.length; i += 1) {
      // console.log("updateCentipedeDirections", moveDown, reverseDirection, centipedes[i].directionX, centipedes[i].distanceMovedY)
      centipedes[i].directionY = 1;
    }
    moveDown = false;
  }
  if (reverseDirection) {
    for (i = 0; i < centipedes.length; i += 1) {
      // console.log("updateCentipedeDirections", moveDown, reverseDirection, centipedes[i].directionX, centipedes[i].distanceMovedY)
      centipedes[i].directionX *= -1;
    }
    reverseDirection = false;
  }
}

function updateCentipedes() {
  determineCentipedeDirections();
  updateCentipedeDirections();
  updateCentipedeCoordinates();
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
