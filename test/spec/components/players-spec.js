describe('PLAYER SPEC: ', () => {
  let spec = 'PLAYER';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, player);
  });
  it('init inits things', () => {
    spyOn(testObj, 'calculateStartingArea');

    testObj.init();

    expect(testObj.calculateStartingArea).toHaveBeenCalled();
    expect(testObj.gamePiece).toBeTruthy();
  });
  it('calculateStartingArea makes the starting area', () => {
    testObj.calculateStartingArea();

    expect(testObj.gamePieceStartingArea).toBeTruthy();
    expect(testObj.gamePieceStartingArea.color).toBe('orange');
  });
  it('manage calls move and update', () => {
    spyOn(testObj, 'move');
    spyOn(testObj, 'update');

    testObj.manage();

    expect(testObj.move).toHaveBeenCalled();
    expect(testObj.update).toHaveBeenCalled();
  });
  it('manage calls move and update', () => {
    testObj.init();
    spyOn(testObj.gamePiece, 'update');

    testObj.update();

    expect(testObj.gamePiece.update).toHaveBeenCalled();
  });
  it('reset resets position and calls removeMushroomsFromStartingArea', () => {
    testObj.init();
    let expected = {x : knobsAndLevers.gamePieceStartX, y : knobsAndLevers.gamePieceStartY};
    testObj.gamePiece.x = expected.x - 1;
    testObj.gamePiece.y = expected.y - 1;
    spyOn(testObj, 'removeMushroomsFromStartingArea');

    testObj.reset();

    expect(testObj.gamePiece.x = expected.x);
    expect(testObj.gamePiece.y = expected.y);
    expect(testObj.removeMushroomsFromStartingArea).toHaveBeenCalled();
  });
  it('removeMushroomsFromStartingArea is simple to test but probably belongs in mushrooms.js', () => {
    mushrooms.mushrooms = [{crashWith : function(){return false;}}];

    testObj.removeMushroomsFromStartingArea();

    expect(mushrooms.mushrooms.length).toBe(1);
  });
  it('move delegates to several functions', () => {
    spyOn(testObj, 'stop');
    spyOn(testObj, 'setBoundaries');
    spyOn(testObj, 'determineEligibleDirections');
    spyOn(testObj, 'moveTheThing');
    spyOn(controls, 'getPositionModifiers');

    testObj.move();

    expect(testObj.stop).toHaveBeenCalled();
    expect(testObj.setBoundaries).toHaveBeenCalled();
    expect(testObj.determineEligibleDirections).toHaveBeenCalled();
    expect(testObj.moveTheThing).toHaveBeenCalled();
    expect(controls.getPositionModifiers).toHaveBeenCalled();
  });
  it('stop sets gamePiece speedX and speedY to 0', () => {
    testObj.init();
    expected = {x : 0, y : 0};
    testObj.gamePiece.speedX = expected.x + 1;
    testObj.gamePiece.speedY = expected.y + 1;

    testObj.stop();

    expect(testObj.gamePiece.speedX).toBe(expected.x);
    expect(testObj.gamePiece.speedY).toBe(expected.y);
  });
  it('setBoundaries sets boundaries', () => {
    game.init();
    testObj.init();
    testObj.boundaries = {belowTop : undefined, insideRight : undefined, aboveBottom : undefined, insideLeft : undefined};
    spyOn(testObj.gamePiece, 'getTop').and.returnValue(0);
    spyOn(testObj.gamePiece, 'getRight').and.returnValue(game.gameArea.canvas.width);
    spyOn(testObj.gamePiece, 'getBottom').and.returnValue(game.gameArea.canvas.height);
    spyOn(testObj.gamePiece, 'getLeft').and.returnValue(-1);

    testObj.setBoundaries();

    expect(testObj.boundaries.belowTop).toBe(false);
    expect(testObj.boundaries.insideRight).toBe(false);
    expect(testObj.boundaries.aboveBottom).toBe(false);
    expect(testObj.boundaries.insideLeft).toBe(false);

    expect(testObj.gamePiece.getTop).toHaveBeenCalled();
    expect(testObj.gamePiece.getRight).toHaveBeenCalled();
    expect(testObj.gamePiece.getBottom).toHaveBeenCalled();
    expect(testObj.gamePiece.getLeft).toHaveBeenCalled();
  });
  it('determineEligibleDirections sets direction to ineligible of boundary is met', () => {
    testObj.init();

    testObj.boundaries.belowTop = false;
    testObj.boundaries.insideRight = true;
    testObj.boundaries.aboveBottom = true;
    testObj.boundaries.insideLeft = true;

    testObj.determineEligibleDirections();

    expect(testObj.eligibleDirections.up).toBe(false);
    expect(testObj.eligibleDirections.upRight).toBe(false);
    expect(testObj.eligibleDirections.right).toBe(true);
    expect(testObj.eligibleDirections.downRight).toBe(true);
    expect(testObj.eligibleDirections.down).toBe(true);
    expect(testObj.eligibleDirections.downLeft).toBe(true);
    expect(testObj.eligibleDirections.left).toBe(true);
    expect(testObj.eligibleDirections.upLeft).toBe(false);
  });
  it('setEligibleDirectionsToDefault sets all eligibleDirections to true', () => {
    testObj.init();
    testObj.setEligibleDirectionsToDefault();
    Object.keys(testObj.watchPositions).forEach(direction => {
      expect(testObj.eligibleDirections[direction]).toBe(true);
    });
  });
  it('moveTheThing moves the thing and leaves it there', () => {
    spyOn(testObj, 'updatePosition');
    spyOn(collisions, 'withMushrooms').and.returnValue(false);
    spyOn(testObj, 'revertPosition');

    defaultSpeed = {};

    testObj.moveTheThing(defaultSpeed);

    expect(testObj.updatePosition).toHaveBeenCalled();
    expect(collisions.withMushrooms).toHaveBeenCalled();
    expect(testObj.revertPosition).not.toHaveBeenCalled();
  });
  it('moveTheThing reverts position if collision with mushroom', () => {
    spyOn(testObj, 'updatePosition');
    spyOn(collisions, 'withMushrooms').and.returnValue(true);
    spyOn(testObj, 'revertPosition');

    defaultSpeed = {};

    testObj.moveTheThing(defaultSpeed);

    expect(testObj.updatePosition).toHaveBeenCalled();
    expect(collisions.withMushrooms).toHaveBeenCalled();
    expect(testObj.revertPosition).toHaveBeenCalled();
  });
  it('moveTheThing returns if speed is not defined', () => {
    spyOn(testObj, 'updatePosition');
    spyOn(collisions, 'withMushrooms').and.returnValue(true);
    spyOn(testObj, 'revertPosition');

    defaultSpeed = undefined;

    testObj.moveTheThing(defaultSpeed);

    expect(testObj.updatePosition).not.toHaveBeenCalled();
    expect(collisions.withMushrooms).not.toHaveBeenCalled();
    expect(testObj.revertPosition).not.toHaveBeenCalled();
  });
  it('updatePosition sets speed to current when modifier values are 0 and calls newPos', () => {
    testObj.init();
    spyOn(testObj.gamePiece, 'newPos');
    modifier = {x : 0, y : 0};
    expected = {x : modifier.x + 1, y : modifier.y + 1};
    testObj.gamePiece.speedX = expected.x;
    testObj.gamePiece.speedY = expected.y;

    testObj.updatePosition(modifier);

    expect(testObj.gamePiece.speedX).toBe(expected.x);
    expect(testObj.gamePiece.speedY).toBe(expected.y);
    expect(testObj.gamePiece.newPos).toHaveBeenCalled();
  });
  it('updatePosition sets speed modifier and calls newPos', () => {
    testObj.init();
    spyOn(testObj.gamePiece, 'newPos');
    modifier = {x : 1, y : 1};
    defaultSpeed = {x : 20, y : 20};
    testObj.gamePiece.speedX = defaultSpeed.x;
    testObj.gamePiece.speedY = defaultSpeed.y;

    testObj.updatePosition(modifier);

    expect(testObj.gamePiece.speedX).toBe(modifier.x);
    expect(testObj.gamePiece.speedY).toBe(modifier.y);
    expect(testObj.gamePiece.newPos).toHaveBeenCalled();
  });
  it('updatePosition sets speed modifier and calls newPos', () => {
    testObj.init();
    spyOn(testObj.gamePiece, 'newPos');
    modifier = {x : 1, y : 1};
    defaultSpeed = {x : 20, y : 20};
    testObj.gamePiece.speedX = defaultSpeed.x;
    testObj.gamePiece.speedY = defaultSpeed.y;

    testObj.revertPosition(modifier);

    expect(testObj.gamePiece.speedX).toBe(-modifier.x);
    expect(testObj.gamePiece.speedY).toBe(-modifier.y);
    expect(testObj.gamePiece.newPos).toHaveBeenCalled();
  });
  it('revertPosition sets speed to current when modifier values are 0 and calls newPos', () => {
    testObj.init();
    spyOn(testObj.gamePiece, 'newPos');
    modifier = {x : 0, y : 0};
    expected = {x : modifier.x + 1, y : modifier.y + 1};
    testObj.gamePiece.speedX = expected.x;
    testObj.gamePiece.speedY = expected.y;

    testObj.revertPosition(modifier);

    expect(testObj.gamePiece.speedX).toBe(-expected.x);
    expect(testObj.gamePiece.speedY).toBe(-expected.y);
    expect(testObj.gamePiece.newPos).toHaveBeenCalled();
  });
});
