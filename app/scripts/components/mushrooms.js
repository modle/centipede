/*jslint white: true */
var mushrooms = {
  mushrooms : [],
  init : function() {
    Object.assign(this, gameObjectsBase);
    supporting.applyOverrides(this);
    console.log('mushrooms initialized');
  },
  functionOverrides : {
    manage : function() {
      if (game.gameArea.frameNo == 1) {
        this.spawn(dials.mushrooms.initialAmount);
      };
      this.update();
    },
    spawn : function(amount) {
      let coordinates = {};
      while (this.mushrooms.length < amount) {
        coordinates = this.getCoordinates();
        // while it is possible this will be an infinite loop
        // it is unlikely so long as maxMushrooms is reasonable
        if (coordinates.y > dials.player.topLimit) {
          continue;
        };
        this.make(coordinates, dials.mushrooms.color);
      };
    },
    make : function(coordinates, color) {
      if (coordinates.x == undefined || coordinates.y == undefined) {
        throw new Error('coordinate error: x: ' + coordinates.x + ', y: ' + coordinates.y);
      };
      color = color ? color : dials.mushrooms.color;
      coordinates.x = supporting.getClosest(game.gameArea.xVertices, coordinates.x);
      coordinates.y = supporting.getClosest(game.gameArea.yVertices, coordinates.y);
      let mushroom = this.generate(coordinates, color);
      if (collisions.withMushrooms(mushroom) || this.collidesWithPlayers(mushroom)) {
        return;
      };
      this.mushrooms.push(mushroom);
    },
    generate : function(coordinates, color) {
      let mushroom = new Component(dials.mushrooms.args);
      mushroom.x = coordinates.x + dials.mushrooms.scaleFactor,
      mushroom.y = coordinates.y + dials.mushrooms.scaleFactor,
      mushroom.pointValue = metrics.currentLevel + 1;
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
  },
  getCoordinates : function() {
    let coordinates = {x : 0, y : 0};
    coordinates.x = game.gameArea.xVertices[Math.floor(Math.random() * game.gameArea.xVertices.length)];
    coordinates.y = game.gameArea.yVertices[Math.floor(Math.random() * game.gameArea.yVertices.length)];
    return coordinates;
  },
  collidesWithPlayers : function(mushroom) {
    return Object.keys(players.players).find(key => players.players[key].crashWith(mushroom));
  },
};
