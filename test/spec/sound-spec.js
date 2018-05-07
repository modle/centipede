describe('SOUND SPEC: ', () => {
  let spec = 'SOUND';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    sounds.init();
    testObj = Object.assign({}, sounds);
  });
  it('init delegates sound building', () => {
    spyOn(testObj, 'buildSound');
    spyOn(testObj, 'buildManySounds');

    testObj.init();

    expect(testObj.buildSound).toHaveBeenCalled();
    expect(testObj.buildManySounds).toHaveBeenCalled();
  });
  it('buildSound builds a sound', () => {
    let expected = new Sound("app/static/media/sounds/centipede.mp3", 0.5);

    let actual = testObj.buildSound('centipede', 0.5);

    expect(actual.sound.currentSrc).toEqual(expected.sound.currentSrc);
    expect(actual.sound.volume).toEqual(expected.sound.volume);
    expect(actual.sound.webkitAudioDecodedByteCount).toEqual(expected.sound.webkitAudioDecodedByteCount);
    expect(actual.sound.loop).toEqual(expected.sound.loop);
  });
  it('manageSounds delegates to sound manage functions', () => {
    spyOn(testObj, 'manageCentipedeSounds');
    spyOn(testObj, 'manageSpiderSounds');
    spyOn(testObj, 'manageFleaSounds');
    spyOn(testObj, 'manageWormSounds');
    dials.game.sounds.value = true;

    testObj.manageSounds();

    expect(testObj.manageCentipedeSounds).toHaveBeenCalled();
    expect(testObj.manageSpiderSounds).toHaveBeenCalled();
    expect(testObj.manageFleaSounds).toHaveBeenCalled();
    expect(testObj.manageWormSounds).toHaveBeenCalled();
  });
  it('buildManySounds builds expected number of sounds', () => {
    let expected = 11;

    let soundArray = testObj.buildManySounds('centipede', expected);

    expect(soundArray.length).toEqual(expected);
  });
  it('manageCentipedeSounds calls playSound with centipede', () => {
    centipedes.centipedes = [{}];
    spyOn(testObj, 'playSound');
    spyOn(testObj, 'getSound');

    testObj.manageCentipedeSounds();

    expect(testObj.getSound).toHaveBeenCalledWith('centipede');
    expect(testObj.playSound).toHaveBeenCalled();
  });
  it('manageCentipedeSounds does nothing if no centipedes', () => {
    centipedes.centipedes = [];
    spyOn(testObj, 'playSound');
    spyOn(testObj, 'getSound');

    testObj.manageCentipedeSounds();

    expect(testObj.playSound).not.toHaveBeenCalled();
  });
  it('manageSpiderSounds calls spider sound play', () => {
    spiders.spiders = [{}];
    spyOn(testObj, 'playSound');
    spyOn(testObj, 'getSound');

    testObj.manageSpiderSounds();

    expect(testObj.getSound).toHaveBeenCalledWith('spider');
    expect(testObj.playSound).toHaveBeenCalled();
  });
  it('manageSpiderSounds calls spider sound play', () => {
    spiders.spiders = [];
    spyOn(testObj, 'playSound');
    spyOn(testObj, 'getSound');

    testObj.manageSpiderSounds();

    expect(testObj.playSound).not.toHaveBeenCalled();
  });
  it('manageFleaSounds calls flea sound play', () => {
    gameObjects.fleas = [{}];
    let testSound = {};
    testObj.tracks.flea = testSound;
    spyOn(testObj, 'playSound');

    testObj.manageFleaSounds();

    expect(testObj.playSound).toHaveBeenCalledWith(testSound);
    expect(testObj.tracks['flea'].played).toBeTruthy();
  });
  it('manageFleaSounds does not call flea sound play if played is true', () => {
    gameObjects.fleas = [{}];
    spyOn(testObj.tracks['flea'], 'play');
    testObj.tracks['flea'].played = true;

    testObj.manageFleaSounds();

    expect(testObj.tracks['flea'].play).not.toHaveBeenCalled();
    expect(testObj.tracks['flea'].played).toBeTruthy();
  });
  it('manageFleaSounds sets played to false when flea is not present', () => {
    gameObjects.fleas = [];
    spyOn(testObj.tracks['flea'], 'play');

    testObj.manageFleaSounds();

    expect(testObj.tracks['flea'].play).not.toHaveBeenCalled();
    expect(testObj.tracks['flea'].played).toBeFalsy();
  });
  it('manageWormSounds calls worm sound play', () => {
    gameObjects.worms.push({});
    spyOn(testObj, 'playSound');

    testObj.manageWormSounds();

    expect(testObj.playSound).toHaveBeenCalled();
  });
  it('manageWormSounds calls worm sound stop when no worms', () => {
    gameObjects.worms = [];
    spyOn(testObj, 'playSound');
    spyOn(testObj, 'stopSound');

    testObj.manageWormSounds();

    expect(testObj.playSound).not.toHaveBeenCalled();
    expect(testObj.stopSound).toHaveBeenCalled();
  });
  it('playAvailableLaserSound calls getAvailableSound with laserPool', () => {
    let testSound = new Sound("app/static/media/sounds/centipede.mp3", 0.5);
    spyOn(testObj, 'playSound');
    spyOn(testObj, 'getSoundFromPool').and.returnValue(testSound);

    testObj.playAvailableLaserSound();

    expect(testObj.getSoundFromPool).toHaveBeenCalledWith('laserPool');
    expect(testObj.playSound).toHaveBeenCalled();
  });
  it('getSoundFromPool calls getAvailableSound with laserPool', () => {
    spyOn(sounds, 'getAvailableSound');

    sounds.getSoundFromPool('laserPool');

    expect(sounds.getAvailableSound).toHaveBeenCalledWith(sounds.tracks['laserPool']);
  });
  it('getSoundFromPool calls getAvailableSound with impactPool', () => {
    spyOn(sounds, 'getAvailableSound');

    sounds.getSoundFromPool('impactPool');

    expect(sounds.getAvailableSound).toHaveBeenCalledWith(sounds.tracks['impactPool']);
  });
  it('playImpactSound does not play when target type is mushroom', () => {
    let type = 'mushroom';
    spyOn(sounds, 'getAvailableSound');

    sounds.playImpactSound(type);

    expect(sounds.getAvailableSound).not.toHaveBeenCalled();
  });
  it('playImpactSound plays when target type is not mushroom', () => {
    let type = 'somethingElse';
    spyOn(sounds, 'getSoundFromPool').and.returnValue({play : function(){}});
    spyOn(sounds, 'playSound');

    sounds.playImpactSound(type);

    expect(sounds.getSoundFromPool).toHaveBeenCalled();
    expect(sounds.playSound).toHaveBeenCalled();
  });
  it('getAvailableSound pops and unshifts a sound, and returns it', () => {
    let testArray = ['first', 'second', 'third'];
    let expected = ['third', 'first', 'second'];

    let poppedElement = sounds.getAvailableSound(testArray);

    expect(testArray[0]).toEqual(expected[0]);
    expect(testArray[1]).toEqual(expected[1]);
    expect(testArray[2]).toEqual(expected[2]);

    expect(poppedElement).toEqual('third');
  });
  it('playDiedSound calls sounds.playerDied.play', () => {
    sounds.init();
    spyOn(sounds, 'playSound');
    spyOn(sounds, 'getSound');

    sounds.playDiedSound();

    expect(sounds.getSound).toHaveBeenCalledWith('playerDied');
    expect(sounds.playSound).toHaveBeenCalled();
  });
  it('stopAllSounds calls target stop functions', () => {
    spyOn(testObj.tracks['centipede'], 'stop');
    spyOn(testObj.tracks['spider'], 'stop');
    spyOn(testObj.tracks['worm'], 'stop');
    spyOn(testObj.tracks['flea'], 'stop');

    testObj.stopAllSounds();

    expect(testObj.tracks['centipede'].stop).toHaveBeenCalled();
    expect(testObj.tracks['spider'].stop).toHaveBeenCalled();
    expect(testObj.tracks['worm'].stop).toHaveBeenCalled();
    expect(testObj.tracks['flea'].stop).toHaveBeenCalled();
  });
});
