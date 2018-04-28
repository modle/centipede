// abstract common knobsAndLevers and move them to canvas-libs
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
      console.log('general defaults initialized');
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
      y : 0,
      extraArgs : {
        hitPoints : 1,
        type : "centipede",
        images : {
          objects : {
            up : {filename : 'centipede-head-1-up.png'},
            down : {filename : 'centipede-head-1-down.png'},
            left : {filename : 'centipede-head-1-left.png'},
            right : {filename : 'centipede-head-1-right.png'},
          },
          select : function(obj) {
            let key = customComponents.getCentipedeDirection(obj);
            return this.objects[key].image;
          },
        },
      },
    },
    init : function(configs) {
      this.args.width = configs.general.gridSquareSideLength;
      this.args.height = configs.general.gridSquareSideLength;
      this.args.x = configs.canvas.width / 2;
      images.init(this.args.extraArgs.images);
      console.log('centipede defaults initialized');
    },
  },
  components : {
    imageTypes : ['centipede', 'fly', 'worm', 'mushroom', 'spider', 'player'],
  },
  flies : {
    maxNumber : 0,
    pointValue : 200,
    interval : {
      min: 100,
      max: 1000,
    },
    mushroomCreateInterval : 100,
    args : {
      extraArgs : {
        hitPoints : 2,
        type : 'fly',
        speed : {x : 0, y : 2},
        images : {
          objects : {
            one : {filename : 'flea-1.png'},
            two : {filename : 'flea-2.png'},
          },
          select : function(obj) {
            let key = 'one';
            return this.objects[key].image;
          },
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
      images.init(this.args.extraArgs.images);
      console.log('flies defaults initialized');
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
      current: 1,
      max : 5,
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
      console.log('laser defaults initialized');
    },
    resetCheats : function() {
      knobsAndLevers.resetParameter(this.speed);
      knobsAndLevers.resetParameter(this.quantity);
    },
  },
  mushrooms : {
    initialAmount : 50,
    scaleFactor : 1,
    side : 0,
    args : {
      extraArgs : {
        hitPoints : 4,
        type : 'mushroom',
        images : {
          objects : {
            normal1 : {filename : 'mushroom-1.png'},
            normal2 : {filename : 'mushroom-2.png'},
            normal3 : {filename : 'mushroom-3.png'},
            normal4 : {filename : 'mushroom-4.png'},
            poisoned1 : {filename : 'mushroom-poisoned-1.png'},
            poisoned2 : {filename : 'mushroom-poisoned-2.png'},
            poisoned3 : {filename : 'mushroom-poisoned-3.png'},
            poisoned4 : {filename : 'mushroom-poisoned-4.png'},
          },
          select : function(obj) {
            let key = (obj.poisoned ? 'poisoned' : 'normal') + obj.hitPoints;
            return this.objects[key].image;
          },
        },
      },
    },
    init : function(configs) {
      this.scaleFactor = configs.general.gridSquareSideLength * 0.1;
      this.args.width = configs.general.gridSquareSideLength * 0.8;
      this.args.height = configs.general.gridSquareSideLength * 0.8;
      images.init(this.args.extraArgs.images);
      console.log('mushroom defaults initialized');
    },
  },
  player : {
    defaultLives : 1,
    dimensions : {width : 30, height : 30},
    args : {
      width : 20,
      height : 20,
      extraArgs : {
        type : 'player',
        speed : {x : 0, y : 0},
        images : {
          objects : {
            player1 : {filename : 'player1.png', image : {}},
            player2 : {filename : 'player2.png', image : {}},
          },
          select : function(obj) {
            let key = obj.name ? obj.name : 'player1';
            return this.objects[key].image;
          },
        },
      },
      constructorFunctions : {
        setX : function(player) {
          player.x = knobsAndLevers.player.startX[Object.keys(players.players).length];
        },
      },
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
    init : function(configs) {
      this.areaHeight = configs.canvas.height * 0.2;
      this.topLimit = configs.canvas.height - this.areaHeight;
      this.startX = [
        (configs.canvas.width - this.dimensions.width * 2) * 0.5,
        (configs.canvas.width + this.dimensions.width * 2) * 0.5,
      ],
      this.startY = configs.canvas.height - this.dimensions.height - 1;
      this.args.y = this.startY;
      images.init(this.args.extraArgs.images);
    },
    resetCheats : function() {
      knobsAndLevers.resetParameter(this.speed);
    },
  },
  spider : {
    maxNumber : 0,
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
      extraArgs : {
        hitPoints : 1,
        type : "spider",
        speed : {x : 1, y : 1},
        images : {
          objects : {
            one : {filename : 'spider-1.png'},
            two : {filename : 'spider-2.png'},
          },
          select : function(obj) {
            let key = 'one';
            return this.objects[key].image;
          },
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
      images.init(this.args.extraArgs.images);
      console.log('spider defaults initialized');
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
      console.log('text defaults initialized');
    },
  },
  worms : {
    maxNumber: 1,
    pointValue :200,
    interval : {
      min: 0,
      max: 0,
    },
    args : {
      extraArgs : {
        hitPoints : 1,
        type : "worm",
        speed : {x : 0.5, y : 0},
        images : {
          objects : {
            leftcrazy : {filename : 'worm-left-crazy.png', image : {}},
            rightcrazy : {filename : 'worm-right-crazy.png', image : {}},
            leftnormal : {filename : 'worm-left-normal.png', image : {}},
            rightnormal : {filename : 'worm-right-normal.png', image : {}},
          },
          select : function(obj) {
            let key = (obj.speedX > 0 ? 'right' : 'left') + obj.imageType;
            return this.objects[key].image;
          },
        },
      },
      constructorFunctions : {
        setImageType : function(worm) {
          let result = supporting.roll(sides = 10);
          worm.imageType = result.crit ? 'crazy' : 'normal';
          if (worm.imageType == 'crazy') {
            worm.hitPoints *= result.value;
            worm.width *= result.value;
            worm.height *= result.value;
          };
        },
        setX : function(worm) {
          let speedMultiplier = worm.imageType == 'crazy' ? 0.5 : 1;
          let theRoll = supporting.roll(sides = 2);
          if (theRoll.crit) {
            worm.speedX = -speedMultiplier;
            worm.x = game.gameArea.canvas.width;
          } else {
            worm.speedX = speedMultiplier;
            worm.x = 1 - worm.width;
          };
        },
        setY : function(worm) {
          let randomYPos = supporting.getRandom(0, knobsAndLevers.player.topLimit - knobsAndLevers.player.areaHeight * 2);
          worm.y = supporting.getClosest(game.gameArea.yVertices, randomYPos);
        },
      },
    },
    init : function(configs) {
      this.initialInterval = supporting.getRandom(this.interval.min, this.interval.max);
      this.args.width = configs.general.gridSquareSideLength * 1.5;
      this.args.defaultWidth = this.args.width;
      this.args.height = configs.general.gridSquareSideLength;
      this.args.defaultHeight = this.args.height;
      this.interval = supporting.clone(configs.game.interval);
      images.init(this.args.extraArgs.images);
      console.log('worm defaults initialized');
    },
  },
};
