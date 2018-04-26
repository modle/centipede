var sounds = {
  // TODO abstract non-centipede functionality and move to canvas-libs
  path : 'app/static/media/sounds/',
  init : function() {
    this.tracks = {
      centipede : this.buildSound("centipede", 0.5),
      spider : this.buildSound("spider", 0.3),
      fly : this.buildSound("fly", 0.3),
      worm : this.buildSound("worm", 0.5, "loop"),
      playerDied : this.buildSound("player-died", 0.5),
      tierChange : this.buildSound("tier-change", 0.3),
      laserPool : this.buildManySounds("laser", 20),
      impactPool : this.buildManySounds("laser-impact", knobsAndLevers.laser.quantity.value),
    };
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
    if (!knobsAndLevers.game.sounds.value) {
      return;
    };
    this.manageCentipedeSounds();
    this.manageSpiderSounds();
    this.manageFlySounds();
    this.manageWormSounds();
  },
  manageCentipedeSounds : function() {
    if (centipedes.centipedes != false) {
      this.playSound(this.getSound('centipede'));
    };
  },
  getSound : function(type) {
    return this.tracks[type];
  },
  playSound : function(sound) {
    if (knobsAndLevers.game.sounds.value) {
      sound.play();
    };
  },
  manageSpiderSounds : function() {
    if (spiders.spiders != false) {
      this.playSound(this.getSound('spider'));
    };
  },
  manageFlySounds : function() {
    let sound = this.tracks['fly'];
    if (intervalCreatures.flies != false) {
      if (!sound.played) {
        this.playSound(sound);
      };
      sound.played = true;
    } else {
      sound.played = false;
    };
  },
  manageWormSounds : function() {
    if (intervalCreatures.worms != false) {
      this.playSound(this.getSound('worm'));
    } else {
      this.stopSound('worm');
    };
  },
  stopSound : function(type) {
    this.tracks[type].stop();
  },
  playAvailableLaserSound : function() {
    this.playSound(this.getSoundFromPool('laserPool'));
  },
  getSoundFromPool : function(pool) {
    return this.getAvailableSound(this.tracks[pool]);
  },
  getAvailableSound : function(availableSounds) {
    let sound = availableSounds.pop();
    availableSounds.unshift(sound);
    return sound;
  },
  playImpactSound : function(type) {
    if (type !== 'mushroom') {
      this.playSound(this.getSoundFromPool('impactPool'));
    };
  },
  playDiedSound : function() {
    this.playSound(this.getSound('playerDied'));
  },
  playTierChangeSound : function() {
    this.playSound(this.getSound('tierChange'));
  },
  stopAllSounds : function() {
    this.stopSound('centipede');
    this.stopSound('spider');
    this.stopSound('worm');
    this.stopSound('fly');
    this.stopSound('tierChange');
  },
};
