describe('KNOBS AND LEVERS SPEC: ', () => {
  let spec = 'KNOBS AND LEVERS';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, knobsAndLevers);
  });
  it('after init, target parameters should not be undefined', () => {
    testObj.init();
    expect(testObj.gridSquareSideLength).toBeTruthy();
    expect(testObj.gamePieceTopLimit).toBeTruthy();
    expect(testObj.gamePieceStartX).toBeTruthy();
    expect(testObj.gamePieceStartY).toBeTruthy();
    expect(testObj.baseTextParams.x).toBeTruthy();
    expect(testObj.baseTextBackgroundParams.height).toBeTruthy();
    expect(testObj.baseTextBackgroundParams.width).toBeTruthy();
    expect(testObj.baseTextParams.fontSize).toBeTruthy();
    expect(testObj.gameInfoTextHeight).toBeTruthy();
    expect(testObj.coordinateScaleFactor).toBeTruthy();
    expect(testObj.mushroomSide).toBeTruthy();
    expect(testObj.spider.initialInterval).toBeTruthy();
    expect(testObj.spider.args.width).toBeTruthy();
    expect(testObj.spider.args.height).toBeTruthy();
    expect(testObj.spider.args.x).toBeTruthy();
    expect(testObj.spider.args.y).toBeTruthy();
    expect(testObj.centipede.args.width).toBeTruthy();
    expect(testObj.centipede.args.height).toBeTruthy();
    expect(testObj.centipede.args.x).toBeTruthy();
    expect(testObj.worms.initialInterval).toBeTruthy();
    expect(testObj.worms.args.width).toBeTruthy();
    expect(testObj.worms.args.height).toBeTruthy();
    expect(testObj.worms.args.x).toBeTruthy();
    expect(testObj.flies.initialInterval).toBeTruthy();
    expect(testObj.flies.args.width).toBeTruthy();
    expect(testObj.flies.args.height).toBeTruthy();
    expect(testObj.flies.args.y).not.toBeUndefined();
    expect(testObj.laser.args.width).toBeTruthy();
    expect(testObj.laser.args.height).toBeTruthy();
  });
  it('flies.args.constructorFunctions.setX should set knobsAndLevers.flies.args.x', () => {
    knobsAndLevers.init();
    knobsAndLevers.flies.args.constructorFunctions.setX();
    expect(knobsAndLevers.flies.args.x).toBeDefined();
  });
});
