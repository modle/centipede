describe('Testing intervalCreatures functions', () => {
  beforeEach(function () {
    testSupporting = Object.assign({}, supporting);
    testObj = Object.assign({}, intervalCreatures);
    testObj.init();
    game.init();
  });
  function mockTestObj() {
    spyOn(testObj, 'spawnCreatureAtIntervals');
    spyOn(testObj, 'clearOutsideCanvas');
    spyOn(testObj, 'update');
    spyOn(testObj, 'dropMushrooms');
    testObj.worms = [];
    testObj.flies = [];
    testObj.intervals['worms'] = 10;
  };

  it('intervalCreatures gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
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
  xit('spawnCreatureAtIntervals calls getRandom at appropriate interval', () => {
    testObj.init();
    spyOn(testObj, 'spawn');
    spyOn(testSupporting, 'getRandom');
    testObj.spawnCreatureAtIntervals('worms');
    expect(testSupporting.getRandom).toHaveBeenCalled();
  });
  it('manage calls intervalCreatures.spawnCreatureAtIntervals', () => {
    mockTestObj();
    testObj.manage();
    expect(testObj.spawnCreatureAtIntervals).toHaveBeenCalled();
  });
  it('spawn once creates one worm', () => {
    testObj.spawn('worms');
    expect(testObj.worms.length === 1).toBeTruthy();
  });
  it('spawn more than max worms does not create more than max worms', () => {
    for (let i = 0; i < knobsAndLevers.worms.maxNumber + 100; i++) {
      testObj.spawn('worms');
    };
    expect(testObj.worms.length === knobsAndLevers.worms.maxNumber).toBeTruthy();
  });
  it('update calls component.newPos', () => {
    testObj.spawn('worms');
    spyOn(testObj.worms[0], 'newPos');
    spyOn(testObj.worms[0], 'update');
    testObj.update('worms');
    expect(testObj.worms[0].newPos).toHaveBeenCalled();
  });
  it('update calls component.update', () => {
    testObj.spawn('worms');
    spyOn(testObj.worms[0], 'update');
    testObj.update('worms');
    expect(testObj.worms[0].update).toHaveBeenCalled();
  });
  it('clearOutsideCanvas clears worms with x greater than canvas width', () => {
    testObj.spawn('worms');

    testObj.worms[0].x = game.gameArea.canvas.width + 1;
    testObj.clearOutsideCanvas('worms');
    expect(testObj.worms.length === 0).toBeTruthy();
  });
  it('clearOutsideCanvas clears flies with y greater than canvas height', () => {
    testObj.spawn('flies');
    testObj.flies[0].y = game.gameArea.canvas.height + 1;
    testObj.clearOutsideCanvas('flies');
    expect(testObj.flies.length === 0).toBeTruthy();
  });
  it('clear results in empty worms list', () => {
    testObj.spawn('worms');
    testObj.clear();
    expect(testObj.worms.length === 0).toBeTruthy();
  });
  it('clear results in empty flies list', () => {
    testObj.spawn('flies');
    testObj.clear();
    expect(testObj.flies.length === 0).toBeTruthy();
  });
});
