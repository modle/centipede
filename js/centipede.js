/*jslint white: true */
var centipedeHandler = {
  baseSpeed : 0,
  speed : 0,
  interval : 10,
  maxNumber : 10,
  centipedes : [],
  numberSpawned : 0,
  numberKilled : 0,
  manage : function() {
    if (gameArea.frameNo == 1 || everyinterval(this.interval)) {
      this.spawn();
    }
    this.update();
  },
  update : function() {
    this.speed = this.baseSpeed + currentLevel;
    this.determineDirections();
    this.updateDirections();
    this.updateCoordinates();
    for (i = 0; i < this.centipedes.length; i += 1) {
      this.centipedes[i].update();
    }
  },
  spawn : function() {
    if (this.numberSpawned >= this.maxNumber + currentLevel) {
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
    x = gameArea.canvas.width / 2;
    y = 0;
    color = 'blue';
    type = 'centipede';
    centipede = new component(gameArea.gridSquareSideLength, gameArea.gridSquareSideLength, color, x, y, type);
    centipede.directionX = 1;
    centipede.directionY = 1;
    centipede.distanceMovedX = 0;
    centipede.distanceMovedY = 0;
    centipede.distanceMovedFromBottom = 0;
    centipede.reverseDirectionX = false;
    centipede.reverseDirectionY = false;
    centipede.moveVertically = true;
    centipede.pointValue = 5 + currentLevel;
    centipede.hitPoints = 1;
    return centipede;
  },
  add : function(centipede) {
    this.centipedes.push(centipede);
    this.numberSpawned++;
  },
  clear : function() {
    this.centipedes = [];
    this.numberSpawned = 0;
    this.numberKilled = 0;
  },
  determineDirections : function() {
    for (i = 0; i < this.centipedes.length; i += 1) {
      // move down after start until specified layer
      if (this.centipedes[i].y < gameArea.firstMushroomLayer - 1) {
        this.centipedes[i].moveVertically = true;
        continue;
      }
      // toggle Y direction if distanceMovedFromBottom is 0 and centipede.bottom > gameArea.canvas.height
      if (this.centipedes[i].getBottom() > gameArea.canvas.height) {
        this.centipedes[i].reverseDirectionY = true;
      }
      // toggle Y direction if centipede is above gameArea.gamePieceTopLimit and distanceMovedFromBottom > 0
      // reset distanceMovedFromBottom so this only triggers once
      if (this.centipedes[i].getTop() < gameArea.gamePieceTopLimit && this.centipedes[i].distanceMovedFromBottom > 0) {
        this.centipedes[i].reverseDirectionY = true;
        this.centipedes[i].distanceMovedFromBottom = 0;
      }
      // only check collisions once centipede has moved a certain distance
      if (this.centipedes[i].distanceMovedY === 0) {
        // check collision with walls
        if (centipedeHandler.hasCollidedWithWall(this.centipedes[i])) {
          this.centipedes[i].distanceMovedX = 0;
          this.centipedes[i].moveVertically = true;
          continue;
        }
        if (centipedeHandler.hasCollidedWithMushroom(this.centipedes[i])) {
          this.centipedes[i].moveVertically = true;
          continue;
        }
        continue;
      }
      // keep moving down until desired amount of pixels
      if (this.centipedes[i].distanceMovedY < gameArea.gridSquareSideLength) {
        this.centipedes[i].moveVertically = true;
        continue;
      }
      // only reverse horizontally if all other conditions are false
      if (this.centipedes[i].distanceMovedY >= gameArea.gridSquareSideLength) {
        this.centipedes[i].reverseDirectionX = true;
        this.centipedes[i].moveVertically = false;
        this.centipedes[i].distanceMovedY = 0;
      }
    }
  },
  hasCollidedWithWall : function(centipede) {
    return ((centipede.getLeft() < 1 || centipede.getRight() > gameArea.canvas.width - 1) && centipede.distanceMovedX > gameArea.gridSquareSideLength);
  },
  hasCollidedWithMushroom : function(centipede) {
    for (j = 0; j < mushroomHandler.mushrooms.length; j += 1) {
      if (centipede.crashWithSidesOnly(mushroomHandler.mushrooms[j]) && Math.abs(centipede.y - mushroomHandler.mushrooms[j].y) < 5 && centipede.distanceMovedX > gameArea.gridSquareSideLength) {
        return true;
      }
    }
    return false;
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
      // if moving vertically, don't move horizontally
      if (this.centipedes[i].moveVertically) {
        this.centipedes[i].y += this.centipedes[i].directionY;
        this.centipedes[i].distanceMovedY += Math.abs(this.centipedes[i].directionY);
        if (this.centipedes[i].directionY === -1) {
          this.centipedes[i].distanceMovedFromBottom += Math.abs(this.centipedes[i].directionY);
        }
      } else {
        toMoveX = this.centipedes[i].directionX;
        newPositionX = this.centipedes[i].x + toMoveX;
        // if updating x would put the centipede outside the gameArea, don't update the x position, instead flag moveVertically
        if (newPositionX < gameArea.canvas.width && newPositionX > 0) {
          this.centipedes[i].x = newPositionX;
          this.centipedes[i].distanceMovedX += Math.abs(toMoveX);
        } else {
          this.centipedes[i].moveVertically = true;
        }
      }
    }
  }
}
