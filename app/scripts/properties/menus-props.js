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
            component : undefined,
            position : {x : 115, y : 200},
            fontSize : '50px',
          },
        ],
      },
    },
    initials : {
      order : ['a', 's', 'd', 'f',],
      // order : ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      entries : {
        a : {
          enabled : true,
          image : new Image(),
          value : 'A',
          file : "a.png",
          position : {
            x : menusPropsDefaults.positions.x - 100,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          dimensions : {width : 30, height : 40},
          action : function() {
            menus.disableMenus();
            menus.addInitials(this.value);
            menus.show.initials = true;
          },
        },
        s : {
          enabled : true,
          image : new Image(),
          value : 'S',
          file : "s.png",
          position : {
            x : menusPropsDefaults.positions.x - 50,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          dimensions : {width : 30, height : 40},
          action : function() {
            menus.disableMenus();
            menus.addInitials(this.value);
            menus.show.initials = true;
          },
        },
        d : {
          enabled : true,
          image : new Image(),
          value : 'D',
          file : "d.png",
          position : {
            x : menusPropsDefaults.positions.x - 0,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          dimensions : {width : 30, height : 40},
          action : function() {
            menus.disableMenus();
            menus.addInitials(this.value);
            menus.show.initials = true;
          },
        },
        f : {
          enabled : true,
          image : new Image(),
          value : 'F',
          file : "f.png",
          position : {
            x : menusPropsDefaults.positions.x + 50,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 0,
          },
          dimensions : {width : 30, height : 40},
          action : function() {
            menus.disableMenus();
            menus.addInitials(this.value);
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
          enabled : true,
          image : new Image(),
          file : "credits.png",
          position : {
            x : menusPropsDefaults.positions.x,
            y : menusPropsDefaults.positions.y + menusPropsDefaults.positions.yDivider * 1,
          },
          dimensions : {width : 96, height : 40},
          action : function() {
            // menus.disableMenus();
            // menus.show.leaderboard = true;
            main.clearLeaderboard();
          },
        },
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
