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
    this.game.activeCheats = {};
    console.log('cheats reset');
  },
  toggleParameter : function(parameter) {
    parameter.value = parameter.value === parameter.default ? parameter.setting.value : parameter.default;
    parameter.setting.state = parameter.setting.state === 'OFF' ? 'ON' : 'OFF';
    console.log(parameter);
  },
  resetParameter : function(parameter) {
    parameter.value = parameter.default;
    parameter.setting.state = 'OFF';
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
    pointValue : 20,
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
  flies : {
    maxNumber : 1,
    hitPoints : 2,
    pointValue : 200,
    interval : {
      min: 1500,
      max: 2500,
    },
    mushroomCreateInterval : 100,
    args : {
      color : "green",
      extraArgs : {type : "fly", speed : {x : 0, y : 2}},
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
    playerCollisionsEnabled : false,
    sounds : {
      value : true,
      default : true,
      setting : {
        value : false,
        state : 'ON',
        text : 'SOUNDS',
        render : function() {
          return supporting.align(this.text) + this.state;
        },
      },
    },
    gameOverDelay : 600,
    startLevel : 0,
    maxMushrooms : 50,
    incrementThingsScore : 10000,
    tier : 1,
    maxTier : 5,
  },
  laser : {
    speed : {
      value : 10,
      default : 5,
      setting : {
        value : 15,
        state : 'OFF',
        text : 'FASTER LASERS',
        render : function() {
          return supporting.align(this.text) + this.state;
        },
      },
    },
    quantity : {
      value : 10,
      default : 1,
      setting : {
        value : 5,
        state : 'OFF',
        text : 'MORE LASERS',
        render : function() {
          return supporting.align(this.text) + this.state;
        },
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
    initialAmount : 50,
    scaleFactor : 1,
    hitPoints : 4,
    side : 0,
    init : function(configs) {
      this.scaleFactor = configs.general.gridSquareSideLength * 0.1;
      this.side = configs.general.gridSquareSideLength * 0.8;
    },
  },
  player : {
    defaultLives : 3,
    speed : {
      value : 2,
      default : 2,
      setting : {
        value : 4,
        state : 'OFF',
        text : 'FASTER SHIP',
        render : function() {
          return supporting.align(this.text) + this.state;
        },
      },
    },
    width : 15,
    height : 15,
    extraArgs : {type : "player"},
    init : function(configs) {
      this.areaHeight = configs.canvas.height * 0.2;
      this.topLimit = knobsAndLevers.canvas.height - this.areaHeight;
      this.startX = (configs.canvas.width - this.width) * 0.5;
      this.startY = configs.canvas.height * 0.9;
    },
    resetCheats : function() {
      knobsAndLevers.resetParameter(this.speed);
    },
  },
  spider : {
    maxNumber : 1,
    hitPoints : 1,
    directionY : 1,
    points : {
      base : 500,
      range : 400,
    },
    interval : {
      min: 300,
      max: 600,
    },
    args : {
      color : "fuchsia",
      extraArgs : {type : "spider", speed : {x : 1, y : 1}},
    },
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.general.gridSquareSideLength * 0.8;
      this.args.height = configs.general.gridSquareSideLength * 0.3;
      this.args.x = 1;
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
      this.gameInfoHeight = configs.general.gridSquareSideLength * 1.3;
    },
  },
  worms : {
    maxNumber: 1,
    pointValue :200,
    hitPoints : 1,
    interval : {
      min: 0,
      max: 0,
    },
    args : {
      color : "orange",
      extraArgs : {type : "worm", speed : {x : 1, y : 0}},
      constructorFunctions : {
        setX : function() {
          knobsAndLevers.worms.args.extraArgs.speed.x = supporting.getRandom(-1, 1) < 0 ? -1 : 1;
          if (knobsAndLevers.worms.args.extraArgs.speed.x < 0) {
            knobsAndLevers.worms.args.x = game.gameArea.canvas.width - 1;
          } else {
            knobsAndLevers.worms.args.x = 1;
          };
        },
        setY : function() { knobsAndLevers.worms.args.y = supporting.getRandom(0, player.topLimit - player.areaHeight) },
      }
    },
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.general.gridSquareSideLength * 1.5;
      this.args.height = configs.general.gridSquareSideLength;
    },
  },
};
