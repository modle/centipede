var sounds = {
  init : function() {
    this.centipede = buildSound("centipede", 0.5);
    this.spider = buildSound("spider", 0.3);
    this.fly = buildSound("fly", 0.3);
    this.worm = buildSound("worm", 0.5, "loop");
    this.playerDied = buildSound("player-died", 0.5);
    this.laserPool = buildManySounds("laser", knobsAndLevers.laser.maxNumber);
    this.impactPool = buildManySounds("laser-impact", knobsAndLevers.laser.maxNumber);
  }
};

function buildSound(filename, volume, loop) {
  return new Sound("app/static/media/sounds/" + filename + ".mp3", volume, loop);
}

function buildManySounds(type, length) {
  poolSize = 20;
  let soundArray = [];
  while (soundArray.length <= poolSize) {
    soundArray.push(buildSound(type, 0.5));
  };
  return soundArray;
}

function manageSounds() {
  if (centipedes.centipedes != false) {
    sounds.centipede.play();
  }
  if (spiders.spiders != false) {
    sounds.spider.play();
  }
  if (intervalCreatures.flies != false) {
    if (!sounds.fly.played) {
      sounds.fly.play();
    }
    sounds.fly.played = true;
  } else {
    sounds.fly.played = false;
  }
  if (intervalCreatures.worms != false) {
    sounds.worm.play();
  } else {
    sounds.worm.stop();
  }
}

function getAvailableLaserSound() {
  return getAvailableSound(sounds.laserPool);
}

function getAvailableImpactSound() {
  return getAvailableSound(sounds.impactPool);
}

function getAvailableSound(availableSounds) {
  sound = availableSounds.pop();
  availableSounds.unshift(sound);
  return sound;
}

function stopAllSounds() {
  sounds.centipede.stop();
  sounds.spider.stop();
  sounds.worm.stop();
  sounds.fly.stop();
}
