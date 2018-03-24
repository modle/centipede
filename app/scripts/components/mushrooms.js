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
      this.add(this.getCoordinates());
    };
  },
  add : function(coordinates) {
    if (coordinates.x < game.gameArea.canvas.width - knobsAndLevers.coordinateScaleFactor) {
      this.mushrooms.push(this.generate(coordinates));
    };
  },
  getCoordinates : function() {
    let coordinates = {x : 0, y : 0};
    coordinates.x = game.gameArea.xVertices[Math.floor(Math.random() * game.gameArea.xVertices.length)];
    coordinates.y = game.gameArea.yVertices[Math.floor(Math.random() * game.gameArea.yVertices.length)];
    return coordinates;
  },
  generate : function(coordinates) {
    let mushroomArgs = {
      width: knobsAndLevers.mushroomSide,
      height : knobsAndLevers.mushroomSide,
      color : "teal",
      x : coordinates.x + knobsAndLevers.coordinateScaleFactor,
      y : coordinates.y + knobsAndLevers.coordinateScaleFactor,
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
