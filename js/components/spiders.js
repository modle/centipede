/*jslint white: true */
var spiders = {
  spiders : [],
  spiderInterval : knobsAndLevers.initialSpiderInterval,
  manage : function() {
    this.clearOutsideCanvas();
    if (everyinterval(this.spiderInterval) && this.spiders.length < knobsAndLevers.maxSpiders) {
      this.spiderInterval = getRandom(knobsAndLevers.spiderInterval.min, knobsAndLevers.spiderInterval.max);
      this.spawn();
    }
    this.update();
  },
  spawn : function() {
    let spiderArgs = {
      width: gameArea.gridSquareSideLength * 0.3,
      height : gameArea.gridSquareSideLength * 0.8,
      color : "fuchsia",
      x : -gameArea.canvas.width / 20,
      y : gameArea.gamePieceTopLimit,
      extraArgs : {type : "spider", speed : {x : 1, y : 1}}
    };
    let spider = new component(spiderArgs);
    spider.directionY = 1;
    spider.pointValue = knobsAndLevers.spiderPointValue * metrics.currentLevel;
    spider.hitPoints = 1;
    this.spiders.push(spider);
  },
  update : function() {
  // spiders need to move up and down erratically, and occasionally move to the right
    let spiders = this.spiders;
    for (i = 0; i < spiders.length; i += 1) {
      if (everyinterval(this.spiderInterval / 20)) {
        spiders[i].speedX = getRandom(0, 1);
      }
      spiders[i].speedY = getRandom(0, 1) * spiders[i].directionY;
      spiders[i].newPos();
      spiders[i].update();
      if (spiders[i].y + spiders[i].height > gameArea.canvas.height) {
        spiders[i].directionY = -1;
      }
      if (spiders[i].y < gameArea.gamePieceTopLimit) {
        spiders[i].directionY = 1;
      }
    }
  },
  clearOutsideCanvas : function() {
    let spiders = this.spiders;
    for (i = 0; i < spiders.length; i += 1) {
      if (spiders[i].x > gameArea.canvas.width) {
        spiders.splice(i, 1);
      }
    }
  },
  clear : function() {
    this.spiders = [];
  }
}
