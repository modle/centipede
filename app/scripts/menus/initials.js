var initials = {
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
};
