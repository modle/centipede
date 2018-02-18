/*jslint white: true */

/* Game Piece */
/***********************************/

var gamePieceHandler = {
  gamePiece : new component(knobsAndLevers.gamePieceWidth, knobsAndLevers.gamePieceHeight, "red", knobsAndLevers.gamePieceStartX, knobsAndLevers.gamePieceStartY, 0, 0),
  manage : function() {
    this.move();
    this.update();
  },
  update : function() {
    this.gamePiece.update();
  },
  reset : function() {
    this.gamePiece.x = knobsAndLevers.gamePieceStartX;
    this.gamePiece.y = knobsAndLevers.gamePieceStartY;
  },
  move : function() {
    let gamePiece = this.gamePiece;
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
    let gamePieceSpeed = knobsAndLevers.gamePieceSpeed;
    // stop game piece from going beyond boundaries (bottom 20% of screen only)
    // move game piece
    // FIXME: abstract this better
    // up right
    if (gameArea.keys && gameArea.keys[87] && gamePiece.getTop() > gameArea.gamePieceTopLimit && gameArea.keys[68] && gamePiece.getRight() < gameArea.canvas.width) {
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
    if (gameArea.keys && gameArea.keys[87] && gamePiece.getTop() > gameArea.gamePieceTopLimit && gameArea.keys[65] && gamePiece.getLeft() > 0) {
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
    if (gameArea.keys && gameArea.keys[83] && gamePiece.getBottom() < gameArea.canvas.height && gameArea.keys[68] && gamePiece.getRight() < gameArea.canvas.width) {
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
    if (gameArea.keys && gameArea.keys[68] && gamePiece.getRight() < gameArea.canvas.width) {
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
    if (gameArea.keys && gameArea.keys[87] && gamePiece.getTop() > gameArea.gamePieceTopLimit) {
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
}
