var game = {
  init : function() {
    Object.assign(this, gameBase);
    this.gameArea.init(dials);
    supporting.applyOverrides(this);
    console.log('game initialized');
  },
  gameResets : {
    level : function() {
      centipedes.clear();
    },
    death : function() {
      centipedes.clear();
      lasers.clear();
    },
    everything : function() {
      mushrooms.clear();
      init.afterGameOver();
    },
  },
  functionOverrides : {
    gameLevelCheck : function() {
      return centipedes.numberSpawned == centipedes.numberKilled && this.gameArea.frameNo;
    },
  },
};
