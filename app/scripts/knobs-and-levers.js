var knobsAndLevers = {
  init : function() {
    this.gamePieceTopLimit = this.canvasHeight * 0.8;
    this.gamePieceStartX = (this.canvasWidth - this.gamePieceWidth) * 0.5;
    this.gamePieceStartY = this.canvasHeight * 0.9;

    this.gridSquareSideLength = Math.floor(this.canvasWidth / this.gridDivisor);
    this.coordinateScaleFactor = this.gridSquareSideLength * 0.1;

    this.baseTextParams.x = this.canvasWidth * 0.25;
    this.baseTextBackgroundParams.height = this.gridSquareSideLength;
    this.baseTextBackgroundParams.width = this.canvasWidth;
    this.baseTextParams.fontSize = this.gridSquareSideLength + "px";
    this.gameInfoTextHeight = this.gridSquareSideLength * 1.3;

    this.spider.initialInterval = supporting.getRandom(this.spider.interval.min, this.spider.interval.max);
    this.spider.args.width = this.gridSquareSideLength * 0.8;
    this.spider.args.height = this.gridSquareSideLength * 0.3;
    this.spider.args.x = -this.spider.args.width * 0.8;
    this.spider.args.y = this.gamePieceTopLimit;

    this.worms.initialInterval = supporting.getRandom(this.worms.interval.min, this.worms.interval.max);
    this.worms.args.width = this.gridSquareSideLength * 1.5;
    this.worms.args.height = this.gridSquareSideLength;
    this.worms.args.x = -this.canvasWidth / 10;

    this.flies.initialInterval = supporting.getRandom(this.flies.interval.min, this.flies.interval.max);
    this.flies.args.width = this.gridSquareSideLength * 0.75;
    this.flies.args.height = this.gridSquareSideLength * 0.75;
    this.flies.args.y = -this.canvasHeight / 10;

    this.centipede.args.width = this.gridSquareSideLength;
    this.centipede.args.height = this.gridSquareSideLength;
    this.centipede.args.x = this.canvasWidth / 2;

    this.laser.args.width = this.gridSquareSideLength / 10;
    this.laser.args.height = this.gridSquareSideLength * 0.5;

    this.mushroomSide = this.gridSquareSideLength * 0.8;
    console.log("knobsAndLevers initialized");
  },
  playerCollisionsEnabled : true,
  centipede : {
    baseSpeed : 10,
    maxNumber : 10,
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
  worms : {
    maxNumber: 1,
    pointValue : 1000,
    interval : {
      min: 2000,
      max: 3000,
    },
    args : {
      color : "orange",
      extraArgs : {type : "worm", speed : {x : 2, y : 0}},
      constructorFunctions : {
        setY : function() { knobsAndLevers.worms.args.y = supporting.getRandom(0, knobsAndLevers.canvasHeight / 5) },
      }
    },
  },
  flies : {
    maxNumber: 1,
    pointValue : 200,
    interval : {
      min: 2000,
      max: 3000,
    },
    mushroomCreateInterval : 75,
    args : {
      color : "green",
      extraArgs : {type : "fly", speed : {x : 0, y : 2}},
      constructorFunctions : {
        setX : function() { knobsAndLevers.flies.args.x = supporting.getRandom(0, knobsAndLevers.canvasWidth) },
      }
    },
  },
  spider : {
    maxNumber : 1,
    pointValue: 400,
    interval : {
      min: 500,
      max: 1000,
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
    fontType : "Arial",
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
};
