/*jslint white: true */

var hudHandler = {
  update : function() {
    this.updateScore();
    this.updateLives();
    this.updateLevel();
  },
  updateLives : function() {
    textHandler.livesDisplay.text = "Lives: " + metrics.lives;
    textHandler.livesDisplay.update();
  },
  updateLevel : function() {
    textHandler.level.text = "Level: " + metrics.currentLevel;
    textHandler.level.update();
  },
  updateScore : function() {
    metrics.score.text = "Score: " + metrics.scoreValue;
    metrics.score.update();
  },
  reset : function() {
    metrics.reset();
    centipedeHandler.clear();
    spiderHandler.clear();
    wormHandler.clear();
    mushroomHandler.clear();
  }
}
