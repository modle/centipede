/*jslint white: true */
var hud = {
  update : function() {
    this.updateScore();
    this.updateLives();
    // this.updateLevel();
  },
  updateLives : function() {
    metrics.livesMarker.update();
    texts.livesDisplay.text = metrics.lives.player1;
    texts.livesDisplay.update();
  },
  updateLevel : function() {
    texts.level.text = "Level: " + metrics.currentLevel;
    texts.level.update();
  },
  updateScore : function() {
    metrics.score.player1.text = metrics.score.player1.value;
    metrics.score.player1.update();
  },
};
