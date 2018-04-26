var main = {
  init : function() {
    Object.assign(this, mainBase);
    Object.keys(this.functionOverrides).forEach(element => {
      this[element] = this.functionOverrides[element];
    });
    console.log('main initialized');
  },
  functionOverrides : {
    manageGameObjects : function() {
      metrics.manage();
      mushrooms.manage();
      centipedes.manage();
      intervalCreatures.manage();
      spiders.manage();
      lasers.manage();
      players.manage();
      collisions.check();
    },
  },
};
