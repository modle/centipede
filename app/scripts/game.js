var game = {
  init : function() {
    Object.assign(this, gameBase);
    this.gameArea.init(knobsAndLevers);
    console.log('game initialized');
  },
};
