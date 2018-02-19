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
            metrics.addNewFloatingPoint(targets[j].getMiddleX(), targets[j].getMiddleY(), targets[j].pointValue, "gain");
            // update scoreValue
            metrics.changeScore(targets[j].pointValue);
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
        if (metrics.lives > 0) {
          return;
        }
        this.showGameOver();
      }
    }
  },
  killPlayer : function() {
    died = true;
    metrics.lives -= 1;
  },
  showGameOver : function() {
    gameArea.stop();
    textHandler.gameOver.text = "Game Over";
    textHandler.gameOver.update();
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
