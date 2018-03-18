describe('Testing game functions', () => {
  beforeEach(function() {
    testObj = Object.assign({}, game);
    testObj.init();
    spyOn(testObj.gameArea, 'start');
    spyOn(testObj.gameArea, 'stop');
  });
  it('game gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
  it('start calls isMobile', () => {
    spyOn(supporting, 'isMobile');
    testObj.start();
    expect(supporting.isMobile).toHaveBeenCalled();
  });
  it('start calls gameArea.start when isMobile is false', () => {
    spyOn(supporting, 'isMobile').and.returnValue(false);
    testObj.start();
    expect(testObj.gameArea.start).toHaveBeenCalled();
  });
  it('start calls gameArea.stop when isMobile is true', () => {
    spyOn(supporting, 'isMobile').and.returnValue(true);
    testObj.start();
    expect(testObj.gameArea.stop).toHaveBeenCalled();
  });
  it('game is paused when isMobile is false', () => {
    spyOn(supporting, 'isMobile').and.returnValue(false);
    testObj.start();
    expect(testObj.paused).toBeTruthy();
  });
  it('reset calls gameArea.stop', () => {
    spyOn(hud, 'reset');
    testObj.reset();
    expect(testObj.gameArea.stop).toHaveBeenCalled();
  });
  it('reset calls game.start', () => {
    spyOn(testObj, 'start');
    spyOn(hud, 'reset');
    testObj.reset();
    expect(testObj.start).toHaveBeenCalled();
  });
});
