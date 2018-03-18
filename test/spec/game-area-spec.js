describe('Testing game-area functions', () => {
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
});
