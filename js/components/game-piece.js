/*jslint white: true */
var gamePieceHandler = {
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
      if (collisions.withMushrooms(gamePiece)) {
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
      if (collisions.withMushrooms(gamePiece)) {
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
      if (collisions.withMushrooms(gamePiece)) {
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
      if (collisions.withMushrooms(gamePiece)) {
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
      if (collisions.withMushrooms(gamePiece)) {
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
      if (collisions.withMushrooms(gamePiece)) {
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
      if (collisions.withMushrooms(gamePiece)) {
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
      if (collisions.withMushrooms(gamePiece)) {
        gamePiece.speedY = -gamePieceSpeed;
        gamePiece.newPos();
      }
      return;
    }
  },
  initialize : function() {
    let gamePieceArgs = {
      width: knobsAndLevers.gamePieceWidth,
      height : knobsAndLevers.gamePieceHeight,
      color : "red",
      x : knobsAndLevers.gamePieceStartX,
      y : knobsAndLevers.gamePieceStartY,
      extraArgs : {type : "gamePiece", speed : {x : 0, y : 0}}
    };
    this.gamePiece = new component(gamePieceArgs);
  }
}

gamePieceHandler.initialize();
