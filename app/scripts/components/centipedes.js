/*jslint white: true */
var centipedes = {
  // TODO rename this to segments?
  centipedes : [],
  numberSpawned : 0,
  numberKilled : 0,
  spawnPoints : 1,
  manage : function() {
    if (game.levelIsOver()) {
      this.buildCentipedeStructure();
      this.determineHorizontalPosition();
    };
    if (this.eligibleToSpawn()) {
      this.spawn();
    };
    this.update();
  },
  buildCentipedeStructure : function() {
    let tier = knobsAndLevers.game.tier;
    this.segments = tier + knobsAndLevers.centipede.maxNumber;
  },
  eligibleToSpawn : function() {
    // console.log('tier', knobsAndLevers.game.tier, 'segments', this.segments, 'numberSpawned', this.numberSpawned);
    let eligible =
      game.gameArea.frameNo == 1
        || this.numberSpawned < this.segments;
    return eligible;
  },
  determineHorizontalPosition : function() {
    let baseRange = game.gameArea.canvas.width;
    knobsAndLevers.centipede.args.x = supporting.getRandom(baseRange * 0.2, baseRange * 0.8);
  },
  spawn : function() {
    let centipede = this.make();
    for (i = 0; i < this.centipedes.length; i += 1) {
      if (this.centipedes[i].crashWith(centipede)) {
        return;
      };
    };
    this.add(centipede);
  },
  make : function() {
    centipede = new Component(knobsAndLevers.centipede.args);
    centipede.directionX = 1;
    centipede.directionY = 1;
    centipede.distanceMovedX = 0;
    centipede.distanceMovedY = 0;
    centipede.distanceMovedFromBottom = 0;
    centipede.reverseDirectionX = false;
    centipede.reverseDirectionY = false;
    centipede.moveVertically = true;
    let pointValue = knobsAndLevers.centipede.pointValue;
    centipede.pointValue = supporting.getRandom(pointValue, pointValue + 20);
    centipede.hitPoints = 1;
    centipede.updated = false;
    return centipede;
  },
  add : function(centipede) {
    this.centipedes.push(centipede);
    this.numberSpawned++;
  },
  update : function() {
    this.resetCentipedeUpdateFlag();
    this.determineDirections();
    this.updateDirections();
    this.updateCoordinates();
    for (i = 0; i < this.centipedes.length; i += 1) {
      this.centipedes[i].update();
    };
  },
  clear : function() {
    this.centipedes = [];
    this.numberSpawned = 0;
    this.numberKilled = 0;
  },
  determineDirections : function() {
    this.centipedes.filter(centipede => !centipede.updated).map(centipede => {
      this.moveDownwardInitially(centipede);
      this.checkYDirectionInPlayerArea(centipede);
      this.checkHorizonalCollisions(centipede);
      this.reverseHorizontalAtNextLayer(centipede);
    });
  },
  resetCentipedeUpdateFlag : function() {
    this.centipedes.map(centipede => centipede.updated = false);
  },
  moveDownwardInitially : function(centipede) {
    if (centipede.y < game.gameArea.firstMushroomLayer - 1) {
      centipede.moveVertically = true;
      centipede.updated = true;
    };
  },
  checkYDirectionInPlayerArea : function(centipede) {
    if (centipede.getBottom() > game.gameArea.canvas.height) {
      centipede.reverseDirectionY = true;
    } else if (centipede.getTop() < player.topLimit && centipede.distanceMovedFromBottom > 0) {
      centipede.reverseDirectionY = true;
      centipede.distanceMovedFromBottom = 0;
    };
  },
  checkHorizonalCollisions : function(centipede) {
    if (centipede.distanceMovedY === 0) {
      if (this.hasCollidedWithWall(centipede)) {
        centipede.distanceMovedX = 0;
        centipede.moveVertically = true;
      } else if (this.hasCollidedWithMushroom(centipede)) {
        centipede.moveVertically = true;
      };
      centipede.updated = true;
    }
  },
  hasCollidedWithWall : function(centipede) {
    let isOutside = centipede.getLeft() <= 1
          || centipede.getRight() >= game.gameArea.canvas.width - 1;
    let hasMovedEnoughHorizontally = centipede.distanceMovedX > game.gameArea.gridSquareSideLength;
    let hasCollided = isOutside && hasMovedEnoughHorizontally;
    return hasCollided;
  },
  hasCollidedWithMushroom : function(centipede) {
    for (j = 0; j < mushrooms.mushrooms.length; j += 1) {
      if (
        centipede.crashWithSidesOnly(mushrooms.mushrooms[j])
        && Math.abs(centipede.y - mushrooms.mushrooms[j].y) < 5
        && centipede.distanceMovedX > game.gameArea.gridSquareSideLength
      ) {
        this.centipedes.filter(centipede => !centipede.updated).map(centipede => {
          if (centipede.y < game.gameArea.firstMushroomLayer - 1) {
            centipede.moveVertically = true;
            centipede.updated = true;
          };
          this.reverseHorizontalAtNextLayer(centipede);
        });
        return true;
      };
    };
    return false;
  },
  reverseHorizontalAtNextLayer : function(centipede) {
    if (centipede.distanceMovedY >= game.gameArea.gridSquareSideLength) {
      centipede.reverseDirectionX = true;
      centipede.moveVertically = false;
      centipede.distanceMovedY = 0;
      centipede.updated = true;
    };
  },
  updateDirections : function() {
    for (i = 0; i < this.centipedes.length; i += 1) {
      if (this.centipedes[i].reverseDirectionY) {
        this.centipedes[i].directionY *= -1;
        this.centipedes[i].distanceMovedY = 0;
        this.centipedes[i].reverseDirectionY = false;
      };
      if (this.centipedes[i].reverseDirectionX) {
        this.centipedes[i].directionX *= -1;
        this.centipedes[i].reverseDirectionX = false;
      };
    };
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
        };
      };
    };
  },
};
