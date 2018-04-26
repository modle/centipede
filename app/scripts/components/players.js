players = {
  currentSelection : undefined,
  init : function() {
    Object.assign(this, playersBase);
    this.buildPlayers(game.numberOfPlayers, knobsAndLevers.player.args);
    Object.keys(this.functionOverrides).forEach(element => {
      this[element] = this.functionOverrides[element];
    });
    console.log('players initialized');
  },
  functionOverrides : {
    setBoundaries : function(player) {
      this.boundaries.belowTop = player.getTop() > knobsAndLevers.player.topLimit;
      this.boundaries.insideRight = player.getRight() < game.gameArea.canvas.width;
      this.boundaries.aboveBottom = player.getBottom() < game.gameArea.canvas.height;
      this.boundaries.insideLeft = player.getLeft() > 0;
    },
  },
};
