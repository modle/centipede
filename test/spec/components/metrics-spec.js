describe('METRICS SPEC: ', () => {
  let spec = 'METRICS';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    game.init();
    testObj = Object.assign({}, metrics);
    testObj.init();
  });
  it('manageScore changes the score when initialValue is non-negative', () => {
    let changeAmount = 5;
    let initialValue = 0;
    testObj.score.value = initialValue;
    let expected = changeAmount + (initialValue < 0 ? 0 : initialValue);

    testObj.manageScore(changeAmount);

    expect(testObj.score.value).toBe(expected);
  });
  it('manageScore changes the score when initialValue is negative', () => {
    let changeAmount = -5;
    let initialValue = 0;
    testObj.score.value = initialValue;

    let expected = initialValue + changeAmount;
    expected = expected < 0 ? 0 : expected;

    testObj.manageScore(changeAmount);

    expect(testObj.score.value).toBe(expected);
  });
  it('getNewPoint returns a new floating point', () => {
    let expectedX = 1;
    let expectedY = 9;

    let actual = testObj.getNewPoint(expectedX, expectedY);

    expect(actual.x).toBe(expectedX);
    expect(actual.y).toBe(expectedY);
  });
  it('addNewFloatingPoint adds black point for gain', () => {
    testObj.floatingPoints = [];

    let expectedValue = 2;
    testObj.addNewFloatingPoint(0, 0, expectedValue, 'gain');

    expect(testObj.floatingPoints.length).toBe(1);
    expect(testObj.floatingPoints[0].color).toEqual('black');
  });
  it('addNewFloatingPoint adds red point for loss', () => {
    testObj.floatingPoints = [];

    let expectedValue = 2;
    testObj.addNewFloatingPoint(0, 0, expectedValue, 'lose');

    expect(testObj.floatingPoints.length).toBe(1);
    expect(testObj.floatingPoints[0].color).toEqual('red');
  });
  it('manage progresses each floating point', () => {
    let startY = 10;
    let startCycleNumber = 0;
    testObj.floatingPoints = [
      {update : function(){}, y : startY, cycleNumber : startCycleNumber}
    ];
    spyOn(testObj.floatingPoints[0], 'update');

    testObj.manage();

    expect(testObj.floatingPoints.length).toBe(1);
    expect(testObj.floatingPoints[0].update).toHaveBeenCalled();
    expect(testObj.floatingPoints[0].cycleNumber).toBe(startCycleNumber + 1);
    expect(testObj.floatingPoints[0].y).toBe(startY - 1);
  });
  it('manage removes expired floating points', () => {
    testObj.floatingPointCycleDuration = 0;
    testObj.floatingPoints = [
      {update : function(){}, y : 0, cycleNumber : 1},
      {update : function(){}, y : 0, cycleNumber : 0},
    ];

    testObj.manage();

    expect(testObj.floatingPoints.length).toBe(1);
  });
  it('reset resets lives, level, and score', () => {
    testObj.lives = 0;
    testObj.currentLevel = 999;
    testObj.score.value = 80085;

    testObj.reset();

    expect(testObj.lives).toBe(knobsAndLevers.player.defaultLives);
    expect(testObj.currentLevel).toBe(1);
    expect(testObj.score.value).toBe(0);
  });
});
