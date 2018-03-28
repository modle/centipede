var init = {
  run : function() {
    console.log('init the things, yo');
    knobsAndLevers.init();
    game.init();
    metrics.init();
    player.init();
    spiders.init();
    dom.init();
    sounds.init();
    texts.init();
    intervalCreatures.init();
    menus.init();
    console.log("game initialized");
  },
  afterGameOver : function() {
    console.log('reset the things, yo');
    knobsAndLevers.init();
    metrics.init();
    player.init();
    spiders.init();
    texts.init();
    intervalCreatures.init();
    menus.init();
    console.log("game reset");
  },
}

init.run();
