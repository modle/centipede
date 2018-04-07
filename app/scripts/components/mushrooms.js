/*jslint white: true */
var mushrooms = {
  mushrooms : [],
  manage : function() {
    if (game.gameArea.frameNo == 1) {
      this.spawn(knobsAndLevers.game.maxMushrooms);
    };
    this.update();
  },
  spawn : function(amount) {
    while (this.mushrooms.length < amount) {
      this.make(this.getCoordinates(), 'teal');
    };
  },
  getCoordinates : function() {
    let coordinates = {x : 0, y : 0};
    coordinates.x = game.gameArea.xVertices[Math.floor(Math.random() * game.gameArea.xVertices.length)];
    coordinates.y = game.gameArea.yVertices[Math.floor(Math.random() * game.gameArea.yVertices.length)];
    return coordinates;
  },
  make : function(coordinates, color) {
    if (coordinates.x == undefined || coordinates.y == undefined) {
      throw new Error('coordinate error: x: ' + coordinates.x + ', y: ' + coordinates.y);
    };
    if (coordinates.x < game.gameArea.canvas.width - knobsAndLevers.mushrooms.scaleFactor) {
      this.mushrooms.push(this.generate(coordinates, color));
    };
  },
  generate : function(coordinates, color) {
    let mushroomArgs = {
      width: knobsAndLevers.mushrooms.side,
      height : knobsAndLevers.mushrooms.side,
      color : color,
      x : coordinates.x + knobsAndLevers.mushrooms.scaleFactor,
      y : coordinates.y + knobsAndLevers.mushrooms.scaleFactor,
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
