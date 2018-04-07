/*jslint white: true */
var metrics = {
  floatingPoints : [],
  floatingPointCycleDuration : 50,
  lives : {},
  currentLevel : {},
  score : {},
  lastScore : 0,
  init : function() {
    this.lives = knobsAndLevers.player.defaultLives;
    this.currentLevel = knobsAndLevers.game.startLevel;
    let scoreParams = Object.assign({}, knobsAndLevers.text.baseParams);
    scoreParams.x = 100;
    scoreParams.y = knobsAndLevers.text.gameInfoHeight;
    this.score = new Component(scoreParams);
    this.score.value = 0;
    this.livesMarker = new Component(
      {
        x : 700,
        y : knobsAndLevers.text.gameInfoHeight - 15,
        width : knobsAndLevers.player.width,
        height : knobsAndLevers.player.height,
        color : 'red',
      }
    );
    console.log("metrics initialized");
  },
  changeScore : function(change) {
    this.score.value += change;
    if (this.score.value < 0) {
      this.score.value = 0;
    };
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
      fontSize : "15px",
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
      };
    };
  },
  reset : function() {
    this.lives = knobsAndLevers.player.defaultLives;
    this.currentLevel = 1;
    this.lastScore = this.score.value;
    this.score.value = 0;
  },
};
