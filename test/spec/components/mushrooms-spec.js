describe('Testing mushrooms functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, mushrooms);
    knobsAndLevers.init();
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
  it('add pushes mushroom to mushrooms if valid', () => {
    spyOn(testObj, 'generate');
    let coordinates = {x : game.gameArea.canvas.width * 2, y : 0};

    testObj.add(coordinates);

    expect(testObj.generate).not.toHaveBeenCalled();
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
