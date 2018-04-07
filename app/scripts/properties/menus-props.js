var menusPropsDefaults = {
  positions : {
    x : 268,
    y : 450,
    yDivider : 40,
  }
};

var menusProps = {
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
            menus.disableMenus();
            menus.show.main = true;
          },
        },
      },
      text : {
        entries : [
          {
            name : 'move',
            text : 'WASD : move',
            component : undefined,
            position : {x : 300, y : 200},
            fontSize : "15px",
          },
          {
            name : 'shoot',
            text : 'arrow keys or shift : shoot',
            component : undefined,
            position : {x : 225, y : 250},
            fontSize : "15px",
          },
        ],
      },
    },
    main : {
      order : [
        'play',
        'instructions',
        'settings',
        'leaderboardView',
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
            menus.disableMenus();
            menus.show.playerSelect = true;
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
            menus.disableMenus();
            menus.show.instructions = true;
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
            menus.disableMenus();
            menus.show.settings = true;
          },
        },
        leaderboardView : {
          text : 'LEADERBOARD',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 3,
          },
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.main = true;
            menus.leaderboards = main.readLeaderboard();
            menus.show.leaderboard = true;
            console.log(menus.leaderboards);
          },
        },
      },
      text : {
        entries : [
          {
            name : 'title',
            text : 'CENTIPEDE!',
            component : undefined,
            position : {x : 115, y : 200},
            fontSize : '50px',
          },
        ],
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
            menus.disableMenus();
            menus.show.main = true;
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
          },
        ],
      },
    },
    settings : {
      order : ['doTheThing', 'back'],
      entries : {
        doTheThing : {
          text : 'THING',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          action : function() {
            console.log('doTheThing clicked');
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
            menus.disableMenus();
            menus.show.main = true;
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
      order : ['a', 's', 'd', 'f',],
      // order : ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      entries : {
        a : {
          text : 'A',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x - 100,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          action : function() {
            menus.disableMenus();
            menus.addInitials(this.text);
            menus.show.initials = true;
          },
        },
        s : {
          text : 'S',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x - 50,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          action : function() {
            menus.disableMenus();
            menus.addInitials(this.text);
            menus.show.initials = true;
          },
        },
        d : {
          text : 'D',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x - 0,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          action : function() {
            menus.disableMenus();
            menus.addInitials(this.text);
            menus.show.initials = true;
          },
        },
        f : {
          text : 'F',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x + 50,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          action : function() {
            menus.disableMenus();
            menus.addInitials(this.text);
            menus.show.initials = true;
          },
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
    leaderboard : {
      order : ['clear', 'back'],
      entries : {
        clear : {
          text : 'CLEAR',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
          },
          action : function() {
            // menus.disableMenus();
            // menus.show.leaderboard = true;
            main.clearLeaderboard();
          },
        },
        back : {
          text : 'BACK',
          fontSize : '15px',
          component : undefined,
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 2,
          },
          action : function() {
            menus.disableMenus();
            menus.show.main = true;
          },
        },
      },
      text : {
        entries : [
          {
            name : 'one',
            text : 'a',
            component : undefined,
            position : {x : 200, y : 200},
            fontSize : '30px',
          },
          {
            name : 'two',
            text : 'a',
            component : undefined,
            position : {x : 200, y : 250},
            fontSize : '30px',
          },
          {
            name : 'three',
            text : 'a',
            component : undefined,
            position : {x : 200, y : 300},
            fontSize : '30px',
          },
          {
            name : 'four',
            text : 'a',
            component : undefined,
            position : {x : 200, y : 350},
            fontSize : '30px',
          },
          {
            name : 'five',
            text : 'a',
            component : undefined,
            position : {x : 200, y : 400},
            fontSize : '30px',
          },
          {
            name : 'six',
            text : 'a',
            component : undefined,
            position : {x : 450, y : 200},
            fontSize : '30px',
          },
          {
            name : 'seven',
            text : 'a',
            component : undefined,
            position : {x : 450, y : 250},
            fontSize : '30px',
          },
          {
            name : 'eight',
            text : 'a',
            component : undefined,
            position : {x : 450, y : 300},
            fontSize : '30px',
          },
          {
            name : 'nine',
            text : 'a',
            component : undefined,
            position : {x : 450, y : 350},
            fontSize : '30px',
          },
          {
            name : 'ten',
            text : 'a',
            component : undefined,
            position : {x : 450, y : 400},
            fontSize : '30px',
          },
        ],
      },
    },
  },
};
