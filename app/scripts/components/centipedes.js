/*jslint white: true */
var centipedes = {
  // TODO rename this to segments?
  centipedes : [],
  positions : [],
  numberSpawned : 0,
  numberKilled : 0,
  spawnPoints : 1,
  init : function() {
    Object.assign(this, gameObjectsBase);
    supporting.applyOverrides(this);
    console.log('centipedes initialized');
  },
  functionOverrides : {
    manage : function() {
      this.spawn();
      this.update();
    },
    spawn : function() {
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
    make : function() {
      let centipede = Object.assign(new Component(dials.centipede.args), dials.centipede.defaults);
      let pointValue = dials.centipede.pointValue;
      centipede.pointValue = supporting.getRandom(pointValue, pointValue + 20);
      centipede.sound = sounds.getSound('centipede');
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
  },
  determineSpawnPositions : function() {
    if (this.numberSpawned) {
      return;
    };
    this.buildCentipedeStructure();
  },
  buildCentipedeStructure : function() {
    let tier = dials.game.tier;
    this.segments = tier.current * 2 + dials.centipede.maxNumber;
    this.positions = [];
    let upperLimit = tier.isMaxed ? tier.max : tier.current;
    while (this.positions.length < supporting.getRandom(1, upperLimit)) {
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
    dials.centipede.args.x = this.positions[this.centipedes.length % this.positions.length];
  },
  cannotAdd : function(centipede) {
    return this.centipedes.find(checkCentipede => checkCentipede.crashWith(centipede));
  },
  determineDirections : function() {
    this.centipedes.filter(centipede => !centipede.updated).forEach(centipede => {
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
    if (centipede.y < game.gameArea.gridStart - 1) {
      centipede.moveVertically = true;
      centipede.updated = true;
    };
  },
  checkYDirectionInPlayerArea : function(centipede) {
    if (centipede.getBottom() > game.gameArea.canvas.height) {
      centipede.reverseDirectionY = true;
      centipede.poisoned = false;
    } else if (centipede.getTop() < dials.player.topLimit && centipede.distanceMovedFromBottom > 0) {
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
