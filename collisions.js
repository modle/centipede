/*jslint white: true */

/* Collisions */
/***********************************/
var floatingPoints = [];
floatingPointCycleDuration = 50;

function checkCollisions() {
    checkLaserCollisionWithMushrooms();
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
