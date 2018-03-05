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
    testObj.interval = 10;
    testObj.manage();
    expect(getRandom).toHaveBeenCalled();
  });
  it('manage calls intervalCreatures.spawn at appropriate interval', () => {
    game.gameArea.frameNo = 10;
    testObj.interval = 10;
    spyOn(testObj, 'spawn');
    testObj.manage();
    expect(testObj.spawn).toHaveBeenCalled();
  });
  it('spawn once creates one worm', () => {
    testObj.spawn();
    expect(testObj.worms.length === 1).toBeTruthy();
  });
  it('spawn more than max worms does not create more than max worms', () => {
    for( let i = 0; i < testKnobsAndLevers.worm.maxNumber + 100; i++) {
      testObj.spawn();
    };
    expect(testObj.worms.length === testKnobsAndLevers.worm.maxNumber).toBeTruthy();
  });
  it('update calls component.newPos', () => {
    testObj.spawn();
    spyOn(testObj.worms[0], 'newPos');
    testObj.update();
    expect(testObj.worms[0].newPos).toHaveBeenCalled();
  });
  it('update calls component.update', () => {
    testObj.spawn();
    spyOn(testObj.worms[0], 'update');
    testObj.update();
    expect(testObj.worms[0].update).toHaveBeenCalled();
  });
  it('clearOutsideCanvas clears worms with x greater than canvas width', () => {
    testObj.spawn();
    testObj.worms[0].x = game.gameArea.canvas.width + 1;
    testObj.clearOutsideCanvas();
    expect(testObj.worms.length === 0).toBeTruthy();
  });
  it('clear results in empty worms list', () => {
    testObj.spawn();
    testObj.clear();
    expect(testObj.worms.length === 0).toBeTruthy();
  });
});
