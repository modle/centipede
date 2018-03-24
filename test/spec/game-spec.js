describe('Testing game functions', () => {
  beforeEach(function() {
    testObj = Object.assign({}, game);
    testObj.init();
    spyOn(testObj.gameArea, 'start');
    spyOn(testObj.gameArea, 'stop');
    knobsAndLevers.init();
  });
  it('game gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
  it('start calls isMobile', () => {
    spyOn(supporting, 'isMobile');
    testObj.start();
    expect(supporting.isMobile).toHaveBeenCalled();
  });
  it('start calls gameArea.start and game is paused when isMobile is false', () => {
    spyOn(supporting, 'isMobile').and.returnValue(false);
    testObj.start();
    expect(testObj.gameArea.start).toHaveBeenCalled();
    expect(testObj.paused).toBeTruthy();
  });
  it('start calls gameArea.stop when isMobile is true', () => {
    spyOn(supporting, 'isMobile').and.returnValue(true);
    testObj.start();
    expect(testObj.gameArea.stop).toHaveBeenCalled();
  });
  it('reset calls gameArea.stop, hud.reset, and game.start', () => {
    spyOn(hud, 'reset');
    spyOn(testObj, 'start');
    testObj.reset();
    expect(testObj.gameArea.stop).toHaveBeenCalled();
    expect(testObj.start).toHaveBeenCalled();
  });
  it('isLevelOver returns true when level end conditions are met', () => {
    centipedes.numberSpawned = 10;
    centipedes.numberKilled = 10;
    testObj.gameArea.frameNo = 10;
    actual = testObj.levelIsOver();
    expect(actual).toBeTruthy();
  });
  it('levelOver is set to false when level end conditions are not met', () => {
    centipedes.numberSpawned = 10;
    centipedes.numberKilled = 9;
    actual = testObj.levelIsOver();
    expect(actual).toBeFalsy();
  });
  it('startNextFrame clears gameArea and increments frameNo', () => {
    spyOn(testObj.gameArea, 'clear');
    testObj.gameArea.frameNo = 0;
    let expectedFrameNo = 1;
    testObj.startNextFrame();
    expect(testObj.gameArea.clear).toHaveBeenCalled();
    expect(testObj.gameArea.frameNo).toEqual(expectedFrameNo);
  });
  it('manageLevel appropriately manages level', () => {
    spyOn(testObj, 'resetSomeThings');
    metrics.currentLevel = 1;
    let expectedLevel = 2;
    testObj.manageLevel();
    expect(testObj.levelOver).toBeFalsy();
    expect(testObj.resetSomeThings).toHaveBeenCalled();
    expect(metrics.currentLevel).toEqual(expectedLevel);
  });
  it('setDiedText sets died text', () => {
    texts.init();
    spyOn(texts.diedText, 'update');
    let expectedText = "You died.";
    testObj.setDiedText();
    expect(texts.diedText.text).toEqual(expectedText);
    expect(texts.diedText.update).toHaveBeenCalled();
  });
  it('playDiedSound calls sounds.playerDied.play', () => {
    sounds.init();
    spyOn(sounds.playerDied, 'play');
    testObj.playDiedSound();
    expect(sounds.playerDied.play).toHaveBeenCalled();
  });
  it('managePause manages pause', () => {
    texts.init();
    spyOn(texts.pausedMessage, 'update');
    let expectedText = "Paused";
    spyOn(window, 'stopAllSounds');
    testObj.managePause();
    expect(texts.pausedMessage.text).toEqual(expectedText);
    expect(texts.pausedMessage.update).toHaveBeenCalled();
    expect(window.stopAllSounds).toHaveBeenCalled();
  });
  it('manageDeath manages death', () => {
    spyOn(testObj, 'resetMoreThings');
    texts.init();
    game.init();
    spyOn(texts.diedText, 'update');
    let expectedText = "";
    testObj.manageDeath();
    expect(testObj.resetMoreThings).toHaveBeenCalled();
    expect(texts.diedText.text).toEqual(expectedText);
    expect(player.died).toBeFalsy();
  });
  it('manageGameOver calls gameOver functions when game is over', () => {
    testObj.gameOver = true;
    spyOn(window, 'stopAllSounds');
    spyOn(testObj, 'showGameOver');
    testObj.manageGameOver();
    expect(window.stopAllSounds).toHaveBeenCalled();
    expect(testObj.showGameOver).toHaveBeenCalled();
  });
  it('manageGameOver does nothing if game is not over', () => {
    testObj.gameOver = false;
    spyOn(window, 'stopAllSounds');
    spyOn(testObj, 'showGameOver');
    testObj.manageGameOver();
    expect(window.stopAllSounds).not.toHaveBeenCalled();
    expect(testObj.showGameOver).not.toHaveBeenCalled();
  });
  it('showGameOver stops gameArea and manages gameOver text', () => {
    texts.init();
    spyOn(texts.gameOver, 'update');
    let expectedText = "Game Over";
    testObj.showGameOver();
    expect(texts.gameOver.text).toEqual(expectedText);
    expect(texts.gameOver.update).toHaveBeenCalled();
    expect(testObj.gameArea.stop).toHaveBeenCalled();
  });
  it('resetSomeThings only resets a few things', () => {
    spyOn(centipedes, 'clear');
    spyOn(lasers, 'clear');
    testObj.gameArea.frameNo = 10;
    let expected = 0;
    testObj.resetSomeThings();
    expect(centipedes.clear).toHaveBeenCalled();
    expect(lasers.clear).toHaveBeenCalled();
    expect(testObj.gameArea.frameNo === 0);
  });
  it('resetMoreThings resets more things', () => {
    spyOn(testObj, 'resetSomeThings');
    spyOn(intervalCreatures, 'clear');
    spyOn(spiders, 'clear');
    spyOn(player, 'reset');
    testObj.resetMoreThings();
    expect(testObj.resetSomeThings).toHaveBeenCalled();
    expect(intervalCreatures.clear).toHaveBeenCalled();
    expect(spiders.clear).toHaveBeenCalled();
    expect(player.reset).toHaveBeenCalled();
  });
});
