
var canvasPath = '../canvas-libs/app/scripts/';
// var canvasPath = 'https://glcdn.githack.com/taciturn-pachyderm/canvas-libs/raw/v2.2.0/app/scripts/';
var mainPath = 'app/scripts/';

var canvasFiles = [
  'supporting.js',
  'component.js',
  'controls/gamepad.js',
  'controls/keyboard.js',
  'controls.js',
  'dom.js',
  'gameBase.js',
  'game-area.js',
  'hud.js',
  'leaderboard.js',
  'mainBase.js',
  'menus/initials.js',
  'menus/main-menu.js',
  'menus.js',
  'playerBase.js',
  'sound.js',
  'templates.js',
];

var mainFiles = [
  'collisions.js',
  'component.js',
  'components/centipedes.js',
  'components/interval-creatures.js',
  'components/lasers.js',
  'components/metrics.js',
  'components/mushrooms.js',
  'components/players.js',
  'components/texts.js',
  'components/spiders.js',
  'game.js',
  'knobs-and-levers.js',
  'main.js',
  'properties/menus-props.js',
  'sound.js',
];

var canvasInitFiles = [
  'init/init.js',
];

var mainInitFiles = [
  'init/init.js',
];

var targetDomObject = 'head';
function loadScript (path, file) {
  var script = document.createElement("script");
  script.src = path + file;
  document[targetDomObject].appendChild(script);
  console.log(script.src, 'added to', targetDomObject);
};

canvasFiles.forEach(file => loadScript(canvasPath, file));
mainFiles.forEach(file => loadScript(mainPath, file));
canvasInitFiles.forEach(file => loadScript(canvasPath, file));
mainInitFiles.forEach(file => loadScript(mainPath, file));

console.log(document[targetDomObject]);
