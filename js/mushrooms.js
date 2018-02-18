/*jslint white: true */

/* Mushrooms */
/***********************************/

var mushrooms = [];
var mushroomPointValue = 1;
var maxMushrooms = 50;
var coordinateScaleFactor = gameArea.gridSquareSideLength * 0.1;
var mushroomSide = gameArea.gridSquareSideLength * 0.8;

function manageMushrooms() {
  if (gameArea.frameNo == 1) {
    spawnMushrooms(maxMushrooms);
  }
  updateMushrooms();
}

function spawnMushrooms(amount) {
  while (mushrooms.length < amount) {
    x = gameArea.xVertices[Math.floor(Math.random() * gameArea.xVertices.length)];
    y = gameArea.yVertices[Math.floor(Math.random() * gameArea.yVertices.length)];
    if (x < gameArea.canvas.width - coordinateScaleFactor) {
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
  mushroom = new component(mushroomSide, mushroomSide, "teal", x + coordinateScaleFactor, y + coordinateScaleFactor);
  mushroom.pointValue = currentLevel;
  mushroom.hitPoints = 4;
  return mushroom;
}

function clearMushrooms() {
  mushrooms = [];
}