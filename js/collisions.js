/*jslint white: true */

/* Collisions */
/***********************************/
var floatingPoints = [];
floatingPointCycleDuration = 50;

function checkCollisions() {
  checkLaserCollision(mushrooms);
  checkLaserCollision(centipedes);
  checkLaserCollision(worms);
  checkLaserCollision(spiders);
  checkGamePieceCollisionWithEnemy(centipedes);
  checkGamePieceCollisionWithEnemy(spiders);
}

function checkLaserCollision(targets) {
  for (i = 0; i < lasers.length; i += 1) {
    for (j = 0; j < targets.length; j += 1) {
      if (lasers[i].crashWith(targets[j])) {
        targets[j].hitPoints--;
        if (targets[j].hitPoints <= 0) {
          // add floating point
          addNewFloatingPoint(targets[j].getMiddleX(), targets[j].getMiddleY(), targets[j].pointValue, "gain");
          // update scoreValue
          changeScore(targets[j].pointValue);
          // remove target and set laser removal to pending
          if (targets[j].type === 'centipede') {
            mushrooms.push(generateMushroom(targets[j].x, targets[j].y));
            centipedesKilled += 1;
          }
          targets.splice(j, 1);
        } else {
          targets[j].height *= 0.5;
        }
        lasers[i].remove = true;
      }
    }
    if (lasers[i].remove) {
      lasers.splice(i, 1);
    }
  }
}

function checkGamePieceCollisionWithEnemy(targets) {
  for (i = 0; i < targets.length; i += 1) {
    if (gamePiece.crashWith(targets[i])) {
      killPlayer();
      if (lives > 0) {
        return;
      }
      showGameOver();
    }
  }
}

function killPlayer() {
  died = true;
  lives -= 1;
}

function showGameOver() {
  gameArea.stop();
  gameOver.text = "Game Over";
  gameOver.update();
}

function collidesWithMushrooms(gamePiece) {
  for (i = 0; i < mushrooms.length; i += 1) {
    if (gamePiece.crashWith(mushrooms[i])) {
      return true;
    }
  }
  return false;
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