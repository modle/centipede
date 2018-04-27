var customComponents = {
  // TODO move drawComponent to canvas-libs
  drawComponent : function(ctx, obj) {
    let key = this.imageKeys[obj.type](obj);
    if (!obj.images) {
      throw 'no images; images is ' + obj.images;
    };
    if (!obj.images[key]) {
      throw 'no key match; images is ' + obj.images;
    };
    ctx.drawImage(obj.images[key].image, obj.x, obj.y, obj.width, obj.height);
  },
  imageKeys : {
    'centipede' : function(obj) {return customComponents.getCentipedeDirection(obj);},
    'player' : function(obj) {return obj.name ? obj.name : 'player1';},
    'spider' : function(obj) {return 'one';},
    'mushroom' : function(obj) {return (obj.poisoned ? 'poisoned' : 'normal') + obj.hitPoints;},
    'worm' : function(obj) {return obj.speedX > 0 ? 'two' : 'one';},
    'fly' : function(obj) {return 'one';},
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
