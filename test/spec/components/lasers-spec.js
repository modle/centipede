describe('LASERS SPEC: ', () => {
  let spec = 'LASERS';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, lasers);
  });

  it('manage delegates', () => {
    spyOn(testObj, 'spawn');
    spyOn(testObj, 'update');
    spyOn(testObj, 'clearOutsideCanvas');

    testObj.manage();

    expect(testObj.spawn).toHaveBeenCalled();
    expect(testObj.update).toHaveBeenCalled();
    expect(testObj.clearOutsideCanvas).toHaveBeenCalled();
  });

  it('spawn returns if lasers are not eligible to spawn', () => {
    spyOn(testObj, 'eligibleToSpawn').and.returnValue(false);
    spyOn(testObj, 'add');
    spyOn(sounds, 'playAvailableLaserSound');

    testObj.spawn();

    expect(testObj.eligibleToSpawn).toHaveBeenCalled();
    expect(testObj.add).not.toHaveBeenCalled();
    expect(sounds.playAvailableLaserSound).not.toHaveBeenCalled();
  });
  it('spawn calls add and laser sound play if eligible to spawn', () => {
    player.init();
    spyOn(testObj, 'eligibleToSpawn').and.returnValue(true);
    spyOn(testObj, 'add');
    spyOn(sounds, 'playAvailableLaserSound');

    testObj.spawn();

    expect(testObj.eligibleToSpawn).toHaveBeenCalled();
    expect(testObj.add).toHaveBeenCalled();
    expect(sounds.playAvailableLaserSound).toHaveBeenCalled();
  });

  it('eligibleToSpawn returns false if lasers is at max', () => {
    testObj.lasers = [];
    while (testObj.lasers.length < knobsAndLevers.laser.quantity.value) {
      testObj.lasers.push({});
    };
    spyOn(supporting, 'everyinterval').and.returnValue(true);
    spyOn(controls, 'isFiring').and.returnValue(true);

    expect(testObj.lasers.length).toBe(knobsAndLevers.laser.quantity.value);

    let spawnEligibility = testObj.eligibleToSpawn();

    expect(spawnEligibility).toBeFalsy;
  });

  it('eligibleToSpawn returns true if lasers is not at max', () => {
    game.init();
    testObj.lasers = [];
    spyOn(supporting, 'everyinterval').and.returnValue(true);
    spyOn(controls, 'isFiring').and.returnValue(true);

    expect(testObj.lasers.length).toBeLessThan(knobsAndLevers.laser.quantity.value);

    let spawnEligibility = testObj.eligibleToSpawn();

    expect(spawnEligibility).toBeTruthy;
  });

  it('add pushes a laser to lasers.lasers array', () => {
    testObj.lasers = [];

    expect(testObj.lasers.length).toBe(0);

    spyOn(testObj, 'make').and.returnValue({});

    testObj.add();

    expect(testObj.lasers.length).toBe(1);
  });

  it('make laser makes a laser', () => {
    knobsAndLevers.init();
    player.init();

    let laser = testObj.make();
    expect(laser.speedY).toBe(-knobsAndLevers.laser.speed.value);
    expect(laser.x).toBe(player.gamePiece.x + player.gamePiece.width / 2);
    expect(laser.y).toBe(player.gamePiece.y);
  })

  it('update sets y position and calls laser object update', () => {
    testObj.lasers = [
      {update : function(){}, y : 0, speedY : 1}
    ];
    expect(testObj.lasers.length).toBe(1);
    let expectedSpeedY = testObj.lasers[0].y + testObj.lasers[0].speedY;
    spyOn(testObj.lasers[0], 'update');

    testObj.update();

    expect(testObj.lasers.length).toBe(1);
    expect(testObj.lasers[0].update).toHaveBeenCalled();
    expect(testObj.lasers[0].speedY).toBe(expectedSpeedY);
  });

  it('lasers outside canvas get cleared', () => {
    testObj.lasers = [
      {y : 0},
      {y : 1},
    ];

    expect(testObj.lasers.length).toBe(2);

    testObj.clearOutsideCanvas();

    expect(testObj.lasers.length).toBe(1);
    expect(testObj.lasers[0].y).toBe(1);
  });
  it('clear clears all lasers', () => {
    testObj.lasers = [
      {y : 0},
      {y : 1},
    ];

    expect(testObj.lasers.length).toBe(2);

    testObj.clear();

    expect(testObj.lasers.length).toBe(0);
  });
});
