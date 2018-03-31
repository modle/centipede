describe('GAME AREA SPEC: ', () => {
  let spec = 'GAME AREA';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    knobsAndLevers.init();
    gameArea = new GameArea();
  });
  it('gameArea gets constructed', () => {
    document.createElement("body");
    expect(gameArea).toBeTruthy();
  });
  it('setGridVertices calls getXVertices and getYVertices', () => {
    spyOn(gameArea, 'getXVertices');
    spyOn(gameArea, 'getYVertices');
    gameArea.setGridVertices();
    expect(gameArea.getXVertices).toHaveBeenCalled();
    expect(gameArea.getYVertices).toHaveBeenCalled();
  });
  it('getXVertices returns a reasonable array of vertices', () => {
    let expectedNumVertices = knobsAndLevers.canvasWidth / knobsAndLevers.gridSquareSideLength;
    expect(gameArea.getXVertices().length).toBe(expectedNumVertices);
  });
  it('getYVertices returns a reasonable array of vertices', () => {
    let expectedNumVertices = (knobsAndLevers.canvasHeight * 0.75 - knobsAndLevers.gridSquareSideLength) / knobsAndLevers.gridSquareSideLength;
    expect(gameArea.getYVertices().length).toBe(Math.floor(expectedNumVertices));
  });
  it('clear calls context.clearRect', () => {
    gameArea.context = gameArea.canvas.getContext("2d");
    spyOn(gameArea.context, 'clearRect');

    gameArea.clear();

    expect(gameArea.context.clearRect).toHaveBeenCalled();
  });
  it('stop clears interval', () => {
    spyOn(window, 'clearInterval');

    gameArea.stop();

    expect(window.clearInterval).toHaveBeenCalled();
  });
});
