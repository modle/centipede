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
  title : {
    entries : [
      {
        name : 'title',
        text : 'CENTIPEDE!',
        yAdjust : -100,
        fontSize : '50px',
      },
    ],
  },
  show : {
    initials : false,
    cheats : false,
    main : true,
    instructions : false,
    settings : false,
    playerSelect : false,
  },
  timeSinceSelection : 100,
  timeSinceMenuMove : 100,
  minTimeToSelect : 90,
  minTimeToMove : 30,
  currentSelection : {
    name : '',
    entry : undefined,
  },
  screens : {
    instructions : {
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
        entries : [
          {
            text : 'WASD : move',
          },
          {
            text : 'arrow keys or shift : shoot',
          },
        ],
      },
    },
    main : {
      order : [
        'play',
        'instructions',
        'settings',
        'cheats',
      ],
      entries : {
        play : {
          text : 'PLAY',
          action : function() {
            menus.display('playerSelect');
          },
        },
        instructions : {
          text : 'INSTRUCTIONS',
          action : function() {
            menus.display('instructions');
          },
        },
        settings : {
          text : 'SETTINGS',
          action : function() {
            menus.display('settings');
          },
        },
        cheats : {
          text : 'CHEATS',
          action : function() {
            menus.display('cheats');
          },
        },
      },
      text : {
        entries : [],
      },
    },
    playerSelect : {
      order : [
        'onePlayer',
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
          },
        },
        twoPlayer : {
          text : '2 PLAYERS',
          action : function() {
            menus.disableMenus();
            game.running = true;
            game.paused = false;
            game.numberOfPlayers = 2;
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
        entries : [
          {
            text : 'Player Select',
          },
          {
            text : 'Active gamepads: 0',
            xAdjust : 50,
            yAdjust : 50,
          },
        ],
      },
    },
    settings : {
      order : ['sound', 'back'],
      update : function() {
        let theSettings = menus.screens.settings.entries;
        Array.from(Object.keys(theSettings)).forEach(setting => {
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
        entries : [
          {
            text : 'Settings Are Thither',
          },
        ],
      },
    },
    cheats : {
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
            this.text = knobsAndLevers.laser.quantity.setting.render();
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.laser.quantity);
            game.activeCheats['laserQty'] = knobsAndLevers.laser.quantity.setting.state == "ON";
            this.update();
            menus.display('cheats');
          },
        },
        laserSpeed : {
          update : function() {
            this.text = knobsAndLevers.laser.speed.setting.render();
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.laser.speed);
            game.activeCheats['laserSpeed'] = knobsAndLevers.laser.speed.setting.state == "ON";
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
        entries : [
          {
            text : 'Dear cheater,',
          },
          {
            text : 'Scores will not be recorded',
            xAdjust : 20,
          },
          {
            text : 'if any of these are set',
            xAdjust : 20,
          },
        ],
      },
    },
    initials : {
      ignoreMarker : true,
      order : ['current'],
      options : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      entries : {
        previouser : {
          noSelection: true,
          fontSize : '15px',
          xAdjust : -60,
          yAdjust : -10,
          color : 'darkgrey',
        },
        previous : {
          noSelection: true,
          xAdjust : -30,
          yAdjust : -10,
          color : 'grey',
        },
        current : {
          fontSize : '30px',
          action : function() {
            menus.addInitials(this.text);
            menus.display('initials');
          },
        },
        next : {
          noSelection: true,
          xAdjust : -30,
          yAdjust : -10,
          color : 'grey',
        },
        nexter : {
          noSelection: true,
          fontSize : '15px',
          xAdjust : -60,
          yAdjust : -10,
          color : 'darkgrey',
        },
      },
      text : {
        entries : [
          {
            name : 'enterInitials',
            text : 'Enter your initials',
            fontSize : '25px',
          },
          {
            name : 'currentScore',
            text : '',
            xAdjust : 85,
            yAdjust : 50,
            fontSize : '20px',
          },
          {
            name : 'entered',
            text : '',
            yAdjust : menuDefaults.entries.y - menuDefaults.text.y,
            xAdjust : 235,
            fontSize : '30px',
          },
        ],
      },
    },
  },
};
