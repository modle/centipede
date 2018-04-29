describe('COLLISIONS SPEC: ', () => {
  let spec = 'COLLISIONS';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, collisions);
    knobsAndLevers.init();
  });
  function createAnObjectFromLaserArgs() {
    let laserArgs = knobsAndLevers.laser.args;
    laserArgs.x = 10;
    laserArgs.y = 10;
    laserArgs.width = 10;
    laserArgs.height = 10;
    return new Component(laserArgs);
  };

  it('check calls checkLaser', () => {
    spyOn(testObj, 'checkLaser');
    spyOn(testObj, 'checkPlayerVsEnemies');
    spyOn(testObj, 'removeDestroyedTargets');

    testObj.check();

    expect(testObj.checkLaser).toHaveBeenCalled();
    expect(testObj.checkPlayerVsEnemies).toHaveBeenCalled();
    expect(testObj.removeDestroyedTargets).toHaveBeenCalled();
  });

  it('getLaserTargets combines multiple target Arrays', () => {
    mushrooms.mushrooms = [];
    centipedes.centipedes = [];
    gameObjects.worms = [];
    gameObjects.flies = ['anObj'];
    spiders.spiders = ['anObj'];

    targets = testObj.getLaserTargets();

    expect(targets.length).toEqual(2);
  });

  it('checkLaser sets laser.remove to true on impact', () => {
    targets = [{}];
    lasers.lasers = [{remove: false, crashWith : function(target){}}];
    spyOn(lasers.lasers[0], 'crashWith').and.returnValue(true);
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');

    testObj.checkLaser(targets);

    expect(lasers.lasers[0].remove).toBeTruthy();
    expect(lasers.lasers[0].crashWith).toHaveBeenCalled();
    expect(testObj.processImpact).toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });
  it('checkLaser will not processImpact if no usable lasers', () => {
    targets = [{}];
    lasers.lasers = [{remove: true, crashWith : function(target){}}];
    spyOn(lasers.lasers[0], 'crashWith').and.returnValue(true);
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');

    testObj.checkLaser(targets);

    expect(testObj.processImpact).not.toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });
  it('checkLaser will not processImpact if no lasers', () => {
    targets = [{}];
    lasers.lasers = [];
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');

    testObj.checkLaser(targets);

    expect(testObj.processImpact).not.toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });
  it('checkLaser will not processImpact if no targets', () => {
    targets = [];
    lasers.lasers = [{}];
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');

    testObj.checkLaser(targets);

    expect(testObj.processImpact).not.toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });
  it('checkLaser will not processImpact if no crashWith', () => {
    targets = [{}];
    lasers.lasers = [{remove: false, crashWith : function(target){}}];
    spyOn(lasers.lasers[0], 'crashWith').and.returnValue(false);
    spyOn(testObj, 'processImpact');
    spyOn(testObj, 'removeUsedLasers');

    testObj.checkLaser(targets);

    expect(testObj.processImpact).not.toHaveBeenCalled();
    expect(testObj.removeUsedLasers).toHaveBeenCalled();
  });

  it('processImpact delegates to impact functions', () => {
    spyOn(testObj, 'damageTarget');
    spyOn(sounds, 'playImpactSound');
    spyOn(testObj, 'updateTargetAppearance');

    testObj.processImpact({type : 'aTarget'});

    expect(testObj.damageTarget).toHaveBeenCalled();
    expect(sounds.playImpactSound).toHaveBeenCalled();
    expect(testObj.updateTargetAppearance).toHaveBeenCalled();
  });

  it('damageTarget reduces hitPoints and processes kill', () => {
    spyOn(testObj, 'processKill');
    let target = {hitPoints : 1};

    testObj.damageTarget(target);

    expect(testObj.processKill).toHaveBeenCalled();
    expect(target.hitPoints).toEqual(0);
  });
  it('damageTarget reduces hitPoints but does not process kill', () => {
    spyOn(testObj, 'processKill');
    let target = {hitPoints : 2};

    testObj.damageTarget(target);

    expect(testObj.processKill).not.toHaveBeenCalled();
    expect(target.hitPoints).toEqual(1);
  });


  it('updateTargetAppearance adjusts height of target when target type is mushroom', () => {
    let baseHeight = knobsAndLevers.mushroomSide;
    let target1 = {type : 'mushroom', height : baseHeight};
    let target2 = {type : 'somethingElse', height : baseHeight};

    testObj.updateTargetAppearance(target1);
    testObj.updateTargetAppearance(target2);

    expect(target1.height).toEqual(0.75 * baseHeight);
    expect(target2.height).toEqual(baseHeight);
  });

  it('processKill delegates to metrics functions', () => {
    spyOn(metrics, 'addNewFloatingPoint');
    spyOn(metrics, 'manageScore');
    spyOn(testObj, 'handleCentipedeKill');

    target = {type : 'notACentipede', getMiddleX : function(){}, getMiddleY : function(){}};
    testObj.processKill(target);

    expect(metrics.addNewFloatingPoint).toHaveBeenCalled();
    expect(metrics.manageScore).toHaveBeenCalled();
    expect(testObj.handleCentipedeKill).toHaveBeenCalled();
  });

  it('handleCentipedeKill alls mushrooms.make and counts kill', () => {
    target = {type : 'centipede', x : 1, y : 1};
    centipedes.numberKilled = 0;
    spyOn(mushrooms, 'make');

    testObj.handleCentipedeKill(target);

    expect(centipedes.numberKilled).toEqual(1);
    expect(mushrooms.make).toHaveBeenCalled();
  });

  it('removeUsedLasers removes used lasers when remove is true', () => {
    lasers.lasers = [{remove: true}, {remove: false}]

    testObj.removeUsedLasers();

    expect(lasers.lasers.length).toEqual(1);
  });

  it('getPlayerEnemies combines multiple enemy Arrays', () => {
    centipedes.centipedes = [];
    gameObjects.flies = ['anObj'];
    spiders.spiders = ['anObj'];

    targets = testObj.getPlayerEnemies();

    expect(targets.length).toEqual(2);
  });

  it('checkPlayerVsEnemies does not process if playerCollisions are disabled', () => {
    knobsAndLevers.game.playerCollisionsEnabled = false;
    game.gameOver = false;
    player.init();
    spyOn(player.gamePiece, 'crashWith').and.returnValue(true);
    spyOn(testObj, 'killPlayer');
    targets = [{remove: true, crashWith : function(target){}}];

    testObj.checkPlayerVsEnemies(targets);

    expect(testObj.killPlayer).not.toHaveBeenCalled();
    expect(player.gamePiece.crashWith).not.toHaveBeenCalled();
    expect(game.gameOver).toBeFalsy();
  });
  it('checkPlayerVsEnemies calls killsPlayer if crashWith', () => {
    knobsAndLevers.game.playerCollisionsEnabled = true;
    game.gameOver = false;
    player.init();
    spyOn(player.gamePiece, 'crashWith').and.returnValue(true);
    spyOn(testObj, 'killPlayer');
    game.init();
    metrics.init();
    targets = [{remove: true, crashWith : function(target){}}];
    testObj.checkPlayerVsEnemies(targets);

    expect(testObj.killPlayer).toHaveBeenCalled();
    expect(player.gamePiece.crashWith).toHaveBeenCalled();
    expect(game.gameOver).toBeFalsy();
  });
  it('checkGamePieceVsEnemy handles 0 length target list', () => {
    knobsAndLevers.game.playerCollisionsEnabled = true;
    game.gameOver = false;
    player.init();
    spyOn(player.gamePiece, 'crashWith').and.callThrough();
    spyOn(testObj, 'killPlayer');
    game.init();
    metrics.init();

    testObj.checkPlayerVsEnemies([]);

    expect(testObj.killPlayer).not.toHaveBeenCalled();
    expect(player.gamePiece.crashWith).not.toHaveBeenCalled();
    expect(game.gameOver).toBeFalsy();
  });
  it('killPlayer kills player and gameOver when one life', () => {
    game.gameOver = false;
    metrics.lives.player1 = 1;

    testObj.killPlayer();

    expect(metrics.lives.player1).toEqual(0);
    expect(player.died).toBeTruthy();
    expect(game.gameOver).toBeTruthy();
  });
  it('killPlayer kills player and no game over when more than one life', () => {
    game.gameOver = false;
    metrics.lives.player1 = 2;

    testObj.killPlayer();

    expect(metrics.lives.player1).toEqual(1);
    expect(player.died).toBeTruthy();
    expect(game.gameOver).toBeFalsy();
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
    mushrooms.mushrooms = [{hitPoints : 0}, {hitPoints : 1}];
    centipedes.centipedes = [{hitPoints : 0}, {hitPoints : 1}];
    gameObjects.worms = [{hitPoints : 0}, {hitPoints : 1}];
    gameObjects.flies = [{hitPoints : 0}, {hitPoints : 1}];
    spiders.spiders = [{hitPoints : 0}, {hitPoints : 1}];

    testObj.removeDestroyedTargets();

    expect(mushrooms.mushrooms.length).toEqual(1);
    expect(centipedes.centipedes.length).toEqual(1);
    expect(gameObjects.worms.length).toEqual(1);
    expect(gameObjects.flies.length).toEqual(1);
    expect(spiders.spiders.length).toEqual(1);
  });
});
