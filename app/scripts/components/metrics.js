/*jslint white: true */
var metrics = {
  floatingPoints : [],
  floatingPointCycleDuration : 50,
  lives : 0,
  extraLivesGained : 0,
  currentLevel : {},
  score : {},
  lastScore : 0,
  init : function() {
    this.currentLevel = knobsAndLevers.game.startLevel;
    let scoreParams = Object.assign({}, knobsAndLevers.text.baseParams);
    scoreParams.x = 100;
    scoreParams.y = knobsAndLevers.text.gameInfoHeight;
    this.score = new Component(scoreParams);
    this.score.value = 0;
    this.lives = knobsAndLevers.player.defaultLives;
    this.livesMarker = Object.assign({}, templates.marker);
    console.log("metrics initialized");
  },
  manageScore : function(change) {
    this.changeScore(change);
    this.manageTier();
  },
  changeScore : function(change) {
    this.score.value += change;
    this.score.value = this.score.value < 0 ? 0 : this.score.value;
  },
  manageTier : function() {
    this.setTier();
    let maxTier = knobsAndLevers.game.maxTier;
    let tier = knobsAndLevers.game.tier;
    knobsAndLevers.spider.maxNumber = tier < maxTier ? tier + 1 : maxTier;
    knobsAndLevers.flies.maxNumber = tier < maxTier ? tier + 1 : maxTier;
    if (this.extraLivesGained < tier) {
      this.lives += 1;
      this.extraLivesGained += 1;
      sounds.playExtraLifeSound();
    };
  },
  setTier : function() {
    knobsAndLevers.game.tier = Math.floor((this.score.value + 1) / knobsAndLevers.game.incrementThingsScore) + 1;
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
