
playingSounds = []

function sound(src, volume, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = volume;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

var centipedeSound;
var spiderSound;
var wormSound;
var playerDiedSound;
var laserSoundsPool = [];
var impactSoundsPool = [];
function initSounds() {
  centipedeSound = buildSound("centipede", 0.5);
  spiderSound = buildSound("spider", 0.3);
  wormSound = buildSound("worm", 0.5, "loop");
  wormSound.loop = true;
  playerDiedSound = buildSound("player-died", 0.5);
  buildManySounds("laser", knobsAndLevers.laser.maxNumber, laserSoundsPool);
  buildManySounds("laser-impact", knobsAndLevers.laser.maxNumber, impactSoundsPool);
}

function buildSound(filename, volume, loop) {
  return new sound("media/sounds/" + filename + ".mp3", volume, loop);
}

function buildManySounds(type, length, array) {
  while (array.length <= length * 5) {
    array.push(buildSound(type, 0.5));
  }
}

function manageSounds() {
  if (centipedes.centipedes != false) {
    centipedeSound.play();
  }
  if (spiders.spiders != false) {
    spiderSound.play();
  }
  if (worms.worms != false) {
    wormSound.play();
  } else {
    wormSound.stop();
  }
}

function getAvailableLaserSound() {
  return getAvailableSound(laserSoundsPool);
}

function getAvailableImpactSound() {
  return getAvailableSound(impactSoundsPool);
}

function getAvailableSound(sounds) {
  sound = sounds.pop();
  sounds.unshift(sound);
  return sound;
}

function stopAllSounds() {
  centipedeSound.stop();
  spiderSound.stop();
  wormSound.stop();
}
