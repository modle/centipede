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
    x = xVertices[Math.floor(Math.random() * xVertices.length)];
    y = yVertices[Math.floor(Math.random() * yVertices.length)];
    mushrooms.push(generateMushroom(x, y));
  }
}

function updateMushrooms() {
  for (i = 0; i < mushrooms.length; i += 1) {
    mushrooms[i].update();
  }
}

function generateMushroom(x, y) {
  mushroom = new component(gridSquareSide, gridSquareSide, 'brown', x, y);
  mushroom.pointValue = currentLevel;
  mushroom.hitPoints = 4;
  return mushroom;
}
