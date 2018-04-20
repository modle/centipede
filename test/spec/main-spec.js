describe('MAIN SPEC: ', () => {
  let spec = 'MAIN';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  it('updateGameState calls delegate functions', () => {
    game.init();
    game.running = true;

    spyOn(game.gameArea, 'loadBackground');
    spyOn(controls.gamepad, 'checkState');
    spyOn(menus, 'processMenus');
    spyOn(game.gameArea, 'removeBackground');
    spyOn(main, 'handleGamePause');
    spyOn(main, 'processTriggers').and.returnValue(false);
    spyOn(main, 'prepTheCanvas');
    spyOn(main, 'manageGameObjects');

    main.updateGameState();

    expect(game.gameArea.loadBackground).not.toHaveBeenCalled();
    expect(controls.gamepad.checkState).not.toHaveBeenCalled();
    expect(menus.processMenus).not.toHaveBeenCalled();

    expect(game.gameArea.removeBackground).toHaveBeenCalled();
    expect(main.handleGamePause).toHaveBeenCalled();
    expect(main.processTriggers).toHaveBeenCalled();
    expect(main.prepTheCanvas).toHaveBeenCalled();
    expect(main.manageGameObjects).toHaveBeenCalled();
  });
  it('updateGameState returns after process triggers if true', () => {
    game.running = true;
    game.init();
    spyOn(game.gameArea, 'loadBackground');
    spyOn(controls.gamepad, 'checkState');
    spyOn(menus, 'processMenus');
    spyOn(game.gameArea, 'removeBackground');
    spyOn(main, 'handleGamePause');
    spyOn(main, 'processTriggers').and.returnValue(true);
    spyOn(main, 'prepTheCanvas');
    spyOn(main, 'manageGameObjects');

    main.updateGameState();

    expect(game.gameArea.loadBackground).not.toHaveBeenCalled();
    expect(controls.gamepad.checkState).not.toHaveBeenCalled();
    expect(menus.processMenus).not.toHaveBeenCalled();

    expect(game.gameArea.removeBackground).toHaveBeenCalled();
    expect(main.handleGamePause).toHaveBeenCalled();
    expect(main.processTriggers).toHaveBeenCalled();
    expect(main.prepTheCanvas).not.toHaveBeenCalled();
    expect(main.manageGameObjects).not.toHaveBeenCalled();
  });
  it('updateGameState returns after processMenus when game.running is false', () => {
    game.init();
    game.running = false;
    spyOn(main, 'updateGamepad');
    spyOn(game.gameArea, 'loadBackground');
    spyOn(controls.gamepad, 'checkState');
    spyOn(menus, 'processMenus');
    spyOn(main, 'handleGamePause');
    spyOn(main, 'processTriggers');
    spyOn(main, 'prepTheCanvas');
    spyOn(main, 'manageGameObjects');

    main.updateGameState();

    expect(main.updateGamepad).toHaveBeenCalled();
    expect(game.gameArea.loadBackground).toHaveBeenCalled();
    expect(controls.gamepad.checkState).toHaveBeenCalled();
    expect(menus.processMenus).toHaveBeenCalled();
    expect(main.handleGamePause).not.toHaveBeenCalled();
    expect(main.processTriggers).not.toHaveBeenCalled();
    expect(main.prepTheCanvas).not.toHaveBeenCalled();
    expect(main.manageGameObjects).not.toHaveBeenCalled();
  });

  it('updateGamepad delegates to refreshGamePadData and captureAxes', () => {
    spyOn(controls.gamepad, 'refreshGamepadData');
    spyOn(controls.gamepad, 'captureAxes');

    controls.gamepad.enabledGamepadIndices = new Set([0]);
    main.updateGamepad();

    expect(controls.gamepad.refreshGamepadData).toHaveBeenCalled();
    expect(controls.gamepad.captureAxes).toHaveBeenCalled();
  });
  it('updateGamepad returns when no gamepads detected', () => {
    spyOn(controls.gamepad, 'refreshGamepadData');
    spyOn(controls.gamepad, 'captureAxes');

    controls.gamepad.enabledGamepadIndices = new Set([]);
    main.updateGamepad();

    expect(controls.gamepad.refreshGamepadData).not.toHaveBeenCalled();
    expect(controls.gamepad.captureAxes).not.toHaveBeenCalled();
  });

  it('handleGamePause returns if enough frames since last pause have not passed', () => {
    main.framesToWaitToPauseAgain = 5;

    main.handleGamePause();

    expect(main.framesToWaitToPauseAgain).toBe(4);
  });
  it('handleGamePause calls pause check functions when gamepad pause is pressed', () => {
    main.framesToWaitToPauseAgain = 0;
    spyOn(controls.gamepad, 'pausePressed').and.returnValue(true);
    spyOn(controls.keyboard, 'flowControlButtonPressed').and.returnValue(false);
    game.paused = true;

    main.handleGamePause();

    expect(main.framesToWaitToPauseAgain).toBe(50);
    expect(controls.gamepad.pausePressed).toHaveBeenCalled();
    expect(controls.keyboard.flowControlButtonPressed).not.toHaveBeenCalled();
    expect(game.paused).toBe(false);
  });
  it('handleGamePause calls pause check functions when keyboard pause is pressed', () => {
    main.framesToWaitToPauseAgain = 0;
    spyOn(controls.gamepad, 'pausePressed').and.returnValue(false);
    spyOn(controls.keyboard, 'flowControlButtonPressed').and.returnValue(true);
    game.paused = false;

    main.handleGamePause();

    expect(main.framesToWaitToPauseAgain).toBe(50);
    expect(controls.gamepad.pausePressed).toHaveBeenCalled();
    expect(controls.keyboard.flowControlButtonPressed).toHaveBeenCalled();
    expect(game.paused).toBe(true);
  });
  it('handleGamePause does toggle pause when pause functions return false', () => {
    main.framesToWaitToPauseAgain = 0;
    spyOn(controls.gamepad, 'pausePressed').and.returnValue(false);
    spyOn(controls.keyboard, 'flowControlButtonPressed').and.returnValue(false);
    game.paused = false;

    main.handleGamePause();

    expect(main.framesToWaitToPauseAgain).toBe(0);
    expect(controls.gamepad.pausePressed).toHaveBeenCalled();
    expect(controls.keyboard.flowControlButtonPressed).toHaveBeenCalled();
    expect(game.paused).toBe(false);
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
    spyOn(sounds, 'playDiedSound');

    let actual = main.checkPlayerDied();

    expect(actual).toEqual(expected);
    expect(game.setDiedText).toHaveBeenCalled();
    expect(sounds.playDiedSound).toHaveBeenCalled();
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
    game.running = true;
    spyOn(game, 'startNextFrame');
    spyOn(sounds, 'manageSounds');
    spyOn(hud, 'update');

    main.prepTheCanvas();

    expect(game.startNextFrame).toHaveBeenCalled();
    expect(sounds.manageSounds).toHaveBeenCalled();
    expect(hud.update).toHaveBeenCalled();
  });
  it('prepTheCanvas does not call hud if show.menu is true', () => {
    game.running = false;
    spyOn(game, 'startNextFrame');
    spyOn(sounds, 'manageSounds');
    spyOn(hud, 'update');

    main.prepTheCanvas();

    expect(game.startNextFrame).toHaveBeenCalled();
    expect(sounds.manageSounds).toHaveBeenCalled();
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
