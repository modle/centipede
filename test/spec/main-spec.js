describe('Testing text functions', () => {
  // beforeEach(function () {
  // });
  // it('some test', () => {
  // });
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
  // it('processTriggers does things', () => {

  // });
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
