/*jslint white: true */

var intervalDivisor = 5;

function everyinterval(n) {
  if ((gameArea.frameNo / n) % 1 === 0) {
    return true;
  }
  return false;
}

function getTime() {
  return levelTimeLimit - Math.ceil(gameArea.frameNo / ( 1000 / intervalDivisor ));
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
