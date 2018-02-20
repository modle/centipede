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
  laserSpeed : 20,
  laserSideLength : 5,
  laserInterval : 10,
  maxLasers : 5,
  baseTextParams : {
    fontSize : "30px",
    fontType : "Consolas",
    color : "black",
    extraArgs : {type:"text"},
  },
  baseTextBackgroundParams : {
    color : "lightgrey",
    x : 0,
    extraArgs : {type:"background"},
  },
  gameInfoTextHeight : 40,
  defaultLives : 3,
  initialize : function() {
    this.gamePieceTopLimit = this.canvasHeight * 0.8;
    this.gamePieceStartX = (this.canvasWidth - this.gamePieceWidth) * 0.5;
    this.gamePieceStartY = this.canvasHeight * 0.9;
    this.baseTextParams.x = this.canvasWidth * 0.25;
    this.gridSquareSideLength = Math.floor(this.canvasWidth / this.gridDivisor);
    this.baseTextBackgroundParams.height = this.gridSquareSideLength;
    this.baseTextBackgroundParams.width = this.canvasWidth;
    console.log("knobsAndLevers initialized");
  }
}

knobsAndLevers.initialize();
