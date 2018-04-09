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
    leaderboard : false,
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
      order : ['sound', 'laserQTY', 'laserSpeed', 'shipSpeed', 'back'],
      entries : {
        // difficulty
          // god - invincible
          // demigod - a ton of lives
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
        laserQTY : {
          text : 'LASER QTY: ' + (knobsAndLevers.laser.maxNumber == 1 ? 'ONE' : 'MANY'),
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * -5,
          },
          action : function() {
            knobsAndLevers.laser.maxNumber = knobsAndLevers.laser.maxNumber === 1 ? 5 : 1;
            menus.screens.settings.entries.laserQTY.text = 'LASER QTY: ' + (knobsAndLevers.laser.maxNumber == 1 ? 'NORMAL' : 'MANY');
            menus.display('settings');
          },
        },
        laserSpeed : {
          text : 'LASER SPEED: ' + (knobsAndLevers.laser.speed == 5 ? 'NORMAL' : 'FAST'),
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * -4,
          },
          action : function() {
            knobsAndLevers.laser.speed = knobsAndLevers.laser.speed === 5 ? 15 : 5;
            menus.screens.settings.entries.laserSpeed.text = 'LASER SPEED: ' + (knobsAndLevers.laser.speed == 5 ? 'NORMAL' : 'FAST');
            menus.display('settings');
          },
        },
        shipSpeed : {
          text : 'SHIP SPEED: ' + (knobsAndLevers.player.speed == 2 ? 'NORMAL' : 'FAST'),
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * -3,
          },
          action : function() {
            knobsAndLevers.player.speed = knobsAndLevers.player.speed === 2 ? 4 : 2;
            menus.screens.settings.entries.shipSpeed.text = 'SHIP SPEED: ' + (knobsAndLevers.player.speed == 2 ? 'NORMAL' : 'FAST');
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
            position : {x : 200, y : 300},
            fontSize : '30px',
          },
        ],
      },
    },
  },
};
