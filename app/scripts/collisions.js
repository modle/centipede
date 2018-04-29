/*jslint white: true */
var collisions = {
  // TODO abstract non-centipede functionality and move to canvas-libs
  check : function() {
    Object.keys(lasers.lasers).forEach(key => {
      let targets = this.getLaserTargets();
      this.checkLaser(key, targets);
      this.removeUsedLasers(key);
    });
    Object.keys(players.players).forEach(player =>
      this.checkPlayerVsEnemies(players.players[player], this.getPlayerEnemies())
    );
    this.removeDestroyedTargets(targets);
  },
  getLaserTargets : function() {
    let targets = [];
    targets.push(...mushrooms.mushrooms);
    targets.push(...centipedes.centipedes);
    targets.push(...gameObjects.worms);
    targets.push(...gameObjects.flies);
    targets.push(...gameObjects.spider);
    return targets;
  },
  checkLaser : function(player, targets) {
    lasers.lasers[player].forEach(laser =>
      targets.forEach(target => {
        if (!laser.remove && laser.crashWith(target)) {
          this.processImpact(target);
          laser.remove = true;
        };
      })
    );
  },
  processImpact : function(target) {
    this.damageTarget(target);
    sounds.playImpactSound(target.type);
  },
  damageTarget : function(target) {
    target.hitPoints--;
    if (target.hitPoints <= 0) {
      this.processKill(target);
      return;
    };
    if (target.type == 'worm') {
      this.changeSize(target);
    };
  },
  changeSize : function(target) {
    if (target.imageType == 'crazy') {
      let widthBefore = target.width;
      let heightBefore = target.height;
      target.width = target.defaultWidth * target.hitPoints;
      target.height = target.defaultHeight * target.hitPoints;
      target.x += (widthBefore - target.width) / 2;
      target.y += (heightBefore - target.height) / 2;
    };
  },
  processKill : function(target) {
    metrics.addNewFloatingPoint(target.getMiddleX(), target.getMiddleY(), target.pointValue, "gain");
    metrics.manageScore(target.pointValue);
    this.handleCentipedeKill(target);
  },
  handleCentipedeKill(target) {
    if (target.type === 'centipede') {
      mushrooms.make({x : target.x, y : target.y})
      centipedes.numberKilled += 1;
    };
  },
  removeUsedLasers : function(player) {
    lasers.lasers[player] = lasers.lasers[player].filter(laser => !laser.remove);
  },
  getPlayerEnemies : function() {
    targets = [];
    targets.push(...centipedes.centipedes);
    targets.push(...gameObjects.flies);
    return targets;
  },
  checkPlayerVsEnemies : function(player, targets) {
    if (!knobsAndLevers.game.playerCollisionsEnabled) {
      return;
    };
    targets.forEach(target => {
      if (player.crashWith(target)) {
        this.killPlayer();
        return;
      };
    });
  },
  killPlayer : function() {
    players.died = true;
    metrics.lives.player1 -= 1;
    if (metrics.lives.player1 <= 0) {
      game.gameOver = true;
      return;
    };
  },
  withMushrooms : function(obj) {
    return mushrooms.mushrooms.find(mushroom => obj.crashWith(mushroom));
  },
  removeDestroyedTargets : function(targets) {
    mushrooms.mushrooms = mushrooms.mushrooms.filter(mushroom => mushroom.hitPoints > 0);
    centipedes.centipedes = centipedes.centipedes.filter(centipede => centipede.hitPoints > 0);
    gameObjects.worms = gameObjects.worms.filter(worm => worm.hitPoints > 0);
    gameObjects.flies = gameObjects.flies.filter(fly => fly.hitPoints > 0);
    gameObjects.spider = gameObjects.spider.filter(spider => spider.hitPoints > 0);
  },
};
