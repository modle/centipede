describe('INTERVAL CREATURES SPEC: ', () => {
  let spec = 'INTERVAL CREATURES';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, intervalCreatures);
    testObj.init();
    testObj.worms = [];
    testObj.flies = [];
    game.init();
  });
  function mockTestObj() {
    spyOn(testObj, 'spawnCreatureAtIntervals');
    spyOn(testObj, 'clearOutsideCanvas');
    spyOn(testObj, 'update');
    spyOn(testObj, 'dropMushrooms');
    testObj.intervals['worms'] = 10;
  };
  it('manage calls intervalCreatures.clearOutsideCanvas', () => {
    mockTestObj();
    testObj.worms.push('a worm');

    testObj.manage();

    expect(testObj.clearOutsideCanvas).toHaveBeenCalled();
  });
  it('manage calls intervalCreatures.update', () => {
    mockTestObj();
    testObj.worms.push('a worm');

    testObj.manage();

    expect(testObj.update).toHaveBeenCalled();
  });

  it('spawnCreatureAtIntervals calls getRandom at appropriate interval', () => {
    spyOn(testObj, 'spawn');
    spyOn(supporting, 'getRandom');
    game.gameArea.frameNo = 10;
    testObj.intervals['worms'] = 10;

    testObj.spawnCreatureAtIntervals('worms');

    expect(supporting.getRandom).toHaveBeenCalled();
  });
  it('spawnCreatureAtIntervals will not call getRandom at inappropriate interval', () => {
    spyOn(testObj, 'spawn');
    spyOn(supporting, 'getRandom');
    game.gameArea.frameNo = 1;
    testObj.intervals['worms'] = 10;

    testObj.spawnCreatureAtIntervals('worms');

    expect(supporting.getRandom).not.toHaveBeenCalled();
  });
  it('manage calls intervalCreatures.spawnCreatureAtIntervals', () => {
    mockTestObj();

    testObj.manage();

    expect(testObj.spawnCreatureAtIntervals).toHaveBeenCalled();
  });

  it('dropMushroom returns without calling mushrooms.generate when not eligible to drop', () => {
    spyOn(testObj, 'eligibleToDrop').and.returnValue(false);
    spyOn(mushrooms, 'generate');

    testObj.dropMushrooms();

    expect(testObj.eligibleToDrop).toHaveBeenCalled();
    expect(mushrooms.generate).not.toHaveBeenCalled();
  });

  it('dropMushroom calls mushrooms.generate if eligible to drop', () => {
    spyOn(testObj, 'eligibleToDrop').and.returnValue(true);
    spyOn(mushrooms, 'generate').and.returnValue({});
    mushrooms.mushrooms = [];
    let fly = {x : 5, y : 5};

    testObj.dropMushrooms(fly);

    expect(testObj.eligibleToDrop).toHaveBeenCalled();
    expect(mushrooms.generate).toHaveBeenCalled();
    expect(mushrooms.mushrooms.length).toBe(1);
  });

  it('eligibleToDrop returns false if not valid interval', () => {
    game.init();
    game.frameNo = 1;
    knobsAndLevers.flies.mushroomCreateInterval = 2;

    let canDrop = testObj.eligibleToDrop();
    expect(canDrop).toBeFalsy();
  });

  it('spawn once creates one worm', () => {
    testObj.spawn('worms');

    expect(testObj.worms.length).toBe(1);
  });
  it('spawn more than max worms does not create more than max worms', () => {
    for (let i = 0; i < knobsAndLevers.worms.maxNumber + 100; i++) {
      testObj.spawn('worms');
    };

    expect(testObj.worms.length).toBe(knobsAndLevers.worms.maxNumber);
  });
  it('update calls component.newPos', () => {
    testObj.worms = [{newPos : function(){}, update : function(){}}];
    spyOn(testObj.worms[0], 'newPos');
    spyOn(testObj.worms[0], 'update');

    testObj.update('worms');

    expect(testObj.worms[0].update).toHaveBeenCalled();
    expect(testObj.worms[0].newPos).toHaveBeenCalled();
  });
  it('update calls component.update', () => {
    testObj.worms = [{update : function(){}, newPos : function(){}}];
    spyOn(testObj.worms[0], 'update');

    testObj.update('worms');

    expect(testObj.worms[0].update).toHaveBeenCalled();
  });
  it('clearOutsideCanvas clears worms with x greater than canvas width', () => {
    testObj.worms = [{}];
    testObj.worms[0].x = game.gameArea.canvas.width + 1;
    testObj.worms[0].y = game.gameArea.canvas.height + 1;
    expect(testObj.worms.length).toBe(1);

    testObj.worms = testObj.clearOutsideCanvas('worms');

    expect(testObj.worms.length).toBe(0);
  });
  it('clearOutsideCanvas clears flies with y greater than canvas height', () => {
    testObj.flies = [{}];
    testObj.flies[0].y = game.gameArea.canvas.height + 1;

    testObj.flies = testObj.clearOutsideCanvas('flies');

    expect(testObj.flies.length).toBe(0);
  });
  it('clearOutsideCanvas does not clear flies with y less than canvas height', () => {
    testObj.flies = [{}]
    expect(testObj.flies.length).toBe(1);

    testObj.flies[0].y = game.gameArea.canvas.height * 2;
    testObj.flies[0].x = game.gameArea.canvas.width * 2;

    testObj.clearOutsideCanvas('flies');

    expect(testObj.flies.length).toBe(1);
  });
  it('clearOutsideCanvas does not clear flies with y less than canvas height', () => {
    testObj.flies = [];
    expect(testObj.flies.length).toBe(0);

    testObj.clearOutsideCanvas('flies');

    expect(testObj.flies.length).toBe(0);
  });
  it('clear results in empty worms list', () => {
    testObj.worms = [{}];

    testObj.clear();

    expect(testObj.worms.length).toBe(0);
  });
  it('clear results in empty flies list', () => {
    testObj.flies = [{}];

    testObj.clear();

    expect(testObj.flies.length).toBe(0);
  });
});
