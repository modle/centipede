/*jslint white: true */

var paused = true;
var died = false;
var levelOver = false;
var gameOver = false;
var delayed = 0;
var delayEndTime = 300;
var controllerEnabled = false;
var controllerIndex = -1;

var game = {
  gameArea : new GameArea(),
  keysDown : {},
  init : function() {
    this.addEventListeners();
  },
  start : function() {
    if (supporting.isMobile()) {
      showMobile();
      return;
    }
    sounds.init();
    paused = true;
    this.gameArea.start();
  },
  reset : function() {
    this.gameArea.stop();
    hud.reset();
    this.start();
  },
  checkLevelEndConditions : function() {
    if (centipedes.numberSpawned === centipedes.numberKilled && this.gameArea.frameNo !== 0) {
      levelOver = true;
    }
  },
  startNextFrame : function() {
    this.gameArea.clear();
    this.gameArea.frameNo += 1;
  },
  manageLevel : function() {
    this.resetSomeThings();
    levelOver = false;
    metrics.currentLevel += 1;
  },
  setDiedText : function() {
    texts.diedText.text = "You died.";
    texts.diedText.update();
  },
  playDiedSound : function() {
    sounds.playerDied.play();
  },
  managePause : function() {
    texts.pausedMessage.text = "Paused: Spacebar to Continue";
    if (this.gameArea.frameNo === 0) {
      texts.pausedMessage.text = "Press Spacebar to Start";
    }
    texts.pausedMessage.update();
    stopAllSounds();
  },
  manageDeath : function() {
    this.resetMoreThings();
    texts.diedText.text = "";
    died = false;
  },
  manageGameOver : function() {
    if (gameOver) {
      stopAllSounds();
      this.showGameOver();
    };
  },
  showGameOver : function() {
    texts.gameOver.text = "Game Over";
    texts.gameOver.update();
    this.gameArea.stop();
  },
  resetSomeThings : function() {
    this.gameArea.frameNo = 0;
    centipedes.clear();
    lasers.clear();
  },
  resetMoreThings : function() {
    this.resetSomeThings();
    intervalCreatures.clear();
    spiders.clear();
    gamePiece.reset();
  },
  checkControllerState : function() {
    controllerEnabled = document.getElementById("controllerToggle").checked;
    if (!controllerEnabled) {
      controllerIndex = -1;
      return
    };
    let gamepads = navigator.getGamepads();
    if (controllerIndex < 0) {
      for (let i = 0; i < gamepads.length; i++) {
        if (!gamepads[i]) {
          return;
        };
        let buttons = gamepads[i].buttons;
        for (let j = 0; j < buttons.length; j++) {
          if (buttons[j].pressed) {
            controllerIndex = i;
            break;
          };
        };
        if (controllerIndex) {
          break;
        }
        let axes = gamepads[i].axes;
        for (let j = 0; j < axes.length; j++) {
          if (Math.abs(axes[j]) > 0.5) {
            controllerIndex = i;
            break;
          };
        };
      };
    };
  },
}

function updateGameState() {
  // this gets executed every interval
  // check game conditions and update messages
  game.manageGameOver();
  game.checkControllerState();
  if (paused) {
    sounds.centipede.stop();
    game.managePause();
    return;
  };
  if (died && delayed < delayEndTime) {
    delayed++;
    return;
  };
  if (died) {
    game.manageDeath();
    delayed = 0;
    return;
  };
  // clear the canvas
  game.checkLevelEndConditions();
  game.startNextFrame();
  manageSounds();
  hud.update();
  // make things happen
  mushrooms.manage();
  centipedes.manage();
  intervalCreatures.manage();
  spiders.manage();
  lasers.manage();
  gamePiece.manage();
  // check game conditions
  collisions.check();
  metrics.updateFloatingPoints();
  if (died) {
    game.setDiedText();
    game.playDiedSound();
    return;
  };
  if (levelOver) {
    game.manageLevel();
  }
};
