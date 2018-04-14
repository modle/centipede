/*jslint white: true */
var mushrooms = {
  mushrooms : [],
  manage : function() {
    if (game.gameArea.frameNo == 1) {
      this.spawn(knobsAndLevers.mushrooms.initialAmount);
    };
    this.update();
  },
  spawn : function(amount) {
    let coordinates = {};
    while (this.mushrooms.length < amount) {
      coordinates = this.getCoordinates();
      // while it is possible this will be an infinite loop
      // it is unlikely so long as maxMushrooms is reasonable
      if (coordinates.y > knobsAndLevers.player.topLimit) {
        continue;
      };
      this.make(coordinates, 'teal');
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
    coordinates.x = supporting.getClosest(game.gameArea.xVertices, coordinates.x);
    coordinates.y = supporting.getClosest(game.gameArea.yVertices, coordinates.y);

    // this works, and should be more efficient than creating the component
    // and running it through the collisions.withMushrooms check
    if (!this.willOverlap(coordinates)) {
      this.mushrooms.push(this.generate(coordinates, color));
    };
  },
  willOverlap : function(coordinates) {
    let scaleFactor = knobsAndLevers.mushrooms.scaleFactor;
    return this.mushrooms.find(mushroom =>
      mushroom.hitPoints > 0
      && mushroom.x - scaleFactor < coordinates.x + 5
      && mushroom.x - scaleFactor > coordinates.x - 5
      && mushroom.y - scaleFactor < coordinates.y + 5
      && mushroom.y - scaleFactor > coordinates.y - 5
    );
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
    mushroom.hitPoints = knobsAndLevers.mushrooms.hitPoints;
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
