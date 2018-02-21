/*jslint white: true */
var mushroomPointValue = 1;
var coordinateScaleFactor = gameArea.gridSquareSideLength * 0.1;
var mushroomSide = gameArea.gridSquareSideLength * 0.8;

var mushrooms = {
  mushrooms : [],
  manage : function() {
    if (gameArea.frameNo == 1) {
      this.spawn(knobsAndLevers.maxMushrooms);
    }
    this.update();
  },
  spawn : function(amount) {
    while (this.mushrooms.length < amount) {
      x = gameArea.xVertices[Math.floor(Math.random() * gameArea.xVertices.length)];
      y = gameArea.yVertices[Math.floor(Math.random() * gameArea.yVertices.length)];
      if (x < gameArea.canvas.width - coordinateScaleFactor) {
        this.mushrooms.push(this.generate(x, y));
      }
    }
  },
  generate : function(x, y) {
    let mushroomArgs = {
      width: mushroomSide,
      height : mushroomSide,
      color : "teal",
      x : x + coordinateScaleFactor,
      y : y + coordinateScaleFactor,
      extraArgs : {type : "mushroom"}
    };
    mushroom = new component(mushroomArgs);
    mushroom.pointValue = metrics.currentLevel;
    mushroom.hitPoints = 4;
    return mushroom;
  },
  update : function() {
    for (i = 0; i < this.mushrooms.length; i += 1) {
      this.mushrooms[i].update();
    }
  },
  clear : function() {
    this.mushrooms = [];
  }
}
