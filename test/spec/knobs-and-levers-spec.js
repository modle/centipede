describe('Testing knobs and levers generation', () => {
  beforeEach(function () {
    testObj = Object.assign({}, knobsAndLevers);
    testObj.init();
  });
  it('gridSquareSideLength should not be undefined', () => {
    console.log('gridSquareSideLength should not be undefined');
    expect(testObj.gridSquareSideLength).toBeTruthy();
  });
  it('gamePieceTopLimit should not be undefined', () => {
    console.log('gamePieceTopLimit should not be undefined');
    expect(testObj.gamePieceTopLimit).toBeTruthy();
  });
  it('gamePieceStartX should not be undefined', () => {
    console.log('gamePieceStartX should not be undefined');
    expect(testObj.gamePieceStartX).toBeTruthy();
  });
  it('gamePieceStartY should not be undefined', () => {
    console.log('gamePieceStartY should not be undefined');
    expect(testObj.gamePieceStartY).toBeTruthy();
  });

  it('baseTextParams.x should not be undefined', () => {
    console.log('baseTextParams.x should not be undefined');
    expect(testObj.baseTextParams.x).toBeTruthy();
  });
  it('baseTextBackgroundParams.height should not be undefined', () => {
    console.log('baseTextBackgroundParams.height should not be undefined');
    expect(testObj.baseTextBackgroundParams.height).toBeTruthy();
  });
  it('baseTextBackgroundParams.width should not be undefined', () => {
    console.log('baseTextBackgroundParams.width should not be undefined');
    expect(testObj.baseTextBackgroundParams.width).toBeTruthy();
  });
  it('baseTextParams.fontSize should not be undefined', () => {
    console.log('baseTextParams.fontSize should not be undefined');
    expect(testObj.baseTextParams.fontSize).toBeTruthy();
  });
  it('gameInfoTextHeight should not be undefined', () => {
    console.log('gameInfoTextHeight should not be undefined');
    expect(testObj.gameInfoTextHeight).toBeTruthy();
  });
  it('coordinateScaleFactor should not be undefined', () => {
    console.log('coordinateScaleFactor should not be undefined');
    expect(testObj.coordinateScaleFactor).toBeTruthy();
  });
  it('mushroomSide should not be undefined', () => {
    console.log('mushroomSide should not be undefined');
    expect(testObj.mushroomSide).toBeTruthy();
  });
  it('spider.initialInterval should not be undefined', () => {
    console.log('spider.initialInterval should not be undefined');
    expect(testObj.spider.initialInterval).toBeTruthy();
  });
  it('spider.args.width should not be undefined', () => {
    console.log('spider.args.width should not be undefined');
    expect(testObj.spider.args.width).toBeTruthy();
  });
  it('spider.args.height should not be undefined', () => {
    console.log('spider.args.height should not be undefined');
    expect(testObj.spider.args.height).toBeTruthy();
  });
  it('spider.args.x should not be undefined', () => {
    console.log('spider.args.x should not be undefined');
    expect(testObj.spider.args.x).toBeTruthy();
  });
  it('spider.args.y should not be undefined', () => {
    console.log('spider.args.y should not be undefined');
    expect(testObj.spider.args.y).toBeTruthy();
  });
  it('centipede.args.width should not be undefined', () => {
    console.log('centipede.args.width should not be undefined');
    expect(testObj.centipede.args.width).toBeTruthy();
  });
  it('centipede.args.height should not be undefined', () => {
    console.log('centipede.args.height should not be undefined');
    expect(testObj.centipede.args.height).toBeTruthy();
  });
  it('centipede.args.x should not be undefined', () => {
    console.log('centipede.args.x should not be undefined');
    expect(testObj.centipede.args.x).toBeTruthy();
  });
  it('worms.initialInterval should not be undefined', () => {
    console.log('worms.initialInterval should not be undefined');
    expect(testObj.worms.initialInterval).toBeTruthy();
  });
  it('worms.args.width should not be undefined', () => {
    console.log('worms.args.width should not be undefined');
    expect(testObj.worms.args.width).toBeTruthy();
  });
  it('worms.args.height should not be undefined', () => {
    console.log('worms.args.height should not be undefined');
    expect(testObj.worms.args.height).toBeTruthy();
  });
  it('worms.args.x should not be undefined', () => {
    console.log('worms.args.x should not be undefined');
    expect(testObj.worms.args.x).toBeTruthy();
  });

  it('flies.initialInterval should not be undefined', () => {
    console.log('flies.initialInterval should not be undefined');
    expect(testObj.flies.initialInterval).toBeTruthy();
  });
  it('flies.args.width should not be undefined', () => {
    console.log('flies.args.width should not be undefined');
    expect(testObj.flies.args.width).toBeTruthy();
  });
  it('flies.args.height should not be undefined', () => {
    console.log('flies.args.height should not be undefined');
    expect(testObj.flies.args.height).toBeTruthy();
  });
  it('flies.args.y should not be undefined', () => {
    console.log('flies.args.y should not be undefined');
    expect(testObj.flies.args.y).not.toBeUndefined();
  });
  it('laser.args.width should not be undefined', () => {
    console.log('laser.args.width should not be undefined');
    expect(testObj.laser.args.width).toBeTruthy();
  });
  it('laser.args.height should not be undefined', () => {
    console.log('laser.args.height should not be undefined');
    expect(testObj.laser.args.height).toBeTruthy();
  });
});
