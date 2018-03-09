/*jslint white: true */
var intervalCreatures = {
  worms : [],
  flies : [],
  intervals : {
    flies : knobsAndLevers.flies.initialInterval,
    worms : knobsAndLevers.worms.initialInterval,
  },
  manage : function() {
    Array.from(Object.keys(this.intervals)).forEach(creature => {
      this.spawnCreatureAtIntervals(creature);
      if (intervalCreatures[creature] == false) {
        // return acts like a continue in a forEach
        return;
      }
      this.clearOutsideCanvas(creature);
      this.update(creature);
      this.dropMushrooms(creature);
    });
  },
  dropMushrooms(creature) {
    if (creature != 'flies' || !everyinterval(knobsAndLevers[creature].mushroomCreateInterval)) {
      return;
    };
    this.flies.forEach(fly => {
      if (fly.y > game.gameArea.gamePieceTopLimit) {
        return;
      };
      let mushroom = mushrooms.generate(fly.x, fly.y);
      mushroom.color = 'purple';
      mushrooms.mushrooms.push(mushroom);
    });
  },
  spawnCreatureAtIntervals(creature) {
    if (everyinterval(this.intervals[creature])) {
      this.intervals[creature] = getRandom(knobsAndLevers[creature].interval.min, knobsAndLevers[creature].interval.max);
      this.spawn(creature);
    };
  },
  spawn : function(creature) {
    if (this[creature].length >= knobsAndLevers[creature].maxNumber) {
      return
    };
    var spawnedCreature = new Component(knobsAndLevers[creature].args);
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
    let canvas = game.gameArea.canvas;
    this[creature] = this[creature].filter(target => {
      return target.x < canvas.width && target.y < canvas.height;
    });
  },
  clear : function() {
    this.worms = [];
    this.flies = [];
  },
}
