var knobsAndLevers = {
  init : function() {
    this.general.init(this);
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
  resetCheats : function() {
    this.laser.resetCheats();
    this.player.resetCheats();
    console.log('cheats reset');
  },
  toggleParameter : function(parameter) {
    parameter.value = parameter.value === parameter.default ? parameter.cheat.value : parameter.default;
    parameter.cheat.state = parameter.cheat.state === 'OFF' ? 'ON' : 'OFF';
  },
  resetParameter : function(parameter) {
    parameter.value = parameter.default;
    parameter.cheat.state = 'OFF';
  },
  mediaPath : "app/static/media/images/",
  general : {
    init : function(configs) {
      this.gridSquareSideLength = Math.floor(configs.canvas.width / configs.canvas.gridDivisor);
    },
  },
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
      this.args.width = configs.general.gridSquareSideLength;
      this.args.height = configs.general.gridSquareSideLength;
      this.args.x = configs.canvas.width / 2;
    },
  },
  cheats : {
    shipSpeed : {initialText : 'FASTER SHIP: OFF'},
  },
  flies : {
    maxNumber: 2,
    pointValue : 200,
    interval : {
      min: 1000,
      max: 1000,
    },
    mushroomCreateInterval : 75,
    args : {
      color : "green",
      extraArgs : {type : "fly", speed : {x : 0, y : 4}},
      constructorFunctions : {
        setX : function() { knobsAndLevers.flies.args.x = supporting.getRandom(0, knobsAndLevers.canvas.width) },
      }
    },
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.general.gridSquareSideLength * 0.75;
      this.args.height = configs.general.gridSquareSideLength * 0.75;
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
    speed : {
      value : 5,
      default : 5,
      cheat : {
        value : 15,
        state : 'OFF',
        text : 'FASTER LASERS: ',
      },
    },
    quantity : {
      value : 1,
      default : 1,
      cheat : {
        value : 5,
        state : 'OFF',
        text : 'MORE LASERS: ',
      },
    },
    interval : 10,
    args : {
      color : "purple",
      extraArgs : {type : "laser", speed : {x : 0, y : 0}},
    },
    init : function(configs) {
      this.args.width = configs.general.gridSquareSideLength / 10;
      this.args.height = configs.general.gridSquareSideLength * 0.5;
    },
    resetCheats : function() {
      knobsAndLevers.resetParameter(this.speed);
      knobsAndLevers.resetParameter(this.quantity);
    },
  },
  mushrooms : {
    scaleFactor : 1,
    side : 0,
    init : function(configs) {
      this.scaleFactor = configs.general.gridSquareSideLength * 0.1;
      this.side = configs.general.gridSquareSideLength * 0.8;
    },
  },
  player : {
    defaultLives : 1,
    speed : {
      value : 2,
      default : 2,
      cheat : {
        value : 4,
        state : 'OFF',
        text : 'FASTER SHIP: ',
      },
    },
    width : 15,
    height : 15,
    extraArgs : {type : "player"},
    init : function(configs) {
      this.topLimit = configs.canvas.height * 0.8;
      this.startX = (configs.canvas.width - this.width) * 0.5;
      this.startY = configs.canvas.height * 0.9;
    },
    resetCheats : function() {
      knobsAndLevers.resetParameter(this.speed);
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
      this.args.width = configs.general.gridSquareSideLength * 0.8;
      this.args.height = configs.general.gridSquareSideLength * 0.3;
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
      this.baseBackgroundParams.height = configs.general.gridSquareSideLength;
      this.baseBackgroundParams.width = configs.canvas.width;
      this.baseParams.fontSize = configs.general.gridSquareSideLength + "px";
      this.gameInfoHeight = configs.general.gridSquareSideLength * 1.3;
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
      this.args.width = configs.general.gridSquareSideLength * 1.5;
      this.args.height = configs.general.gridSquareSideLength;
      this.args.x = -configs.canvas.width / 10;
    },
  },
};
