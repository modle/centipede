describe('Testing collision functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, collisions);
  });
  function createAnObjectFromLaserArgs() {
    let laserArgs = knobsAndLevers.laser.args;
    laserArgs.x = 10;
    laserArgs.y = 10;
    laserArgs.width = 10;
    laserArgs.height = 10;
    return new Component(laserArgs);
  };
  function createAnObjectWithZeroHitPoints() {
    let anObject = createAnObjectFromLaserArgs();
    anObject.hitPoints = 0;
    return anObject;
  };
  function createAnObjectWithOneHitPoint() {
    let anObject = createAnObjectFromLaserArgs();
    anObject.hitPoints = 1;
    return anObject;
  };
  it('collisions gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
  it('check calls checkLaser', () => {
    spyOn(testObj, 'checkLaser');
    spyOn(testObj, 'checkGamePieceVsEnemy');
    spyOn(testObj, 'removeDestroyedTargets');
    testObj.check();
    expect(testObj.checkLaser).toHaveBeenCalled();
  });
  it('check calls checkGamePieceVsEnemy', () => {
    spyOn(testObj, 'checkLaser');
    spyOn(testObj, 'checkGamePieceVsEnemy');
    spyOn(testObj, 'removeDestroyedTargets');
    testObj.check();
    expect(testObj.checkGamePieceVsEnemy).toHaveBeenCalled();
  });
  it('check calls removeDestroyedTargets', () => {
    spyOn(testObj, 'checkLaser');
    spyOn(testObj, 'checkGamePieceVsEnemy');
    spyOn(testObj, 'removeDestroyedTargets');
    testObj.check();
    expect(testObj.removeDestroyedTargets).toHaveBeenCalled();
  });
  it('checkLaser sets laser.remove to true on impact', () => {
    targets = [createAnObjectFromLaserArgs()];
    lasers.lasers = [createAnObjectFromLaserArgs()];
    spyOn(lasers.lasers[0], 'crashWith').and.callThrough();
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');
    testObj.checkLaser(targets);
    expect(lasers.lasers[0].remove).toBeTruthy();
    expect(testObj.processImpact).toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
    expect(lasers.lasers[0].crashWith).toHaveBeenCalled();
  });
  it('checkLaser will not processImpact if no usable lasers', () => {
    targets = [createAnObjectFromLaserArgs()];
    lasers.lasers = [createAnObjectFromLaserArgs()];
    lasers.lasers[0].remove = true;
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');
    testObj.checkLaser(targets);
    expect(testObj.processImpact).not.toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });
  it('checkLaser will not processImpact if no lasers', () => {
    targets = [createAnObjectFromLaserArgs()];
    lasers.lasers = [];
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');
    testObj.checkLaser(targets);
    expect(testObj.processImpact).not.toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });
  it('checkLaser will not processImpact if no targets', () => {
    targets = [];
    lasers.lasers = [createAnObjectFromLaserArgs()];
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');
    testObj.checkLaser(targets);
    expect(testObj.processImpact).not.toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });
  it('checkLaser will not processImpact if no crashWith', () => {
    targets = [createAnObjectFromLaserArgs()];
    lasers.lasers = [createAnObjectFromLaserArgs()];
    lasers.lasers[0].x = targets[0].x + targets[0].width * 2;
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');
    testObj.checkLaser(targets);
    expect(testObj.processImpact).not.toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });
  it('checkGamePieceVsEnemy does not process if playerCollisions are disabled', () => {
    knobsAndLevers.playerCollisionsEnabled = false;
    game.gameOver = false;
    player.init();
    spyOn(player.gamePiece, 'crashWith').and.callThrough();
    spyOn(testObj, 'killPlayer');

    targets = [createAnObjectFromLaserArgs()];

    testObj.checkGamePieceVsEnemy(targets);

    expect(testObj.killPlayer).not.toHaveBeenCalled();
    expect(player.gamePiece.crashWith).not.toHaveBeenCalled();
    expect(game.gameOver).toBeFalsy();
  });
  it('checkGamePieceVsEnemy calls killsPlayer if crashWith', () => {
    knobsAndLevers.playerCollisionsEnabled = true;
    game.gameOver = false;
    player.init();
    spyOn(player.gamePiece, 'crashWith').and.callThrough();
    spyOn(testObj, 'killPlayer');
    game.init();
    metrics.init();
    target = createAnObjectFromLaserArgs();
    target.x = player.gamePiece.x;
    target.y = player.gamePiece.y;
    targets = [target];

    testObj.checkGamePieceVsEnemy(targets);

    expect(testObj.killPlayer).toHaveBeenCalled();
    expect(player.gamePiece.crashWith).toHaveBeenCalled();
    expect(game.gameOver).toBeFalsy();
  });
  it('checkGamePieceVsEnemy handles 0 length target list', () => {
    knobsAndLevers.playerCollisionsEnabled = true;
    game.gameOver = false;
    player.init();
    spyOn(player.gamePiece, 'crashWith').and.callThrough();
    spyOn(testObj, 'killPlayer');
    game.init();
    metrics.init();
    targets = [];

    testObj.checkGamePieceVsEnemy(targets);

    expect(testObj.killPlayer).not.toHaveBeenCalled();
    expect(player.gamePiece.crashWith).not.toHaveBeenCalled();
    expect(game.gameOver).toBeFalsy();
  });
  it('gameOver is set to true if lives <= 0', () => {
    knobsAndLevers.playerCollisionsEnabled = true;
    game.gameOver = false;
    player.init();
    spyOn(player.gamePiece, 'crashWith').and.callThrough();
    spyOn(testObj, 'killPlayer');
    game.init();
    metrics.init();
    metrics.lives = 0;
    target = createAnObjectFromLaserArgs();
    target.x = player.gamePiece.x;
    target.y = player.gamePiece.y;
    targets = [target];

    testObj.checkGamePieceVsEnemy(targets);

    expect(testObj.killPlayer).toHaveBeenCalled();
    expect(player.gamePiece.crashWith).toHaveBeenCalled();
    expect(game.gameOver).toBeTruthy();
  });
  it('killPlayer kills player', () => {
    player.init();
    game.init();
    metrics.init();
    let livesBefore = metrics.lives;
    let livesAfter = livesBefore - 1;
    testObj.killPlayer();
    expect(metrics.lives).toEqual(livesAfter);
    expect(player.died).toBeTruthy();
  });
  it('withMushrooms collides with mushrooms', () => {
    mushrooms.mushrooms = [createAnObjectFromLaserArgs()];
    let laser = createAnObjectFromLaserArgs();
    spyOn(laser, 'crashWith').and.callThrough();
    let result = testObj.withMushrooms(laser);
    expect(laser.crashWith).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });
  it('withMushrooms does not collide with mushrooms', () => {
    mushrooms.mushrooms = [createAnObjectFromLaserArgs()];
    let laser = createAnObjectFromLaserArgs();
    spyOn(laser, 'crashWith').and.callThrough();
    laser.x = mushrooms.mushrooms[0].x + mushrooms.mushrooms[0].x * 2;
    let result = testObj.withMushrooms(laser);
    expect(laser.crashWith).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });
  it('withMushrooms does not call crashWith when no mushrooms', () => {
    mushrooms.mushrooms = [];
    let laser = createAnObjectFromLaserArgs();
    spyOn(laser, 'crashWith').and.callThrough();
    let result = testObj.withMushrooms(laser);
    expect(laser.crashWith).not.toHaveBeenCalled();
    expect(result).toBeFalsy();
  });
  it('removeDestroyedTargets removes destroyed targets', () => {
    mushrooms.mushrooms = [createAnObjectWithZeroHitPoints()];
    centipedes.centipedes = [createAnObjectWithZeroHitPoints()];
    intervalCreatures.worms = [createAnObjectWithZeroHitPoints()];
    intervalCreatures.flies = [createAnObjectWithZeroHitPoints()];
    spiders.spiders = [createAnObjectWithZeroHitPoints()];

    testObj.removeDestroyedTargets();

    expect(mushrooms.mushrooms.length).toEqual(0);
    expect(centipedes.centipedes.length).toEqual(0);
    expect(intervalCreatures.worms.length).toEqual(0);
    expect(intervalCreatures.flies.length).toEqual(0);
    expect(spiders.spiders.length).toEqual(0);
  });
  it('removeDestroyedTargets does not remove intact targets', () => {
    mushrooms.mushrooms = [createAnObjectWithOneHitPoint()];
    centipedes.centipedes = [createAnObjectWithOneHitPoint()];
    intervalCreatures.worms = [createAnObjectWithOneHitPoint()];
    intervalCreatures.flies = [createAnObjectWithOneHitPoint()];
    spiders.spiders = [createAnObjectWithOneHitPoint()];

    testObj.removeDestroyedTargets();

    expect(mushrooms.mushrooms.length).toEqual(1);
    expect(centipedes.centipedes.length).toEqual(1);
    expect(intervalCreatures.worms.length).toEqual(1);
    expect(intervalCreatures.flies.length).toEqual(1);
    expect(spiders.spiders.length).toEqual(1);
  });
});
