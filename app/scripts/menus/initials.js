var initials = {
  ignoreMarker : true,
  order : ['left', 'middle', 'right', 'done'],
  options : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  letterDisplays : ['previouser', 'previous', 'next', 'nexter'],
  entries : {
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
    done : {
      text : 'DONE',
      fontSize : '30px',
      xAdjust : 175,
      yAdjust : -75,
      submit : function() {
        leaderboard.saveScore(menus.screens.initials.getEntries(), metrics.lastScore);
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
    enterInitials : {
      text : 'Enter your initials',
      fontSize : '25px',
    },
    currentScore : {
      text : '',
      xAdjust : 85,
      yAdjust : 50,
      fontSize : '20px',
    },
    previouser : {
      fontSize : '15px',
      defaultXAdjust : 7,
      xOverride : 0,
      yAdjust : -115,
      color : 'darkgrey',
    },
    previous : {
      defaultXAdjust : 5,
      xOverride : 0,
      yAdjust : -115,
      color : 'grey',
    },
    next : {
      defaultXAdjust : 5,
      xOverride : 0,
      yAdjust : -70,
      color : 'grey',
    },
    nexter : {
      fontSize : '15px',
      xOverride : 0,
      yAdjust : -70,
      color : 'darkgrey',
    },
  },
};
