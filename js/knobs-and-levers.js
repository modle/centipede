var knobsAndLevers = {
  init : function() {
    this.gamePieceTopLimit = this.canvasHeight * 0.8;
    this.gamePieceStartX = (this.canvasWidth - this.gamePieceWidth) * 0.5;
    this.gamePieceStartY = this.canvasHeight * 0.9;
    this.baseTextParams.x = this.canvasWidth * 0.25;
    this.gridSquareSideLength = Math.floor(this.canvasWidth / this.gridDivisor);
    this.coordinateScaleFactor = this.gridSquareSideLength * 0.1;
    this.mushroomSide = this.gridSquareSideLength * 0.8;
    this.baseTextBackgroundParams.height = this.gridSquareSideLength;
    this.baseTextBackgroundParams.width = this.canvasWidth;
    this.spider.initialInterval = getRandom(this.spider.interval.min, this.spider.interval.max);
    this.baseTextParams.fontSize = this.gridSquareSideLength + "px";
    this.gameInfoTextHeight = this.gridSquareSideLength * 1.3;
    console.log("knobsAndLevers initialized");
  },
  centipede : {
    baseSpeed : 10,
    maxNumber : 10,
  },
  canvasWidth : 400,
  canvasHeight : 400,
  gridDivisor : 25,
  gamePieceTopLimit : 0,
  gamePieceSpeed : 2,
  gamePieceWidth : 15,
  gamePieceHeight : 15,
  gamePieceStartX : 0,
  gamePieceStartY : 0,
  laserSpeed : 5,
  laserSideLength : 5,
  laserInterval : 10,
  maxLasers : 1,
  spider : {
    maxNumber : 1,
    pointValue: 25,
    interval : {
      min: 200,
      max: 500
    },
  },
  startLevel : 1,
  maxMushrooms : 50,
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
  defaultLives : 3
}

knobsAndLevers.init();
