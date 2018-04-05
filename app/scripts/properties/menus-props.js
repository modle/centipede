var menusPropsDefaults = {
  positions : {
    x : 268,
    y : 450,
    yDivider : 40,
  }
};

var menusProps = {
  show : {
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
          enabled : true,
          image : new Image(),
          file : "back.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
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
            name : 'winning',
            text : 'Kill the centipede to advance to the next level',
            component : {},
            position : {x : 100, y : 100},
          },
          {
            name : 'losing',
            text : 'Avoid all bugs to stay alive',
            component : {},
            position : {x : 215, y : 150},
          },
          {
            name : 'move',
            text : 'WASD : move',
            component : {},
            position : {x : 300, y : 200},
          },
          {
            name : 'shoot',
            text : 'arrow keys or shift : shoot',
            component : {},
            position : {x : 225, y : 250},
          },
        ],
      },
    },
    pointers : {
      entries : {
        before : {
          image : new Image(),
          file : "ship.png",
          offset : -35,
        },
        after : {
          image : new Image(),
          file : "ship.png",
          offset : 0,
        },
      },
    },
    main : {
      order : [
        'play',
        'instructions',
        // 'settings',
        'leaderboardView',
        'leaderboardClear',
      ],
      entries : {
        play : {
          enabled : true,
          image : new Image(),
          file : "play.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.playerSelect = true;
          },
        },
        instructions : {
          enabled : true,
          image : new Image(),
          file : "instructions.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
          },
          dimensions : {width : 260, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.instructions = true;
          },
        },
        settings : {
          enabled : false,
          image : new Image(),
          file : "settings.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 2,
          },
          dimensions : {width : 182, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.settings = true;
          },
        },
        leaderboardView : {
          enabled : true,
          image : new Image(),
          file : "leaderboard.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 2,
          },
          dimensions : {width : 96, height : 40},
          action : function() {
            // menus.disableMenus();
            // menus.show.leaderboard = true;
            main.readLeaderboard();
          },
        },
        leaderboardClear : {
          enabled : true,
          image : new Image(),
          file : "credits.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 3,
          },
          dimensions : {width : 96, height : 40},
          action : function() {
            // menus.disableMenus();
            // menus.show.leaderboard = true;
            main.clearLeaderboard();
          },
        },
      },
      text : {
        entries : [
          {
            name : 'title',
            text : 'CENTIPEDE!',
            component : {},
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
          enabled : true,
          image : new Image(),
          file : "1player.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          dimensions : {width : 176, height : 40},
          action : function() {
            menus.disableMenus();
            game.running = true;
            game.paused = false;
          },
        },
        // twoPlayer : {
        //   enabled : true,
        //   image : new Image(),
        //   file : "2players.png",
        //   position : {
        //     x : menusPropsDefaults.positions.x,
        //     y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
        //   },
        //   dimensions : {width : 200, height : 40},
        //   action : function() {
        //     menus.disableMenus();
        //     game.paused = false;
        //   },
        // },
        back : {
          enabled : true,
          image : new Image(),
          file : "back.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 2,
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
            name : 'playerSelect',
            text : 'Choose number of players',
            component : {},
            position : {x : 115, y : 200},
          },
        ],
      },
    },
    settings : {
      order : ['doTheThing', 'back'],
      entries : {
        doTheThing : {
          enabled : false,
          image : new Image(),
          file : "thing.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          dimensions : {width : 110, height : 40},
          action : function() {
            console.log('doTheThing clicked');
          },
        },
        back : {
          enabled : true,
          image : new Image(),
          file : "back.png",
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
            component : {},
            position : {x : 115, y : 200},
            fontSize : '50px',
          },
        ],
      },
    },
  },
};
