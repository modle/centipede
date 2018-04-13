/*jslint white: true */
var spiders = {
  spiders : [],
  init : function() {
    this.interval = knobsAndLevers.spider.initialInterval;
    console.log('spiders initialized');
  },
  manage : function() {
    this.spawn();
    this.update();
    this.clearOutsideCanvas();
  },
  spawn : function() {
    if (this.maxedOut()) {
      return;
    };
    if (this.updateInterval()) {
      this.make();
    };
  },
  maxedOut : function() {
    return this.spiders.length >= knobsAndLevers.spider.maxNumber;
  },
  updateInterval : function() {
    if (this.canUpdate()) {
      this.setInterval();
      return true;
    };
    return false;
  },
  canUpdate : function() {
    return supporting.everyinterval(game.getFrameNo(), this.interval);
  },
  setInterval : function() {
    let min = knobsAndLevers.spider.interval.min;
    let max = knobsAndLevers.spider.interval.max;
    this.interval = supporting.getRandom(min, max);
  },
  make : function() {
    let spider = new Component(knobsAndLevers.spider.args);
    spider.directionY = 1;
    spider.pointValue = knobsAndLevers.spider.pointValue * metrics.currentLevel;
    spider.hitPoints = 1;
    this.spiders.push(spider);
  },
  update : function() {
    this.spiders.forEach(spider => {
      this.updateSpeed(spider);
      this.updatePos(spider);
      this.updateComponent(spider);
      this.updateYDirection(spider);
    });
  },
  updateSpeed : function(spider) {
    // TODO work on the spider movement algorithm
    // spiders need to move up and down erratically, and occasionally move to the right
    if (supporting.everyinterval(game.getFrameNo(), this.interval / 100)) {
      spider.speedX = supporting.getRandom(1, 6) / 10;
    };
    spider.speedY = supporting.getRandom(0, 1) * spider.directionY;
  },
  updatePos : function(spider) {
    spider.newPos();
  },
  updateComponent : function(spider) {
    spider.update();
  },
  updateYDirection : function(spider) {
    if (spider.y + spider.height > game.gameArea.canvas.height) {
      spider.directionY = -1;
    } else if (spider.y < player.topLimit) {
      spider.directionY = 1;
    };
  },
  clearOutsideCanvas : function() {
    if (this.spiders == false) { return; };
    this.spiders = this.spiders.filter(spider => spider.x < game.gameArea.canvas.width);
  },
  clear : function() {
    this.spiders = [];
  }
}
