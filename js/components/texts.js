/*jslint white: true */
var texts = {
  copyBaseParams : function() {
    return Object.assign({}, knobsAndLevers.baseTextParams);
  },
  getLevelParams : function() {
    let levelParams = this.copyBaseParams();
    levelParams.x = gameArea.canvas.width * 0.6;
    levelParams.y = knobsAndLevers.gameInfoTextHeight;
    return levelParams;
  },
  getLivesParams : function() {
    let livesParams = this.copyBaseParams();
    livesParams.x = gameArea.canvas.width * 0.4;
    livesParams.y = knobsAndLevers.gameInfoTextHeight;
    return livesParams;
  },
  getDiedTextParams : function() {
    let diedTextParams = this.copyBaseParams();
    diedTextParams.fontSize = "50px";
    diedTextParams.y = gameArea.canvas.height * 0.25;
    return diedTextParams;
  },
  getPausedMessageParams : function() {
    let pausedMessageTextParams = this.copyBaseParams();
    pausedMessageTextParams.y = gameArea.canvas.height * 0.25;
    pausedMessageTextParams.background = {
      height : gameArea.gridSquareSideLength,
      width : gameArea.canvas.width,
      color : "lightgrey",
      x : 0,
      extraArgs : {type:"background"},
    };
    console.log('paused message params are', pausedMessageTextParams);
    return pausedMessageTextParams;
  },
  getPausedBackgroundParams : function() {
    let pausedBackgroundParams = {
    };
    return pausedBackgroundParams;
  },
  getLevelOverTextParams : function() {
    let levelOverTextParams = this.copyBaseParams();
    levelOverTextParams.fontSize = "40px";
    levelOverTextParams.y = gameArea.canvas.height * 0.4;
    return levelOverTextParams;
  },
  getGameOverTextParams : function() {
    let gameOverTextParams = this.copyBaseParams();
    gameOverTextParams.fontSize = "100px";
    gameOverTextParams.color = "navy";
    gameOverTextParams.y = gameArea.canvas.height * 0.5;
    return gameOverTextParams;
  },
  initialize : function() {
    this.livesDisplay = new component(this.getLivesParams());
    this.level = new component(this.getLevelParams());

    this.pausedMessage = new component(this.getPausedMessageParams());
    this.pausedMessage.background.y = (this.pausedMessage.y - this.pausedMessage.background.height) * 1.05;
    this.pausedBackground = new component(this.pausedMessage.background);

    this.diedText = new component(this.getDiedTextParams());
    this.levelOverText = new component(this.getLevelOverTextParams());
    this.gameOver = new component(this.getGameOverTextParams());
    console.log("texts initialized");
  }
}

texts.initialize();
