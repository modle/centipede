/*jslint white: true */
function GameArea() {
  this.canvas = document.createElement("canvas"),
  this.xVertices = [],
  this.yVertices = [],
  this.canvas.width = knobsAndLevers.canvas.width;
  this.canvas.height = knobsAndLevers.canvas.height;
  this.gridSquareSideLength = knobsAndLevers.general.gridSquareSideLength;
  this.firstMushroomLayer = knobsAndLevers.general.gridSquareSideLength * 2;
  this.start = function() {
    this.loadCanvas();
    this.loadFrame();
    this.loadFont();
    this.loadBackground();
  };
  this.loadCanvas = function() {
    this.context = this.canvas.getContext("2d");
    document.getElementById("canvas-wrapper").appendChild(this.canvas);
  };
  this.loadFrame = function() {
    this.frameNo = 0;
    this.interval = setInterval(main.updateGameState, supporting.intervalDivisor);
  };
  this.loadFont = function() {
    let theLoadedFont = new FontFace('press-start', 'url(./app/static/css/fonts/prstartk.ttf)');
    theLoadedFont.load().then((font) => {
      document.fonts.add(font);
      console.log('Font added', font);
    });
  };
  this.loadBackground = function() {
    let backgroundId = 'canvas-background';
    if (!document.getElementById(backgroundId)) {
      let canvasBackground = new Image();
      canvasBackground.src = 'app/static/media/images/centipede.gif';
      canvasBackground.id = backgroundId;
      document.getElementById("canvas-wrapper").appendChild(canvasBackground);
    };
  };
  this.removeBackground = function() {
    let background = document.getElementById('canvas-background');
    if (!background) {
      return;
    };
    background.parentNode.removeChild(background);
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
    while (y < this.canvas.height) {
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
