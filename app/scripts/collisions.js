/*jslint white: true */
var collisions = {
  check : function() {
    this.checkLaser(this.getLaserTargets());
    this.checkGamePieceVsEnemies(this.getPlayerEnemies());
    this.removeDestroyedTargets();
  },
  getLaserTargets : function() {
    targets = [];
    targets.push(...mushrooms.mushrooms);
    targets.push(...centipedes.centipedes);
    targets.push(...intervalCreatures.worms);
    targets.push(...intervalCreatures.flies);
    targets.push(...spiders.spiders);
    return targets;
  },
  checkLaser : function(targets) {
    lasers.lasers.map(laser =>
      targets.map(target => {
        if (!laser.remove && laser.crashWith(target)) {
          this.processImpact(target);
          laser.remove = true;
        };
      })
    );
    this.removeUsedLasers();
  },
  processImpact : function(target) {
    this.damageTarget(target);
    this.playImpactSound(target.type);
    this.updateTargetAppearance(target);
  },
  damageTarget : function(target) {
    target.hitPoints--;
    if (target.hitPoints <= 0) {
      this.processKill(target);
    };
  },
  playImpactSound : function(type) {
    if (type !== 'mushroom') {
      sounds.getAvailableImpactSound().play();
    };
  },
  updateTargetAppearance(target) {
    if (target.type == 'mushroom') {
      target.height -= knobsAndLevers.mushroomSide * 0.25;
    };
  },
  processKill : function(target) {
    metrics.addNewFloatingPoint(target.getMiddleX(), target.getMiddleY(), target.pointValue, "gain");
    metrics.changeScore(target.pointValue);
    this.handleCentipedeKill(target);
  },
  handleCentipedeKill(target) {
    if (target.type === 'centipede') {
      mushrooms.mushrooms.push(mushrooms.generate({x : target.x, y : target.y}));
      centipedes.numberKilled += 1;
    };
  },
  removeUsedLasers : function() {
    lasers.lasers = lasers.lasers.filter(laser => !laser.remove);
  },
  getPlayerEnemies : function() {
    targets = [];
    targets.push(...centipedes.centipedes);
    targets.push(...spiders.spiders);
    targets.push(...intervalCreatures.flies);
    return targets;
  },
  checkGamePieceVsEnemies : function(targets) {
    if (!knobsAndLevers.playerCollisionsEnabled) {
      return;
    };
    targets.forEach(target => {
      if (player.gamePiece.crashWith(target)) {
        this.killPlayer();
        return;
      };
    });
  },
  killPlayer : function() {
    player.died = true;
    metrics.lives -= 1;
    if (metrics.lives <= 0) {
      game.gameOver = true;
      return;
    };
  },
  withMushrooms : function(obj) {
    for (i = 0; i < mushrooms.mushrooms.length; i += 1) {
      if (obj.crashWith(mushrooms.mushrooms[i])) {
        return true;
      };
    };
    return false;
  },
  removeDestroyedTargets : function(targets) {
    mushrooms.mushrooms = mushrooms.mushrooms.filter(mushroom => mushroom.hitPoints > 0);
    centipedes.centipedes = centipedes.centipedes.filter(centipede => centipede.hitPoints > 0);
    intervalCreatures.worms = intervalCreatures.worms.filter(worm => worm.hitPoints > 0);
    intervalCreatures.flies = intervalCreatures.flies.filter(fly => fly.hitPoints > 0);
    spiders.spiders = spiders.spiders.filter(spider => spider.hitPoints > 0);
  },
}
