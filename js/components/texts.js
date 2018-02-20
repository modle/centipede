/*jslint white: true */
var texts = {
  copyBaseMessageParams : function() {
    return Object.assign({}, knobsAndLevers.baseTextParams);
  },
  copyBaseTextBackgroundParams : function() {
    return Object.assign({}, knobsAndLevers.baseTextBackgroundParams);
  },
  getLevelParams : function() {
    let levelParams = this.copyBaseMessageParams();
    levelParams.x = gameArea.canvas.width * 0.6;
    levelParams.y = knobsAndLevers.gameInfoTextHeight;
    return levelParams;
  },
  getLivesParams : function() {
    let livesParams = this.copyBaseMessageParams();
    livesParams.x = gameArea.canvas.width * 0.4;
    livesParams.y = knobsAndLevers.gameInfoTextHeight;
    return livesParams;
  },
  getDiedTextParams : function() {
    let diedTextParams = this.copyBaseMessageParams();
    diedTextParams.fontSize = "50px";
    diedTextParams.y = gameArea.canvas.height * 0.25;
    let backgroundParams = this.copyBaseTextBackgroundParams();
    backgroundParams.height *= 1.5;
    backgroundParams.y = (diedTextParams.y - backgroundParams.height) * 1.05;
    diedTextParams.background = new component(backgroundParams);
    return diedTextParams;
  },
  getPausedMessageParams : function() {
    let pausedMessageTextParams = this.copyBaseMessageParams();
    pausedMessageTextParams.y = gameArea.canvas.height * 0.25;
    let backgroundParams = this.copyBaseTextBackgroundParams();
    backgroundParams.y = (pausedMessageTextParams.y - backgroundParams.height) * 1.05;
    pausedMessageTextParams.background = new component(backgroundParams);
    return pausedMessageTextParams;
  },
  getGameOverTextParams : function() {
    let gameOverTextParams = this.copyBaseMessageParams();
    gameOverTextParams.fontSize = "100px";
    gameOverTextParams.color = "navy";
    gameOverTextParams.y = gameArea.canvas.height * 0.5;
    let backgroundParams = this.copyBaseTextBackgroundParams();
    backgroundParams.height *= 3;
    backgroundParams.y = (gameOverTextParams.y - backgroundParams.height) * 1.05;
    gameOverTextParams.background = new component(backgroundParams);
    return gameOverTextParams;
  },
  initialize : function() {
    this.livesDisplay = new component(this.getLivesParams());
    this.level = new component(this.getLevelParams());
    this.pausedMessage = new component(this.getPausedMessageParams());
    this.diedText = new component(this.getDiedTextParams());
    this.gameOver = new component(this.getGameOverTextParams());
    console.log("texts initialized");
  }
}

texts.initialize();
