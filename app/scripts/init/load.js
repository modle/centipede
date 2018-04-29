/*
 * This script is unable to access functions defined in the files being loaded
 *    i.e. init.run(); results in Uncaught ReferenceError: init is not defined
 *    even after the init function has been loaded.
 * Suspect that window object is not defined at this point (it logs as undefined).
 * Therefore, need to execute those objects during script load
 *    init/runner.js accomplishes this.
*/


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
  'init/init.js',
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
  'components/centipedes.js',
  'components/game-objects.js',
  'components/lasers.js',
  'components/metrics.js',
  'components/mushrooms.js',
  'components/players.js',
  'components/texts.js',
  'game.js',
  'init/init.js',
  'knobs-and-levers.js',
  'main.js',
  'properties/menus-props.js',
  'sound.js',
];

var runners = [
  'init/runner.js',
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
runners.forEach(file => loadScript(scriptsPath, file));

console.log(document[targetDomObject]);
