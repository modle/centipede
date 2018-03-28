describe('Testing text functions', () => {
  it('updateGameState calls delegate functions', () => {
    spyOn(main, 'detectGamePad');
    spyOn(menus, 'processMenus').and.returnValue(false);
    spyOn(main, 'processTriggers').and.returnValue(false);
    spyOn(main, 'prepTheCanvas');
    spyOn(main, 'manageGameObjects');

    main.updateGameState();

    expect(main.detectGamePad).toHaveBeenCalled();
    expect(menus.processMenus).toHaveBeenCalled();
    expect(main.processTriggers).toHaveBeenCalled();
    expect(main.prepTheCanvas).toHaveBeenCalled();
    expect(main.manageGameObjects).toHaveBeenCalled();
  });
  it('updateGameState returns after process triggers if true', () => {
    spyOn(main, 'detectGamePad');
    spyOn(menus, 'processMenus').and.returnValue(false);
    spyOn(main, 'processTriggers').and.returnValue(true);
    spyOn(main, 'prepTheCanvas');
    spyOn(main, 'manageGameObjects');

    main.updateGameState();

    expect(main.detectGamePad).toHaveBeenCalled();
    expect(menus.processMenus).toHaveBeenCalled();
    expect(main.processTriggers).toHaveBeenCalled();
    expect(main.prepTheCanvas).not.toHaveBeenCalled();
    expect(main.manageGameObjects).not.toHaveBeenCalled();
  });
  it('updateGameState returns after drawMenu', () => {
    spyOn(main, 'detectGamePad');
    spyOn(menus, 'processMenus').and.returnValue(true);
    spyOn(main, 'processTriggers').and.returnValue(true);
    spyOn(main, 'prepTheCanvas');
    spyOn(main, 'manageGameObjects');

    main.updateGameState();

    expect(main.detectGamePad).toHaveBeenCalled();
    expect(menus.processMenus).toHaveBeenCalled();
    expect(main.processTriggers).not.toHaveBeenCalled();
    expect(main.prepTheCanvas).not.toHaveBeenCalled();
    expect(main.manageGameObjects).not.toHaveBeenCalled();
  });

  it('detectGamePad delegates to check controller state and handle game pause', () => {
    spyOn(controls, 'checkControllerState');
    spyOn(controls, 'handleGamePause');

    main.detectGamePad();

    expect(controls.checkControllerState).toHaveBeenCalled();
    expect(controls.handleGamePause).toHaveBeenCalled();
  });

  it('processTriggers delegates to trigger checks and returns on true', () => {
    spyOn(main, 'checkPlayerDied').and.returnValue(false);
    spyOn(main, 'checkLevelOver').and.returnValue(true);
    spyOn(main, 'checkGameOver').and.returnValue(false);
    spyOn(main, 'checkPause').and.returnValue(false);

    let result = main.processTriggers();

    expect(result).toBeTruthy();
    expect(main.checkPlayerDied).toHaveBeenCalled();
    expect(main.checkLevelOver).toHaveBeenCalled();
    expect(main.checkGameOver).not.toHaveBeenCalled();
    expect(main.checkPause).not.toHaveBeenCalled();
  });
  it('processTriggers delegates to all trigger checks and returns false when all are false', () => {
    spyOn(main, 'checkPlayerDied').and.returnValue(false);
    spyOn(main, 'checkLevelOver').and.returnValue(false);
    spyOn(main, 'checkGameOver').and.returnValue(false);
    spyOn(main, 'checkPause').and.returnValue(false);

    let result = main.processTriggers();

    expect(result).toBeFalsy();
    expect(main.checkPlayerDied).toHaveBeenCalled();
    expect(main.checkLevelOver).toHaveBeenCalled();
    expect(main.checkGameOver).toHaveBeenCalled();
    expect(main.checkPause).toHaveBeenCalled();
  });

  it('checkPlayerDied returns false if player is not dead', () => {
    let expected = false;
    player.died = expected;

    let actual = main.checkPlayerDied();

    expect(actual).toEqual(expected);
  });
  it('checkPlayerDied handles death event if delay counter is 0', () => {
    let expected = true;
    player.died = expected;
    game.delayed = 0;
    spyOn(game, 'setDiedText');
    spyOn(game, 'playDiedSound');

    let actual = main.checkPlayerDied();

    expect(actual).toEqual(expected);
    expect(game.setDiedText).toHaveBeenCalled();
    expect(game.playDiedSound).toHaveBeenCalled();
    expect(game.delayed).toEqual(1);
  });
  it('checkPlayerDied delays a frame if delay counter is between 0 and delayEndTime', () => {
    let expected = true;
    player.died = expected;
    game.delayed = 1;
    game.delayEndTime = 10;

    let actual = main.checkPlayerDied();

    expect(actual).toEqual(expected);
    expect(game.delayed).toEqual(2);
  });
  it('checkPlayerDied resets death event if delay counter reaches delayEndTime', () => {
    let expected = true;
    player.died = expected;
    game.delayed = 10;
    game.delayEndTime = 10;
    spyOn(game, 'manageDeath');

    let actual = main.checkPlayerDied();

    expect(actual).toEqual(expected);
    expect(game.delayed).toEqual(0);
  });
  it('checkLevelOver returns false if level is not over', () => {
    let expected = false;
    spyOn(game, 'levelIsOver').and.returnValue(expected);
    spyOn(game, 'manageLevel');

    let actual = main.checkLevelOver();

    expect(actual).toEqual(expected);
    expect(game.levelIsOver).toHaveBeenCalled();
  });
  it('checkLevelOver calls delegate and returns true if level is over', () => {
    let expected = true;
    spyOn(game, 'levelIsOver').and.returnValue(expected);
    spyOn(game, 'manageLevel');

    let actual = main.checkLevelOver();

    expect(actual).toEqual(expected);
    expect(game.levelIsOver).toHaveBeenCalled();
    expect(game.manageLevel).toHaveBeenCalled();
  });
  it('checkGameOver returns false if game is not over', () => {
    let expected = false;
    game.gameOver = expected;

    let actual = main.checkGameOver();

    expect(actual).toEqual(expected);
  });
  it('checkGameOver calls delegate and returns true if game is over', () => {
    let expected = true;
    game.gameOver = expected;
    spyOn(game, 'manageGameOver');

    let actual = main.checkGameOver();

    expect(actual).toEqual(expected);
    expect(game.manageGameOver).toHaveBeenCalled();
  });
  it('checkPause returns false if game is not paused', () => {
    let expected = false;
    game.paused = expected;

    let actual = main.checkPause();

    expect(actual).toEqual(expected);
  });
  it('checkPause calls delgate and returns true if game is paused', () => {
    let expected = true;
    game.paused = expected;
    spyOn(game, 'managePause');

    let actual = main.checkPause();

    expect(actual).toEqual(expected);
    expect(game.managePause).toHaveBeenCalled();
  });
  it('prepTheCanvas calls delegate functions', () => {
    showMenu = false;
    showInstructions = false;

    spyOn(game, 'startNextFrame');
    spyOn(window, 'manageSounds');
    spyOn(hud, 'update');

    main.prepTheCanvas();

    expect(game.startNextFrame).toHaveBeenCalled();
    expect(window.manageSounds).toHaveBeenCalled();
    expect(hud.update).toHaveBeenCalled();
  });
  it('prepTheCanvas does not call hud if showMenu is true', () => {
    showMenu = true;
    spyOn(game, 'startNextFrame');
    spyOn(window, 'manageSounds');
    spyOn(hud, 'update');

    main.prepTheCanvas();

    expect(game.startNextFrame).toHaveBeenCalled();
    expect(window.manageSounds).toHaveBeenCalled();
    expect(hud.update).not.toHaveBeenCalled();
  });
  it('manageGameObjects calls delegate functions', () => {
    spyOn(mushrooms, 'manage');
    spyOn(centipedes, 'manage');
    spyOn(intervalCreatures, 'manage');
    spyOn(spiders, 'manage');
    spyOn(lasers, 'manage');
    spyOn(player, 'manage');
    spyOn(collisions, 'check');
    spyOn(metrics, 'manage');

    main.manageGameObjects();

    expect(mushrooms.manage).toHaveBeenCalled();
    expect(centipedes.manage).toHaveBeenCalled();
    expect(intervalCreatures.manage).toHaveBeenCalled();
    expect(spiders.manage).toHaveBeenCalled();
    expect(lasers.manage).toHaveBeenCalled();
    expect(player.manage).toHaveBeenCalled();
    expect(collisions.check).toHaveBeenCalled();
    expect(metrics.manage).toHaveBeenCalled();
  });
});
