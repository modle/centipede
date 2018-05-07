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
    impact : {filename : 'laser-impact.mp3', volume : 0.3, qty : 20, pool : [], index : 0},
  },
  init : function() {
    Object.assign(this, soundsBase);
    Object.keys(this.tracks).forEach(key => {
      let type = this.tracks[key];
      type.pool = this.buildManySounds(type.filename, type.volume, type.qty);
    });
    console.log("sounds initialized");
  },
};
