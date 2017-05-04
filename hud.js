/*jslint white: true */

var score = new component("30px", "Consolas", "black", canvasWidth/10, 40, "text");
var livesDisplay = new component("30px", "Consolas", "black", canvasWidth/5*2, 40, "text");
var level = new component("30px", "Consolas", "black", canvasWidth/3*2, 40, "text");
var pausedMessage = new component("30px", "Consolas", "Black", canvasWidth/4, canvasHeight/4, "text");
var diedText = new component("50px", "Consolas", "Black", canvasWidth/4, canvasHeight/4, "text");
var levelOverText = new component("40px", "Consolas", "black", canvasWidth/4, canvasHeight/5*2, "text");

var scoreValue = 0;
var defaultLives = 3;
var lives = defaultLives;
var levelTimeLimit = 30;
var currentLevel = 1;

function updateHud() {
  updateScore();
  updateLives();
  updateLevel();
}

function changeScore(change) {
  scoreValue += change;
  if (scoreValue < 0) {
    scoreValue = 0;
  }
}

function updateLives() {
  livesDisplay.text = "Lives: " + lives;
  livesDisplay.update();
}

function updateLevel() {
  level.text = "Level: " + currentLevel;
  level.update();
}

function updateScore() {
  score.text = "Score: " + scoreValue;
  score.update();
}
