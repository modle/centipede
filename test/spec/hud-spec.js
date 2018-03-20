describe('Testing hud functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, hud);
  });
  it('hud gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
  it('update updates things', () => {
    spyOn(testObj, 'updateScore');
    spyOn(testObj, 'updateLives');
    spyOn(testObj, 'updateLevel');
    testObj.update();
    expect(testObj.updateScore).toHaveBeenCalled();
    expect(testObj.updateLives).toHaveBeenCalled();
    expect(testObj.updateLevel).toHaveBeenCalled();
  });
  it('updateLives updates lives', () => {
    texts.init();
    metrics.lives = 10;
    let expected = "Lives: " + metrics.lives;
    spyOn(texts.livesDisplay, 'update');
    testObj.updateLives();
    expect(texts.livesDisplay.text).toEqual(expected);
    expect(texts.livesDisplay.update).toHaveBeenCalled();
  });
  it('updateLevel updates level', () => {
    metrics.init();
    metrics.currentLevel = 10;
    let expected = "Level: " + metrics.currentLevel;
    spyOn(texts.level, 'update');
    testObj.updateLevel();
    expect(texts.level.text).toEqual(expected);
    expect(texts.level.update).toHaveBeenCalled();
  });
  it('updateScore updates score', () => {
    metrics.init();
    metrics.scoreValue = 10;
    let expected = "Score: " + metrics.scoreValue;
    spyOn(metrics.score, 'update');
    testObj.updateScore();
    expect(metrics.score.text).toEqual(expected);
    expect(metrics.score.update).toHaveBeenCalled();
  });
  it('reset resets things', () => {
    spyOn(metrics, 'reset');
    spyOn(centipedes, 'clear');
    spyOn(spiders, 'clear');
    spyOn(intervalCreatures, 'clear');
    spyOn(mushrooms, 'clear');
    testObj.reset();
    expect(metrics.reset).toHaveBeenCalled();
    expect(centipedes.clear).toHaveBeenCalled();
    expect(spiders.clear).toHaveBeenCalled();
    expect(intervalCreatures.clear).toHaveBeenCalled();
    expect(mushrooms.clear).toHaveBeenCalled();
  });
});
