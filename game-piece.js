/*jslint white: true */

/* Game Piece */
/***********************************/

var gamePiece;
var gamePieceSpeed = 5;
var gamePieceWidth = 30;
var gamePieceHeight = 30;
var gamePieceStartX = (canvasWidth - gamePieceWidth) / 2;
var gamePieceStartY = canvasHeight * 0.9;
// - (gamePieceHeight / 2)

function manageGamePiece() {
  moveGamePiece();
  updateGamePiece();
}

function updateGamePiece() {
  gamePiece.newPos();
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
  // left
  if (gameArea.keys && gameArea.keys[65] && gamePiece.getLeft() > 0) {
    gamePiece.speedX = -gamePieceSpeed;
  }
  // right
  if (gameArea.keys && gameArea.keys[68] && gamePiece.getRight() < canvasWidth) {
    gamePiece.speedX = gamePieceSpeed;
  }
  // up
  if (gameArea.keys && gameArea.keys[87] && gamePiece.getTop() > gamePieceTopLimit) {
    gamePiece.speedY = -gamePieceSpeed;
  }
  // down
  if (gameArea.keys && gameArea.keys[83] && gamePiece.getBottom() < canvasHeight) {
    gamePiece.speedY = gamePieceSpeed;
  }
}
