

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
  targetLeaderboard : 'centipedeLeaderboard',
  centipede : {
    baseSpeed : 10,
    maxNumber : 10,
    pointValue : 20,
    args : {
      color : "blue",
      y : 0,
      extraArgs : {
        type : "centipede",
        images : {
          up : { filename : 'centipede-head-1-up.png', image : new Image() },
          down : { filename : 'centipede-head-1-down.png', image : new Image() },
          left : { filename : 'centipede-head-1-left.png', image : new Image() },
          right : { filename : 'centipede-head-1-right.png', image : new Image() },
        },
      },
    },
    init : function(configs) {
      this.args.width = configs.general.gridSquareSideLength;
      this.args.height = configs.general.gridSquareSideLength;
      this.args.x = configs.canvas.width / 2;
    },
  },
  components : {
    imageTypes : ['centipede', 'fly', 'worm', 'mushroom', 'spider', 'player'],
  },
  flies : {
    maxNumber : 0,
    hitPoints : 2,
    pointValue : 200,
    interval : {
      min: 100,
      max: 1000,
    },
    mushroomCreateInterval : 100,
    args : {
      color : 'green',
      extraArgs : {
        type : 'fly',
        speed : {x : 0, y : 2},
        images : {
          one : { filename : 'flea-1.png', image : new Image() },
          two : { filename : 'flea-2.png', image : new Image() },
        },
      },
      constructorFunctions : {
        setX : function(fly) { fly.x = supporting.getRandom(0, knobsAndLevers.canvas.width) },
      }
    },
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.general.gridSquareSideLength * 0.75;
      this.args.height = configs.general.gridSquareSideLength * 0.75;
      this.args.y = -configs.canvas.height / 10;
      this.interval = supporting.clone(configs.game.interval);
    },
  },
  game : {
    playerCollisionsEnabled : true,
    interval : {
      min : 0,
      max : 0,
    },
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
    tier : {
      incrementScore : 10000,
      current: 20,
      max : 20,
      isMaxed : false,
      update : function(newTier) {
        this.current = newTier;
        this.isMaxed = this.current >= this.max ? true : false;
      },
    }
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
    color : 'teal',
    args : {
      extraArgs : {
        type : 'mushroom',
        images : {
          normal1 : { filename : 'mushroom-1.png', image : new Image() },
          normal2 : { filename : 'mushroom-2.png', image : new Image() },
          normal3 : { filename : 'mushroom-3.png', image : new Image() },
          normal4 : { filename : 'mushroom-4.png', image : new Image() },
          poisoned1 : { filename : 'mushroom-poisoned-1.png', image : new Image() },
          poisoned2 : { filename : 'mushroom-poisoned-2.png', image : new Image() },
          poisoned3 : { filename : 'mushroom-poisoned-3.png', image : new Image() },
          poisoned4 : { filename : 'mushroom-poisoned-4.png', image : new Image() },
        },
      },
    },
    init : function(configs) {
      this.scaleFactor = configs.general.gridSquareSideLength * 0.1;
      this.args.width = configs.general.gridSquareSideLength * 0.8;
      this.args.height = configs.general.gridSquareSideLength * 0.8;
    },
  },
  player : {
    colors : ['red', 'purple'],
    defaultLives : 1,
    dimensions : {width : 30, height : 30},
    args : {
      width : 30,
      height : 30,
      extraArgs : {
        type : 'player',
        speed : {x : 0, y : 0},
        images : {
          player1 : { filename : 'player1.png', image : new Image() },
          player2 : { filename : 'player2.png', image : new Image() },
        },
      },
      constructorFunctions : {
        setX : function(player) {
          player.x = knobsAndLevers.player.startX[Object.keys(players.players).length];
        },
      },
    },
    init : function(configs) {
      this.areaHeight = configs.canvas.height * 0.2;
      this.topLimit = knobsAndLevers.canvas.height - this.areaHeight;
      this.startX = [
        (configs.canvas.width - this.dimensions.width * 2) * 0.5,
        (configs.canvas.width + this.dimensions.width * 2) * 0.5,
      ],
      this.startY = configs.canvas.height - this.dimensions.height - 1;
      this.args.y = this.startY;
    },
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
    resetCheats : function() {
      knobsAndLevers.resetParameter(this.speed);
    },
  },
  spider : {
    maxNumber : 0,
    hitPoints : 1,
    directionY : 1,
    points : {
      base : 500,
      range : 400,
    },
    interval : {
      min: 800,
      max: 1500,
    },
    args : {
      color : "fuchsia",
      extraArgs : {
        type : "spider",
        speed : {x : 1, y : 1},
        images : {
          one : { filename : 'spider-1.png', image : new Image() },
          two : { filename : 'spider-2.png', image : new Image() },
        },
      },
    },
    speedLimits : {
      min : 0.01,
      max : 5,
    },
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.general.gridSquareSideLength;
      this.args.height = configs.general.gridSquareSideLength * 0.5;
      this.args.x = 1;
      this.interval = supporting.clone(configs.game.interval);
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
      extraArgs : {
        type : "worm",
        speed : {x : 0.5, y : 0},
        images : {
          one : { filename : 'worm-1.png', image : new Image() },
          two : { filename : 'worm-2.png', image : new Image() },
        },
      },
      constructorFunctions : {
        setX : function(worm) {
          worm.speedX = supporting.getRandom(-1, 1) < 0 ? -1 : 1;
          if (worm.speedX < 0) {
            worm.x = game.gameArea.canvas.width - 1;
          } else {
            worm.x = 1 - worm.width;
          };
        },
        setY : function(worm) {
          let randomYPos = supporting.getRandom(0, knobsAndLevers.player.topLimit - knobsAndLevers.player.areaHeight);
          worm.y = supporting.getClosest(game.gameArea.yVertices, randomYPos);
        },
      },
    },
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.general.gridSquareSideLength * 1.5;
      this.args.height = configs.general.gridSquareSideLength;
      this.interval = supporting.clone(configs.game.interval);
    },
  },
};
