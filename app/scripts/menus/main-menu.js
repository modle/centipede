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
  text : {
    entries : [],
  },
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
    this.text.entries = [];
    let entriesSoFar = 0;
    let text = '';
    supporting.fieldToCompare = 'score';
    leaderboards.sort(supporting.compare).forEach((entry, index) => {
      entriesSoFar = this.text.entries.length;
      text = entry.initials + ': ' + entry.score;
      if (index < 10) {
        this.text.entries.push(this.buildEntry(text, entriesSoFar));
      };
    });
  },
  buildEntry : function(text, count) {
    return {
      text : text,
      xAdjust : 175,
    };
  },
};
