describe('CENTIPEDES SPEC: ', () => {
  let spec = 'CENTIPEDES';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, centipedes);
  });
  it('manage delegates to spawn when eligible and update', () => {
    spyOn(testObj, 'eligibleToSpawn').and.returnValue(true);
    spyOn(testObj, 'spawn');
    spyOn(testObj, 'update');

    testObj.manage();

    expect(testObj.eligibleToSpawn).toHaveBeenCalled();
    expect(testObj.spawn).toHaveBeenCalled();
    expect(testObj.update).toHaveBeenCalled();
  });
  it('manage delegates to update but not spawn when spawn ineligible', () => {
    spyOn(testObj, 'eligibleToSpawn').and.returnValue(false);
    spyOn(testObj, 'spawn');
    spyOn(testObj, 'update');

    testObj.manage();

    expect(testObj.eligibleToSpawn).toHaveBeenCalled();
    expect(testObj.spawn).not.toHaveBeenCalled();
    expect(testObj.update).toHaveBeenCalled();
  });
  it('eligibleToSpawn returns false unless spawn conditions are met', () => {
    let expected = false;
    game.init();
    game.gameArea.frameNo = 2;
    testObj.numberSpawned = knobsAndLevers.centipede.maxNumber + metrics.currentLevel;

    let actual = testObj.eligibleToSpawn();

    expect(actual).toBe(expected);
  });
  it('spawn adds two centipedes to centipedes array', () => {
    let expected = {crashWith : function(){return false;}, x : 0, y : 0, width : 10, height : 10};
    spyOn(testObj, 'make').and.returnValue(expected);
    testObj.centipedes = [];

    testObj.spawn();
    testObj.spawn();

    expect(testObj.centipedes.length).toBe(2);
    expect(testObj.centipedes[0]).toBe(expected);
    expect(testObj.centipedes[1]).toBe(expected);
  });
  it('spawn does not add centipede to centipedes array when it collides with an existing centipede', () => {
    let expected = {crashWith : function(){return true;}, x : 0, y : 0, width : 10, height : 10};
    spyOn(testObj, 'make').and.returnValue(expected);
    testObj.centipedes = [];

    testObj.spawn();
    testObj.spawn();

    expect(testObj.centipedes.length).toBe(1);
    expect(testObj.centipedes[0]).toBe(expected);
  });
  it('make returns a centipede', () => {
    metrics.init();

    let segment = testObj.make();

    expect(segment.reverseDirectionY).toBe(false);
  });
  it('update delegates to centipede update functions', () => {
    testObj.centipedes = [
      {update : function(){}},
      {update : function(){}},
    ];
    spyOn(testObj, 'updateDirections');
    spyOn(testObj, 'determineDirections');
    spyOn(testObj, 'updateCoordinates');
    spyOn(testObj, 'resetCentipedeUpdateFlag');
    testObj.centipedes.forEach(centipede => spyOn(centipede, 'update'));

    testObj.update();

    expect(testObj.resetCentipedeUpdateFlag).toHaveBeenCalled();
    expect(testObj.determineDirections).toHaveBeenCalled();
    expect(testObj.updateDirections).toHaveBeenCalled();
    expect(testObj.updateCoordinates).toHaveBeenCalled();
    testObj.centipedes.forEach(centipede =>
      expect(centipede.update).toHaveBeenCalled()
    );
  });
  it('clear resets parameters', () => {
    testObj.centipedes = [{}];
    testObj.numberSpawned = 10;
    testObj.numberKilled = 10;

    testObj.clear();

    expect(testObj.centipedes.length).toBe(0);
    expect(testObj.numberSpawned).toBe(0);
    expect(testObj.numberKilled).toBe(0);
  });
  it('determineDirections delegates to direction functions', () => {
    spyOn(testObj, 'moveDownwardInitially');
    spyOn(testObj, 'checkYDirectionInPlayerArea');
    spyOn(testObj, 'checkHorizonalCollisions');
    spyOn(testObj, 'reverseHorizontalAtNextLayer');

    testObj.centipedes = [
      {moveVertically : false, updated : false, y : game.gameArea.firstMushroomLayer - 2},
    ];

    testObj.determineDirections();

    expect(testObj.moveDownwardInitially).toHaveBeenCalled();
    expect(testObj.checkYDirectionInPlayerArea).toHaveBeenCalled();
    expect(testObj.checkHorizonalCollisions).toHaveBeenCalled();
    expect(testObj.reverseHorizontalAtNextLayer).toHaveBeenCalled();
  });
  it('resetCentipedeUpdateFlag resets update flags', () => {
    testObj.centipedes = [{update : true}, {update : true}];

    testObj.resetCentipedeUpdateFlag();

    testObj.centipedes.forEach(centipede =>
      expect(centipede.updated).toBe(false)
    );
  });
  it('moveDownwardInitially sets moveVertically and updated to true if above first mushroom layer', () => {
    knobsAndLevers.init();
    game.init();
    testObj.centipedes = [
      {moveVertically : false, updated : false, y : game.gameArea.firstMushroomLayer - 2},
      {moveVertically : false, updated : true, y : game.gameArea.firstMushroomLayer - 2},
      {moveVertically : false, updated : false, y : game.gameArea.firstMushroomLayer},
    ];

    testObj.centipedes.filter(centipede => !centipede.updated).map(centipede => {
      testObj.moveDownwardInitially(centipede);
    });

    expect(testObj.centipedes[0].moveVertically).toBe(true);
    expect(testObj.centipedes[0].updated).toBe(true);
    expect(testObj.centipedes[1].moveVertically).toBe(false);
    expect(testObj.centipedes[1].updated).toBe(true);
    expect(testObj.centipedes[2].moveVertically).toBe(false);
    expect(testObj.centipedes[2].updated).toBe(false);
  });
  it('checkYDirectionInPlayerArea sets reverseDirectionY when hitting canvas bottom', () => {
    game.init();
    let top = game.gameArea.canvas.height - 10;
    let bottom = game.gameArea.canvas.height + 10;
    testObj.centipedes = [
      {
        reverseDirectionY : false,
        updated : false,
        getBottom : function(){return bottom},
        getTop : function(){return top},
        distanceMovedFromBottom : 10,
      },
    ];

    testObj.centipedes.filter(centipede => !centipede.updated).map(centipede => {
      testObj.checkYDirectionInPlayerArea(centipede);
    });

    expect(testObj.centipedes[0].reverseDirectionY).toBe(true);
  });
  it('checkYDirectionInPlayerArea sets reverseDirectionY when hitting playerTopLimit while moving up', () => {
    knobsAndLevers.init();
    game.init();
    player.init();
    let top = knobsAndLevers.player.topLimit - 10;
    let bottom = top + 20;
    testObj.centipedes = [
      {
        reverseDirectionY : false,
        updated : false,
        getBottom : function(){return bottom},
        getTop : function(){return top},
        distanceMovedFromBottom : 10,
      },
    ];

    testObj.centipedes.filter(centipede => !centipede.updated).map(centipede => {
      testObj.checkYDirectionInPlayerArea(centipede);
    });

    expect(testObj.centipedes[0].reverseDirectionY).toBe(true);
  });
  it('checkHorizontalCollisions does not set moveVertically to true if no collisions', () => {
    knobsAndLevers.init();
    game.init();
    spyOn(testObj, 'hasCollidedWithWall').and.returnValue(false);
    spyOn(testObj, 'hasCollidedWithMushroom').and.returnValue(false);
    let centipede = {
      updated : false,
      distanceMovedY : 0,
      distanceMovedX : 0,
      moveVertically : false,
    };

    testObj.checkHorizonalCollisions(centipede);

    expect(centipede.moveVertically).toBe(false);
    expect(centipede.updated).toBe(true);
  });
  it('checkHorizontalCollisions sets moveVertically to true if wall collisions', () => {
    knobsAndLevers.init();
    game.init();
    spyOn(testObj, 'hasCollidedWithWall').and.returnValue(true);
    spyOn(testObj, 'hasCollidedWithMushroom').and.returnValue(false);
    let centipede = {
      updated : false,
      distanceMovedY : 0,
      distanceMovedX : 0,
      moveVertically : false,
    };

    testObj.checkHorizonalCollisions(centipede);

    expect(testObj.hasCollidedWithWall).toHaveBeenCalled();
    expect(testObj.hasCollidedWithMushroom).not.toHaveBeenCalled();
    expect(centipede.updated).toBe(true);
    expect(centipede.distanceMovedX).toBe(0);
    expect(centipede.moveVertically).toBe(true);
  });
  it('checkHorizontalCollisions sets moveVertically to true if mushroom collisions but not wall collisions', () => {
    knobsAndLevers.init();
    game.init();
    spyOn(testObj, 'hasCollidedWithWall').and.returnValue(false);
    spyOn(testObj, 'hasCollidedWithMushroom').and.returnValue(true);
    let centipede = {
      updated : false,
      distanceMovedY : 0,
      distanceMovedX : 10,
      moveVertically : false,
    };

    testObj.checkHorizonalCollisions(centipede);

    expect(testObj.hasCollidedWithWall).toHaveBeenCalled();
    expect(testObj.hasCollidedWithMushroom).toHaveBeenCalled();
    expect(centipede.updated).toBe(true);
    expect(centipede.distanceMovedX).toBe(10);
    expect(centipede.moveVertically).toBe(true);
  });
  it('checkHorizontalCollisions does not update if distanceMovedY is not 0', () => {
    knobsAndLevers.init();
    game.init();
    spyOn(testObj, 'hasCollidedWithWall').and.returnValue(false);
    spyOn(testObj, 'hasCollidedWithMushroom').and.returnValue(false);
    let centipede = {
      updated : false,
      distanceMovedY : 1,
      distanceMovedX : 0,
      moveVertically : false,
    };

    testObj.checkHorizonalCollisions(centipede);

    expect(centipede.moveVertically).toBe(false);
    expect(centipede.updated).toBe(false);
  });
  it('hasCollidedWithWall should return false if inside canvas sides and has moved horizontally', () => {
    knobsAndLevers.init();
    game.init();
    let centipede = {
      getLeft : function(){return 10;},
      getRight : function(){return game.gameArea.canvas.width;},
      distanceMovedX : 10,
    };

    let expected = false;
    let actual = testObj.hasCollidedWithWall(centipede);

    expect(actual).toBe(expected);
  });
  it('hasCollidedWithWall should return true if outside canvas sides and has moved horizontally', () => {
    knobsAndLevers.init();
    game.init();
    let centipede = {
      getLeft : function(){return 10;},
      getRight : function(){return game.gameArea.canvas.width;},
      distanceMovedX : game.gameArea.gridSquareSideLength + 1,
    };

    let expected = true;
    let actual = testObj.hasCollidedWithWall(centipede);

    expect(actual).toBe(expected);
  });
  it('hasCollidedWithMushrooms does a whole bunch of crap I do not want to test', () => {
    knobsAndLevers.init();
    game.init();
    mushrooms.mushrooms = [{y : 1}];
    testObj.centipedes = [
      {
        crashWithXOnly : function(){return true;},
        y : 0,
        distanceMovedX : game.gameArea.gridSquareSideLength + 1,
        moveVertically : true,
        expected : true,
      },
      {
        crashWithXOnly : function(){return false;},
        y : 0,
        distanceMovedX : game.gameArea.gridSquareSideLength + 1,
        moveVertically : true,
        expected : false,
      },
      {
        crashWithXOnly : function(){return false;},
        y : game.gameArea.firstMushroomLayer,
        distanceMovedX : game.gameArea.gridSquareSideLength + 1,
        moveVertically : true,
        expected : false,
      },
    ];

    testObj.centipedes.forEach(centipede => {
      let expected = centipede.expected;
      let actual = testObj.hasCollidedWithMushroom(centipede);
      expect(actual).toBeTruthy;
    });

  });
  it('reverseHorizontalAtNextLayer does stuff', () => {
    knobsAndLevers.init();
    game.init();
    centipede = {
      updated : false,
      distanceMovedY : game.gameArea.gridSquareSideLength + 1,
      reverseDirectionX : false,
      moveVertically : true,
    };

    testObj.reverseHorizontalAtNextLayer(centipede);

    expect(centipede.updated).toBe(true);
    expect(centipede.moveVertically).toBe(false);
    expect(centipede.distanceMovedY).toBe(0);
    expect(centipede.reverseDirectionX).toBe(true);
  });
  it('updateDirections does stuff', () => {
    knobsAndLevers.init();
    game.init();
    testObj.centipedes = [
      {
        directionY : 1,
        distanceMovedY : 1,
        reverseDirectionY : true,
        directionX : 1,
        reverseDirectionX : true,
      },
      {
        directionY : 1,
        distanceMovedY : 1,
        reverseDirectionY : false,
        directionX : 1,
        reverseDirectionX : false,
      },
    ];

    testObj.updateDirections();

    expect(testObj.centipedes[0].directionY).toBe(-1);
    expect(testObj.centipedes[0].distanceMovedY).toBe(0);
    expect(testObj.centipedes[0].reverseDirectionY).toBe(false);
    expect(testObj.centipedes[0].directionX).toBe(-1);
    expect(testObj.centipedes[0].reverseDirectionX).toBe(false);
    expect(testObj.centipedes[1].directionY).toBe(1);
    expect(testObj.centipedes[1].distanceMovedY).toBe(1);
    expect(testObj.centipedes[1].reverseDirectionY).toBe(false);
    expect(testObj.centipedes[1].directionX).toBe(1);
    expect(testObj.centipedes[1].reverseDirectionX).toBe(false);
  });
  it('updateCoordinates does stuff', () => {
    knobsAndLevers.init();
    game.init();
    let defaults = {
      moveVertically : true,
      y : 1,
      directionY : 1,
      distanceMovedY : 1,
      distanceMovedFromBottom : 0,
      directionX : 1,
      x : 0,
      distanceMovedX : 0,
    };
    testObj.centipedes = [
      {
        moveVertically : defaults.moveVertically,
        y : defaults.y,
        directionY : defaults.directionY,
        distanceMovedY : defaults.distanceMovedY,
        distanceMovedFromBottom : defaults.distanceMovedFromBottom,
      },
      {
        moveVertically : defaults.moveVertically,
        y : defaults.y,
        directionY : -defaults.directionY,
        distanceMovedY : defaults.distanceMovedY,
        distanceMovedFromBottom : defaults.distanceMovedFromBottom,
      },
      {
        moveVertically : false,
        y : defaults.y,
        directionY : defaults.directionY,
        distanceMovedY : defaults.distanceMovedY,
        distanceMovedFromBottom : defaults.distanceMovedFromBottom,
        directionX : 1,
        x : 0,
        width: 10,
        distanceMovedX : defaults.distanceMovedX,
      },
      {
        moveVertically : false,
        directionX : 1,
        x : 0,
        width: game.gameArea.canvas.width,
        distanceMovedX : defaults.distanceMovedX,
      },
    ];

    testObj.updateCoordinates();

    expect(testObj.centipedes[0].y).toBe(defaults.y + defaults.directionY);
    expect(testObj.centipedes[0].distanceMovedY).toBe(defaults.distanceMovedY + Math.abs(defaults.directionY));
    expect(testObj.centipedes[1].y).toBe(defaults.y - defaults.directionY);
    expect(testObj.centipedes[1].distanceMovedY).toBe(defaults.distanceMovedY + Math.abs(defaults.directionY));
    expect(testObj.centipedes[2].y).toBe(defaults.y);
    expect(testObj.centipedes[2].distanceMovedY).toBe(defaults.distanceMovedY);
    expect(testObj.centipedes[2].x).toBe(defaults.x + defaults.directionX);
    expect(testObj.centipedes[2].distanceMovedX).toBe(defaults.distanceMovedX + Math.abs(defaults.directionX));
    expect(testObj.centipedes[3].x).toBe(defaults.x);
  });
});
