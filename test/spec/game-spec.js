describe('Testing game functions', () => {
  beforeEach(function() {
    // testObj = Object.assign({}, game);
  });
  function removeCanvas() {
    var body = document.getElementsByTagName('body')[0];
    var canvas = document.getElementsByTagName('canvas')[0];
    body.removeChild(canvas);
  }
  it('game gets constructed', () => {
    expect(this.testObj).toBeTruthy();
  });
  xit('setGridVertices calls window.addEventListener', () => {
    spyOn(this.testObj, 'addEventListener');
    this.testObj.addEventListeners();
    expect(window.addEventListener).toHaveBeenCalled();
  });
  // FIXME calling this.testObj.start() actually starts the game. Can we prevent that?
  // are these tests even useful?
  // it('start calls isMobile', () => {
  //   this.supporting = Object.assign({}, supporting);
  //   spyOn(this.supporting, 'isMobile');
  //   this.testObj.start();
  //   expect(this.supporting.isMobile).toHaveBeenCalled();
  //   removeCanvas();
  // });
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
