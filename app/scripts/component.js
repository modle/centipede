var customComponents = {
  // TODO move drawComponent to canvas-libs
  imageKeys : {
    'centipede' : function(obj) {return customComponents.getCentipedeDirection(obj);},
    'fly' : function(obj) {return 'one';},
    'mushroom' : function(obj) {return (obj.poisoned ? 'poisoned' : 'normal') + obj.hitPoints;},
    'player' : function(obj) {return obj.name ? obj.name : 'player1';},
    'spider' : function(obj) {return 'one';},
    'worm' : function(obj) {return obj.speedX > 0 ? 'two' : 'one';},
  },
  getCentipedeDirection : function(obj) {
    let direction = '';
    if (obj.moveVertically) {
      direction = obj.directionY > 0 ? 'down' : 'up';
    } else {
      direction = obj.directionX > 0 ? 'right' : 'left';
    };
    return direction;
  },
};
