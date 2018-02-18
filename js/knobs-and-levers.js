var knobsAndLevers = {
  canvasWidth : 800,
  canvasHeight : 800,
  gridDivisor : 25,
  gamePieceTopLimit : 0,
  initialize : function() {
    console.log('initializing knobsAndLevers');
    this.gamePieceTopLimit = this.canvasHeight * 0.8;
  }
}

knobsAndLevers.initialize();
