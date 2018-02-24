/*jslint white: true */

/* Collisions */
/***********************************/
var floatingPoints = [];
floatingPointCycleDuration = 50;

var collisions = {
  check : function() {
    this.checkLaser(mushrooms.mushrooms);
    this.checkLaser(centipedes.centipedes);
    this.checkLaser(worms.worms);
    this.checkLaser(spiders.spiders);
    this.checkGamePieceVsEnemy(centipedes.centipedes);
    this.checkGamePieceVsEnemy(spiders.spiders);
  },
  checkLaser : function(targets) {
    // TODO there's a lot going on here; possibly move the removal to a separate function
    for (i = 0; i < lasers.lasers.length; i += 1) {
      for (j = 0; j < targets.length; j += 1) {
        if (lasers.lasers[i].crashWith(targets[j])) {
          targets[j].hitPoints--;
          if (targets[j].type !== 'mushroom') {
            playImpactSound();
          }
          if (targets[j].hitPoints <= 0) {
            metrics.addNewFloatingPoint(targets[j].getMiddleX(), targets[j].getMiddleY(), targets[j].pointValue, "gain");
            metrics.changeScore(targets[j].pointValue);
            // remove target and set laser removal to pending
            if (targets[j].type === 'centipede') {
              mushrooms.mushrooms.push(mushrooms.generate(targets[j].x, targets[j].y));
              centipedes.numberKilled += 1;
            }
            targets.splice(j, 1);
          } else {
            targets[j].height *= 0.5;
          }
          lasers.lasers[i].remove = true;
        }
      }
      if (lasers.lasers[i].remove) {
        lasers.lasers.splice(i, 1);
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
        gameOver = true;
      }
    }
  },
  killPlayer : function() {
    died = true;
    metrics.lives -= 1;
  },
  withMushrooms : function(gamePiece) {
    for (i = 0; i < mushrooms.mushrooms.length; i += 1) {
      if (gamePiece.crashWith(mushrooms.mushrooms[i])) {
        return true;
      }
    }
    return false;
  }
}

impactSounds = [];
function playImpactSound() {
  impactSound = new sound("media/sounds/laser-impact.mp3", 0.5);
  this.impactSounds.push(impactSound);
  playSounds(impactSounds);
}
