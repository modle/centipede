/*jslint white: true */
var intervalCreatures = {
  worms : [],
  flies : [],
  init : function() {
    this.intervals = {
      flies : knobsAndLevers.flies.initialInterval,
      worms : knobsAndLevers.worms.initialInterval,
    };
    console.log('intervalCreatures initialized');
  },
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
  spawnCreatureAtIntervals(type) {
    if (supporting.everyinterval(game.gameArea.frameNo, this.intervals[type])) {
      this.intervals[type] = supporting.getRandom(knobsAndLevers[type].interval.min, knobsAndLevers[type].interval.max);
      this.spawn(type);
      if (type == 'flies') {
        knobsAndLevers.flies.mushroomCreateInterval = supporting.getRandom(75, 150);
      };
    };
  },
  spawn : function(type) {
    this.setMax(type);
    if (this[type].length >= knobsAndLevers[type].maxNumber) {
      return;
    };
    this.make(type);
  },
  setMax : function(type) {
    let tier = knobsAndLevers.game.tier;
    knobsAndLevers[type].maxNumber = tier.isMaxed ? tier.max : tier.current;
  },
  make : function(type) {
    let spawnedCreature = new Component(knobsAndLevers[type].args);
    let pointValue = knobsAndLevers[type].pointValue;
    spawnedCreature.pointValue = supporting.getRandom(pointValue, pointValue + 400);
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
      creature.newPos();
      creature.update();
      if (type == 'flies') {
        this.dropMushrooms(creature);
      };
      if (type == 'worms') {
        this.changeMushrooms(creature);
      };
    });
  },
  dropMushrooms : function(fly) {
    if (this.eligibleToDrop() && fly.y <= game.gameArea.canvas.height * 0.90 && fly.y >= game.gameArea.firstMushroomLayer) {
      mushrooms.make({x : fly.x, y : fly.y});
    };
  },
  eligibleToDrop : function() {
    return supporting.everyinterval(
      game.gameArea.frameNo,
      knobsAndLevers.flies.mushroomCreateInterval
    );
  },
  changeMushrooms : function(creature) {
    mushrooms.mushrooms.forEach(mushroom => {
      if (creature.crashWithMiddle(mushroom)) {
        mushroom.color = 'black';
        mushroom.poisoned = true;
      };
    });
  },
  clear : function() {
    this.worms = [];
    this.flies = [];
  },
};
