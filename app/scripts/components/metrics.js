/*jslint white: true */
var metrics = {
  floatingPoints : [],
  floatingPointCycleDuration : 50,
  init : function() {
    this.lives = knobsAndLevers.defaultLives;
    this.currentLevel = knobsAndLevers.startLevel;
    var scoreParams = Object.assign({}, knobsAndLevers.baseTextParams);
    scoreParams.x = game.gameArea.canvas.width / 10;
    scoreParams.y = knobsAndLevers.gameInfoTextHeight;
    this.score = new Component(scoreParams);
    this.score.value = 0;
    console.log("metrics initialized");
  },
  changeScore : function(change) {
    this.score.value += change;
    if (this.score.value < 0) {
      this.score.value = 0;
    }
  },
  addNewFloatingPoint : function(x, y, points, action) {
    let newPoint = this.getNewPoint(x, y);
    newPoint.color = action == 'lose' ? 'red' : 'black';
    newPoint.text = (action == 'lose' ? '-' : '+') + points;
    newPoint.cycleNumber = 0;
    this.floatingPoints.push(newPoint);
  },
  getNewPoint : function(x, y) {
    let args = {
      fontSize : (knobsAndLevers.gridSquareSideLength * 0.8) + "px",
      fontType : "Arial",
      color : "black",
      x : x,
      y : y,
      extraArgs : {type : "text"},
    };
    return new Component(args);
  },
  manage : function() {
    for (i = 0; i < this.floatingPoints.length; i += 1) {
      this.floatingPoints[i].cycleNumber += 1;
      this.floatingPoints[i].y -= 1;
      this.floatingPoints[i].update();
      if (this.floatingPoints[i].cycleNumber > this.floatingPointCycleDuration) {
        this.floatingPoints.splice(i, 1);
      }
    }
  },
  reset : function() {
    this.lives = knobsAndLevers.defaultLives;
    this.currentLevel = 1;
    this.score.value = 0;
  }
}
