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
    knobsAndLevers.init();
  });
  it('init should call parameter init functions', () => {
    spyOn(testObj.general, 'init');
    spyOn(testObj.centipede, 'init');
    spyOn(testObj.flies, 'init');
    spyOn(testObj.player, 'init');
    spyOn(testObj.laser, 'init');
    spyOn(testObj.mushrooms, 'init');
    spyOn(testObj.spider, 'init');
    spyOn(testObj.text, 'init');
    spyOn(testObj.worms, 'init');

    testObj.init();

    expect(testObj.general.init).toHaveBeenCalled();
    expect(testObj.centipede.init).toHaveBeenCalled();
    expect(testObj.flies.init).toHaveBeenCalled();
    expect(testObj.player.init).toHaveBeenCalled();
    expect(testObj.laser.init).toHaveBeenCalled();
    expect(testObj.mushrooms.init).toHaveBeenCalled();
    expect(testObj.spider.init).toHaveBeenCalled();
    expect(testObj.text.init).toHaveBeenCalled();
    expect(testObj.worms.init).toHaveBeenCalled();
  });

  it('general.init initializes general parameters', () => {
    testObj.general.init(knobsAndLevers);

    expect(testObj.general.gridSquareSideLength).toBeTruthy();
  });

  it('centipede.init initializes centipede parameters', () => {
    testObj.centipede.init(knobsAndLevers);

    expect(testObj.centipede.args.width).toBeTruthy();
    expect(testObj.centipede.args.height).toBeTruthy();
    expect(testObj.centipede.args.x).toBeTruthy();
  });
  it('flies.init initializes flies parameters', () => {
    testObj.flies.init(knobsAndLevers);

    expect(testObj.flies.initialInterval).toBeDefined();
    expect(testObj.flies.args.width).toBeTruthy();
    expect(testObj.flies.args.height).toBeTruthy();
    expect(testObj.flies.args.y).not.toBeUndefined();
  });
  it('player.init initializes player parameters', () => {
    testObj.player.init(knobsAndLevers);

    expect(testObj.player.topLimit).toBeTruthy();
    expect(testObj.player.startX).toBeTruthy();
    expect(testObj.player.startY).toBeTruthy();
  });
  it('laser.init initializes laser parameters', () => {

    testObj.laser.init(knobsAndLevers);

    expect(testObj.laser.args.width).toBeTruthy();
    expect(testObj.laser.args.height).toBeTruthy();
  });
  it('mushrooms.init initializes mushrooms parameters', () => {
    testObj.mushrooms.init(knobsAndLevers);

    expect(testObj.mushrooms.scaleFactor).toBeTruthy();
    expect(testObj.mushrooms.side).toBeTruthy();
  });
  it('spider.init initializes spider parameters', () => {
    testObj.spider.init(knobsAndLevers);

    expect(testObj.spider.initialInterval).toBeTruthy();
    expect(testObj.spider.args.width).toBeTruthy();
    expect(testObj.spider.args.height).toBeTruthy();
    expect(testObj.spider.args.x).toBeTruthy();
  });
  it('text.init initializes text parameters', () => {
    testObj.text.init(knobsAndLevers);

    expect(testObj.text.baseParams.x).toBeTruthy();
    expect(testObj.text.baseBackgroundParams.height).toBeTruthy();
    expect(testObj.text.baseBackgroundParams.width).toBeTruthy();
    expect(testObj.text.baseParams.fontSize).toBeTruthy();
    expect(testObj.text.gameInfoHeight).toBeTruthy();
  });
  it('worms.init initializes worms parameters', () => {
    testObj.worms.init(knobsAndLevers);

    expect(testObj.worms.initialInterval).toBeTruthy();
    expect(testObj.worms.args.width).toBeTruthy();
    expect(testObj.worms.args.height).toBeTruthy();
  });
  it('flies.args.constructorFunctions.setX should set knobsAndLevers.flies.args.x', () => {
    knobsAndLevers.init();
    knobsAndLevers.flies.args.constructorFunctions.setX();
    expect(knobsAndLevers.flies.args.x).toBeDefined();
  });
});
