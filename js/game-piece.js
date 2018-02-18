/*jslint white: true */

/* Game Piece */
/***********************************/

var gamePiece;
var gamePieceSpeed = 2;
var gamePieceWidth = 30;
var gamePieceHeight = 30;
var gamePieceStartX = (canvasWidth - gamePieceWidth) / 2;
var gamePieceStartY = gameArea.canvas.height * 0.9;

function manageGamePiece() {
  moveGamePiece();
  updateGamePiece();
}

function updateGamePiece() {
  gamePiece.update();
}

function resetGamePiecePosition() {
  gamePiece.x = gamePieceStartX;
  gamePiece.y = gamePieceStartY;
}

function moveGamePiece() {
  gamePiece.speedX = 0;
  gamePiece.speedY = 0;
  // stop game piece from going beyond boundaries (bottom 20% of screen only)
  // move game piece
  // FIXME: abstract this better
  // up right
  if (gameArea.keys && gameArea.keys[87] && gamePiece.getTop() > gamePieceTopLimit && gameArea.keys[68] && gamePiece.getRight() < canvasWidth) {
    // move it
    gamePiece.speedX = gamePieceSpeed;
    gamePiece.speedY = -gamePieceSpeed;
    gamePiece.newPos();
    // if it collides, move it back
    if (collidesWithMushrooms(gamePiece)) {
      gamePiece.speedX = -gamePieceSpeed;
      gamePiece.speedY = gamePieceSpeed;
      gamePiece.newPos();
    }
    return;
  }
  // up left
  if (gameArea.keys && gameArea.keys[87] && gamePiece.getTop() > gamePieceTopLimit && gameArea.keys[65] && gamePiece.getLeft() > 0) {
    // move it
    gamePiece.speedX = -gamePieceSpeed;
    gamePiece.speedY = -gamePieceSpeed;
    gamePiece.newPos();
    // if it collides, move it back
    if (collidesWithMushrooms(gamePiece)) {
      gamePiece.speedX = gamePieceSpeed;
      gamePiece.speedY = gamePieceSpeed;
      gamePiece.newPos();
    }
    return;
  }
  // down right
  if (gameArea.keys && gameArea.keys[83] && gamePiece.getBottom() < gameArea.canvas.height && gameArea.keys[68] && gamePiece.getRight() < canvasWidth) {
    // move it
    gamePiece.speedX = gamePieceSpeed;
    gamePiece.speedY = gamePieceSpeed;
    gamePiece.newPos();
    // if it collides, move it back
    if (collidesWithMushrooms(gamePiece)) {
      gamePiece.speedX = -gamePieceSpeed;
      gamePiece.speedY = -gamePieceSpeed;
      gamePiece.newPos();
    }
    return;
  }
  // down left
  if (gameArea.keys && gameArea.keys[83] && gamePiece.getBottom() < gameArea.canvas.height && gameArea.keys[65] && gamePiece.getLeft() > 0) {
    // move it
    gamePiece.speedX = -gamePieceSpeed;
    gamePiece.speedY = gamePieceSpeed;
    gamePiece.newPos();
    // if it collides, move it back
    if (collidesWithMushrooms(gamePiece)) {
      gamePiece.speedX = gamePieceSpeed;
      gamePiece.speedY = -gamePieceSpeed;
      gamePiece.newPos();
    }
    return;
  }
  // left
  if (gameArea.keys && gameArea.keys[65] && gamePiece.getLeft() > 0) {
    // move it
    gamePiece.speedX = -gamePieceSpeed;
    gamePiece.newPos();
    // if it collides, move it back
    if (collidesWithMushrooms(gamePiece)) {
      gamePiece.speedX = gamePieceSpeed;
      gamePiece.newPos();
    }
    return;
  }
  // right
  if (gameArea.keys && gameArea.keys[68] && gamePiece.getRight() < canvasWidth) {
    // move it
    gamePiece.speedX = gamePieceSpeed;
    gamePiece.newPos();
    // if it collides, move it back
    if (collidesWithMushrooms(gamePiece)) {
      gamePiece.speedX = -gamePieceSpeed;
      gamePiece.newPos();
    }
    return;
  }
  // up
  if (gameArea.keys && gameArea.keys[87] && gamePiece.getTop() > gamePieceTopLimit) {
    // move it
    gamePiece.speedY = -gamePieceSpeed;
    gamePiece.newPos();
    // if it collides, move it back
    if (collidesWithMushrooms(gamePiece)) {
      gamePiece.speedY = gamePieceSpeed;
      gamePiece.newPos();
    }
    return;
  }
  // down
  if (gameArea.keys && gameArea.keys[83] && gamePiece.getBottom() < gameArea.canvas.height) {
    // move it
    gamePiece.speedY = gamePieceSpeed;
    gamePiece.newPos();
    // if it collides, move it back
    if (collidesWithMushrooms(gamePiece)) {
      gamePiece.speedY = -gamePieceSpeed;
      gamePiece.newPos();
    }
    return;
  }
}
