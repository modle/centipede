mainMenu = {
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
  text : {},
  init : function() {
    this.setLeaderboardTexts();
  },
  refresh : function() {
    this.setLeaderboardTexts();
  },
  setLeaderboardTexts : function() {
    let leaderboards = leaderboard.readLeaderboard('centipedeLeaderboard');
    if (!leaderboards) {
      return;
    };
    this.text = {};
    let entriesSoFar = 0;
    let text = '';
    supporting.fieldToCompare = 'score';
    leaderboards.sort(supporting.compare).forEach((entry, index) => {
      entriesSoFar = Object.keys(this.text).length;
      text = entry.initials + ': ' + entry.score;
      if (index < 10) {
        this.text[entry.initials + entry.score] = this.buildEntry(text, entriesSoFar);
      };
    });
    // console.log(this.text.entries);
  },
  buildEntry : function(text, count) {
    return {
      text : text,
      xAdjust : 175,
    };
  },
};
