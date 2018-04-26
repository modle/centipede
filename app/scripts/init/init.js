var init = {
  run : function() {
    console.log('init the things, yo');
    knobsAndLevers.init();
    leaderboard.init();
    templates.init();
    initials.init();
    mainMenu.init();
    menus.init();
    game.init();
    metrics.init();
    spiders.init();
    dom.init();
    sounds.init();
    texts.init();
    intervalCreatures.init();
    console.log("game initialized");
  },
  afterGameOver : function() {
    console.log('reset the things, yo');
    knobsAndLevers.init();
    menus.init();
    metrics.init();
    spiders.init();
    texts.init();
    intervalCreatures.init();
    game.paused = true;
    game.running = false;
    console.log("game reset");
  },
}

init.run();
