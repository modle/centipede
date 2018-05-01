var metrics = {
  floatingPoints : [],
  floatingPointCycleDuration : 50,
  lives : {player1 : 0, player2 : 0},
  extraLivesGained : 0,
  currentLevel : {},
  score : {player1 : 0, player2 : 0},
  lastScore : 0,
  init : function() {
    this.currentLevel = knobsAndLevers.game.startLevel;
    this.lives.player1 = knobsAndLevers.player.defaultLives;
    this.livesMarker = Object.assign({}, templates.marker);
    console.log("metrics initialized");
  },
  manageScore : function(change) {
    this.changeScore(change);
    this.manageTier();
  },
  changeScore : function(change) {
    this.score.player1 += change;
    this.score.player1 = this.score.player1 < 0 ? 0 : this.score.player1;
  },
  manageTier : function() {
    this.setTier();
    this.manageLives();
  },
  setTier : function() {
    let newTier = Math.floor((this.score.player1 + 1) / knobsAndLevers.game.tier.incrementScore) + 1;
    if (!newTier) {
      throw('problem calculating tier');
    };
    knobsAndLevers.game.tier.update(newTier);
  },
  manageLives : function() {
    if (this.extraLivesGained < knobsAndLevers.game.tier.current - 1) {
      this.lives.player1 += 1;
      this.extraLivesGained += 1;
      sounds.playTierChangeSound();
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
    this.lives.player1 = knobsAndLevers.player.defaultLives;
    this.lives.player2 = knobsAndLevers.player.defaultLives;
    this.currentLevel = 1;
    this.lastScore = this.score.player1;
    this.score.player1 = 0;
  },
};
