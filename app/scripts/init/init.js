var init = {
  run : function() {
    console.log('start centipede init');

    knobsAndLevers.init();

    dom.init();
    game.init();
    initials.init();
    gameObjects.init();
    leaderboard.init();
    main.init();
    mainMenu.init();
    menus.init();
    metrics.init();
    players.init();
    sounds.init();
    texts.init();
    collisions.init();
    centipedes.init();
    lasers.init();
    gameObjects.init();
    mushrooms.init();

    console.log("centipede game initialized");
  },
  afterGameOver : function() {
    console.log('reset everything');
    knobsAndLevers.init();
    menus.init();
    metrics.init();
    texts.init();
    gameObjects.init();
    game.paused = true;
    game.running = false;
    console.log("game reset");
  },
};
