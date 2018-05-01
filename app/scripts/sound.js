var sounds = {
  path : 'app/static/media/sounds/',
  tracks : {
    centipede : {filename : 'centipede.mp3', volume : 0.5, qty : 1, pool : [], index : 0},
    spiders : {filename : 'spider.mp3', volume : 0.3, qty : 1, pool : [], index : 0},
    fleas : {filename : 'flea.mp3', volume : 0.3, qty : 1, pool : [], index : 0},
    worms : {filename : 'worm.mp3', volume : 0.3, qty : 1, pool : [], index : 0},
    died : {filename : 'player-died.mp3', volume : 0.3, qty : 1, pool : [], index : 0},
    tierChange : {filename : 'tier-change.mp3', volume : 0.3, qty : 1, pool : [], index : 0},
    laser : {filename : 'laser.mp3', volume : 0.3, qty : 20, pool : [], index : 0},
    impact : {filename : 'laser-impact.mp3', volume : 0.3, qty : knobsAndLevers.lasers.quantity.value, pool : [], index : 0},
  },
  init : function() {
    Object.keys(this.tracks).forEach(key => {
      let type = this.tracks[key];
      type.pool = this.buildManySounds(type.filename, type.volume, type.qty);
    });
    console.log("sounds initialized");
  },
  buildManySounds : function(file, volume, qty) {
    let soundArray = [];
    while (soundArray.length < qty) {
      soundArray.push(new Sound(this.path + file, volume));
    };
    return soundArray;
  },
  playSound : function(type) {
    if (knobsAndLevers.game.sounds.value) {
      this.getSound(type).play();
    };
  },
  getSound : function(type) {
    let target = this.tracks[type];
    target.index = (target.index + 1) % target.pool.length;
    return target.pool[target.index];
  },
  stopAllSounds : function() {
    Object.keys(this.tracks).forEach(key => this.stopSound(this.tracks[key].pool));
  },
  stopSound : function(pool) {
    pool.forEach(sound => sound.stop());
  },
};
