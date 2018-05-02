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
    spyOn(testObj.fleas, 'init');
    spyOn(testObj.player, 'init');
    spyOn(testObj.laser, 'init');
    spyOn(testObj.mushrooms, 'init');
    spyOn(testObj.spiders, 'init');
    spyOn(testObj.text, 'init');
    spyOn(testObj.worms, 'init');

    testObj.init();

    expect(testObj.general.init).toHaveBeenCalled();
    expect(testObj.centipede.init).toHaveBeenCalled();
    expect(testObj.fleas.init).toHaveBeenCalled();
    expect(testObj.player.init).toHaveBeenCalled();
    expect(testObj.laser.init).toHaveBeenCalled();
    expect(testObj.mushrooms.init).toHaveBeenCalled();
    expect(testObj.spiders.init).toHaveBeenCalled();
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
  it('fleas.init initializes fleas parameters', () => {
    testObj.fleas.init(knobsAndLevers);

    expect(testObj.fleas.initialInterval).toBeDefined();
    expect(testObj.fleas.args.width).toBeTruthy();
    expect(testObj.fleas.args.height).toBeTruthy();
    expect(testObj.fleas.args.y).not.toBeUndefined();
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
  it('spiders.init initializes spider parameters', () => {
    testObj.spiders.init(knobsAndLevers);

    expect(testObj.spiders.initialInterval).toBeTruthy();
    expect(testObj.spiders.args.width).toBeTruthy();
    expect(testObj.spiders.args.height).toBeTruthy();
    expect(testObj.spiders.args.x).toBeTruthy();
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
  it('fleas.args.constructorFunctions.setX should set knobsAndLevers.fleas.args.x', () => {
    knobsAndLevers.init();
    knobsAndLevers.fleas.args.constructorFunctions.setX();
    expect(knobsAndLevers.fleas.args.x).toBeDefined();
  });
});
