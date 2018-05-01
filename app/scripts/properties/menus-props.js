var menuDefaults = {
  yDivider : 25,
  entries : {
    x : 250,
    y : 500,
  },
  text : {
    x : 115,
    y : 200,
  }
};

var menusProps = {
  commonTexts : {
    title : {
      text : 'CENTIPEDE!',
      yAdjust : -100,
      fontSize : '50px',
    },
  },
  show : {
    initials : false,
    cheats : false,
    main : true,
    instructions : false,
    settings : false,
    playerSelect : false,
    playerActivate : false,
  },
  timeSinceSelection : 100,
  timeSinceMenuMove : 100,
  minTimeToSelect : 50,
  minTimeToMove : 70,
  currentSelection : {
    name : '',
    entry : undefined,
  },
  screens : {
    cheats : {
      activeIndex : 0,
      order : ['laserQTY', 'laserSpeed', 'shipSpeed', 'reset', 'back'],
      update : function() {
        let theCheats = menus.screens.cheats.entries;
        theCheats.laserQTY.update();
        theCheats.laserSpeed.update();
        theCheats.shipSpeed.update();
      },
      entries : {
        // TODO god - invincible
        // TODO demigod - a ton of lives
        laserQTY : {
          update : function() {
            this.text = knobsAndLevers.lasers.quantity.setting.render();
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.lasers.quantity);
            game.activeCheats['laserQty'] = knobsAndLevers.lasers.quantity.setting.state == "ON";
            this.update();
            menus.display('cheats');
          },
        },
        laserSpeed : {
          update : function() {
            this.text = knobsAndLevers.lasers.speed.setting.render();
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.lasers.speed);
            game.activeCheats['laserSpeed'] = knobsAndLevers.lasers.speed.setting.state == "ON";
            this.update();
            menus.display('cheats');
          },
        },
        shipSpeed : {
          update : function() {
            this.text = knobsAndLevers.player.speed.setting.render();
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.player.speed);
            game.activeCheats['shipSpeed'] = knobsAndLevers.player.speed.setting.state == "ON";
            this.update();
            menus.display('cheats');
          },
        },
        reset : {
          text : 'RESET',
          action : function() {
            knobsAndLevers.resetCheats();
            menus.screens.cheats.update();
            menus.display('cheats');
          },
        },
        back : {
          text : 'BACK',
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        first : {
          text : 'Dear cheater,',
        },
        second : {
          text : 'Scores will not be recorded',
          xAdjust : 20,
        },
        third : {
          text : 'if any of these are set',
          xAdjust : 20,
        },
      },
    },
    instructions : {
      activeIndex : 0,
      order : ['back'],
      entries : {
        back : {
          text : 'BACK',
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        move : {
          text : 'WASD : move',
        },
        shoot : {
          text : 'arrow keys or shift : shoot',
        },
      },
    },
    playerActivate : {
      activeIndex : 0,
      order : [
        'check',
        'start',
        'back',
      ],
      entries : {
        check : {
          text : 'CHECK',
          action : function() {
            menus.display('playerActivate');
          },
        },
        start : {
          text : 'START GAME',
          action : function() {
            menus.disableMenus();
            if (game.activePlayers != game.numberOfPlayers) {
              menus.display('playerActivate');
            } else {
              game.running = true;
              game.paused = false;
            };
          },
        },
        back : {
          text : 'BACK',
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        first : {
          text : '2 player mode requires gamepads',
        },
        second : {
          text : 'because laziness',
        },
        gamepadCount : {
          text : 'Active gamepads: 0',
          xAdjust : 50,
          yAdjust : 50,
        },
        player1Check : {
          base : 'Player 1: ',
          xAdjust : 50,
          yAdjust : 100,
        },
        player2Check : {
          base : 'Player 2: ',
          xAdjust : 50,
          yAdjust : 100,
        },
      },
    },
    playerSelect : {
      activeIndex : 0,
      order : [
        'onePlayer',
        'twoPlayer',
        'back',
      ],
      entries : {
        onePlayer : {
          text : '1 PLAYER',
          action : function() {
            menus.disableMenus();
            game.running = true;
            game.paused = false;
            game.numberOfPlayers = 1;
            game.activePlayers = 1;
          },
        },
        twoPlayer : {
          text : '2 PLAYERS',
          action : function() {
            game.numberOfPlayers = 2;
            menus.display('playerActivate');
          },
        },
        back : {
          text : 'BACK',
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        first : {
          text : 'Player Select',
        },
      },
    },
    settings : {
      activeIndex : 0,
      order : ['sound', 'back'],
      update : function() {
        let theSettings = menus.screens.settings.entries;
        Object.keys(theSettings).forEach(setting => {
          if (!theSettings[setting].text) {
            theSettings[setting].update();
          };
        });
      },
      entries : {
        // difficulty
          // easy - no spiders
          // hard - 10 flies
          // impossible - 100 flies
        // spider aggression
          // high/normal
        // centipedes
          // tiny/normal
        // can't really do anything with centipede speed until the vertical movement logic gets
        sound : {
          update : function() {
            this.text = knobsAndLevers.game.sounds.setting.render();
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.game.sounds);
            this.update();
            if (knobsAndLevers.game.sounds.value) {
              sounds.playAvailableLaserSound();
            };
            menus.display('settings');
          },
        },
        back : {
          text : 'BACK',
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        first : {
          text : 'Settings Are Thither',
        },
      },
    },
  },
};
