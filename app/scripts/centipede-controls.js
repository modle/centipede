var centipedeControls = controls;

controls.menuKeys = {up : controls.movementCodes.up.slice(), down : controls.movementCodes.down.slice()};
controls.menuKeys.up.push(38);
controls.menuKeys.down.push(40);

controls.getMenuKeyPush = function() {
  return Array.from(Object.keys(controls.keysDown)).filter(entry => controls.keysDown[entry]);
};
