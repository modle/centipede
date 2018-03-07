var controls = {
  keysDown : {},
  fireKeyCodes : [16, 37, 38, 39, 40, 'LMB'],
  fireButtonIndices : [0, 1, 2, 3, 4, 5, 6, 7],
  pausedButtonIndices : [9],
  movementCodes : {
    upRight : [68, 87],
    downRight : [68, 83],
    downLeft : [83, 65],
    upLeft : [65, 87],
    up : [87],
    right : [68],
    down : [83],
    left : [65],
  },
  addEventListeners : function() {
    window.addEventListener('mousedown', function (e) {
      controls.keysDown['LMB'] = (e.type === "mousedown" && event.which === 1);
    });
    window.addEventListener('mouseup', function (e) {
      controls.keysDown['LMB'] = (e.type === "mousedown" && event.which === 1);
    });
    window.addEventListener('keydown', function (e) {
      controls.keysDown[e.keyCode] = (e.type == "keydown");
    });
    window.addEventListener('keyup', function (e) {
      controls.keysDown[e.keyCode] = (e.type == "keydown");
    });
  },
  isFiring : function() {
    if (controllerEnabled && controllerIndex >= 0) {
      buttons = navigator.getGamepads()[controllerIndex].buttons;
      for (let i = 0; i < buttons.length; i++) {
        // TODO this will return the first-pressed button
        // what happens when simultaneous presses are needed?
        // might be ideal to add them to the keysDown array
        if (buttons[i].pressed && this.fireButtonIndices.includes(i)) {
          return true;
        }
      };
    }
    return this.fireKeyCodes.find(key => this.keysDown[key]);
  },
  init : function() {
    this.keysDown = (this.keysDown || []);
    this.addEventListeners();
  },
};

controls.init();

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});
