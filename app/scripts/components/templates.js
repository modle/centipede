
var templates = {
  marker : {},
  baseMarkerParams : {},
  init : function() {
    this.baseMarkerParams = {
      width : knobsAndLevers.player.width,
      height : knobsAndLevers.player.height,
      color : 'red',
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
