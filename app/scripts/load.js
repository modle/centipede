
var libsPath = '../canvas-libs/app/scripts/';
// var libsPath = 'https://glcdn.githack.com/taciturn-pachyderm/canvas-libs/raw/v2.2.0/app/scripts/';
var scriptsPath = 'app/scripts/';

var libs = [
  'supporting.js',
  'component.js',
  'controls/gamepad.js',
  'controls/keyboard.js',
  'controls.js',
  'dom.js',
  'gameBase.js',
  'game-area.js',
  'hud.js',
  'images.js',
  'leaderboard.js',
  'mainBase.js',
  'menus/initials.js',
  'menus/main-menu.js',
  'menus.js',
  'playerBase.js',
  'sound.js',
  'templates.js',
];

var scripts = [
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

var initLibs = [
  'init/init.js',
];

var initScripts = [
  'init/init.js',
];

var targetDomObject = 'head';
function loadScript (path, file) {
  var script = document.createElement("script");
  script.src = path + file;
  document[targetDomObject].appendChild(script);
  console.log(script.src, 'added to', targetDomObject);
};

libs.forEach(file => loadScript(libsPath, file));
scripts.forEach(file => loadScript(scriptsPath, file));
initLibs.forEach(file => loadScript(libsPath, file));
initScripts.forEach(file => loadScript(scriptsPath, file));

console.log(document[targetDomObject]);
