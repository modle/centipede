/*jslint white: true */

var hudHandler = {
  update : function() {
    this.updateScore();
    this.updateLives();
    this.updateLevel();
  },
  updateLives : function() {
    texts.livesDisplay.text = "Lives: " + metrics.lives;
    texts.livesDisplay.update();
  },
  updateLevel : function() {
    texts.level.text = "Level: " + metrics.currentLevel;
    texts.level.update();
  },
  updateScore : function() {
    metrics.score.text = "Score: " + metrics.scoreValue;
    metrics.score.update();
  },
  reset : function() {
    metrics.reset();
    centipedes.clear();
    spiders.clear();
    worms.clear();
    mushrooms.clear();
  }
}
