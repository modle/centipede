var menusPropsDefaults = {
  positions : {
    x : 250,
    y : 500,
    yDivider : 40,
  }
};

var menusProps = {
  title : {
    entries : [
      {
        name : 'title',
        text : 'CENTIPEDE!',
        component : undefined,
        position : {x : 115, y : 100},
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
    entry : {
      position : {x : 0, y : 0},
      dimensions : {width : 0, height : 0},
    }
  },
  screens : {
    instructions : {
      order : ['back'],
      entries : {
        back : {
          text : 'BACK',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 2,
          },
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        entries : [
          {
            name : 'move',
            text : 'WASD : move',
            component : undefined,
            position : {x : 115, y : 200},
            fontSize : "20px",
          },
          {
            name : 'shoot',
            text : 'arrow keys or shift : shoot',
            component : undefined,
            position : {x : 115, y : 250},
            fontSize : "20px",
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
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          action : function() {
            menus.display('playerSelect');
          },
        },
        instructions : {
          text : 'INSTRUCTIONS',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
          },
          action : function() {
            menus.display('instructions');
          },
        },
        settings : {
          text : 'SETTINGS',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 2,
          },
          action : function() {
            menus.display('settings');
          },
        },
        cheats : {
          text : 'CHEATS',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 3,
          },
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
        // 'twoPlayer',
        'back'
      ],
      entries : {
        onePlayer : {
          text : '1 PLAYER',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          action : function() {
            menus.disableMenus();
            game.running = true;
            game.paused = false;
          },
        },
        // twoPlayer : {
        //   text : '2 Players',
        //   fontSize : '15px',
        //   component : undefined,
        //   position : {
        //     x : menusPropsDefaults.positions.x,
        //     y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
        //   },
        //   action : function() {
        //     menus.disableMenus();
        //     game.paused = false;
        //   },
        // },
        back : {
          text : 'BACK',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
          },
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        entries : [
          {
            name : 'playerSelect',
            text : 'Player Select',
            component : undefined,
            position : {x : 115, y : 200},
            fontSize : '20px',
          },
        ],
      },
    },
    settings : {
      order : ['sound', 'back'],
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
          text : 'SOUND ' + (knobsAndLevers.game.soundsEnabled ? 'ON' : 'OFF'),
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * -6,
          },
          action : function() {
            knobsAndLevers.game.soundsEnabled = !knobsAndLevers.game.soundsEnabled;
            let text = 'SOUND OFF';
            if (knobsAndLevers.game.soundsEnabled) {
              sounds.playAvailableLaserSound();
              text = 'SOUND ON';
            };
            menus.screens.settings.entries.sound.text = text;
            menus.display('settings');
          },
        },
        back : {
          text : 'BACK',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
          },
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        entries : [
          {
            name : 'settings',
            text : 'Settings Are Thither',
            component : undefined,
            position : {x : 115, y : 200},
            fontSize : '20px',
          },
        ],
      },
    },
    cheats : {
      order : ['laserQTY', 'laserSpeed', 'shipSpeed', 'reset', 'back'],
      getSetting : function() {

      },
      entries : {
        // god - invincible
        // demigod - a ton of lives
        laserQTY : {
          text : knobsAndLevers.laser.quantity.cheat.text + knobsAndLevers.laser.quantity.cheat.state,
          initialText : knobsAndLevers.laser.quantity.cheat.text + knobsAndLevers.laser.quantity.cheat.state,
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * -3,
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.laser.quantity);
            this.text = knobsAndLevers.laser.quantity.cheat.text + knobsAndLevers.laser.quantity.cheat.state;
            console.log('value', knobsAndLevers.laser.quantity.value, 'cheat', knobsAndLevers.laser.quantity.cheat);
            menus.display('cheats');
          },
        },
        laserSpeed : {
          text : knobsAndLevers.laser.speed.cheat.text + knobsAndLevers.laser.speed.cheat.state,
          initialText : knobsAndLevers.laser.speed.cheat.text + knobsAndLevers.laser.speed.cheat.state,
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * -2,
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.laser.speed);
            this.text = knobsAndLevers.laser.speed.cheat.text + knobsAndLevers.laser.speed.cheat.state;
            console.log('value', knobsAndLevers.laser.speed.value, 'cheat', knobsAndLevers.laser.speed.cheat);
            menus.display('cheats');
          },
        },
        shipSpeed : {
          text : knobsAndLevers.player.speed.cheat.text + knobsAndLevers.player.speed.cheat.state,
          initialText : knobsAndLevers.player.speed.cheat.text + knobsAndLevers.player.speed.cheat.state,
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * -1,
          },
          action : function() {
            knobsAndLevers.toggleParameter(knobsAndLevers.player.speed);
            this.text = knobsAndLevers.player.speed.cheat.text + knobsAndLevers.player.speed.cheat.state;
            console.log('value', knobsAndLevers.player.speed.value, 'cheat', knobsAndLevers.player.speed.cheat);
            menus.display('cheats');
          },
        },
        reset : {
          text : 'RESET',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.screens.cheats.entries.laserQTY.text = menus.screens.cheats.entries.laserQTY.initialText;
            menus.screens.cheats.entries.laserSpeed.text = menus.screens.cheats.entries.laserSpeed.initialText;
            menus.screens.cheats.entries.shipSpeed.text = menus.screens.cheats.entries.shipSpeed.initialText;
            knobsAndLevers.resetCheats();
            menus.display('cheats');
          },
        },
        back : {
          text : 'BACK',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
          },
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.display('main');
          },
        },
      },
      text : {
        entries : [
          {
            name : 'settings',
            text : 'Dear cheater,',
            component : undefined,
            position : {x : 115, y : 200},
            fontSize : '20px',
          },
          {
            name : 'settings',
            text : 'Scores will not be recorded',
            component : undefined,
            position : {x : 135, y : 225},
            fontSize : '20px',
          },
          {
            name : 'settings',
            text : 'if any of these are set',
            component : undefined,
            position : {x : 155, y : 250},
            fontSize : '20px',
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
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x - 140,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * -1,
          },
          color : 'darkgrey',
        },
        previous : {
          noSelection: true,
          fontSize : '20px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x - 120,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          color : 'grey',
        },
        current : {
          fontSize : '30px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x - 100,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
          },
          action : function() {
            menus.addInitials(this.text);
            menus.display('initials');
          },
        },
        next : {
          noSelection: true,
          fontSize : '20px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x - 120,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 2,
          },
          color : 'grey',
        },
        nexter : {
          noSelection: true,
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x - 140,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 3,
          },
          color : 'darkgrey',
        },
      },
      text : {
        entries : [
          {
            name : 'enterInitials',
            text : 'Enter your initials',
            component : undefined,
            position : {x : 115, y : 200},
            fontSize : '25px',
          },
          {
            name : 'currentScore',
            text : '',
            component : undefined,
            position : {x : 200, y : 250},
            fontSize : '20px',
          },
          {
            name : 'entered',
            text : '',
            component : undefined,
            position : {x : 350, y : 540},
            fontSize : '30px',
          },
        ],
      },
    },
  },
};
