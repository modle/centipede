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
    this.worm.initialInterval = getRandom(this.worm.interval.min, this.worm.interval.max);
    this.baseTextParams.fontSize = this.gridSquareSideLength + "px";
    this.gameInfoTextHeight = this.gridSquareSideLength * 1.3;
    this.spider.args.width = this.gridSquareSideLength * 0.8;
    this.spider.args.height = this.gridSquareSideLength * 0.3;
    this.spider.args.x = -this.spider.args.width * 0.8;
    this.spider.args.y = this.gamePieceTopLimit;
    this.centipede.args.width = this.gridSquareSideLength;
    this.centipede.args.height = this.gridSquareSideLength;
    this.centipede.args.x = this.canvasWidth / 2;
    this.worm.args.width = this.gridSquareSideLength * 1.5;
    this.worm.args.height = this.gridSquareSideLength;
    this.worm.args.x = -this.canvasWidth / 10;
    this.worm.args.y = this.canvasHeight / 10;
    this.laser.args.width = this.gridSquareSideLength / 10;
    this.laser.args.height = this.gridSquareSideLength * 0.5;
    console.log("knobsAndLevers initialized");
  },
  centipede : {
    baseSpeed : 10,
    maxNumber : 10,
    interval : 10,
    args : {
      color : "blue",
      y : 0,
      extraArgs : {type : "centipede"}
    },
  },
  canvasWidth : 800,
  canvasHeight : 800,
  gridDivisor : 25,
  gamePieceSpeed : 2,
  gamePieceWidth : 15,
  gamePieceHeight : 15,
  laser : {
    speed : 5,
    maxNumber : 1,
    interval : 10,
    args : {
      color : "purple",
      extraArgs : {type : "laser", speed : {x : 0, y : 0}}
    }
  },
  worm : {
    maxNumber: 1,
    pointValue : 50,
    interval : {
      min: 3000,
      max: 5000,
    },
    args : {
      color : "orange",
      extraArgs : {type : "worm", speed : {x : 2, y : 0}}
    },
  },
  spider : {
    maxNumber : 1,
    pointValue: 25,
    interval : {
      min: 1000,
      max: 2000,
    },
    args : {
      color : "fuchsia",
      extraArgs : {type : "spider", speed : {x : 1, y : 1}}
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
