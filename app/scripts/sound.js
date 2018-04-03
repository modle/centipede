var sounds = {
  path : 'app/static/media/sounds/',
  init : function() {
    this.centipede = this.buildSound("centipede", 0.5);
    this.spider = this.buildSound("spider", 0.3);
    this.fly = this.buildSound("fly", 0.3);
    this.worm = this.buildSound("worm", 0.5, "loop");
    this.playerDied = this.buildSound("player-died", 0.5);
    this.laserPool = this.buildManySounds("laser", 20);
    this.impactPool = this.buildManySounds("laser-impact", knobsAndLevers.laser.maxNumber);
    console.log("sounds initialized");
  },
  buildSound : function(filename, volume, loop) {
    return new Sound(this.path + filename + ".mp3", volume, loop);
  },
  buildManySounds : function(type, poolSize) {
    let soundArray = [];
    while (soundArray.length < poolSize) {
      soundArray.push(this.buildSound(type, 0.5));
    };
    return soundArray;
  },
  manageSounds : function() {
    if (!knobsAndLevers.game.soundsEnabled) {
      return;
    };
    this.manageCentipedeSounds();
    this.manageSpiderSounds();
    this.manageFlySounds();
    this.manageWormSounds();
  },
  manageCentipedeSounds : function() {
    if (centipedes.centipedes != false) {
      this.centipede.play();
    };
  },
  manageSpiderSounds : function() {
    if (spiders.spiders != false) {
      this.spider.play();
    };
  },
  manageFlySounds : function() {
    if (intervalCreatures.flies != false) {
      if (!this.fly.played) {
        this.fly.play();
      };
      this.fly.played = true;
    } else {
      this.fly.played = false;
    };
  },
  manageWormSounds : function() {
    if (intervalCreatures.worms != false) {
      this.worm.play();
    } else {
      this.worm.stop();
    };
  },
  playAvailableLaserSound : function() {
    this.getAvailableLaserSound().play();
  },
  getAvailableLaserSound : function() {
    return this.getAvailableSound(sounds.laserPool);
  },
  getAvailableImpactSound : function() {
    return this.getAvailableSound(sounds.impactPool);
  },
  getAvailableSound : function(availableSounds) {
    let sound = availableSounds.pop();
    availableSounds.unshift(sound);
    return sound;
  },
  stopAllSounds : function() {
    this.centipede.stop();
    this.spider.stop();
    this.worm.stop();
    this.fly.stop();
  },
};
