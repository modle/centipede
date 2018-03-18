describe('Testing game-area functions', () => {
  beforeEach(function () {
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
  xit('getXVertices returns a reasonable array of vertices', () => {
    let xVertices = gameArea.getXVertices();
    console.log(xVertices);
    let expectedNumVertices = knobsAndLevers.canvasWidth / knobsAndLevers.gridSquareSideLength;
    expect(xVertices.length).toBe(expectedNumVertices);
  });
  xit('getYVertices returns a reasonable array of vertices', () => {
    let yVertices = gameArea.getYVertices();
    console.log(yVertices);
    let expectedNumVertices = (knobsAndLevers.canvasHeight * 0.75 - knobsAndLevers.gridSquareSideLength) / knobsAndLevers.gridSquareSideLength;
    expect(yVertices.length).toBe(Math.floor(expectedNumVertices));
  });
});
