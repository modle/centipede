var customComponents = {
  // TODO move drawComponent to canvas-libs
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
