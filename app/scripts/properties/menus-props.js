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
  init : function() {
    this.screens.initials.init();
  },
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
    // TODO set main to true to load main menu
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
      order : ['left', 'middle', 'right', 'submit'],
      options : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      entries : {


        previouser : {
          noSelection: true,
          fontSize : '15px',
          defaultXAdjust : 7,
          xAdjust : 7,
          yAdjust : -10,
          color : 'darkgrey',
        },
        previous : {
          noSelection: true,
          defaultXAdjust : 5,
          xAdjust : 5,
          yAdjust : -10,
          color : 'grey',
        },


        left : {
          text : 'A',
          fontSize : '30px',
          action : function() {
            let order = menus.screens.initials.order;
            menus.selectNextInitial();
            menus.display('initials');
          },
        },
        middle : {
          text : 'A',
          fontSize : '30px',
          xAdjust : 40,
          yAdjust : -25,
          action : function() {
            menus.selectNextInitial();
            menus.display('initials');
          },
        },
        right : {
          text : 'A',
          fontSize : '30px',
          xAdjust : 80,
          yAdjust : -50,
          action : function() {
            menus.selectNextInitial();
            menus.display('initials');
          },
        },


        next : {
          noSelection: true,
          defaultXAdjust : 5,
          xAdjust : 5,
          yAdjust : -50,
          color : 'grey',
        },
        nexter : {
          noSelection: true,
          fontSize : '15px',
          defaultXAdjust : 7,
          xAdjust : 7,
          yAdjust : -50,
          color : 'darkgrey',
        },


        submit : {
          text : 'Done',
          fontSize : '30px',
          xAdjust : 175,
          yAdjust : -125,
          submit : function() {
            main.saveScore(menus.screens.initials.getEntries());
            menus.display('main');
          },
          action : function() {
            menus.selectNextInitial();
            menus.display('initials');
          },
        },
      },
      getEntries : function() {
        let entries = '';
        ['left', 'middle', 'right'].forEach(entry => entries += this.entries[entry].text);
        return entries;
      },
      init : function() {
        this.entries.left.options = this.options.slice();
        this.entries.middle.options = this.options.slice();
        this.entries.right.options = this.options.slice();
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
        ],
      },
    },
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
    playerActivate : {
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
        entries : [
          {
            text : '2 player mode requires gamepads',
          },
          {
            text : 'because laziness',
          },
          {
            text : 'Active gamepads: 0',
            xAdjust : 50,
            yAdjust : 50,
          },
          {
            base : 'Player 1: ',
            xAdjust : 50,
            yAdjust : 100,
          },
          {
            base : 'Player 2: ',
            xAdjust : 50,
            yAdjust : 100,
          },
        ],
      },
    },
    playerSelect : {
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
        entries : [
          {
            text : 'Player Select',
          },
        ],
      },
    },
    settings : {
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
        entries : [
          {
            text : 'Settings Are Thither',
          },
        ],
      },
    },
  },
};
