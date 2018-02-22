/*jslint white: true */
var displayObjectPrototype = {
  manage : function() {
    this.spawn();
    this.update();
    this.clearOutsideCanvas();
  },
  spawn : function() {
    // look we're spawning things
  },
  clearOutsideCanvas : function() {
    // define me in inheriting object
  }
};
