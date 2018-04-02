/*jslint white: true */
var intervalCreatures = {
  worms : [],
  flies : [],
  init : function() {
    this.intervals = {
      flies : knobsAndLevers.flies.initialInterval,
      worms : knobsAndLevers.worms.initialInterval,
    };
  },
  manage : function() {
    Array.from(Object.keys(this.intervals)).forEach(creature => {
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
    };
  },
  spawn : function(creature) {
    if (this[creature].length >= knobsAndLevers[creature].maxNumber) {
      return;
    };
    this.executeConstructorFunctions(creature);
    this.make(creature);
  },
  make : function(creature) {
    let spawnedCreature = new Component(knobsAndLevers[creature].args);
    spawnedCreature.pointValue = knobsAndLevers[creature].pointValue * metrics.currentLevel;
    spawnedCreature.hitPoints = 1;
    this[creature].push(spawnedCreature);
  },
  executeConstructorFunctions : function(creature) {
    let args = knobsAndLevers[creature].args;
    if (Array.from(Object.keys(args)).includes('constructorFunctions')) {
      Array.from(Object.keys(args.constructorFunctions))
        .forEach(theFunction => args.constructorFunctions[theFunction]());
    };
  },
  clearOutsideCanvas : function(creature) {
    if (this[creature] == false) { return; };
    return this[creature].filter(target => {
      return target.x < game.gameArea.canvas.width
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
    });
  },
  dropMushrooms : function(fly) {
    if (this.eligibleToDrop() && fly.y <= game.gameArea.gamePieceTopLimit) {
      mushrooms.make({x : fly.x, y : fly.y}, 'purple');
    };
  },
  eligibleToDrop : function() {
    return supporting.everyinterval(
      game.gameArea.frameNo,
      knobsAndLevers.flies.mushroomCreateInterval
    );
  },
  clear : function() {
    this.worms = [];
    this.flies = [];
  },
};
