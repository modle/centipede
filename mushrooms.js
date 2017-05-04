/*jslint white: true */

/* Mushrooms */
/***********************************/

var mushrooms = [];
var mushroomPointValue = 1;
var firstMushroomLayer = gridSquareSide * 2;
var maxMushrooms = 50;

function manageMushrooms() {
  if (gameArea.frameNo == 1) {
    spawnMushrooms(maxMushrooms);
  }
  updateMushrooms();
}

function spawnMushrooms(amount) {
  while (mushrooms.length < amount) {
    x = xVertices[Math.floor(Math.random() * xVertices.length)];
    y = yVertices[Math.floor(Math.random() * yVertices.length)];
    if (x < canvasWidth - gridSquareSide) {
      mushrooms.push(generateMushroom(x, y));
    }
  }
}

function updateMushrooms() {
  for (i = 0; i < mushrooms.length; i += 1) {
    mushrooms[i].update();
  }
}

function generateMushroom(x, y) {
  mushroom = new component(gridSquareSide * 0.8, gridSquareSide * 0.8, "teal", x + gridSquareSide * 0.1, y + gridSquareSide * 0.1);
  mushroom.pointValue = currentLevel;
  mushroom.hitPoints = 4;
  return mushroom;
}
