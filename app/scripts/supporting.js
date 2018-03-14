/*jslint white: true */

var intervalDivisor = 5;

function everyinterval(n) {
  if ((game.gameArea.frameNo / n) % 1 === 0) {
    return true;
  }
  return false;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var supporting = {
  isMobile : function() {
    return ( location.search.indexOf( 'ignorebrowser=true' ) < 0 && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent ) );
  }
}

// TODO this is not necessary; the key is already being captured in keysDown
window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32) {
    game.paused = !game.paused;
  }
})

// TODO this is not necessary; the key is already being captured in keysDown
window.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    game.reset();
  }
})
