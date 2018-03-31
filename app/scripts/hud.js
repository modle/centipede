/*jslint white: true */

var hud = {
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
    metrics.score.text = "Score: " + metrics.score.value;
    metrics.score.update();
  },
  reset : function() {
    metrics.reset();
    centipedes.clear();
    spiders.clear();
    intervalCreatures.clear();
    intervalCreatures.clear();
    mushrooms.clear();
  },
};
