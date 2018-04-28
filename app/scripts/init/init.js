var init = {
  run : function() {
    console.log('start centipede init');

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

    console.log("centipede game initialized");
  },
  afterGameOver : function() {
    console.log('reset everything');
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
