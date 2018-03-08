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
  movementWeights : {
    upRight : {x : 1, y : -1},
    downRight : {x : 1, y : 1},
    downLeft : {x : -1, y : 1},
    upLeft : {x : -1, y : -1},
    up : {x : 0, y : -1},
    right : {x : 1, y : 0},
    down : {x : 0, y : 1},
    left : {x : -1, y : 0},
  },
  boundaries : {},
  setBoundaries : function() {
    this.boundaries.belowTop = player.gamePiece.getTop() > game.gameArea.gamePieceTopLimit;
    this.boundaries.insideRight = player.gamePiece.getRight() < game.gameArea.canvas.width;
    this.boundaries.aboveBottom = player.gamePiece.getBottom() < game.gameArea.canvas.height;
    this.boundaries.insideLeft = player.gamePiece.getLeft() > 0;
  },
  detectControllerMovement : function() {
    this.activeLeftStick = {x : 0, y : 0};
    if (controllerEnabled && controllerIndex >= 0) {
      movementAxes = navigator.getGamepads()[controllerIndex].axes;
      leftStickValues = {
        x : Math.abs(movementAxes[0]) > 0.2 ? movementAxes[0] : 0,
        y : Math.abs(movementAxes[1]) > 0.2 ? movementAxes[1] : 0
      };
      if (leftStickValues.x || leftStickValues.y) {
        this.activeLeftStick = leftStickValues;
        return;
      }
    };
  },
  getActiveDirection : function() {
    movementKeys = this.movementCodes;
    boundaries = this.boundaries;
    directionResults = {
      upRight : this.checkDirection('upRight') && boundaries.belowTop && boundaries.insideRight,
      upLeft : this.checkDirection('upLeft') && boundaries.belowTop && boundaries.insideLeft,
      downRight : this.checkDirection('downRight') && boundaries.aboveBottom && boundaries.insideRight,
      downLeft : this.checkDirection('downLeft') && boundaries.aboveBottom && boundaries.insideLeft,
      up : this.checkDirection('up') && boundaries.belowTop,
      down : this.checkDirection('down') && boundaries.aboveBottom,
      right : this.checkDirection('right') && boundaries.insideRight,
      left : this.checkDirection('left') && boundaries.insideLeft,
    };
    return Array.from(Object.keys(directionResults)).find(direction => directionResults[direction]);
  },
  checkDirection : function(direction) {
    return this.checkDirectionOfKeysPressed(movementKeys[direction]) || this.checkDirectionOfLeftStick(direction);
  },
  checkDirectionOfKeysPressed : function(needles) {
    haystack = controls.keysDown;
    for (var i = 0; i < needles.length; i++) {
      if (!haystack[needles[i]]) {
        return false;
      }
    }
    return true;
  },
  checkDirectionOfLeftStick : function(direction) {
    stickValues = this.activeLeftStick;
    if (!stickValues) {
      return false;
    };
    compareObj = this.movementWeights[direction];
    return compareObj.x == Math.ceil(stickValues.x) && compareObj.y == Math.ceil(stickValues.y);
  },
  getPositionModifiers : function() {
    baseSpeed = knobsAndLevers.gamePieceSpeed;
    modifier = 1;
    return {
      upRight: {x : baseSpeed, y : -baseSpeed},
      upLeft: {x : -baseSpeed, y : -baseSpeed},
      downRight: {x : baseSpeed, y : baseSpeed},
      downLeft: {x : -baseSpeed, y : baseSpeed},
      right: {x : baseSpeed},
      down: {y : baseSpeed},
      left: {x : -baseSpeed},
      up: {y : -baseSpeed},
    };
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
      // console.log(navigator.getGamepads()[controllerIndex].axes)
      // console.log(navigator.getGamepads()[controllerIndex].buttons)
      let buttons = navigator.getGamepads()[controllerIndex].buttons;
      for (let i = 0; i < buttons.length; i++) {
        // TODO this will return the first-pressed button
        // what happens when simultaneous presses are needed?
        // might be ideal to add them to the keysDown array
        // if (buttons[i].pressed) {
        //   console.log('button was pressed: ', i);
        // }
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
  // for (let button of e.gamepad.buttons) {
  //   console.log(button.pressed)
  //   console.log(button.value)
  // };
});
