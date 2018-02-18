/*jslint white: true */

/* Spiders */
/***********************************/

var spiderPointValue = 20;
var spiders = [];
var spiderMaxInterval = 20;
var spiderMinInterval = 1;
var spiderInterval = getRandom(spiderMinInterval, spiderMaxInterval);

function manageSpiders() {
  // console.log('got here, spiders are', spiders);
  clearSpidersOutsideCanvas();
  if (everyinterval(spiderInterval) && spiders.length < 1) {
    spiderInterval = getRandom(spiderMinInterval, spiderMaxInterval);
    spawnSpider();
  }
  updateSpiders();
}

function spawnSpider() {
  x = -gameArea.canvas.width / 20;
  y = gameArea.gamePieceTopLimit;
  var spider = new component(gameArea.gridSquareSideLength * 0.3, gameArea.gridSquareSideLength * 0.8, "fuchsia", x, y, "spider");
  spider.speedX = 1;
  spider.speedY = 1;
  spider.directionY = 1;
  spider.pointValue = spiderPointValue * currentLevel;
  spider.hitPoints = 1;
  spiders.push(spider);
}

function updateSpiders() {
  // spiders need to move up and down erratically, and occasionally move to the right
  for (i = 0; i < spiders.length; i += 1) {
    if (everyinterval(spiderInterval / 20)) {
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
}

function clearSpidersOutsideCanvas() {
  if (!spiders) { return; }
  for (i = 0; i < spiders.length; i += 1) {
    if (spiders[i].x > gameArea.canvas.width) {
      spiders.splice(i, 1);
    }
  }
}

function clearSpiders() {
  spiders = [];
}
