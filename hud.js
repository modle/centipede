var score = new component("30px", "Consolas", "black", canvasWidth/10, 40, "text");
var timer = new component("30px", "Consolas", "black", canvasWidth/3, 40, "text");
var livesDisplay = new component("30px", "Consolas", "black", canvasWidth/2, 40, "text");
var level = new component("30px", "Consolas", "black", canvasWidth/3*2, 40, "text");
var pausedMessage = new component("50px", "Consolas", "Black", canvasWidth/4, canvasHeight/4, "text");
var died = new component("50px", "Consolas", "Black", canvasWidth/4, canvasHeight/4, "text");
var levelOver = new component("40px", "Consolas", "black", canvasWidth/4, canvasHeight/5*2, "text");
levelOver.text = "";

var scoreValue = 0;
var defaultLives = 3;
var lives = defaultLives;
var levelTimeLimit = 30;
var currentLevel = 1;

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

function updateTimer() {
  timer.text = getTime();
  timer.update();
}

function updateHud() {
  updateScore();
  updateTimer();
  updateLives();
  updateLevel();
}

function resetHud() {
  scoreValue = 0;
  lives = defaultLives;
}
