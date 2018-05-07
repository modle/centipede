/*
 * This script is unable to access functions defined in the files being loaded
 *    i.e. init.run(); results in Uncaught ReferenceError: init is not defined
 *    even after the init function has been loaded.
 * Suspect that window object is not defined at this point (it logs as undefined).
 * Therefore, need to execute those objects during script load
 *    init/runner.js accomplishes this.
*/

var libsPath = 'canvas-libs/app/scripts/';
var scriptsPath = 'app/scripts/';

var libs = [
  'collisions-base.js',
  'component.js',
  'controls/gamepad.js',
  'controls/keyboard.js',
  'controls.js',
  'dom.js',
  'game-base.js',
  'game-objects-base.js',
  'game-area.js',
  'hud.js',
  'images.js',
  'init/init.js',
  'leaderboard.js',
  'main-base.js',
  'menus/initials.js',
  'menus/main-menu.js',
  'menus.js',
  'metrics.js',
  'players-base.js',
  'sound.js',
  'sounds-base.js',
  'supporting.js',
  'templates.js',
  'texts.js',
];

var scripts = [
  'collisions.js',
  'components/centipedes.js',
  'components/game-objects.js',
  'components/lasers.js',
  'components/mushrooms.js',
  'components/players.js',
  'game.js',
  'init/init.js',
  'dials.js',
  'main.js',
  'properties/menus-props.js',
  'sounds.js',
];

var runners = [
  'init/runner.js',
];

var targetDomObject = 'head';
function loadScript (path, file) {
  var script = document.createElement("script");
  script.src = path + file;
  document[targetDomObject].appendChild(script);
  // console.log(script.src, 'added to', targetDomObject);
};

libs.forEach(file => loadScript(libsPath, file));
scripts.forEach(file => loadScript(scriptsPath, file));
setTimeout(function() {
  runners.forEach(file => loadScript(scriptsPath, file));
}, 500);
console.log(document[targetDomObject]);
