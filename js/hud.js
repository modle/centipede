/*jslint white: true */

const textTypeArgs = {type:"text"};
var baseTextParams = {
  fontSize : "30px",
  fontType : "Consolas",
  color : "black",
  x : gameArea.canvas.height/4,
  extraArgs : textTypeArgs
};

const gameInfoTextHeight = 40;
var scoreParams = Object.assign({}, baseTextParams);
scoreParams.x = gameArea.canvas.width/10;
scoreParams.y = gameInfoTextHeight;
var livesParams = Object.assign({}, baseTextParams);
livesParams.x = gameArea.canvas.width/5*2;
livesParams.y = gameInfoTextHeight;
var levelParams = Object.assign({}, baseTextParams);
levelParams.x = gameArea.canvas.width/3*2;
levelParams.y = gameInfoTextHeight;

var pausedMessageTextParams = Object.assign({}, baseTextParams);
pausedMessageTextParams.y = gameArea.canvas.height/4;

var diedTextParams = Object.assign({}, baseTextParams);
diedTextParams.fontSize = "50px";
diedTextParams.y = gameArea.canvas.height/4;

var levelOverTextParams = Object.assign({}, baseTextParams);
levelOverTextParams.fontSize = "40px";
levelOverTextParams.y = gameArea.canvas.height/5*2;

var gameOverTextParams = Object.assign({}, baseTextParams);
gameOverTextParams.fontSize = "100px";
gameOverTextParams.color = "navy";
gameOverTextParams.y = gameArea.canvas.height/2;

var score = new component(scoreParams);
var livesDisplay = new component(livesParams);
var level = new component(levelParams);
var pausedMessage = new component(pausedMessageTextParams);
var diedText = new component(diedTextParams);
var levelOverText = new component(levelOverTextParams);
var gameOver = new component(gameOverTextParams);

var scoreValue = 0;
var defaultLives = 3;
var lives = defaultLives;
var levelTimeLimit = 30;
var currentLevel = 1;

var hudHandler = {
  update : function() {
    this.updateScore();
    this.updateLives();
    this.updateLevel();
  },
  changeScore : function(change) {
    scoreValue += change;
    if (scoreValue < 0) {
      scoreValue = 0;
    }
  },
  updateLives : function() {
    livesDisplay.text = "Lives: " + lives;
    livesDisplay.update();
  },
  updateLevel : function() {
    level.text = "Level: " + currentLevel;
    level.update();
  },
  updateScore : function() {
    score.text = "Score: " + scoreValue;
    score.update();
  },
  reset : function() {
    scoreValue = 0;
    lives = defaultLives;
    currentLevel = 1;
    centipedeHandler.clear();
    spiderHandler.clear();
    wormHandler.clear();
    mushroomHandler.clear();
  }
}
