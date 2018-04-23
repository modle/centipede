
var templates = {
  marker : {},
  baseMarkerParams : {},
  init : function() {
    this.baseMarkerParams = {
      width : 15,
      height : 15,
      extraArgs : {type : 'player', images : knobsAndLevers.player.args.extraArgs.images},
    };
    this.marker = new Component(
      Object.assign(this.baseMarkerParams, {
        x : 700,
        y : knobsAndLevers.text.gameInfoHeight - 15,
      })
    );
    console.log('templates initialized');
  },
};
