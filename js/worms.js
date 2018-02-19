/*jslint white: true */

/* Worms */
/***********************************/

var wormPointValue = 50;
var worms = [];
var wormMinInterval = 20;
var wormMaxInterval = 20;
// var wormMinInterval = 2000;
// var wormMaxInterval = 4000;
var wormInterval = getRandom(wormMinInterval, wormMaxInterval);

var wormHandler = {
  worms : [],
  manage : function() {
    this.clearOutsideCanvas();
    if (everyinterval(wormInterval)) {
      wormInterval = getRandom(wormMinInterval, wormMaxInterval);
      this.spawn();
    }
    this.update();
  },
  spawn : function() {
    let wormArgs = {
      width: gameArea.gridSquareSideLength * 2,
      height : gameArea.gridSquareSideLength / 2,
      color : "orange",
      x : -gameArea.canvas.width / 10,
      y : gameArea.canvas.height / 10,
      extraArgs : {type : "worm", speed : {x : 0.5, y : 0}}
    };
    var worm = new component(wormArgs);
    worm.pointValue = wormPointValue * currentLevel;
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
    let worms = this.worms;
    if (!worms) { return; }
    for (i = 0; i < worms.length; i += 1) {
      if (worms[i].x > gameArea.canvas.width) {
        worms.splice(i, 1);
      }
    }
  },
  clear : function() {
    this.worms = [];
  }
}
