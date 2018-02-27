describe('Testing knobs and levers generation', () => {
  let testObj = Object.assign({}, knobsAndLevers);
  it('gamePieceTopLimit should not be undefined', () => {
    expect(testObj.gamePieceTopLimit).toBeTruthy();
  });
  it('gamePieceStartX should not be undefined', () => {
    expect(testObj.gamePieceStartX).toBeTruthy();
  });
  it('gamePieceStartY should not be undefined', () => {
    expect(testObj.gamePieceStartY).toBeTruthy();
  });
  it('baseTextParams.x should not be undefined', () => {
    expect(testObj.baseTextParams.x).toBeTruthy();
  });
  it('gridSquareSideLength should not be undefined', () => {
    expect(testObj.gridSquareSideLength).toBeTruthy();
  });
  it('coordinateScaleFactor should not be undefined', () => {
    expect(testObj.coordinateScaleFactor).toBeTruthy();
  });
  it('mushroomSide should not be undefined', () => {
    expect(testObj.mushroomSide).toBeTruthy();
  });
  it('baseTextBackgroundParams.height should not be undefined', () => {
    expect(testObj.baseTextBackgroundParams.height).toBeTruthy();
  });
  it('baseTextBackgroundParams.width should not be undefined', () => {
    expect(testObj.baseTextBackgroundParams.width).toBeTruthy();
  });
  it('spider.initialInterval should not be undefined', () => {
    expect(testObj.spider.initialInterval).toBeTruthy();
  });
  it('worm.initialInterval should not be undefined', () => {
    expect(testObj.worm.initialInterval).toBeTruthy();
  });
  it('baseTextParams.fontSize should not be undefined', () => {
    expect(testObj.baseTextParams.fontSize).toBeTruthy();
  });
  it('gameInfoTextHeight should not be undefined', () => {
    expect(testObj.gameInfoTextHeight).toBeTruthy();
  });
  it('spider.args.width should not be undefined', () => {
    expect(testObj.spider.args.width).toBeTruthy();
  });
  it('spider.args.height should not be undefined', () => {
    expect(testObj.spider.args.height).toBeTruthy();
  });
  it('spider.args.x should not be undefined', () => {
    expect(testObj.spider.args.x).toBeTruthy();
  });
  it('spider.args.y should not be undefined', () => {
    expect(testObj.spider.args.y).toBeTruthy();
  });
  it('centipede.args.width should not be undefined', () => {
    expect(testObj.centipede.args.width).toBeTruthy();
  });
  it('centipede.args.height should not be undefined', () => {
    expect(testObj.centipede.args.height).toBeTruthy();
  });
  it('centipede.args.x should not be undefined', () => {
    expect(testObj.centipede.args.x).toBeTruthy();
  });
  it('worm.args.width should not be undefined', () => {
    expect(testObj.worm.args.width).toBeTruthy();
  });
  it('worm.args.height should not be undefined', () => {
    expect(testObj.worm.args.height).toBeTruthy();
  });
  it('worm.args.x should not be undefined', () => {
    expect(testObj.worm.args.x).toBeTruthy();
  });
  it('worm.args.y should not be undefined', () => {
    expect(testObj.worm.args.y).toBeTruthy();
  });
  it('laser.args.width should not be undefined', () => {
    expect(testObj.laser.args.width).toBeTruthy();
  });
  it('laser.args.height should not be undefined', () => {
    expect(testObj.laser.args.height).toBeTruthy();
  });
});
