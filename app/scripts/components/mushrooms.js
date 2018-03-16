/*jslint white: true */
var mushrooms = {
  mushrooms : [],
  manage : function() {
    if (game.gameArea.frameNo == 1) {
      this.spawn(knobsAndLevers.maxMushrooms);
    };
    this.update();
  },
  spawn : function(amount) {
    while (this.mushrooms.length < amount) {
      x = game.gameArea.xVertices[Math.floor(Math.random() * game.gameArea.xVertices.length)];
      y = game.gameArea.yVertices[Math.floor(Math.random() * game.gameArea.yVertices.length)];
      if (x < game.gameArea.canvas.width - knobsAndLevers.coordinateScaleFactor) {
        this.mushrooms.push(this.generate(x, y));
      };
    };
  },
  generate : function(x, y) {
    let mushroomArgs = {
      width: knobsAndLevers.mushroomSide,
      height : knobsAndLevers.mushroomSide,
      color : "teal",
      x : x + knobsAndLevers.coordinateScaleFactor,
      y : y + knobsAndLevers.coordinateScaleFactor,
      extraArgs : {type : "mushroom"}
    };
    mushroom = new Component(mushroomArgs);
    mushroom.pointValue = metrics.currentLevel;
    mushroom.hitPoints = 4;
    return mushroom;
  },
  update : function() {
    for (i = 0; i < this.mushrooms.length; i += 1) {
      this.mushrooms[i].update();
    };
  },
  clear : function() {
    this.mushrooms = [];
  },
};
