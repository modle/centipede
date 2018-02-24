
playingSounds = []

function sound(src, volume) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = volume;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
    // console.log(src);
  }
  this.stop = function(){
    this.sound.pause();
  }
}

var centipedeSound;
function initSounds() {
  centipedeSound = new sound("media/sounds/centipede-move.mp3", 0.5);
}

function manageSounds() {
  if (centipedes.centipedes != false) {
    centipedeSound.play();
  }
}
