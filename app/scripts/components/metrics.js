/*jslint white: true */
var metrics = {
  scoreValue : 0,
  init : function() {
    this.lives = knobsAndLevers.defaultLives;
    this.currentLevel = knobsAndLevers.startLevel;
    var scoreParams = Object.assign({}, knobsAndLevers.baseTextParams);
    scoreParams.x = game.gameArea.canvas.width/10;
    scoreParams.y = knobsAndLevers.gameInfoTextHeight;
    this.score = new Component(scoreParams);
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
      fontSize : (knobsAndLevers.gridSquareSideLength * 0.8) + "px",
      fontType : "Consolas",
      color : color,
      x : x,
      y : y,
      extraArgs : {type : "text"}
    };
    newPoint = new Component(pointArgs);
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
