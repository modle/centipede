var knobsAndLevers = {
  init : function() {
    this.gamePieceTopLimit = this.canvas.height * 0.8;
    this.gamePieceStartX = (this.canvas.width - this.player.width) * 0.5;
    this.gamePieceStartY = this.canvas.height * 0.9;

    this.gridSquareSideLength = Math.floor(this.canvas.width / this.canvas.gridDivisor);
    this.coordinateScaleFactor = this.gridSquareSideLength * 0.1;

    this.text.baseParams.x = this.canvas.width * 0.25;
    this.text.baseBackgroundParams.height = this.gridSquareSideLength;
    this.text.baseBackgroundParams.width = this.canvas.width;
    this.text.baseParams.fontSize = this.gridSquareSideLength + "px";
    this.text.gameInfoHeight = this.gridSquareSideLength * 1.3;

    this.spider.initialInterval = supporting.getRandom(this.spider.interval.min, this.spider.interval.max);
    this.spider.args.width = this.gridSquareSideLength * 0.8;
    this.spider.args.height = this.gridSquareSideLength * 0.3;
    this.spider.args.x = -this.spider.args.width * 0.8;
    this.spider.args.y = this.gamePieceTopLimit;

    this.worms.initialInterval = supporting.getRandom(this.worms.interval.min, this.worms.interval.max);
    this.worms.args.width = this.gridSquareSideLength * 1.5;
    this.worms.args.height = this.gridSquareSideLength;
    this.worms.args.x = -this.canvas.width / 10;

    this.flies.initialInterval = supporting.getRandom(this.flies.interval.min, this.flies.interval.max);
    this.flies.args.width = this.gridSquareSideLength * 0.75;
    this.flies.args.height = this.gridSquareSideLength * 0.75;
    this.flies.args.y = -this.canvas.height / 10;

    this.centipede.args.width = this.gridSquareSideLength;
    this.centipede.args.height = this.gridSquareSideLength;
    this.centipede.args.x = this.canvas.width / 2;

    this.laser.args.width = this.gridSquareSideLength / 10;
    this.laser.args.height = this.gridSquareSideLength * 0.5;

    this.mushroomSide = this.gridSquareSideLength * 0.8;
    console.log("knobsAndLevers initialized");
  },
  mediaPath : "app/static/media/images/",
  canvas : {
    width : 800,
    height : 800,
    gridDivisor : 25,
  },
  centipede : {
    baseSpeed : 10,
    maxNumber : 10,
    args : {
      color : "blue",
      y : 0,
      extraArgs : {type : "centipede"}
    },
  },
  flies : {
    maxNumber: 1,
    pointValue : 200,
    interval : {
      min: 1000,
      max: 3000,
    },
    mushroomCreateInterval : 75,
    args : {
      color : "green",
      extraArgs : {type : "fly", speed : {x : 0, y : 2}},
      constructorFunctions : {
        setX : function() { knobsAndLevers.flies.args.x = supporting.getRandom(0, knobsAndLevers.canvas.width) },
      }
    },
  },
  game : {
    playerCollisionsEnabled : true,
    soundsEnabled : true,
    gameOverDelay : 600,
    startLevel : 0,
    maxMushrooms : 50,
  },
  laser : {
    speed : 5,
    maxNumber : 1,
    interval : 10,
    args : {
      color : "purple",
      extraArgs : {type : "laser", speed : {x : 0, y : 0}}
    }
  },
  player : {
    defaultLives : 1,
    speed : 2,
    width : 15,
    height : 15,
    extraArgs : {type : "player"},
  },
  spider : {
    maxNumber : 1,
    pointValue: 200,
    interval : {
      min: 1000,
      max: 2000,
    },
    args : {
      color : "fuchsia",
      extraArgs : {type : "spider", speed : {x : 1, y : 1}}
    },
  },
  text : {
    font : "press-start",
    baseParams : {
      fontSize : "20px",
      color : "black",
      extraArgs : {type:"text"},
    },
    baseBackgroundParams : {
      color : "lightgrey",
      x : 0,
      extraArgs : {type:"background"},
    },
    gameInfoHeight : 40,
  },
  worms : {
    maxNumber: 1,
    pointValue : 1000,
    interval : {
      min: 1500,
      max: 3250,
    },
    args : {
      color : "orange",
      extraArgs : {type : "worm", speed : {x : 1, y : 0}},
      constructorFunctions : {
        setY : function() { knobsAndLevers.worms.args.y = supporting.getRandom(0, knobsAndLevers.canvas.height / 5) },
      }
    },
  },
};
