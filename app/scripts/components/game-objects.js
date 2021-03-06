/*jslint white: true */
var gameObjects = {
  worms : [],
  fleas : [],
  spiders : [],
  init : function() {
    Object.assign(this, gameObjectsBase);
    supporting.applyOverrides(this);
    this.intervals = {
      fleas : dials.fleas.initialInterval,
      worms : dials.worms.initialInterval,
      spiders : dials.spiders.initialInterval,
    };
    console.log('gameObjects initialized');
  },
  functionOverrides : {
    manage : function() {
      Object.keys(this.intervals).forEach(type => {
        this.spawnCreatureAtIntervals(type);
        if (this[type] == false) {
          return;
        };
        this[type] = this.clearOutsideCanvas(type);
        this.update(type);
      });
    },
    spawn : function(type) {
      this.setMax(type);
      if (this[type].length >= dials[type].maxNumber) {
        return;
      };
      this.make(type);
    },
    make : function(type) {
      let spawnedCreature = new Component(dials[type].args);
      let pointValue = dials[type].pointValue;
      spawnedCreature.pointValue = supporting.getRandom(pointValue, pointValue + 400);
      spawnedCreature.sound = sounds.getSound(type);
      this[type].push(spawnedCreature);
    },
    clearOutsideCanvas : function(type) {
      if (this[type] == false) { return; };
      return this[type].filter(target => {
        return target.x < game.gameArea.canvas.width + 10
          && target.x > 0 - target.width
          && target.y < game.gameArea.canvas.height
      });
    },
    update : function(type) {
      this[type].forEach(creature => {
        if (type == 'spiders') {
          this.setSpeed(creature, type);
          this.setDirection(creature);
          this.removeMushrooms(creature);
        };
        if (type == 'fleas') {
          this.dropMushrooms(creature);
        };
        if (type == 'worms') {
          this.changeMushrooms(creature);
        };
        creature.newPos();
        creature.update();
      });
    },
    clear : function() {
      this.worms = [];
      this.fleas = [];
      this.spiders = [];
    },
  },
  spawnCreatureAtIntervals(type) {
    if (supporting.everyinterval(game.gameArea.frameNo, this.intervals[type])) {
      this.intervals[type] = supporting.getRandom(dials[type].interval.min, dials[type].interval.max);
      this.spawn(type);
      if (type == 'fleas') {
        dials.fleas.mushroomCreateInterval = supporting.getRandom(75, 150);
      };
    };
  },
  setMax : function(type) {
    let tier = dials.game.tier;
    dials[type].maxNumber = tier.isMaxed ? tier.max : tier.current;
  },
  setSpeed : function(creature, type) {
    let speedLimits = dials[type].speedLimits;
    creature.speedX = Math.sign(creature.speedX) * (supporting.roll(10).crit ? speedLimits.max : speedLimits.min);
    creature.speedY = creature.directionY * (supporting.roll(10).crit ? speedLimits.max : speedLimits.min);
  },
  setDirection : function(creature) {
    if (creature.getBottom() > game.gameArea.canvas.height) {
      creature.directionY = -1;
    } else if (creature.getTop() < game.gameArea.canvas.height - (dials.player.areaHeight * 2)) {
      creature.directionY = 1;
    };
  },
  dropMushrooms : function(creature) {
    if (this.eligibleToDrop() && creature.y <= game.gameArea.canvas.height * 0.90 && creature.y >= game.gameArea.gridStart) {
      mushrooms.make({x : creature.x, y : creature.y});
    };
  },
  eligibleToDrop : function() {
    return supporting.everyinterval(
      game.gameArea.frameNo,
      dials.fleas.mushroomCreateInterval
    );
  },
  removeMushrooms : function(creature) {
    let theMushroom = mushrooms.mushrooms.find(mushroom => creature.crashWith(mushroom));
    if (theMushroom) {
      theMushroom.hitPoints = (supporting.roll(sides = 4).crit || theMushroom.creatureTouched) ? 0 : theMushroom.hitPoints;
      theMushroom.creatureTouched = true;
    };
  },
  changeMushrooms : function(creature) {
    mushrooms.mushrooms.forEach(mushroom => {
      if (creature.crashWithMiddle(mushroom)) {
        mushroom.color = 'black';
        mushroom.poisoned = true;
      };
    });
  },
};
