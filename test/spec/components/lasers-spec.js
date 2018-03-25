describe('Testing lasers functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, lasers);
  });
  it('lasers gets constructed', () => {
    expect(testObj).toBeTruthy();
  });

  it('spawn returns if lasers are not eligible to spawn', () => {
    spyOn(testObj, 'eligibleToSpawn').and.returnValue(false);
    spyOn(testObj, 'generate');
    spyOn(window, 'playAvailableLaserSound');

    testObj.spawn();

    expect(testObj.eligibleToSpawn).toHaveBeenCalled();
    expect(testObj.generate).not.toHaveBeenCalled();
    expect(window.playAvailableLaserSound).not.toHaveBeenCalled();
  });
  it('spawn calls generate and laser sound play if eligible to spawn', () => {
    spyOn(testObj, 'eligibleToSpawn').and.returnValue(true);
    spyOn(testObj, 'generate');
    spyOn(window, 'playAvailableLaserSound');

    testObj.spawn();

    expect(testObj.eligibleToSpawn).toHaveBeenCalled();
    expect(testObj.generate).toHaveBeenCalled();
    expect(window.playAvailableLaserSound).toHaveBeenCalled();
  });

  it('eligibleToSpawn returns false if lasers is at max', () => {
    testObj.lasers = [{}];
    spyOn(supporting, 'everyinterval').and.returnValue(true);
    spyOn(controls, 'isFiring').and.returnValue(true);

    expect(testObj.lasers.length).toBe(knobsAndLevers.laser.maxNumber);

    let spawnEligibility = testObj.eligibleToSpawn();

    expect(spawnEligibility).toBeFalsy;
  });

  it('eligibleToSpawn returns true if lasers is not at max', () => {
    testObj.lasers = [];
    spyOn(supporting, 'everyinterval').and.returnValue(true);
    spyOn(controls, 'isFiring').and.returnValue(true);

    expect(testObj.lasers.length).toBeLessThan(knobsAndLevers.laser.maxNumber);

    let spawnEligibility = testObj.eligibleToSpawn();

    expect(spawnEligibility).toBeTruthy;
  });

  it('generate pushes a laser to lasers.lasers array', () => {
    testObj.lasers = [];

    expect(testObj.lasers.length).toBe(0);

    spyOn(testObj, 'build').and.returnValue({});

    testObj.generate();

    expect(testObj.lasers.length).toBe(1);
  });

  it('build laser builds a laser', () => {
    player.init();

    let laser = testObj.build();

    expect(laser.speedY).toBe(-knobsAndLevers.laser.speed);
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
