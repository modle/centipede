describe('MUSHROOMS SPEC: ', () => {
  let spec = 'MUSHROOMS';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, mushrooms);
    dials.init();
    game.init();
  });
  it('manage calls spawn and update on frame 1', () => {
    game.gameArea.frameNo = 1;
    spyOn(testObj, 'spawn');
    spyOn(testObj, 'update');

    testObj.manage();

    expect(testObj.spawn).toHaveBeenCalled();
    expect(testObj.update).toHaveBeenCalled();
  });
  it('manage calls update every frame', () => {
    game.gameArea.frameNo = 0;
    spyOn(testObj, 'spawn');
    spyOn(testObj, 'update');

    testObj.manage();

    expect(testObj.spawn).not.toHaveBeenCalled();
    expect(testObj.update).toHaveBeenCalled();
  });
  it('spawn creates the exected number of mushrooms', () => {
    testObj.mushrooms = [];
    game.gameArea.setGridVertices();
    spyOn(testObj, 'generate').and.returnValue({});
    let expected = 10;

    testObj.spawn(expected);

    expect(testObj.mushrooms.length).toBe(expected);
  });
  it('make pushes mushroom with max value from xVertices if coordinates.x is outside canvas', () => {
    game.init();
    game.gameArea.xVertices = [20, 30];
    game.gameArea.yVertices = [5, 10];
    spyOn(testObj, 'generate');
    let coordinateOutsideCanvasRight = game.gameArea.canvas.width * 2;
    let coordinateAboveCanvas = -100;
    let coordinates = {x : coordinateOutsideCanvasRight, y : coordinateAboveCanvas};

    testObj.make(coordinates);

    expect(coordinates.x).toBe(30);
    expect(coordinates.y).toBe(5);
    expect(testObj.generate).toHaveBeenCalled();
  });
  it('make throws error if coordinates are undefined', () => {
    let coordinates = {x : undefined, y : undefined};

    expect(function(){ testObj.make(coordinates); })
      .toThrow(new Error("coordinate error: x: " + coordinates.x + ", y: " + coordinates.y));
  });

  it('update calls update on mushroom objects', () => {
    dials.mushrooms.scaleFactor = 0.1
    let coordinates = {hitPoints: 5, x: 5, y: 5};
    testObj.mushrooms = [{hitPoints: 5, x: 5.1, y: 5.1}];

    let result = testObj.willOverlap(coordinates);

    expect(result).toBeTruthy();
  });

  it('update calls update on mushroom objects', () => {
    testObj.mushrooms = [];
    testObj.spawn(5);
    testObj.mushrooms.forEach( mushroom =>
      spyOn(mushroom, 'update')
    );

    testObj.update();

    testObj.mushrooms.forEach( mushroom =>
      expect(mushroom.update).toHaveBeenCalled()
    );
  });

  it('clear clears mushroom objects', () => {
    testObj.mushrooms = [{}];

    expect(testObj.mushrooms.length).toBe(1);

    testObj.clear();

    expect(testObj.mushrooms.length).toBe(0);
  });
});
