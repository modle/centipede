players = {
  currentSelection : undefined,
  init : function() {
    Object.assign(this, playersBase);
    this.buildPlayers(game.numberOfPlayers, dials.player.args);
    supporting.applyOverrides(this);
    console.log('players initialized');
  },
  functionOverrides : {
    setBoundaries : function(player) {
      this.boundaries.belowTop = player.getTop() > dials.player.topLimit;
      this.boundaries.insideRight = player.getRight() < game.gameArea.canvas.width;
      this.boundaries.aboveBottom = player.getBottom() < game.gameArea.canvas.height;
      this.boundaries.insideLeft = player.getLeft() > 0;
    },
    collidedWithBarrier : function(player) {
      return collisions.withMushrooms(player);
    },
  },
};
