/*jslint white: true */

/* Centipedes */
/***********************************/

var centipedes = [];
var centipedeInterval = 10;
var centipedeBaseSpeed = 1;
var maxCentipedes = 1;
var centipedePointValue = 1;
var centipedeHorizontalDirection = 1;


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
    centipede.distanceMovedX = 0;
    centipede.reverseDirection = false;
    centipede.moveDown = true;
    centipedes.push(centipede);
  }
}

function hasCollidedWithWall(centipede) {
  // only want to register a collision if the game piece has moved a certain distance away from the wall since the previous collision
  if ((centipede.getLeft() < 1 || centipede.getRight() > canvasWidth - 1) && centipede.distanceMovedX > gridSquareSide) {
    return true;
  }
  return false;
}

// determines when to move downward and reverse direction
function determineCentipedeDirections() {
  for (i = 0; i < centipedes.length; i += 1) {
    console.log("determineCentipedeDirections",
      "\nmoveDown:"+centipedes[i].moveDown,
      "\nreverseDirection:"+centipedes[i].reverseDirection,
      "\ndirectionX:"+centipedes[i].directionX,
      "\ndistanceMovedY:"+centipedes[i].distanceMovedY,
      "\ndistanceMovedX:"+centipedes[i].distanceMovedX
    );
    // move down after start until specified layer
    if (centipedes[i].y < firstMushroomLayer - 1) {
      centipedes[i].moveDown = true;
      return;
    }
    // only check collisions once centipede has moved a certain distance
    if (centipedes[i].distanceMovedY === 0) {
      // check collision with walls
      if (hasCollidedWithWall(centipedes[i])) {
        centipedes[i].distanceMovedX = 0;
        centipedes[i].moveDown = true;
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
      centipedes[i].moveDown = true;
      return;
    }
    if (centipedes[i].distanceMovedY >= gridSquareSide) {
      centipedes[i].reverseDirection = true;
      centipedes[i].moveDown = false;
      centipedes[i].distanceMovedY = 0;
    }
  }
}

// sets direction variables on the centipede objects
function updateCentipedeDirections() {
  for (i = 0; i < centipedes.length; i += 1) {
    if (centipedes[i].moveDown) {
      centipedes[i].directionY = 1;
      centipedes[i].moveDown = false;
    }
    if (centipedes[i].reverseDirection) {
      centipedes[i].directionX *= -1;
      centipedes[i].reverseDirection = false;
    }
  }
}

// updates coordinates of centipede objects
function updateCentipedeCoordinates() {
  for (i = 0; i < centipedes.length; i += 1) {
    if (centipedes[i].directionY !== 0) {
      centipedes[i].y += centipedes[i].directionY;
      centipedes[i].distanceMovedY += centipedes[i].directionY;
      centipedes[i].directionY = 0;
    } else {
      toMoveX = getCentipedeSpeed() * centipedes[i].directionX;
      centipedes[i].x += toMoveX;
      centipedes[i].distanceMovedX += Math.abs(toMoveX);
    }
  }
}

// triggered each refresh cycle
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
