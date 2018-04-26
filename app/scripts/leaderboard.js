var leaderboard = {
  // TODO leaderboard functions only work on chrome
  // either disable the leaderboard menu option when not in chrome
  // or figure out firefox storage usage
  saveScore : function(initials, score) {
    console.log('saving score');
    try {
      let currentLeaderboard = this.readLeaderboard(this.targetLeaderboard);
      let entry = {initials : initials, score : score, when : Date.now()};
      if (currentLeaderboard) {
        currentLeaderboard.push(entry);
      } else {
        currentLeaderboard = [entry];
      };
      localStorage.setItem(this.targetLeaderboard, JSON.stringify(currentLeaderboard));
    } catch(e) {
      console.log('could not save leaderboard to localStorage', e);
    };
  },
  readLeaderboard : function() {
    try {
      return JSON.parse(localStorage.getItem(this.targetLeaderboard));
    } catch(e) {
      console.log('could not load leaderBoard from localStorage', e);
    };
  },
  clearLeaderboard : function() {
    try {
      localStorage.removeItem(this.targetLeaderboard);
      console.log(this.targetLeaderboard, 'removed from local storage');
    } catch(e) {
      console.log(this.targetLeaderboard, 'not found in localStorage', e);
    };
  },
  init : function() {
    this.targetLeaderboard = knobsAndLevers.targetLeaderboard;
  },
};
