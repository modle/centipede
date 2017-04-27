/*jslint white: true */

/* Collisions */
/***********************************/
var floatingPoints = [];
floatingPointCycleDuration = 50;

function checkCollisions() {
    checkLaserCollisionWithMushrooms();
    checkCentipedeCollisionWithMushrooms();
}

function checkLaserCollisionWithMushrooms() {
  for (i = 0; i < lasers.length; i += 1) {
    for (j = 0; j < mushrooms.length; j += 1) {
      if (lasers[i].crashWith(mushrooms[j])) {
        // add floating point
        addNewFloatingPoint(mushrooms[j].getMiddleX(), mushrooms[j].getMiddleY(), mushroomPointValue, "gain");
        // remove monster and set laser removal to pending
        mushrooms.splice(j, 1);
        lasers[i].remove = true;
        // update scoreValue
        changeScore(mushroomPointValue);
      }
    }
    if (lasers[i].remove) {
      lasers.splice(i, 1);
    }
  }
}

function checkCentipedeCollisionWithMushrooms() {
  for (i = 0; i < centipedes.length; i += 1) {
    for (j = 0; j < mushrooms.length; j += 1) {
      // second condition is needed since collision check is on sides only; otherwise it will trigger on any mushroom in the list matching the sides condition
      if (centipedes[i].crashWithSidesOnly(mushrooms[j]) && Math.abs(centipedes[i].y - mushrooms[j].y) < 5) {
        centipedes[i].directionY = 1;
        if (centipedes[i].getBottom() > canvasHeight) {
          centipedes[i].directionY = -1;
        }
      }
    }
  }
}

function addNewFloatingPoint(x, y, points, action) {
  symbol = "+";
  color = "black";
  if (action == "lose") {
    symbol = "-";
    color = "red";
  }
  newPoint = new component("20px", "Consolas", color, x, y, "text");
  newPoint.text = symbol + points;
  newPoint.cycleNumber = 0;
  floatingPoints.push(newPoint);
}

function updateFloatingPoints() {
  for (i = 0; i < floatingPoints.length; i += 1) {
    floatingPoints[i].cycleNumber += 1;
    floatingPoints[i].y -= 1;
    floatingPoints[i].update();
    if (floatingPoints[i].cycleNumber > floatingPointCycleDuration) {
      floatingPoints.splice(i, 1);
    }
  }
}
