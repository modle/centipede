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
    Object.keys(this.intervals).forEach(creature => {
      this.spawnCreatureAtIntervals(creature);
      if (this[creature] == false) {
        return;
      };
      this[creature] = this.clearOutsideCanvas(creature);
      this.update(creature);
    });
  },
  spawnCreatureAtIntervals(creature) {
    if (supporting.everyinterval(game.gameArea.frameNo, this.intervals[creature])) {
      this.intervals[creature] = supporting.getRandom(knobsAndLevers[creature].interval.min, knobsAndLevers[creature].interval.max);
      this.spawn(creature);
      if (creature == 'flies') {
        knobsAndLevers.flies.mushroomCreateInterval = supporting.getRandom(75, 150);
      };
    };
  },
  spawn : function(creature) {
    this.setMax(creature);
    if (this[creature].length >= knobsAndLevers[creature].maxNumber) {
      return;
    };
    this.make(creature);
  },
  setMax : function(creature) {
    let tier = knobsAndLevers.game.tier;
    knobsAndLevers[creature].maxNumber = tier.isMaxed ? tier.max : tier.current;
  },
  make : function(creature) {
    let spawnedCreature = new Component(knobsAndLevers[creature].args);
    let pointValue = knobsAndLevers[creature].pointValue;
    spawnedCreature.pointValue = supporting.getRandom(pointValue, pointValue + 400);
    spawnedCreature.hitPoints = knobsAndLevers[creature].hitPoints;
    this[creature].push(spawnedCreature);
  },
  clearOutsideCanvas : function(creature) {
    if (this[creature] == false) { return; };
    return this[creature].filter(target => {
      return target.x < game.gameArea.canvas.width
        && target.x > 0 - target.width
        && target.y < game.gameArea.canvas.height
    });
  },
  update : function(creatureType) {
    this[creatureType].forEach(creature => {
      creature.newPos();
      creature.update();
      if (creatureType == 'flies') {
        this.dropMushrooms(creature);
      };
      if (creatureType == 'worms') {
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
