var knobsAndLevers = {
  init : function() {
    this.gridSquareSideLength = Math.floor(this.canvas.width / this.canvas.gridDivisor);
    this.centipede.init(this);
    this.flies.init(this);
    this.player.init(this);
    this.laser.init(this);
    this.mushrooms.init(this);
    this.spider.init(this);
    this.text.init(this);
    this.worms.init(this);
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
      extraArgs : {type : "centipede"},
    },
    init : function(configs) {
      this.args.width = configs.gridSquareSideLength;
      this.args.height = configs.gridSquareSideLength;
      this.args.x = configs.canvas.width / 2;
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
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.gridSquareSideLength * 0.75;
      this.args.height = configs.gridSquareSideLength * 0.75;
      this.args.y = -configs.canvas.height / 10;
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
      extraArgs : {type : "laser", speed : {x : 0, y : 0}},
    },
    init : function(configs) {
      this.args.width = configs.gridSquareSideLength / 10;
      this.args.height = configs.gridSquareSideLength * 0.5;
    },
  },
  mushrooms : {
    scaleFactor : 1,
    side : 0,
    init : function(configs) {
      this.scaleFactor = configs.gridSquareSideLength * 0.1;
      this.side = configs.gridSquareSideLength * 0.8;
    },
  },
  player : {
    defaultLives : 1,
    speed : 2,
    width : 15,
    height : 15,
    extraArgs : {type : "player"},
    init : function(configs) {
      this.topLimit = configs.canvas.height * 0.8;
      this.startX = (configs.canvas.width - this.width) * 0.5;
      this.startY = configs.canvas.height * 0.9;
    },
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
      extraArgs : {type : "spider", speed : {x : 1, y : 1}},
    },
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.gridSquareSideLength * 0.8;
      this.args.height = configs.gridSquareSideLength * 0.3;
      this.args.x = -this.args.width * 0.8;
      this.args.y = configs.player.topLimit;
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
    init : function(configs) {
      this.baseParams.x = configs.canvas.width * 0.25;
      this.baseBackgroundParams.height = configs.gridSquareSideLength;
      this.baseBackgroundParams.width = configs.canvas.width;
      this.baseParams.fontSize = configs.gridSquareSideLength + "px";
      this.gameInfoHeight = configs.gridSquareSideLength * 1.3;
    },
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
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.gridSquareSideLength * 1.5;
      this.args.height = configs.gridSquareSideLength;
      this.args.x = -configs.canvas.width / 10;
    },
  },
};
