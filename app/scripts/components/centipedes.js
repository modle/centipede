/*jslint white: true */
var centipedes = {
  speed : 0,
  centipedes : [],
  numberSpawned : 0,
  numberKilled : 0,
  manage : function() {
    if (game.gameArea.frameNo == 1 || supporting.everyinterval(game.gameArea.frameNo, knobsAndLevers.centipede.interval)) {
      this.spawn();
    }
    this.update();
  },
  spawn : function() {
    if (this.numberSpawned >= knobsAndLevers.centipede.maxNumber + metrics.currentLevel) {
      return;
    }
    centipede = this.construct();
    for (i = 0; i < this.centipedes.length; i += 1) {
      if (this.centipedes[i].crashWith(centipede)) {
        return;
      }
    }
    this.add(centipede);
  },
  construct : function() {
    centipede = new Component(knobsAndLevers.centipede.args);
    centipede.directionX = 1;
    centipede.directionY = 1;
    centipede.distanceMovedX = 0;
    centipede.distanceMovedY = 0;
    centipede.distanceMovedFromBottom = 0;
    centipede.reverseDirectionX = false;
    centipede.reverseDirectionY = false;
    centipede.moveVertically = true;
    centipede.pointValue = 5 + metrics.currentLevel;
    centipede.hitPoints = 1;
    centipede.updated = false;
    return centipede;
  },
  add : function(centipede) {
    this.centipedes.push(centipede);
    this.numberSpawned++;
  },
  update : function() {
    this.speed = knobsAndLevers.centipede.baseSpeed + metrics.currentLevel;
    this.determineDirections();
    this.updateDirections();
    this.updateCoordinates();
    for (i = 0; i < this.centipedes.length; i += 1) {
      this.centipedes[i].update();
    }
  },
  clear : function() {
    this.centipedes = [];
    this.numberSpawned = 0;
    this.numberKilled = 0;
  },
  determineDirections : function() {
    this.resetCentipedeUpdateFlag();
    this.moveDownwardInitially();
    this.checkYDirectionInPlayerArea();
    this.checkHorizonalCollisions();
    this.reverseHorizontalAtNextLayer();
  },
  resetCentipedeUpdateFlag : function() {
    this.centipedes.map(centipede => centipede.updated = false);
  },
  moveDownwardInitially : function() {
    this.centipedes.filter(centipede => !centipede.updated).map(centipede => {
      if (centipede.y < game.gameArea.firstMushroomLayer - 1) {
        centipede.moveVertically = true;
        centipede.updated = true;
      }
    });
  },
  checkYDirectionInPlayerArea : function() {
    this.centipedes.filter(centipede => !centipede.updated).map(centipede => {
      // toggle Y direction if centipede hits bottom or moves back out of the player area
      if (centipede.getBottom() > game.gameArea.canvas.height) {
        centipede.reverseDirectionY = true;
      }
      if (centipede.getTop() < game.gameArea.gamePieceTopLimit && centipede.distanceMovedFromBottom > 0) {
        centipede.reverseDirectionY = true;
        centipede.distanceMovedFromBottom = 0;
      }
    });
  },
  checkHorizonalCollisions : function() {
    this.centipedes.filter(centipede => !centipede.updated).map(centipede => {
      if (centipede.distanceMovedY === 0) {
        if (centipedes.hasCollidedWithWall(centipede)) {
          centipede.distanceMovedX = 0;
          centipede.moveVertically = true;
        }
        if (centipedes.hasCollidedWithMushroom(centipede)) {
          centipede.moveVertically = true;
        }
        centipede.updated = true;
      }
    });
  },
  hasCollidedWithWall : function(centipede) {
    return (
      (centipede.getLeft() <= 1 || centipede.getRight() >= game.gameArea.canvas.width - 1)
      &&
      centipede.distanceMovedX > game.gameArea.gridSquareSideLength
    );
  },
  hasCollidedWithMushroom : function(centipede) {
    for (j = 0; j < mushrooms.mushrooms.length; j += 1) {
      if (
        centipede.crashWithSidesOnly(mushrooms.mushrooms[j])
        && Math.abs(centipede.y - mushrooms.mushrooms[j].y) < 5
        && centipede.distanceMovedX > game.gameArea.gridSquareSideLength
      ) {
        this.centipedes.filter(centipede => !centipede. updated).map(centipede => {
          if (centipede.y < game.gameArea.firstMushroomLayer - 1) {
            centipede.moveVertically = true;
            centipede.updated = true;
          }
          this.reverseHorizontalAtNextLayer();
        });
        return true;
      }
    }
    return false;
  },
  reverseHorizontalAtNextLayer : function() {
    this.centipedes.filter(centipede => !centipede.updated).map(centipede => {
      if (centipede.distanceMovedY >= game.gameArea.gridSquareSideLength) {
        centipede.reverseDirectionX = true;
        centipede.moveVertically = false;
        centipede.distanceMovedY = 0;
        centipede.updated = true;
      }
    });
  },
  updateDirections : function() {
    for (i = 0; i < this.centipedes.length; i += 1) {
      if (this.centipedes[i].reverseDirectionY) {
        this.centipedes[i].directionY *= -1;
        this.centipedes[i].distanceMovedY = 0;
        this.centipedes[i].reverseDirectionY = false;
      }
      if (this.centipedes[i].reverseDirectionX) {
        this.centipedes[i].directionX *= -1;
        this.centipedes[i].reverseDirectionX = false;
      }
    }
  },
  updateCoordinates : function() {
    for (i = 0; i < this.centipedes.length; i += 1) {
      if (this.centipedes[i].moveVertically) {
        this.centipedes[i].y += this.centipedes[i].directionY;
        this.centipedes[i].distanceMovedY += Math.abs(this.centipedes[i].directionY);
        if (this.centipedes[i].directionY === -1) {
          this.centipedes[i].distanceMovedFromBottom += Math.abs(this.centipedes[i].directionY);
        }
      } else {
        toMoveX = this.centipedes[i].directionX;
        newPositionX = this.centipedes[i].x + toMoveX;
        if (newPositionX + this.centipedes[i].width < game.gameArea.canvas.width && newPositionX > 0) {
          this.centipedes[i].x = newPositionX;
          this.centipedes[i].distanceMovedX += Math.abs(toMoveX);
        }
      }
    }
  }
}
