/* Mushrooms */
/***********************************/

var mushrooms = [];
var mushroomPointValue = 1;

function manageMushrooms() {
  if (gameArea.frameNo == 1) {
    spawnMushrooms(100);
  }
  updateMushrooms();
}

function spawnMushrooms(amount) {
  getEligiblePositions();
  while (mushrooms.length < amount) {
    x = xEligiblePositions[Math.floor(Math.random()*xEligiblePositions.length)];
    y = yEligiblePositions[Math.floor(Math.random()*yEligiblePositions.length)];
    mushrooms.push(new component(canvasWidth / 25, canvasHeight / 22, "Plum", x, y));
  }
}

function updateMushrooms() {
  for (i = 0; i < mushrooms.length; i += 1) {
    mushrooms[i].update();
  }
}

xEligiblePositions = []
yEligiblePositions = []

function getEligiblePositions() {
  xSpacing = canvasWidth / 25;
  ySpacing = canvasHeight / 22;
  x = 0;
  y = 0;
  while (x < canvasWidth) {
    xEligiblePositions.push(x);
    x += xSpacing;
  }
  while (y < canvasHeight * .75) {
    yEligiblePositions.push(y);
    y += ySpacing;
  }
}
