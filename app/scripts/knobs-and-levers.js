// abstract common knobsAndLevers and move them to canvas-libs
var knobsAndLevers = {
  init : function() {
    this.general.init(this);
    this.centipede.init(this);
    this.flies.init(this);
    this.player.init(this);
    this.laser.init(this);
    this.mushrooms.init(this);
    this.spiders.init(this);
    this.text.init(this);
    this.worms.init(this);
    console.log('knobsAndLevers initialized');
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
        animationInterval : 50,
        hitPoints : 1,
        type : 'centipede',
      },
      sprites : {
        up : {activeIndex : 0, files : ['centipede-head-1-up.png', 'centipede-head-2-up.png'], images : []},
        down : {activeIndex : 0, files : ['centipede-head-1-down.png', 'centipede-head-2-down.png'], images : []},
        left : {activeIndex : 0, files : ['centipede-head-1-left.png', 'centipede-head-2-left.png'], images : []},
        right : {activeIndex : 0, files : ['centipede-head-1-right.png', 'centipede-head-2-right.png'], images : []},
      },
      getSpriteKey : function(obj) {
        let direction = '';
        if (obj.moveVertically) {
          direction = obj.directionY > 0 ? 'down' : 'up';
        } else {
          direction = obj.directionX > 0 ? 'right' : 'left';
        };
        return direction;
      },
    },
    init : function(configs) {
      this.args.width = configs.general.gridSquareSideLength;
      this.args.height = configs.general.gridSquareSideLength;
      this.args.x = configs.canvas.width / 2;
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
        animationInterval : 50,
        hitPoints : 2,
        type : 'fly',
        speed : {x : 0, y : 2},
      },
      sprites : {
        one : {activeIndex : 0, files : ['flea-1.png', 'flea-2.png'], images : []},
      },
      getSpriteKey : function(obj) {
        return 'one';
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
      incrementScore : 2000,
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
      color : 'purple',
      extraArgs : {type : 'laser', speed : {x : 0, y : 0}},
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
      },
      sprites : {
        normal1 : {files : ['mushroom-1.png'], images : []},
        normal2 : {files : ['mushroom-2.png'], images : []},
        normal3 : {files : ['mushroom-3.png'], images : []},
        normal4 : {files : ['mushroom-4.png'], images : []},
        poisoned1 : {files : ['mushroom-poisoned-1.png'], images : []},
        poisoned2 : {files : ['mushroom-poisoned-2.png'], images : []},
        poisoned3 : {files : ['mushroom-poisoned-3.png'], images : []},
        poisoned4 : {files : ['mushroom-poisoned-4.png'], images : []},
      },
      getSpriteKey : function(obj) {
        return (obj.poisoned ? 'poisoned' : 'normal') + obj.hitPoints;
      },
    },
    init : function(configs) {
      this.scaleFactor = configs.general.gridSquareSideLength * 0.1;
      this.args.width = configs.general.gridSquareSideLength * 0.8;
      this.args.height = configs.general.gridSquareSideLength * 0.8;
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
      },
      sprites : {
        player1 : {files : ["player1.png"], images : []},
        player2 : {files : ["player2.png"], images : []},
      },
      getSpriteKey : function(obj) {
        return obj.name ? obj.name : 'player1';
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
    },
    resetCheats : function() {
      knobsAndLevers.resetParameter(this.speed);
    },
  },
  spiders : {
    maxNumber : 0,
    pointValue : 400,
    interval : {
      min : 10,
      max : 20,
    },
    args : {
      directionY : 1,
      extraArgs : {
        animationInterval : 50,
        hitPoints : 1,
        type : 'spider',
        speed : {x : 1, y : 1},
      },
      sprites : {
        one : {activeIndex : 0, files : ['spider-1.png', 'spider-2.png'], images : []},
      },
      getSpriteKey : function(obj) {
        return 'one';
      },
      constructorFunctions : {
        setY : function(spider) {
          spider.y = supporting.getRandom(knobsAndLevers.player.topLimit - knobsAndLevers.player.areaHeight, game.gameArea.canvas.height);
        },
        setX : function(spider) {
          let theRoll = supporting.roll(sides = 2);
          if (theRoll.crit) {
            spider.speedX = -1;
            spider.x = game.gameArea.canvas.width;
          } else {
            spider.speedX = 1;
            spider.x = 1 - spider.width;
          };
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
    maxNumber : 1,
    pointValue : 200,
    interval : {
      min: 0,
      max: 0,
    },
    args : {
      extraArgs : {
        animationInterval : 50,
        hitPoints : 1,
        type : 'worm',
        speed : {x : 0.5, y : 0},
      },
      sprites : {
        leftcrazy : {activeIndex : 0, files : ['worm-1-crazy.png', 'worm-2-crazy.png'], images : []},
        rightcrazy : {activeIndex : 0, files : ['worm-1-crazy.png', 'worm-2-crazy.png'], images : []},
        leftnormal : {activeIndex : 0, files : ['worm-1-left-normal.png', 'worm-2-left-normal.png'], images : []},
        rightnormal : {activeIndex : 0, files : ['worm-1-right-normal.png', 'worm-2-right-normal.png'], images : []},
      },
      getSpriteKey : function(obj) {
        return (obj.speedX > 0 ? 'right' : 'left') + obj.imageType;
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
      console.log('worm defaults initialized');
    },
  },
};
