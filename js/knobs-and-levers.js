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
    extraArgs : {type:"text"}
  },
  gameInfoTextHeight : 40,
  defaultLives : 3,
  initialize : function() {
    this.gamePieceTopLimit = this.canvasHeight * 0.8;
    this.gamePieceStartX = (this.canvasWidth - this.gamePieceWidth) / 2;
    this.gamePieceStartY = this.canvasHeight * 0.9;
    this.baseTextParams.x = this.canvasHeight / 4;
    console.log("knobsAndLevers initialized");
  }
}

knobsAndLevers.initialize();
