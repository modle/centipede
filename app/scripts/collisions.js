/*jslint white: true */
var collisions = {
  // TODO abstract non-centipede functionality and move to canvas-libs
  init : function() {
    Object.assign(this, collisionsBase);
    Object.keys(this.functionOverrides).forEach(element => {
      this[element] = this.functionOverrides[element];
    });
    console.log('collisions initialized');
  },
  functionOverrides : {
    handleSpecialKills(target) {
      if (target.type === 'centipede') {
        mushrooms.make({x : target.x, y : target.y})
        centipedes.numberKilled += 1;
      };
    },
    getPlayerEnemies : function() {
      let enemies = [];
      enemies.push(...centipedes.centipedes);
      enemies.push(...gameObjects.fleas);
      enemies.push(...gameObjects.spiders);
      return enemies;
    },
    getLaserTargets : function() {
      let targets = [];
      targets.push(...mushrooms.mushrooms);
      targets.push(...centipedes.centipedes);
      targets.push(...gameObjects.worms);
      targets.push(...gameObjects.fleas);
      targets.push(...gameObjects.spiders);
      return targets;
    },
    check : function() {
      let targets = this.getLaserTargets();
      Object.keys(lasers.lasers).forEach(key => {
        this.checkLaser(key, targets, lasers.lasers);
      });
      Object.keys(players.players).forEach(player =>
        this.checkPlayerVsEnemies(players.players[player], this.getPlayerEnemies())
      );
      this.removeDestroyedTargets(targets);
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
    removeDestroyedTargets : function(targets) {
      mushrooms.mushrooms = mushrooms.mushrooms.filter(mushroom => mushroom.hitPoints > 0);
      centipedes.centipedes = centipedes.centipedes.filter(centipede => centipede.hitPoints > 0);
      gameObjects.worms = gameObjects.worms.filter(worm => worm.hitPoints > 0);
      gameObjects.fleas = gameObjects.fleas.filter(flea => flea.hitPoints > 0);
      gameObjects.spiders = gameObjects.spiders.filter(spider => spider.hitPoints > 0);
    },
  },
  withMushrooms : function(obj) {
    return mushrooms.mushrooms.find(mushroom => obj.crashWith(mushroom));
  },
};
