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
  while (mushrooms.length < amount) {
    x = Math.floor(Math.random() * (canvasWidth + 1));
    y = Math.floor(Math.random() * (canvasHeight * .8 + 1));
    mushrooms.push(new component(15, 15, "Plum", x, y));
  }
}

function updateMushrooms() {
  for (i = 0; i < mushrooms.length; i += 1) {
    mushrooms[i].update();
  }
}
