var controls = {
  keysDown : {},
  fireKeyCodes : [16, 37, 38, 39, 40, 'LMB'],
  fireButtonIndices : [0, 1, 2, 3, 4, 5, 6, 7],
  pausedButtonIndices : [9],
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
  isFiringOld : function() {
    for (let key of this.fireKeyCodes) {
      if (this.keysDown[key]) {
        return true;
      };
    };
  },
  isFiring : function() {
    if (controllerEnabled && controllerIndex >= 0) {
      buttons = navigator.getGamepads()[controllerIndex].buttons;
      for (let i = 0; i < buttons.length; i++) {
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
  console.log(e.gamepad.buttons);
  for (let button of e.gamepad.buttons) {
    console.log(button.pressed)
    console.log(button.value)
  }
});
