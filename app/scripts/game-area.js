/*jslint white: true */

function GameArea() {
  this.canvas = document.createElement("canvas"),
  this.xVertices = [],
  this.yVertices = [],
  this.gamePieceTopLimit = knobsAndLevers.gamePieceTopLimit;
  this.canvas.width = knobsAndLevers.canvasWidth;
  this.canvas.height = knobsAndLevers.canvasHeight;
  this.gridSquareSideLength = knobsAndLevers.gridSquareSideLength;
  this.firstMushroomLayer = this.gridSquareSideLength * 2;
  this.start = function() {
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameState, supporting.intervalDivisor);
  };
  this.setGridVertices = function() {
    this.xVertices = this.getXVertices();
    this.yVertices = this.getYVertices();
  };
  this.getXVertices = function() {
    x = 0;
    vertices = [];
    while (x < this.canvas.width) {
      vertices.push(Math.ceil(x));
      x += this.gridSquareSideLength;
    };
    return vertices;
  };
  this.getYVertices = function() {
    y = this.firstMushroomLayer;
    vertices = [];
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
