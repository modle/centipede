var menusProps = {
  show : {
    main : true,
    instructions : false,
    settings : false,
    playerSelect : false,
  },
  mediaPath : "app/static/media/images/",
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
    main : {
      order : ['play', 'instructions', 'settings'],
      entries : {
        play : {
          image : new Image(),
          file : "play.png",
          position : {x : 350, y : 450},
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.playerSelect = true;
          },
        },
        instructions : {
          image : new Image(),
          file : "instructions.png",
          position : {x : 268, y : 490},
          dimensions : {width : 260, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.instructions = true;
          },
        },
        settings : {
          image : new Image(),
          file : "settings.png",
          position : {x : 305, y : 530},
          dimensions : {width : 182, height : 40},
          action : function() {
            menus.disableMenus();
            menus.show.settings = true;
          },
        },
      },
      text : {
        entries : [
          {
            name : 'title',
            text : 'CENTIPEDE! (warblegarble)',
            component : {},
            position : {x : 115, y : 100},
            fontSize : '50px',
          },
        ],
      },
    },
    playerSelect : {
      order : ['selectOnePlayer', 'back'],
      entries : {
        selectOnePlayer : {
          image : new Image(),
          file : "logo.png",
          position : {x : 350, y : 450},
          dimensions : {width : 96, height : 40},
          action : function() {
            menus.disableMenus();
            game.paused = false;
          },
        },
        back : {
          image : new Image(),
          file : "back.png",
          position : {x : 350, y : 490},
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
            position : {x : 115, y : 100},
          },
        ],
      },
    },
    settings : {
      order : ['doTheThing', 'back'],
      entries : {
        doTheThing : {
          image : new Image(),
          file : "credits.png",
          position : {x : 350, y : 450},
          dimensions : {width : 96, height : 40},
          action : function() {
            console.log('doTheThing clicked');
          },
        },
        back : {
          image : new Image(),
          file : "back.png",
          position : {x : 350, y : 490},
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
            position : {x : 115, y : 100},
            fontSize : '50px',
          },
        ],
      },
    },
    instructions : {
      order : ['back'],
      entries : {
        back : {
          image : new Image(),
          file : "back.png",
          position : {x : 350, y : 490},
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
  },
};
