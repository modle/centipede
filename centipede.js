/*jslint white: true */

/* Centipedes */
/***********************************/

var centipedes = [];
var centipedeInterval = 10;
var centipedeBaseSpeed = 1;
var defaultMaxCentipedes = 10;
var centipedePointValue = 1;
// use a var to count centipedes instead of length of array
var centipedesSpawned = 0;

function manageCentipedes() {
  if (gameArea.frameNo == 1 || everyinterval(centipedeInterval)) {
    spawnCentipedes();
  }
  updateCentipedes();
}

function spawnCentipedes() {
  if (centipedesSpawned < defaultMaxCentipedes + currentLevel) {
    x = canvasWidth / 2;
    y = 0;
    centipede = new component(gridSquareSide, gridSquareSide, "blue", x, y);
    centipede.name = "centipede";
    centipede.directionX = 1;
    centipede.directionY = 1;
    centipede.distanceMovedX = 0;
    centipede.distanceMovedY = 0;
    centipede.distanceMovedFromBottom = 0;
    centipede.reverseDirectionX = false
    centipede.reverseDirectionY = false;
    centipede.moveVertically = true;
    centipede.pointValue = 5 + currentLevel;
    centipede.hitPoints = 1;
    for (i = 0; i < centipedes.length; i += 1) {
      if (centipedes[i].crashWith(centipede)) {
        return;
      }
    }
    centipedes.push(centipede);
    centipedesSpawned++;
  }
}

function hasCollidedWithWall(centipede) {
  // only want to register a collision if the game piece has moved a certain distance away from the wall since the previous collision
  return ((centipede.getLeft() < 1 || centipede.getRight() > canvasWidth - 1) && centipede.distanceMovedX > gridSquareSide);
}


function hasCollidedWithMushroom(centipede) {
  for (j = 0; j < mushrooms.length; j += 1) {
    if (centipede.crashWithSidesOnly(mushrooms[j]) && Math.abs(centipede.y - mushrooms[j].y) < 5 && centipede.distanceMovedX > gridSquareSide) {
      return true;
    }
  }
  return false;
}

// determines when to move downward and reverse direction
function determineCentipedeDirections() {
  for (i = 0; i < centipedes.length; i += 1) {
    // move down after start until specified layer
    if (centipedes[i].y < firstMushroomLayer - 1) {
      centipedes[i].moveVertically = true;
      continue;
    }
    // toggle Y direction if distanceMovedFromBottom is 0 and centipede.bottom > canvasHeight
    if (centipedes[i].getBottom() > canvasHeight) {
      centipedes[i].reverseDirectionY = true;
    }
    // toggle Y direction if centipede is above gamePieceTopLimit and distanceMovedFromBottom > 0
    // reset distanceMovedFromBottom so this only triggers once
    if (centipedes[i].getTop() < gamePieceTopLimit && centipedes[i].distanceMovedFromBottom > 0) {
      centipedes[i].reverseDirectionY = true;
      centipedes[i].distanceMovedFromBottom = 0;
    }
    // only check collisions once centipede has moved a certain distance
    if (centipedes[i].distanceMovedY === 0) {
      // check collision with walls
      if (hasCollidedWithWall(centipedes[i])) {
        centipedes[i].distanceMovedX = 0;
        centipedes[i].moveVertically = true;
        continue;
      }
      if (hasCollidedWithMushroom(centipedes[i])) {
        centipedes[i].moveVertically = true;
        continue;
      }
      continue;
    }
    // keep moving down until desired amount of pixels
    if (centipedes[i].distanceMovedY < gridSquareSide) {
      centipedes[i].moveVertically = true;
      continue;
    }
    // only reverse horizontally if all other conditions are false
    if (centipedes[i].distanceMovedY >= gridSquareSide) {
      centipedes[i].reverseDirectionX = true;
      centipedes[i].moveVertically = false;
      centipedes[i].distanceMovedY = 0;
    }
  }
}

// sets direction variables on the centipede objects
function updateCentipedeDirections() {
  for (i = 0; i < centipedes.length; i += 1) {
    if (centipedes[i].reverseDirectionY) {
      centipedes[i].directionY *= -1;
      centipedes[i].distanceMovedY = 0;
      centipedes[i].reverseDirectionY = false;
    }
    if (centipedes[i].reverseDirectionX) {
      centipedes[i].directionX *= -1;
      centipedes[i].reverseDirectionX = false;
    }
  }
}

// updates coordinates of centipede objects
function updateCentipedeCoordinates() {
  for (i = 0; i < centipedes.length; i += 1) {
    // if moving vertically, don't move horizontally
    if (centipedes[i].moveVertically) {
      centipedes[i].y += centipedes[i].directionY;
      centipedes[i].distanceMovedY += Math.abs(centipedes[i].directionY);
      if (centipedes[i].directionY === -1) {
        centipedes[i].distanceMovedFromBottom += Math.abs(centipedes[i].directionY);
      }
    } else {
      toMoveX = getCentipedeSpeed() * centipedes[i].directionX;
      newPositionX = centipedes[i].x + toMoveX;
      // if updating x would put the centipede outside the gameArea, don't update the x position, instead flag moveVertically
      if (newPositionX < canvasWidth && newPositionX > 0) {
        centipedes[i].x = newPositionX;
        centipedes[i].distanceMovedX += Math.abs(toMoveX);
      } else {
        centipedes[i].moveVertically = true;
      }
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
  centipedesSpawned = 0;
}
