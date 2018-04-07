/*jslint white: true */

function GameArea() {
  this.canvas = document.createElement("canvas"),
  this.xVertices = [],
  this.yVertices = [],
  this.gamePieceTopLimit = knobsAndLevers.gamePieceTopLimit;
  this.canvas.width = knobsAndLevers.canvas.width;
  this.canvas.height = knobsAndLevers.canvas.height;
  this.gridSquareSideLength = knobsAndLevers.gridSquareSideLength;
  this.firstMushroomLayer = knobsAndLevers.gridSquareSideLength * 2;
  this.start = function() {
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(main.updateGameState, supporting.intervalDivisor);
    this.loadFont();
  };
  this.loadFont = function() {
    let theLoadedFont = new FontFace('press-start', 'url(./app/static/css/fonts/prstartk.ttf)');
    theLoadedFont.load().then((font) => {
      document.fonts.add(font);
      console.log('Font added', font);
    });
  };
  this.setGridVertices = function() {
    this.xVertices = this.getXVertices();
    this.yVertices = this.getYVertices();
  };
  this.getXVertices = function() {
    let x = 0;
    let vertices = [];
    while (x < this.canvas.width) {
      vertices.push(Math.ceil(x));
      x += this.gridSquareSideLength;
    };
    return vertices;
  };
  this.getYVertices = function() {
    let y = this.firstMushroomLayer;
    let vertices = [];
    while (y < this.canvas.height * 0.75) {
      vertices.push(Math.ceil(y));
      y += this.gridSquareSideLength;
    };
    return vertices;
  };
  this.setGridVertices();
  this.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  this.stop = function() {
    clearInterval(this.interval);
  };
};
