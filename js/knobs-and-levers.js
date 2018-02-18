var knobsAndLevers = {
  canvasWidth : 800,
  canvasHeight : 800,
  gridDivisor : 25,
  gamePieceTopLimit : 0,
  gamePieceSpeed : 2,
  gamePieceWidth : 30,
  gamePieceHeight : 30,
  gamePieceStartX : 0,
  gamePieceStartY : 0,
  laserSpeed : 5,
  laserSideLength : 5,
  laserInterval : 10,
  maxLasers : 1,
  initialize : function() {
    console.log('initializing knobsAndLevers');
    this.gamePieceTopLimit = this.canvasHeight * 0.8;
    this.gamePieceStartX = (this.canvasWidth - this.gamePieceWidth) / 2;
    this.gamePieceStartY = this.canvasHeight * 0.9;
  }
}

knobsAndLevers.initialize();
