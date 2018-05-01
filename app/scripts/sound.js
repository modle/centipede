var sounds = {
  // TODO abstract non-centipede functionality and move to canvas-libs
  path : 'app/static/media/sounds/',
  tracks : {
    centipede : {filename : 'centipede.mp3', volume : 0.5, qty : 1, pool : []},
    spider : {filename : 'spider.mp3', volume : 0.3, qty : 1, pool : []},
    flea : {filename : 'flea.mp3', volume : 0.3, qty : 1, pool : []},
    worm : {filename : 'worm.mp3', volume : 0.3, qty : 1, pool : []},
    playerDied : {filename : 'player-died.mp3', volume : 0.3, qty : 1, pool : []},
    tierChange : {filename : 'tier-change.mp3', volume : 0.3, qty : 1, pool : []},
    laserPool : {filename : 'laser.mp3', volume : 0.3, qty : 20, pool : []},
    impactPool : {filename : 'laser-impact.mp3', volume : 0.3, qty : knobsAndLevers.lasers.quantity.value, pool : []},
  },
  init : function() {
    Object.keys(this.tracks).forEach(key => {
      let type = this.tracks[key];
      type.pool = this.buildManySounds(type.filename, type.volume, type.qty);
    });
    console.log("sounds initialized");
  },
  buildSound : function(filename, volume) {
    return new Sound(this.path + filename, volume);
  },
  buildManySounds : function(type, volume, qty) {
    let soundArray = [];
    while (soundArray.length < qty) {
      soundArray.push(this.buildSound(type, volume));
    };
    return soundArray;
  },
  manageSounds : function() {
    if (!knobsAndLevers.game.sounds.value || !game.running) {
      return;
    };
    this.manageCentipedeSounds();
    this.manageSpiderSounds();
    this.manageFleaSounds();
    this.manageWormSounds();
  },
  manageCentipedeSounds : function() {
    if (centipedes.centipedes != false) {
      this.playSound(this.getSound('centipede'));
    };
  },
  getSound : function(type) {
    return this.getAvailableSound(this.tracks[type].pool);
  },
  getAvailableSound : function(availableSounds) {
    let sound = availableSounds.pop();
    availableSounds.unshift(sound);
    return sound;
  },
  playSound : function(sound) {
    if (knobsAndLevers.game.sounds.value) {
      sound.play();
    };
  },
  manageSpiderSounds : function() {
    if (gameObjects.spiders != false) {
      this.playSound(this.getSound('spider'));
    };
  },
  manageFleaSounds : function() {
    let sound = this.getSound('flea');
    if (gameObjects.fleas != false) {
      if (!sound.played) {
        this.playSound(sound);
      };
      sound.played = true;
    } else {
      sound.played = false;
    };
  },
  manageWormSounds : function() {
    if (gameObjects.worms != false) {
      this.playSound(this.getSound('worm'));
    } else {
      this.stopSound(this.tracks['worm'].pool);
    };
  },
  stopSound : function(pool) {
    pool.forEach(sound => sound.stop());
  },
  playAvailableLaserSound : function() {
    this.playSound(this.getSound('laserPool'));
  },
  playImpactSound : function(type) {
    if (type !== 'mushroom') {
      this.playSound(this.getSound('impactPool'));
    };
  },
  playDiedSound : function() {
    this.playSound(this.getSound('playerDied'));
  },
  playTierChangeSound : function() {
    this.playSound(this.getSound('tierChange'));
  },
  stopAllSounds : function() {
    Object.keys(this.tracks).forEach(key => this.stopSound(this.tracks[key].pool));
  },
};
