/*jslint white: true */
var texts = {
  init : function() {
    this.livesDisplay = new Component(this.getLivesParams());
    this.level = new Component(this.getLevelParams());
    this.pausedMessage = new Component(this.getPausedMessageParams());
    this.diedText = new Component(this.getDiedTextParams());
    this.gameOver = new Component(this.getGameOverTextParams());
    console.log("texts initialized");
  },
  copyBaseMessageParams : function() {
    return Object.assign({}, knobsAndLevers.baseTextParams);
  },
  copyBaseTextBackgroundParams : function() {
    return Object.assign({}, knobsAndLevers.baseTextBackgroundParams);
  },
  getLevelParams : function() {
    let levelParams = this.copyBaseMessageParams();
    levelParams.x = game.gameArea.canvas.width * 0.6;
    levelParams.y = knobsAndLevers.gameInfoTextHeight;
    return levelParams;
  },
  getLivesParams : function() {
    let livesParams = this.copyBaseMessageParams();
    livesParams.x = game.gameArea.canvas.width * 0.4;
    livesParams.y = knobsAndLevers.gameInfoTextHeight;
    return livesParams;
  },
  getDiedTextParams : function() {
    let diedTextParams = this.copyBaseMessageParams();
    diedTextParams.fontSize = (knobsAndLevers.gridSquareSideLength * 1.5) + "px";
    diedTextParams.y = game.gameArea.canvas.height * 0.75;
    let backgroundParams = this.copyBaseTextBackgroundParams();
    backgroundParams.height *= 1.5;
    backgroundParams.y = (diedTextParams.y - backgroundParams.height) * 1.01;
    diedTextParams.background = new Component(backgroundParams);
    return diedTextParams;
  },
  getPausedMessageParams : function() {
    let pausedMessageTextParams = this.copyBaseMessageParams();
    pausedMessageTextParams.y = game.gameArea.canvas.height * 0.9;
    let backgroundParams = this.copyBaseTextBackgroundParams();
    backgroundParams.y = (pausedMessageTextParams.y - backgroundParams.height) * 1.01;
    pausedMessageTextParams.background = new Component(backgroundParams);
    return pausedMessageTextParams;
  },
  getGameOverTextParams : function() {
    let gameOverTextParams = this.copyBaseMessageParams();
    gameOverTextParams.fontSize = (knobsAndLevers.gridSquareSideLength * 3) + "px";
    gameOverTextParams.color = "navy";
    gameOverTextParams.y = game.gameArea.canvas.height * 0.5;
    let backgroundParams = this.copyBaseTextBackgroundParams();
    backgroundParams.height *= 3;
    backgroundParams.y = (gameOverTextParams.y - backgroundParams.height) * 1.05;
    gameOverTextParams.background = new Component(backgroundParams);
    return gameOverTextParams;
  }
}

texts.init();