/*jslint white: true */

/* Collisions */
/***********************************/
var floatingPoints = [];
floatingPointCycleDuration = 50;

var collisions = {
  check : function() {
    this.checkLaser(mushroomHandler.mushrooms);
    this.checkLaser(centipedeHandler.centipedes);
    this.checkLaser(wormHandler.worms);
    this.checkLaser(spiderHandler.spiders);
    this.checkGamePieceVsEnemy(centipedeHandler.centipedes);
    this.checkGamePieceVsEnemy(spiderHandler.spiders);
  },
  checkLaser : function(targets) {
    // TODO there's a lot going on here; possibly move the removal to a separate function
    for (i = 0; i < laserHandler.lasers.length; i += 1) {
      for (j = 0; j < targets.length; j += 1) {
        if (laserHandler.lasers[i].crashWith(targets[j])) {
          targets[j].hitPoints--;
          if (targets[j].hitPoints <= 0) {
            // add floating point
            addNewFloatingPoint(targets[j].getMiddleX(), targets[j].getMiddleY(), targets[j].pointValue, "gain");
            // update scoreValue
            hudHandler.changeScore(targets[j].pointValue);
            // remove target and set laser removal to pending
            if (targets[j].type === 'centipede') {
              mushroomHandler.mushrooms.push(mushroomHandler.generate(targets[j].x, targets[j].y));
              centipedeHandler.numberKilled += 1;
            }
            targets.splice(j, 1);
          } else {
            targets[j].height *= 0.5;
          }
          laserHandler.lasers[i].remove = true;
        }
      }
      if (laserHandler.lasers[i].remove) {
        laserHandler.lasers.splice(i, 1);
      }
    }
  },
  checkGamePieceVsEnemy : function(targets) {
    for (i = 0; i < targets.length; i += 1) {
      if (gamePieceHandler.gamePiece.crashWith(targets[i])) {
        this.killPlayer();
        if (lives > 0) {
          return;
        }
        this.showGameOver();
      }
    }
  },
  killPlayer : function() {
    died = true;
    lives -= 1;
  },
  showGameOver : function() {
    gameArea.stop();
    gameOver.text = "Game Over";
    gameOver.update();
  },
  withMushrooms : function(gamePiece) {
    for (i = 0; i < mushroomHandler.mushrooms.length; i += 1) {
      if (gamePiece.crashWith(mushroomHandler.mushrooms[i])) {
        return true;
      }
    }
    return false;
  }
}

function addNewFloatingPoint(x, y, points, action) {
  symbol = "+";
  color = "black";
  if (action == "lose") {
    symbol = "-";
    color = "red";
  }
  let pointArgs = {
    fontSize : "20px",
    fontType : "Consolas",
    color : color,
    x : x,
    y : y,
    extraArgs : {type : "text"}
  };
  newPoint = new component(pointArgs);
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
