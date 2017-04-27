/*jslint white: true */

/* Mushrooms */
/***********************************/

var mushrooms = [];
var mushroomPointValue = 1;
var firstMushroomLayer = gridSquareSide * 2;

function manageMushrooms() {
  if (gameArea.frameNo == 1) {
    spawnMushrooms(100);
  }
  updateMushrooms();
}

function spawnMushrooms(amount) {
  while (mushrooms.length < amount) {
    x = xVertices[Math.floor(Math.random()*xVertices.length)];
    y = yVertices[Math.floor(Math.random()*yVertices.length)];
    mushrooms.push(new component(gridSquareSide, gridSquareSide, "Plum", x, y));
  }
}

function updateMushrooms() {
  for (i = 0; i < mushrooms.length; i += 1) {
    mushrooms[i].update();
  }
}
