/*jslint white: true */
var metrics = {
  lives : knobsAndLevers.defaultLives,
  currentLevel : knobsAndLevers.startLevel,
  scoreValue : 0,
  init : function() {
    var scoreParams = Object.assign({}, knobsAndLevers.baseTextParams);
    scoreParams.x = gameArea.canvas.width/10;
    scoreParams.y = knobsAndLevers.gameInfoTextHeight;
    this.score = new component(scoreParams);
    console.log("metrics initialized");
  },
  changeScore : function(change) {
    this.scoreValue += change;
    if (this.scoreValue < 0) {
      this.scoreValue = 0;
    }
  },
  addNewFloatingPoint : function(x, y, points, action) {
    symbol = "+";
    color = "black";
    if (action == "lose") {
      symbol = "-";
      color = "red";
    }
    let pointArgs = {
      fontSize : "20px",
      fontType : "Consolas",
      color : color,
      x : x,
      y : y,
      extraArgs : {type : "text"}
    };
    newPoint = new component(pointArgs);
    newPoint.text = symbol + points;
    newPoint.cycleNumber = 0;
    floatingPoints.push(newPoint);
  },
  updateFloatingPoints : function() {
    for (i = 0; i < floatingPoints.length; i += 1) {
      floatingPoints[i].cycleNumber += 1;
      floatingPoints[i].y -= 1;
      floatingPoints[i].update();
      if (floatingPoints[i].cycleNumber > floatingPointCycleDuration) {
        floatingPoints.splice(i, 1);
      }
    }
  },
  reset : function() {
    this.lives = knobsAndLevers.defaultLives;
    this.currentLevel = 1;
    this.scoreValue = 0;
  }
}

metrics.init();
