describe('Testing text functions', () => {
  it('updateGameState calls delegate functions', () => {
    spyOn(window, 'detectGamePad');
    spyOn(window, 'processTriggers').and.returnValue(false);
    spyOn(window, 'prepTheCanvas');
    spyOn(window, 'manageGameObjects');

    updateGameState();

    expect(window.detectGamePad).toHaveBeenCalled();
    expect(window.processTriggers).toHaveBeenCalled();
    expect(window.prepTheCanvas).toHaveBeenCalled();
    expect(window.manageGameObjects).toHaveBeenCalled();
  });
  it('updateGameState returns after process triggers if true', () => {
    spyOn(window, 'detectGamePad');
    spyOn(window, 'processTriggers').and.returnValue(true);
    spyOn(window, 'prepTheCanvas');
    spyOn(window, 'manageGameObjects');

    updateGameState();

    expect(window.detectGamePad).toHaveBeenCalled();
    expect(window.processTriggers).toHaveBeenCalled();
    expect(window.prepTheCanvas).not.toHaveBeenCalled();
    expect(window.manageGameObjects).not.toHaveBeenCalled();
  });
  it('updateGameState returns after process triggers if true', () => {
    spyOn(controls, 'checkControllerState');
    spyOn(controls, 'handleGamePause');

    detectGamePad();

    expect(controls.checkControllerState).toHaveBeenCalled();
    expect(controls.handleGamePause).toHaveBeenCalled();
  });
  it('processTriggers delegates to trigger tests', () => {
    spyOn(window, 'checkPlayerDied');
    spyOn(window, 'checkLevelOver');
    spyOn(window, 'checkGameOver');
    spyOn(window, 'checkPause');

    processTriggers();

    expect(window.checkPlayerDied).toHaveBeenCalled();
    expect(window.checkLevelOver).toHaveBeenCalled();
    expect(window.checkGameOver).toHaveBeenCalled();
    expect(window.checkPause).toHaveBeenCalled();
  });
  it('checkPlayerDied returns false if player is not dead', () => {
    let expected = false;
    player.died = expected;

    let actual = checkPlayerDied();

    expect(actual).toEqual(expected);
  });
  it('checkPlayerDied handles death event if delay counter is 0', () => {
    let expected = true;
    player.died = expected;
    game.delayed = 0;
    spyOn(game, 'setDiedText');
    spyOn(game, 'playDiedSound');

    let actual = checkPlayerDied();

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

    let actual = checkPlayerDied();

    expect(actual).toEqual(expected);
    expect(game.delayed).toEqual(2);
  });
  it('checkPlayerDied resets death event if delay counter reaches delayEndTime', () => {
    let expected = true;
    player.died = expected;
    game.delayed = 10;
    game.delayEndTime = 10;
    spyOn(game, 'manageDeath');

    let actual = checkPlayerDied();

    expect(actual).toEqual(expected);
    expect(game.delayed).toEqual(0);
  });
  it('checkLevelOver returns false if level is not over', () => {
    let expected = false;
    spyOn(game, 'levelIsOver').and.returnValue(expected);
    spyOn(game, 'manageLevel');

    let actual = checkLevelOver();

    expect(actual).toEqual(expected);
    expect(game.levelIsOver).toHaveBeenCalled();
  });
  it('checkLevelOver calls delegate and returns true if level is over', () => {
    let expected = true;
    spyOn(game, 'levelIsOver').and.returnValue(expected);
    spyOn(game, 'manageLevel');

    let actual = checkLevelOver();

    expect(actual).toEqual(expected);
    expect(game.levelIsOver).toHaveBeenCalled();
    expect(game.manageLevel).toHaveBeenCalled();
  });
  it('checkGameOver returns false if game is not over', () => {
    let expected = false;
    game.gameOver = expected;

    let actual = checkGameOver();

    expect(actual).toEqual(expected);
  });
  it('checkGameOver calls delegate and returns true if game is over', () => {
    let expected = true;
    game.gameOver = expected;
    spyOn(game, 'manageGameOver');

    let actual = checkGameOver();

    expect(actual).toEqual(expected);
    expect(game.manageGameOver).toHaveBeenCalled();
  });
  it('checkPause returns false if game is not paused', () => {
    let expected = false;
    game.paused = expected;

    let actual = checkPause();

    expect(actual).toEqual(expected);
  });
  it('checkPause calls delgate and returns true if game is paused', () => {
    let expected = true;
    game.paused = expected;
    spyOn(game, 'managePause');

    let actual = checkPause();

    expect(actual).toEqual(expected);
    expect(game.managePause).toHaveBeenCalled();
  });
  it('prepTheCanvas calls delegate functions', () => {
    spyOn(game, 'startNextFrame');
    spyOn(window, 'manageSounds');
    spyOn(hud, 'update');

    prepTheCanvas();

    expect(game.startNextFrame).toHaveBeenCalled();
    expect(window.manageSounds).toHaveBeenCalled();
    expect(hud.update).toHaveBeenCalled();
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

    manageGameObjects();

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
