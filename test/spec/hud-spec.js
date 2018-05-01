describe('HUD SPEC: ', () => {
  let spec = 'HUD';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, hud);
    knobsAndLevers.init();
    game.init();
  });
  it('update updates things', () => {
    spyOn(testObj, 'updateScore');
    spyOn(testObj, 'updateLives');

    testObj.update();

    expect(testObj.updateScore).toHaveBeenCalled();
    expect(testObj.updateLives).toHaveBeenCalled();
  });
  it('updateLives updates lives', () => {
    texts.init();
    templates.init();
    metrics.init();
    metrics.lives.player1 = 10;
    let expected = metrics.lives.player1;
    spyOn(texts.lives, 'update');
    spyOn(metrics.livesMarker, 'update');

    testObj.updateLives();

    expect(texts.lives.text).toEqual(expected);
    expect(metrics.livesMarker.update).toHaveBeenCalled();
    expect(texts.lives.update).toHaveBeenCalled();
  });
  xit('updateLevel updates level', () => {
    metrics.init();
    metrics.currentLevel = 10;
    texts.init();
    let expected = "Level: " + metrics.currentLevel;
    spyOn(texts.level, 'update');

    testObj.updateLevel();

    expect(texts.level.text).toEqual(expected);
    expect(texts.level.update).toHaveBeenCalled();
  });
  it('updateScore updates score', () => {
    metrics.init();
    metrics.score.player1.value = 10;
    let expected = metrics.score.player1.value;
    spyOn(metrics.score.player1, 'update');

    testObj.updateScore();

    expect(metrics.score.player1.text).toEqual(expected);
    expect(metrics.score.player1.update).toHaveBeenCalled();
  });
});
