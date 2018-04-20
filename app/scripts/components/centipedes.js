/*jslint white: true */
var centipedes = {
  // TODO rename this to segments?
  centipedes : [],
  positions : [],
  numberSpawned : 0,
  numberKilled : 0,
  spawnPoints : 1,
  manage : function() {
    this.spawn();
    this.update();
  },
  spawn : function() {
    // TODO this is pretty complicated
    this.determineSpawnPositions();
    if (!this.eligibleToSpawn()) {
      return;
    };
    this.setXPosition();
    let centipede = this.make();
    if (this.cannotAdd(centipede)) {
      return;
    };
    this.add(centipede);
  },
  determineSpawnPositions : function() {
    if (!game.levelIsOver()) {
      return;
    };
    this.buildCentipedeStructure();
  },
  buildCentipedeStructure : function() {
    let tier = knobsAndLevers.game.tier ? knobsAndLevers.game.tier : 1;
    this.segments = tier + knobsAndLevers.centipede.maxNumber;
    this.positions = [];
    let maxTier = knobsAndLevers.game.maxTier;
    let upperLimit = tier < maxTier ? tier : maxTier;
    while (this.positions.length < upperLimit) {
      this.positions.push(this.determineHorizontalPosition());
    };
  },
  determineHorizontalPosition : function() {
    let baseRange = game.gameArea.canvas.width;
    return supporting.getRandom(baseRange * 0.2, baseRange * 0.8);
  },
  eligibleToSpawn : function() {
    return this.numberSpawned < this.segments;
  },
  setXPosition : function() {
    knobsAndLevers.centipede.args.x = this.positions[this.centipedes.length % this.positions.length];
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
  cannotAdd : function(centipede) {
    for (i = 0; i < this.centipedes.length; i += 1) {
      if (this.centipedes[i].crashWith(centipede)) {
        return true;
      };
    };
    return false;
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
      centipede.poisoned = false;
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
    let theMushroom = this.getTheMushroom(centipede);
    if (theMushroom && theMushroom.poisoned) {
      centipede.poisoned = true;
      console.log('poisoned mushroom');
    };
    return theMushroom;
  },
  getTheMushroom : function(centipede) {
    return mushrooms.mushrooms.find(mushroom =>
      centipede.crashWith(mushroom)
        &&
      centipede.distanceMovedX > game.gameArea.gridSquareSideLength
    );
  },
  reverseHorizontalAtNextLayer : function(centipede) {
    if (centipede.distanceMovedY >= game.gameArea.gridSquareSideLength) {
      centipede.reverseDirectionX = true;
      centipede.moveVertically = false;
      centipede.distanceMovedY = 0;
      centipede.updated = true;
    };
    centipede.moveVertically = centipede.poisoned ? true : centipede.moveVertically;
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
