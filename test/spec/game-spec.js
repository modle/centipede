describe('Testing game functions', () => {
  beforeEach(function() {
    testObj = Object.assign({}, game);
    testObj.init();
  });
  it('game gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
  it('start calls isMobile', () => {
    spyOn(supporting, 'isMobile');
    spyOn(testObj.gameArea, 'start');
    testObj.start();
    expect(supporting.isMobile).toHaveBeenCalled();
  });
  // it('start calls initSounds', () => {
  //   this.supporting = Object.assign({}, supporting);
  //   spyOn(this.supporting, 'isMobile');
  //   this.testObj.start();
  //   expect(this.supporting.isMobile).toHaveBeenCalled();
  //   removeCanvas();
  // });
  // it('start calls gameArea.start', () => {
  //   spyOn(this.testObj.gameArea, 'start');
  //   this.testObj.start();
  //   expect(this.testObj.gameArea.start).toHaveBeenCalled();
  // });
});
