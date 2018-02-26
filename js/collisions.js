/*jslint white: true */
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
    this.removeDestroyedTargets();
  },
  checkLaser : function(targets) {
    lasers.lasers.map((laser, laserIndex) =>
      targets.map((target, targetInex) => {
        if (laser.crashWith(target)) {
          this.processImpact(target);
          laser.remove = true;
        }
      })
    );
    this.removeUsedLasers();
  },
  removeUsedLasers : function() {
    lasers.lasers = lasers.lasers.filter(laser => !laser.remove);
  },
  processImpact : function(target) {
    target.hitPoints--;
    this.playImpactSound(target.type);
    this.updateTargetAppearance(target);
    if (target.hitPoints <= 0) {
      this.processKill(target);
    };
  },
  updateTargetAppearance(target) {
    if (target.type == 'mushroom') {
      target.height -= knobsAndLevers.mushroomSide * 0.25;
    };
  },
  playImpactSound : function(type) {
    if (type !== 'mushroom') {
      getAvailableImpactSound().play();
    };
  },
  processKill : function(target) {
    metrics.addNewFloatingPoint(target.getMiddleX(), target.getMiddleY(), target.pointValue, "gain");
    metrics.changeScore(target.pointValue);
    if (target.type === 'centipede') {
      mushrooms.mushrooms.push(mushrooms.generate(target.x, target.y));
      centipedes.numberKilled += 1;
    }
  },
  checkGamePieceVsEnemy : function(targets) {
    targets.forEach(target => {
      if (gamePieceHandler.gamePiece.crashWith(target)) {
        this.killPlayer();
        if (metrics.lives > 0) {
          return;
        }
        gameOver = true;
      }
    });
  },
  killPlayer : function() {
    died = true;
    metrics.lives -= 1;
  },
  withMushrooms : function(gamePiece) {
    for (i = 0; i < mushrooms.mushrooms.length; i += 1) {
      if (gamePiece.crashWith(mushrooms.mushrooms[i])) {
        return true;
      };
    };
    return false;
  },
  removeDestroyedTargets : function(targets) {
    mushrooms.mushrooms = mushrooms.mushrooms.filter(mushroom => mushroom.hitPoints > 0);
    centipedes.centipedes = centipedes.centipedes.filter(centipede => centipede.hitPoints > 0);
    worms.worms = worms.worms.filter(worm => worm.hitPoints > 0);
    spiders.spiders = spiders.spiders.filter(spider => spider.hitPoints > 0);
  },
}
