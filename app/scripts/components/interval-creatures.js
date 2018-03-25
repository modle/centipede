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
        // return acts like a continue in a forEach
        return;
      };
      this[creature] = this.clearOutsideCanvas(creature);
      this.update(creature);
      if (creature == 'flies') {
        this.dropMushrooms();
      };
    });
  },
  dropMushrooms : function() {
    if (!this.eligibleToDrop()) {
      return;
    };
    this.flies.forEach(fly => {
      if (fly.y > game.gameArea.gamePieceTopLimit) {
        // return acts like a continue in a forEach
        return;
      };
      let mushroom = mushrooms.generate({x : fly.x, y : fly.y});
      mushroom.color = 'purple';
      mushrooms.mushrooms.push(mushroom);
    });
  },
  eligibleToDrop : function() {
    return supporting.everyinterval(
        game.gameArea.frameNo,
        knobsAndLevers.flies.mushroomCreateInterval
      );
  },
  spawnCreatureAtIntervals(creature) {
    if (supporting.everyinterval(game.gameArea.frameNo, this.intervals[creature])) {
      this.intervals[creature] = supporting.getRandom(knobsAndLevers[creature].interval.min, knobsAndLevers[creature].interval.max);
      this.spawn(creature);
    };
  },
  spawn : function(creature) {
    if (this[creature].length >= knobsAndLevers[creature].maxNumber) {
      return
    };
    let args = knobsAndLevers[creature].args;
    if (Array.from(Object.keys(args)).includes('constructorFunctions')) {
      Array.from(Object.keys(args.constructorFunctions))
        .forEach(theFunction => args.constructorFunctions[theFunction]());
    };
    let spawnedCreature = new Component(knobsAndLevers[creature].args);
    spawnedCreature.pointValue = knobsAndLevers[creature].pointValue * metrics.currentLevel;
    spawnedCreature.hitPoints = 1;
    this[creature].push(spawnedCreature);
  },
  update : function(creature) {
    let updatingCreature = this[creature];
    for (i = 0; i < updatingCreature.length; i += 1) {
      updatingCreature[i].newPos();
      updatingCreature[i].update();
    };
  },
  clearOutsideCanvas : function(creature) {
    if (this[creature] == false) { return; };
    return this[creature].filter(target => {
      return target.x < game.gameArea.canvas.width
        && target.y < game.gameArea.canvas.height
    });
  },
  clear : function() {
    this.worms = [];
    this.flies = [];
  },
};
