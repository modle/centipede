describe('GAME SPEC: ', () => {
  let spec = 'GAME';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function() {
    menus.init();
    testObj = Object.assign({}, game);
    testObj.init();
    spyOn(testObj.gameArea, 'start');
    spyOn(testObj.gameArea, 'stop');
    dials.init();
    game.init();
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
    expect(testObj.paused).toBe(true);
  });
  it('start calls gameArea.stop when isMobile is true', () => {
    spyOn(supporting, 'isMobile').and.returnValue(true);

    testObj.start();

    expect(testObj.gameArea.stop).toHaveBeenCalled();
  });
  it('isLevelOver returns true when level end conditions are met', () => {
    centipedes.numberSpawned = 10;
    centipedes.numberKilled = 10;
    testObj.gameArea.frameNo = 10;

    actual = testObj.levelIsOver();

    expect(actual).toBe(true);
  });
  it('levelOver is set to false when level end conditions are not met', () => {
    centipedes.numberSpawned = 10;
    centipedes.numberKilled = 9;

    actual = testObj.levelIsOver();

    expect(actual).toBe(false);
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

    expect(testObj.levelOver).toBe(false);
    expect(testObj.resetSomeThings).toHaveBeenCalled();
    expect(metrics.currentLevel).toEqual(expectedLevel);
  });
  it('setDiedText sets died text', () => {
    texts.init();
    spyOn(texts.diedText, 'update');
    let expectedText = "You died.";

    testObj.setDiedText();

    expect(texts.diedText.text).toBe(expectedText);
    expect(texts.diedText.update).toHaveBeenCalled();
  });
  it('managePause manages pause', () => {
    texts.init();
    spyOn(texts.pausedMessage, 'update');
    let expectedText = "Paused";
    spyOn(sounds, 'stopAllSounds');

    testObj.managePause();

    expect(texts.pausedMessage.text).toBe(expectedText);
    expect(texts.pausedMessage.update).toHaveBeenCalled();
    expect(sounds.stopAllSounds).toHaveBeenCalled();
  });
  it('manageDeath manages death', () => {
    spyOn(testObj, 'resetMoreThings');
    texts.init();
    spyOn(texts.diedText, 'update');
    let expectedText = "";

    testObj.manageDeath();

    expect(testObj.resetMoreThings).toHaveBeenCalled();
    expect(texts.diedText.text).toBe(expectedText);
    expect(player.died).toBe(false);
  });
  it('manageGameOver calls gameOver functions when game is over', () => {
    testObj.gameOver = true;
    spyOn(sounds, 'stopAllSounds');
    spyOn(testObj, 'showGameOver');

    testObj.manageGameOver();

    expect(sounds.stopAllSounds).toHaveBeenCalled();
    expect(testObj.showGameOver).toHaveBeenCalled();
  });
  it('manageGameOver does nothing if game is not over', () => {
    testObj.gameOver = false;
    spyOn(sounds, 'stopAllSounds');
    spyOn(testObj, 'showGameOver');

    testObj.manageGameOver();

    expect(sounds.stopAllSounds).not.toHaveBeenCalled();
    expect(testObj.showGameOver).not.toHaveBeenCalled();
  });
  it('showGameOver stops gameArea and manages gameOver text', () => {
    texts.init();
    spyOn(texts.gameOver, 'update');
    let expectedText = "Game Over";

    testObj.showGameOver();

    expect(texts.gameOver.text).toEqual(expectedText);
    expect(texts.gameOver.update).toHaveBeenCalled();
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
    spyOn(gameObjects, 'clear');
    spyOn(spiders, 'clear');
    spyOn(player, 'reset');

    testObj.resetMoreThings();

    expect(testObj.resetSomeThings).toHaveBeenCalled();
    expect(gameObjects.clear).toHaveBeenCalled();
    expect(spiders.clear).toHaveBeenCalled();
    expect(player.reset).toHaveBeenCalled();
  });
});
