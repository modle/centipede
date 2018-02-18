/*jslint white: true */

var score = new component("30px", "Consolas", "black", gameArea.canvas.width/10, 40, "text");
var livesDisplay = new component("30px", "Consolas", "black", gameArea.canvas.width/5*2, 40, "text");
var level = new component("30px", "Consolas", "black", gameArea.canvas.width/3*2, 40, "text");
var pausedMessage = new component("30px", "Consolas", "Black", gameArea.canvas.width/4, gameArea.canvas.height/4, "text");
var diedText = new component("50px", "Consolas", "Black", gameArea.canvas.width/4, gameArea.canvas.height/4, "text");
var levelOverText = new component("40px", "Consolas", "black", gameArea.canvas.width/4, gameArea.canvas.height/5*2, "text");
var gameOver = new component("100px", "Consolas", "navy", gameArea.canvas.width/4, gameArea.canvas.height/2, "text");

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

function resetHud() {
  scoreValue = 0;
  lives = defaultLives;
  currentLevel = 1;
  centipedeHandler.clear();
  clearSpiders();
  mushroomHandler.clear();
}
