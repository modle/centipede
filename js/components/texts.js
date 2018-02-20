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
    diedTextParams.background = this.copyBaseTextBackgroundParams();
    diedTextParams.background.height *= 1.5;
    diedTextParams.background.y = (diedTextParams.y - diedTextParams.background.height) * 1.05;
    return diedTextParams;
  },
  getPausedMessageParams : function() {
    let pausedMessageTextParams = this.copyBaseMessageParams();
    pausedMessageTextParams.y = gameArea.canvas.height * 0.25;
    pausedMessageTextParams.background = this.copyBaseTextBackgroundParams();
    pausedMessageTextParams.background.y = (pausedMessageTextParams.y - pausedMessageTextParams.background.height) * 1.05;
    return pausedMessageTextParams;
  },
  getGameOverTextParams : function() {
    let gameOverTextParams = this.copyBaseMessageParams();
    gameOverTextParams.fontSize = "100px";
    gameOverTextParams.color = "navy";
    gameOverTextParams.y = gameArea.canvas.height * 0.5;
    return gameOverTextParams;
  },
  initialize : function() {
    this.livesDisplay = new component(this.getLivesParams());
    this.level = new component(this.getLevelParams());

    this.pausedMessage = new component(this.getPausedMessageParams());
    this.pausedBackground = new component(this.pausedMessage.background);

    this.diedText = new component(this.getDiedTextParams());
    this.diedBackground = new component(this.diedText.background);

    this.gameOver = new component(this.getGameOverTextParams());
    // this.gameOverBackground = new component(this.gameOver.background);

    console.log("texts initialized");
  }
}

texts.initialize();
