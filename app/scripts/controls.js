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
  movementCoordinates : {
    upRight : {x : 1, y : -1},
    downRight : {x : 1, y : 1},
    downLeft : {x : -1, y : 1},
    upLeft : {x : -1, y : -1},
    up : {x : 0, y : -1},
    right : {x : 1, y : 0},
    down : {x : 0, y : 1},
    left : {x : -1, y : 0},
  },
  activeLeftStick : {x : 0, y : 0},
  boundaries : {},
  init : function() {
    this.keysDown = (this.keysDown || []);
    this.addEventListeners();
  },
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
        x : Math.abs(movementAxes[0]) > 0.15 ? movementAxes[0] : 0,
        y : Math.abs(movementAxes[1]) > 0.15 ? movementAxes[1] : 0,
      };
      if (leftStickValues.x || leftStickValues.y) {
        this.activeLeftStick = leftStickValues;
        return;
      }
    };
  },
  getActiveDirection : function() {
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
    return this.checkDirectionOfKeysPressed(this.movementCodes[direction]) || this.checkDirectionOfLeftStick(direction);
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
    compareObj = this.movementCoordinates[direction];
    compareResult =
      compareObj.x == (stickValues.x >= 0 ? Math.ceil(stickValues.x) : Math.floor(stickValues.x))
        &&
      compareObj.y == (stickValues.y >= 0 ? Math.ceil(stickValues.y) : Math.floor(stickValues.y))
    ;
    if (compareResult) {
      this.alignLeftStickValuesToBoundaries(direction);
    };
    return compareResult;
  },
  alignLeftStickValuesToBoundaries : function(direction) {
    let watchDirections = {
      'up' : ['upRight', 'upLeft'],
      'down' : ['downRight', 'downLeft'],
      'left' : ['upLeft', 'downLeft'],
      'right' : ['upRight', 'downRight'],
    };
    this.activeLeftStick.y = watchDirections.up.includes(direction) && !this.boundaries.belowTop ? 0 : this.activeLeftStick.y;
    this.activeLeftStick.y = watchDirections.down.includes(direction) && !this.boundaries.aboveBottom ? 0 : this.activeLeftStick.y;
    this.activeLeftStick.x = watchDirections.left.includes(direction) && !this.boundaries.insideLeft ? 0 : this.activeLeftStick.x;
    this.activeLeftStick.x = watchDirections.right.includes(direction) && !this.boundaries.insideRight ? 0 : this.activeLeftStick.x;
  },
  getPositionModifiers : function() {
    baseSpeed = knobsAndLevers.gamePieceSpeed;
    objSpeed = {
      x : this.activeLeftStick.x ? baseSpeed * Math.abs(this.activeLeftStick.x) : baseSpeed,
      y : this.activeLeftStick.y ? baseSpeed * Math.abs(this.activeLeftStick.y) : baseSpeed,
    };
    return {
      upRight: {x : objSpeed.x, y : -objSpeed.y},
      upLeft: {x : -objSpeed.x, y : -objSpeed.y},
      downRight: {x : objSpeed.x, y : objSpeed.y},
      downLeft: {x : -objSpeed.x, y : objSpeed.y},
      right: {x : objSpeed.x},
      down: {y : objSpeed.y},
      left: {x : -objSpeed.x},
      up: {y : -objSpeed.y},
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
  checkPauseButton : function() {
    if (framesToDisallowTogglePause > 0) {
      framesToDisallowTogglePause--;
      return;
    }
    // TODO extract this into a function and pass the target indices in (pausedButtonIndices or fireButtonIndices)
    if (controllerEnabled && controllerIndex >= 0) {
      let buttons = navigator.getGamepads()[controllerIndex].buttons;
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].pressed && this.pausedButtonIndices.includes(i)) {
          paused = !paused;
          framesToDisallowTogglePause = 50;
          break;
        };
      };
    };
  },
  isFiring : function() {
    if (controllerEnabled && controllerIndex >= 0) {
      let buttons = navigator.getGamepads()[controllerIndex].buttons;
      // TODO use find here
      for (let i = 0; i < buttons.length; i++) {
        // TODO this will return the first-pressed button
        // what happens when simultaneous presses are needed?
        // might be ideal to add them to the keysDown array
        if (buttons[i].pressed && this.fireButtonIndices.includes(i)) {
          return true;
        }
      };
    };
    return this.fireKeyCodes.find(key => this.keysDown[key]);
  },
};

controls.init();