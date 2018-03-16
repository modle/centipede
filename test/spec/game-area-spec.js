describe('Testing game-area functions', () => {
  this.gameArea = new GameArea();
  this.knobsAndLevers = Object.assign({}, knobsAndLevers);
  // this.main.init();

  it('gameArea gets constructed', () => {
    document.createElement("body");
    expect(this.gameArea).toBeTruthy();
  });
  it('setGridVertices calls getXVertices and getYVertices', () => {
    spyOn(this.gameArea, 'getXVertices');
    spyOn(this.gameArea, 'getYVertices');
    this.gameArea.setGridVertices();
    expect(this.gameArea.getXVertices).toHaveBeenCalled();
    expect(this.gameArea.getYVertices).toHaveBeenCalled();
  });
  it('getXVertices returns a reasonable array of vertices', () => {
    let xVertices = this.gameArea.getXVertices();
    let expectedNumVertices = this.knobsAndLevers.canvasWidth / this.knobsAndLevers.gridSquareSideLength;
    expect(xVertices.length).toBe(expectedNumVertices);
  });
  it('getYVertices returns a reasonable array of vertices', () => {
    let yVertices = this.gameArea.getYVertices();
    console.log()
    let expectedNumVertices = (this.knobsAndLevers.canvasHeight * 0.75 - this.knobsAndLevers.gridSquareSideLength) / this.knobsAndLevers.gridSquareSideLength;
    expect(yVertices.length).toBe(Math.floor(expectedNumVertices));
  });
});
