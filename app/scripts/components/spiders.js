/*jslint white: true */
var spiders = {
  spiders : [],
  interval : 0,
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
    this.setMax();
    return this.spiders.length >= knobsAndLevers.spider.maxNumber;
  },
  setMax : function() {
    let tier = knobsAndLevers.game.tier;
    knobsAndLevers.spider.maxNumber = tier.isMaxed ? tier.max : tier.current;
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
    spider.y = supporting.getRandom(knobsAndLevers.player.topLimit - knobsAndLevers.player.areaHeight, game.gameArea.canvas.height);
    spider.directionY = defaults.directionY;
    this.spiders.push(spider);
  },
  update : function() {
    this.spiders.forEach(spider => {
      this.removeMushrooms(spider);
      this.updateSpeed(spider);
      this.updatePos(spider);
      this.updateComponent(spider);
      this.updateYDirection(spider);
    });
  },
  removeMushrooms : function(spider) {
    let theMushroom = mushrooms.mushrooms.find(mushroom => spider.crashWith(mushroom));
    // TODO 1d4, ignore if not 4
    let doRemove = supporting.getRandom(-3, 1);
    if (theMushroom) {
      theMushroom.hitPoints = doRemove < 0 || theMushroom.spiderTouched ? theMushroom.hitPoints : 0;
      theMushroom.spiderTouched = true;
    };
  },
  updateSpeed : function(spider) {
    // TODO work on the spider movement algorithm
    // spiders need to move up and down erratically, and occasionally move horizontally
    let speedLimits = knobsAndLevers.spider.speedLimits;
    spider.speedX = spider.speedX == 0 ? speedLimits.min : spider.speedX;
    // TODO supporting.getRandom is a little confusing
    // basically, most of the time we want to do speedLimits.min (when less than 0, to avoid direction switching)
    // turn this into a roll check instead. 1d20 if 20, set speed to max, else speed to min
    // -.-
    spider.speedX = Math.sign(spider.speedX) * (supporting.getRandom(-50, 5) < 0 ? speedLimits.min : speedLimits.max);
    spider.speedY = spider.directionY * (supporting.getRandom(-50, 5) < 0 ? speedLimits.min : speedLimits.max);
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
    } else if (spider.getTop() < game.gameArea.canvas.height - (knobsAndLevers.player.areaHeight * 2)) {
      spider.directionY = 1;
    };
  },
  clearOutsideCanvas : function() {
    if (this.spiders == false) { return; };
    this.spiders = this.spiders.filter(spider =>
      spider.x < game.gameArea.canvas.width
        && spider.x > -spider.width
    );
  },
  clear : function() {
    this.spiders = [];
  },
};
