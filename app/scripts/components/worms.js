/*jslint white: true */
var worms = {
  worms : [],
  interval : knobsAndLevers.worm.initialInterval,
  manage : function() {
    this.clearOutsideCanvas();
    if (everyinterval(this.interval)) {
      this.interval = getRandom(knobsAndLevers.worm.interval.min, knobsAndLevers.worm.interval.max);
      this.spawn();
    }
    this.update();
  },
  spawn : function() {
    if (this.worms.length >= knobsAndLevers.worm.maxNumber) {
      return
    }
    var worm = new component(knobsAndLevers.worm.args);
    worm.pointValue = knobsAndLevers.worm.pointValue * metrics.currentLevel;
    worm.hitPoints = 1;
    this.worms.push(worm);
  },
  update : function() {
    let worms = this.worms;
    for (i = 0; i < worms.length; i += 1) {
      worms[i].newPos();
      worms[i].update();
    }
  },
  clearOutsideCanvas : function() {
    if (worms == false) { return; };
    this.worms = this.worms.filter(worm => worm.x < gameHandler.gameArea.canvas.width);
  },
  clear : function() {
    this.worms = [];
  }
}
