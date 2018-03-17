describe('Testing game functions', () => {
  beforeEach(function() {
    testObj = Object.assign({}, game);
  });
  function removeCanvas() {
    var body = document.getElementsByTagName('body')[0];
    var canvas = document.getElementsByTagName('canvas')[0];
    body.removeChild(canvas);
  }
  it('game gets constructed', () => {
    console.log('game gets constructed');
    expect(testObj).toBeTruthy();
  });
  it('setGridVertices calls window.addEventListener', () => {
    console.log('setGridVertices calls window.addEventListener');
    spyOn(testObj, 'addEventListener');
    testObj.addEventListeners();
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
