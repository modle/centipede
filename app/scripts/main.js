var main = {
  init : function() {
    Object.assign(this, mainBase);
    supporting.applyOverrides(this);
    console.log('main initialized');
  },
  functionOverrides : {
    manageGameObjects : function() {
      metrics.manage();
      mushrooms.manage();
      centipedes.manage();
      gameObjects.manage();
      lasers.manage();
      players.manage();
      collisions.check();
    },
  },
};
