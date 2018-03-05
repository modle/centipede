describe('Testing intervalCreatures functions', () => {
  let testObj = Object.assign({}, intervalCreatures);
  let testKnobsAndLevers = Object.assign({}, knobsAndLevers);
  it('intervalCreatures gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
  it('manage calls intervalCreatures.clearOutsideCanvas', () => {
    spyOn(testObj, 'clearOutsideCanvas');
    testObj.manage();
    expect(testObj.clearOutsideCanvas).toHaveBeenCalled();
  });
  it('manage calls intervalCreatures.update', () => {
    spyOn(testObj, 'update');
    testObj.manage();
    expect(testObj.update).toHaveBeenCalled();
  });
  it('manage calls getRandom at appropriate interval', () => {
    spyOn(window, 'getRandom');
    game.gameArea.frameNo = 10;
    testObj.intervals['worms'] = 10;
    testObj.manage();
    expect(getRandom).toHaveBeenCalled();
  });
  it('manage calls intervalCreatures.spawn at appropriate interval', () => {
    game.gameArea.frameNo = 10;
    testObj.intervals['worms'] = 10;
    spyOn(testObj, 'spawn');
    testObj.manage();
    expect(testObj.spawn).toHaveBeenCalled();
  });
  it('spawn once creates one worm', () => {
    testObj.spawn('worms');
    expect(testObj.worms.length === 1).toBeTruthy();
  });
  it('spawn more than max worms does not create more than max worms', () => {
    for (let i = 0; i < testKnobsAndLevers.worms.maxNumber + 100; i++) {
      testObj.spawn('worms');
    };
    expect(testObj.worms.length === testKnobsAndLevers.worms.maxNumber).toBeTruthy();
  });
  it('update calls component.newPos', () => {
    testObj.spawn('worms');
    spyOn(testObj.worms[0], 'newPos');
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
