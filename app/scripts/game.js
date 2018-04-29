var game = {
  init : function() {
    Object.assign(this, gameBase);
    this.gameArea.init(knobsAndLevers);
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
  gameLevelCheck : function() {
    return centipedes.numberSpawned == centipedes.numberKilled && this.gameArea.frameNo;
  },
};
