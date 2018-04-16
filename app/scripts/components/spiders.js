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
    let defaults = knobsAndLevers.spider;
    let spider = new Component(defaults.args);
    let points = defaults.points;
    spider.pointValue = supporting.getRandom(points.base, points.base + points.range);
    spider.hitPoints = defaults.hitPoints;
    spider.speedX = supporting.getRandom(-1, 1);
    if (spider.speedX < 0) {
      spider.x = game.gameArea.canvas.width - 1;
    };
    spider.y = supporting.getRandom(player.topLimit - player.areaHeight, game.gameArea.canvas.height);
    spider.directionY = defaults.directionY;
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
    // spiders need to move up and down erratically, and occasionally move horizontally
    // if (supporting.everyinterval(game.getFrameNo(), this.interval / 20)) {
    spider.speedX = Math.sign(spider.speedX) * (supporting.getRandom(-50, 5) < 0 ? 0.01 : 5);
    // };
    // if (supporting.everyinterval(game.getFrameNo(), this.interval / 50)) {
    // };
    spider.speedY = spider.directionY * (supporting.getRandom(-50, 5) < 0 ? 0.01 : 5);
    if (supporting.everyinterval(game.getFrameNo(), this.interval * supporting.getRandom(0.1, 1))) {
      spider.directionY *= -1;
    };
  },
  updatePos : function(spider) {
    spider.newPos();
  },
  updateComponent : function(spider) {
    spider.update();
  },
  updateYDirection : function(spider) {
    if (spider.getBottom() > game.gameArea.canvas.height) {
      spider.directionY = -1;
    } else if (spider.getTop() < game.gameArea.canvas.height - (player.areaHeight * 2)) {
      spider.directionY = 1;
    };
  },
  clearOutsideCanvas : function() {
    if (this.spiders == false) { return; };
    this.spiders = this.spiders.filter(spider => spider.x < game.gameArea.canvas.width && spider.x > 1);
  },
  clear : function() {
    this.spiders = [];
  },
};
