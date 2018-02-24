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
    let wormArgs = {
      width: gameArea.gridSquareSideLength * 2,
      height : gameArea.gridSquareSideLength / 2,
      color : "orange",
      x : -gameArea.canvas.width / 10,
      y : gameArea.canvas.height / 10,
      extraArgs : {type : "worm", speed : {x : 0.5, y : 0}}
    };
    var worm = new component(wormArgs);
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
    this.worms = this.worms.filter(worm => worm.x < gameArea.canvas.width);
  },
  clear : function() {
    this.worms = [];
  }
}
