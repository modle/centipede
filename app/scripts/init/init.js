var init = {
  run : function() {
    console.log('init the things, yo');

    knobsAndLevers.init();

    dom.init();
    game.init();
    initials.init();
    intervalCreatures.init();
    leaderboard.init();
    main.init();
    mainMenu.init();
    menus.init();
    metrics.init();
    players.init();
    sounds.init();
    spiders.init();
    texts.init();

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
};

init.run();
