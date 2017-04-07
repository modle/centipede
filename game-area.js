var canvasWidth = getWidth() * .8;
var canvasHeight = getHeight() * .8;

var gamePieceTopLimit = canvasHeight - canvasHeight / 5;

var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    paused = true;
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.timeRemaining = levelTimeLimit;
    // set interval at which function updateGameArea is executed
    // 1000 ms divided by second parameter
    this.interval = setInterval(updateGameArea, intervalDivisor);
    window.addEventListener('keydown', function (e) {
      gameArea.keys = (gameArea.keys || []);
      gameArea.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function (e) {
      gameArea.keys[e.keyCode] = (e.type == "keydown");
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}
