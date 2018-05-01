var texts = {
  textParams : {},
  init : function() {
    this.setTextParams();
    this.buildBackgrounds(this.textParams);
    this.createElements();
    console.log("texts initialized");
  },
  setTextParams : function() {
    this.textParams = {
      level : Object.assign(this.getDefaults(), {
        x : knobsAndLevers.canvas.width * 0.6,
        y : this.getDefaults().gameInfoHeight,
      }),
      lives : Object.assign(this.getDefaults(), {
        x : 720,
        y : this.getDefaults().gameInfoHeight,
      }),
      score : Object.assign(this.getDefaults(), {
        x : 100,
        y : this.getDefaults().gameInfoHeight,
      }),
      died : Object.assign(this.getDefaults(), {
        fontSize : (knobsAndLevers.general.gridSquareSideLength * 1.5) + "px",
        y : knobsAndLevers.canvas.height * 0.75,
        backgroundMultipliers : {
          y : 1.01,
          height : 1.8,
        },
      }),
      paused : Object.assign(this.getDefaults(), {
        y : knobsAndLevers.canvas.height * 0.9,
        backgroundMultipliers : {
          y : 1.01,
          height : 1,
        },
      }),
      gameOver : Object.assign(this.getDefaults(), {
        fontSize : '50px',
        y : knobsAndLevers.canvas.height * 0.5,
        backgroundMultipliers : {
          y : 1.05,
          height : 3,
        },
      }),
    };
  },
  getDefaults : function() {
    return supporting.clone(knobsAndLevers.text.baseParams);
  },
  buildBackgrounds : function(params) {
    Object.keys(params).forEach(key => {
      let multipliers = params[key].backgroundMultipliers;
      if (!multipliers) {
        return;
      };
      let defaults = supporting.clone(knobsAndLevers.text.baseBackgroundParams);
      defaults.height *= multipliers.height;
      defaults.y = (params[key].y - defaults.height) * multipliers.y;
      params[key].background = new Component(defaults);
    });
  },
  createElements : function() {
    this.lives = new Component(this.textParams.lives);
    this.score = new Component(this.textParams.score);
    this.level = new Component(this.textParams.level);
    this.pausedMessage = new Component(this.textParams.paused);
    this.diedText = new Component(this.textParams.died);
    this.gameOver = new Component(this.textParams.gameOver);
  },
};
