
describe('Testing sound functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, sounds);
    testObj.init();
    sounds.init();
  });
  it('init delegates sound building', () => {
    spyOn(testObj, 'buildSound').and.callThrough();
    spyOn(testObj, 'buildManySounds').and.callThrough();

    testObj.init();

    expect(testObj.centipede).toBeTruthy();
    expect(testObj.spider).toBeTruthy();
    expect(testObj.fly).toBeTruthy();
    expect(testObj.worm).toBeTruthy();
    expect(testObj.playerDied).toBeTruthy();
    expect(sounds.laserPool.length).toBeGreaterThan(0);
    expect(sounds.impactPool.length).toBeGreaterThan(0);
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
    spyOn(testObj, 'manageFlySounds');
    spyOn(testObj, 'manageWormSounds');

    testObj.manageSounds();

    expect(testObj.manageCentipedeSounds).toHaveBeenCalled();
    expect(testObj.manageSpiderSounds).toHaveBeenCalled();
    expect(testObj.manageFlySounds).toHaveBeenCalled();
    expect(testObj.manageWormSounds).toHaveBeenCalled();
  });
  it('buildManySounds builds expected number of sounds', () => {
    let expected = 11;

    let soundArray = testObj.buildManySounds('centipede', expected);

    expect(soundArray.length).toEqual(expected);
  });
  it('manageCentipedeSounds calls centipede sound play', () => {
    centipedes.centipedes = [{}];
    spyOn(testObj.centipede, 'play');

    testObj.manageCentipedeSounds();

    expect(testObj.centipede.play).toHaveBeenCalled();
  });
  it('manageCentipedeSounds does nothing if no centipedes', () => {
    centipedes.centipedes = [];
    spyOn(testObj.centipede, 'play');

    testObj.manageCentipedeSounds();

    expect(testObj.centipede.play).not.toHaveBeenCalled();
  });
  it('manageSpiderSounds calls spider sound play', () => {
    spiders.spiders = [{}];
    spyOn(testObj.spider, 'play');

    testObj.manageSpiderSounds();

    expect(testObj.spider.play).toHaveBeenCalled();
  });
  it('manageSpiderSounds calls spider sound play', () => {
    spiders.spiders = [];
    spyOn(testObj.spider, 'play');

    testObj.manageSpiderSounds();

    expect(testObj.spider.play).not.toHaveBeenCalled();
  });
  it('manageFlySounds calls fly sound play', () => {
    intervalCreatures.flies = [{}];
    spyOn(testObj.fly, 'play');

    testObj.manageFlySounds();

    expect(testObj.fly.play).toHaveBeenCalled();
    expect(testObj.fly.played).toBeTruthy();
  });
  it('manageFlySounds does not call fly sound play if played is true', () => {
    intervalCreatures.flies = [{}];
    spyOn(testObj.fly, 'play');
    testObj.fly.played = true;

    testObj.manageFlySounds();

    expect(testObj.fly.play).not.toHaveBeenCalled();
    expect(testObj.fly.played).toBeTruthy();
  });
  it('manageFlySounds sets played to false when fly is not present', () => {
    intervalCreatures.flies = [];
    spyOn(testObj.fly, 'play');

    testObj.manageFlySounds();

    expect(testObj.fly.play).not.toHaveBeenCalled();
    expect(testObj.fly.played).toBeFalsy();
  });
  it('manageWormSounds calls worm sound play', () => {
    intervalCreatures.worms.push({});
    spyOn(testObj.worm, 'play');

    testObj.manageWormSounds();

    expect(testObj.worm.play).toHaveBeenCalled();
  });
  it('manageWormSounds calls worm sound stop when no worms', () => {
    intervalCreatures.worms = [];
    spyOn(testObj.worm, 'play');
    spyOn(testObj.worm, 'stop');

    testObj.manageWormSounds();

    expect(testObj.worm.play).not.toHaveBeenCalled();
    expect(testObj.worm.stop).toHaveBeenCalled();
  });
  it('playAvailableLaserSound calls getAvailableSound with laserPool', () => {
    let testSound = new Sound("app/static/media/sounds/centipede.mp3", 0.5);
    spyOn(testSound, 'play');
    spyOn(testObj, 'getAvailableLaserSound').and.returnValue(testSound);

    testObj.playAvailableLaserSound();

    expect(testObj.getAvailableLaserSound).toHaveBeenCalled();
    expect(testSound.play).toHaveBeenCalled();
  });
  it('getAvailableLaserSound calls getAvailableSound with laserPool', () => {
    spyOn(sounds, 'getAvailableSound');

    sounds.getAvailableLaserSound();

    expect(sounds.getAvailableSound).toHaveBeenCalledWith(sounds.laserPool);
  });
  it('getAvailableImpactSound calls getAvailableSound with impactPool', () => {
    spyOn(sounds, 'getAvailableSound');

    sounds.getAvailableImpactSound();

    expect(sounds.getAvailableSound).toHaveBeenCalledWith(sounds.impactPool);
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
  it('stopAllSounds calls target stop functions', () => {
    spyOn(testObj.centipede, 'stop');
    spyOn(testObj.spider, 'stop');
    spyOn(testObj.worm, 'stop');
    spyOn(testObj.fly, 'stop');

    testObj.stopAllSounds();

    expect(testObj.centipede.stop).toHaveBeenCalled();
    expect(testObj.spider.stop).toHaveBeenCalled();
    expect(testObj.worm.stop).toHaveBeenCalled();
    expect(testObj.fly.stop).toHaveBeenCalled();
  });
});
