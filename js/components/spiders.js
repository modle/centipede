/*jslint white: true */
var spiders = {
  spiders : [],
  interval : knobsAndLevers.spider.initialInterval,
  manage : function() {
    this.spawn();
    this.update();
    this.clearOutsideCanvas();
  },
  spawn : function() {
    if (!everyinterval(this.interval) || this.spiders.length >= knobsAndLevers.spider.maxNumber) {
      return
    }
    this.interval = getRandom(knobsAndLevers.spider.interval.min, knobsAndLevers.spider.interval.max);
    let spider = new component(knobsAndLevers.spider.args);
    spider.directionY = 1;
    spider.pointValue = knobsAndLevers.spider.pointValue * metrics.currentLevel;
    spider.hitPoints = 1;
    this.spiders.push(spider);
  },
  update : function() {
  // spiders need to move up and down erratically, and occasionally move to the right
    let spiders = this.spiders;
    for (i = 0; i < spiders.length; i += 1) {
      if (everyinterval(this.interval / 20)) {
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
    if (spiders == false) { return; };
    this.spiders = this.spiders.filter(spider => spider.x < gameArea.canvas.width);
  },
  clear : function() {
    this.spiders = [];
  }
}
