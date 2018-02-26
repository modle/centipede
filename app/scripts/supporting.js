/*jslint white: true */

var intervalDivisor = 5;

function everyinterval(n) {
  if ((game.gameArea.frameNo / n) % 1 === 0) {
    return true;
  }
  return false;
}

function getTime() {
  return levelTimeLimit - Math.ceil(game.gameArea.frameNo / ( 1000 / intervalDivisor ));
}

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while(d2-d < ms);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isMobile() {
  return ( location.search.indexOf( 'ignorebrowser=true' ) < 0 && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent ) );
}

function showMobile() {
  document.write("Mobile is not supported.<br><br>");
  document.write("The use of a keyboard is required.<br><br>");
  document.write("Sorry!<br><br>");
  document.write("To show how bad we feel, here's a gif so you can see what you're missing (that's not rude at all, we promise!)<br><br>");
  document.write("<img src='app/static/media/images/centipede.gif' style='width: 100%;'></img>");
}

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32) {
    paused = !paused;
  }
})

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    game.reset();
  }
})
