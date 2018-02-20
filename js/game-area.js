/*jslint white: true */

var gameArea = {
  canvas : document.createElement("canvas"),
  gridSquareSideLength : 0,
  firstMushroomLayer : 0,
  xVertices : [],
  yVertices : [],
  gamePieceTopLimit : knobsAndLevers.gamePieceTopLimit,
  start : function() {
    paused = true;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    // set interval at which function updateGameArea is executed
    // 1000 ms divided by second parameter
    this.interval = setInterval(updateGameState, intervalDivisor);
    gameArea.keys = (gameArea.keys || []);
    this.addEventListeners();
  },
  addEventListeners : function() {
    window.addEventListener('mousedown', function (e) {
      gameArea.keys['LMB'] = (e.type === "mousedown" && event.which === 1);
    });
    window.addEventListener('mouseup', function (e) {
      gameArea.keys['LMB'] = (e.type === "mousedown" && event.which === 1);
    });
    window.addEventListener('keydown', function (e) {
      gameArea.keys[e.keyCode] = (e.type == "keydown");
    });
    window.addEventListener('keyup', function (e) {
      gameArea.keys[e.keyCode] = (e.type == "keydown");
    });
  },
  setGridVertices : function() {
    this.xVertices = this.getXVertices();
    this.yVertices = this.getYVertices();
  },
  getXVertices : function() {
    x = 0;
    vertices = [];
    while (x < this.canvas.width) {
      vertices.push(Math.ceil(x));
      x += this.gridSquareSideLength;
    };
    return vertices;
  },
  getYVertices : function() {
    y = this.firstMushroomLayer;
    vertices = [];
    while (y < this.canvas.height * 0.75) {
      vertices.push(Math.ceil(y));
      y += this.gridSquareSideLength;
    };
    return vertices;
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  },
  initialize: function() {
    this.canvas.width = knobsAndLevers.canvasWidth;
    this.canvas.height = knobsAndLevers.canvasHeight;
    this.gridSquareSideLength = knobsAndLevers.gridSquareSideLength;
    this.firstMushroomLayer = this.gridSquareSideLength * 2;
    this.setGridVertices();
    console.log("gameArea initialized");
  }
};

// one property of an object can't be used to set another if they are both generated at object create time
// so we call a setParameters function to update them after the object has been created
gameArea.initialize();
