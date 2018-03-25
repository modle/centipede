
describe('Testing sound functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, sounds);
    sounds.init();
  });
  it('init delegates sound building', () => {
    spyOn(window, 'buildSound').and.callThrough();
    spyOn(window, 'buildManySounds').and.callThrough();

    testObj.init();

    expect(testObj.centipede).toBeTruthy();
    expect(testObj.spider).toBeTruthy();
    expect(testObj.fly).toBeTruthy();
    expect(testObj.worm).toBeTruthy();
    expect(testObj.playerDied).toBeTruthy();
    expect(testObj.laserPool.length).toBeGreaterThan(0);
    expect(testObj.impactPool.length).toBeGreaterThan(0);
    expect(window.buildSound).toHaveBeenCalled();
    expect(window.buildManySounds).toHaveBeenCalled();
  });
  it('buildSound builds a sound', () => {
    let expected = new Sound("app/static/media/sounds/centipede.mp3", 0.5);

    let actual = buildSound('centipede', 0.5);

    expect(actual.sound.currentSrc).toEqual(expected.sound.currentSrc);
    expect(actual.sound.volume).toEqual(expected.sound.volume);
    expect(actual.sound.webkitAudioDecodedByteCount).toEqual(expected.sound.webkitAudioDecodedByteCount);
    expect(actual.sound.loop).toEqual(expected.sound.loop);
  });
  it('manageSounds delegates to sound manage functions', () => {
    spyOn(window, 'manageCentipedeSounds');
    spyOn(window, 'manageSpiderSounds');
    spyOn(window, 'manageFlySounds');
    spyOn(window, 'manageWormSounds');

    manageSounds();

    expect(window.manageCentipedeSounds).toHaveBeenCalled();
    expect(window.manageSpiderSounds).toHaveBeenCalled();
    expect(window.manageFlySounds).toHaveBeenCalled();
    expect(window.manageWormSounds).toHaveBeenCalled();
  });
  it('buildManySounds builds expected number of sounds', () => {
    let expected = 11;

    let soundArray = buildManySounds('centipede', expected);

    expect(soundArray.length).toEqual(expected);
  });
  it('manageCentipedeSounds calls centipede sound play', () => {
    centipedes.centipedes = [{}];
    spyOn(sounds.centipede, 'play');

    manageCentipedeSounds();

    expect(sounds.centipede.play).toHaveBeenCalled();
  });
  it('manageCentipedeSounds does nothing if no centipedes', () => {
    centipedes.centipedes = [];
    spyOn(sounds.centipede, 'play');

    manageCentipedeSounds();

    expect(sounds.centipede.play).not.toHaveBeenCalled();
  });
  it('manageSpiderSounds calls spider sound play', () => {
    spiders.spiders = [{}];
    spyOn(sounds.spider, 'play');

    manageSpiderSounds();

    expect(sounds.spider.play).toHaveBeenCalled();
  });
  it('manageSpiderSounds calls spider sound play', () => {
    spiders.spiders = [];
    spyOn(sounds.spider, 'play');

    manageSpiderSounds();

    expect(sounds.spider.play).not.toHaveBeenCalled();
  });
  it('manageFlySounds calls fly sound play', () => {
    intervalCreatures.flies = [{}];
    spyOn(sounds.fly, 'play');

    manageFlySounds();

    expect(sounds.fly.play).toHaveBeenCalled();
    expect(sounds.fly.played).toBeTruthy();
  });
  it('manageFlySounds does not call fly sound play if played is true', () => {
    intervalCreatures.flies = [{}];
    spyOn(sounds.fly, 'play');
    sounds.fly.played = true;

    manageFlySounds();

    expect(sounds.fly.play).not.toHaveBeenCalled();
    expect(sounds.fly.played).toBeTruthy();
  });
  it('manageFlySounds sets played to false when fly is not present', () => {
    intervalCreatures.flies = [];
    spyOn(sounds.fly, 'play');

    manageFlySounds();

    expect(sounds.fly.play).not.toHaveBeenCalled();
    expect(sounds.fly.played).toBeFalsy();
  });
  it('manageWormSounds calls worm sound play', () => {
    intervalCreatures.worms.push({});
    spyOn(sounds.worm, 'play');

    manageWormSounds();

    expect(sounds.worm.play).toHaveBeenCalled();
  });
  it('manageWormSounds calls worm sound stop when no worms', () => {
    intervalCreatures.worms = [];
    spyOn(sounds.worm, 'play');
    spyOn(sounds.worm, 'stop');

    manageWormSounds();

    expect(sounds.worm.play).not.toHaveBeenCalled();
    expect(sounds.worm.stop).toHaveBeenCalled();
  });
  it('playAvailableLaserSound calls getAvailableSound with laserPool', () => {
    let testSound = new Sound("app/static/media/sounds/centipede.mp3", 0.5);
    spyOn(testSound, 'play');
    spyOn(window, 'getAvailableLaserSound').and.returnValue(testSound);

    playAvailableLaserSound();

    expect(window.getAvailableLaserSound).toHaveBeenCalled();
    expect(testSound.play).toHaveBeenCalled();
  });
  it('getAvailableLaserSound calls getAvailableSound with laserPool', () => {
    spyOn(window, 'getAvailableSound');

    getAvailableLaserSound();

    expect(window.getAvailableSound).toHaveBeenCalledWith(sounds.laserPool);
  });
  it('getAvailableImpactSound calls getAvailableSound with impactPool', () => {
    spyOn(window, 'getAvailableSound');

    getAvailableImpactSound();

    expect(window.getAvailableSound).toHaveBeenCalledWith(sounds.impactPool);
  });
  it('getAvailableSound pops and unshifts a sound, and returns it', () => {
    let testArray = ['first', 'second', 'third'];
    let expected = ['third', 'first', 'second'];

    poppedElement = getAvailableSound(testArray);

    expect(testArray[0]).toEqual(expected[0]);
    expect(testArray[1]).toEqual(expected[1]);
    expect(testArray[2]).toEqual(expected[2]);

    expect(poppedElement).toEqual('third');
  });
  it('stopAllSounds calls target stop functions', () => {
    spyOn(sounds.centipede, 'stop');
    spyOn(sounds.spider, 'stop');
    spyOn(sounds.worm, 'stop');
    spyOn(sounds.fly, 'stop');

    stopAllSounds();

    expect(sounds.centipede.stop).toHaveBeenCalled();
    expect(sounds.spider.stop).toHaveBeenCalled();
    expect(sounds.worm.stop).toHaveBeenCalled();
    expect(sounds.fly.stop).toHaveBeenCalled();
  });
});
