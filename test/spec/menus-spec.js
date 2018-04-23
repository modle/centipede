describe('MENUS SPEC: ', () => {
  let spec = 'MENUS';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    menus.init();
  });
  function resetShowFlags() {
    Object.keys(menus.show).forEach(menu => menus.show[menu] = false);
  };
  it('display resets show object and sets selected menu to active', () => {
    spyOn(menus, 'disableMenus');
    actual = {thing1 : false, thing2 : true};
    expected = {thing1 : true, thing2 : true};
    menus.show = actual;

    menus.display('thing1');

    expect(actual).toEqual(expected);
    expect(menus.disableMenus).toHaveBeenCalled();
  });

  it('disableMenus calls prep the canvas if frame number is not 0', () => {
    game.init();
    game.gameArea.frameNo = 10;
    menus.timeSinceSelection = 10;
    spyOn(main, 'prepTheCanvas');

    menus.disableMenus();

    expect(main.prepTheCanvas).toHaveBeenCalled();
    expect(menus.timeSinceSelection).toBe(0);
  });

  it('processMenus calls drawMenu with screens.main if show.main is true', () => {
    spyOn(main, 'readLeaderboard');
    spyOn(menus, 'setLeaderboardTexts');
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    menus.show.main = true;

    menus.processMenus();

    expect(main.readLeaderboard).toHaveBeenCalled();
    expect(menus.setLeaderboardTexts).toHaveBeenCalled();
    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.main);
  });
  it('processMenus calls drawMenu with screens.instructions if show.instructions is true', () => {
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    menus.show.instructions = true;

    menus.processMenus();

    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.instructions);
  });
  it('processMenus calls drawMenu with screens.settings if show.settings is true', () => {
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    menus.show.settings = true;

    menus.processMenus();

    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.settings);
  });
  it('processMenus calls drawMenu with screens.playerSelect if show.playerSelect is true', () => {
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    menus.show.playerSelect = true;

    menus.processMenus();

    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.playerSelect);
  });
  it('processMenus calls drawMenu with screens.initials if show.initials is true', () => {
    spyOn(menus, 'drawMenu');
    spyOn(menus, 'manageInitials');
    resetShowFlags();
    menus.show.initials = true;

    menus.processMenus();

    expect(menus.manageInitials).toHaveBeenCalled();
    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.initials);
  });

  it('manageInitials does too many things at too many lavels of abstraction', () => {
    spyOn(menus, 'setInitialsMenuEntries');
    spyOn(menus, 'shiftListOrder');
    spyOn(main, 'saveScore');
    spyOn(menus, 'reset');
    menus.timeSinceMenuMove = 0;
    metrics.lastScore = 999;
    menus.screens.initials.text.entries[2].text = '';

    menus.manageInitials();

    expect(menus.screens.initials.text.entries[1].text).toBe('your score: 999');
    expect(menus.timeSinceMenuMove).toBe(1);
    expect(menus.setInitialsMenuEntries).toHaveBeenCalled();
    expect(menus.shiftListOrder).toHaveBeenCalled();
    expect(main.saveScore).not.toHaveBeenCalled();
    expect(menus.reset).not.toHaveBeenCalled();
  });
  it('manageInitials still does too many things at too many lavels of abstraction', () => {
    spyOn(menus, 'setInitialsMenuEntries');
    spyOn(menus, 'shiftListOrder');
    spyOn(main, 'saveScore');
    spyOn(menus, 'reset');
    menus.timeSinceMenuMove = 0;
    metrics.lastScore = 999;
    let expected = 'asdf';
    menus.screens.initials.text.entries[2].text = expected;

    menus.manageInitials();

    expect(menus.screens.initials.text.entries[1].text).toBe('your score: 999');
    expect(menus.timeSinceMenuMove).toBe(1);
    expect(menus.setInitialsMenuEntries).toHaveBeenCalled();
    expect(menus.shiftListOrder).toHaveBeenCalled();
    expect(main.saveScore).toHaveBeenCalledWith(expected);
    expect(menus.reset).toHaveBeenCalled();
  });

  it('setInitialsMenuEntries sets the menu entries in the correct order', () => {
    menus.screens.initials.options = [0, 1, 2, 3, 4];
    let initialOptions = menus.screens.initials.options;

    menus.setInitialsMenuEntries();

    expect(menus.screens.initials.entries.previous.text).toBe(initialOptions[4]);
    expect(menus.screens.initials.entries.previouser.text).toBe(initialOptions[3]);
    expect(menus.screens.initials.entries.current.text).toBe(initialOptions[0]);
    expect(menus.screens.initials.entries.next.text).toBe(initialOptions[1]);
    expect(menus.screens.initials.entries.nexter.text).toBe(initialOptions[2]);
  });

  it('drawMenu delegates to menu functions', () => {
    templates.init();
    menus.init();
    spyOn(main, 'prepTheCanvas');
    spyOn(menus, 'drawTexts');
    spyOn(menus, 'drawEntries');
    spyOn(menus, 'setMenuOrder');
    spyOn(menus, 'checkForSelection');
    spyOn(menus, 'drawSelectionMarker');

    menus.drawMenu(menus.screens.main);

    expect(main.prepTheCanvas).toHaveBeenCalled();
    expect(menus.drawTexts).toHaveBeenCalledTimes(2);
    expect(menus.drawEntries).toHaveBeenCalled();
    expect(menus.setMenuOrder).toHaveBeenCalled();
    expect(menus.checkForSelection).toHaveBeenCalled();
    expect(menus.drawSelectionMarker).toHaveBeenCalled();
  });
  it('processMenus returns if screen is falsey', () => {
    spyOn(main, 'prepTheCanvas');
    spyOn(menus, 'drawTexts');
    spyOn(menus, 'drawEntries');
    spyOn(menus, 'setMenuOrder');
    spyOn(menus, 'checkForSelection');
    spyOn(menus, 'drawSelectionMarker');

    menus.drawMenu({});

    expect(main.prepTheCanvas).not.toHaveBeenCalled();
    expect(menus.drawTexts).not.toHaveBeenCalled();
    expect(menus.drawEntries).not.toHaveBeenCalled();
    expect(menus.setMenuOrder).not.toHaveBeenCalled();
    expect(menus.checkForSelection).not.toHaveBeenCalled();
    expect(menus.drawSelectionMarker).not.toHaveBeenCalled();
  });

  it('setMenuOrder calls shiftListOrder if enough time has passed since last move', () => {
    let startTime = 30;
    let order = ['first'];
    menus.timeSinceMenuMove = startTime;
    spyOn(menus, 'shiftListOrder');

    menus.setMenuOrder(order);

    expect(menus.currentSelection.name).toBe(order[0]);
    expect(menus.timeSinceMenuMove).toBe(startTime + 1);
    expect(menus.shiftListOrder).toHaveBeenCalled();
  });

  it('shiftListOrder returns immediately if not enough time has passed', () => {
    menus.timeSinceMenuMove = 1;
    menus.minTimeToMove = 2;
    spyOn(controls, 'getDirection');

    menus.shiftListOrder([]);

    expect(controls.getDirection).not.toHaveBeenCalled();
  });
  it('shiftListOrder shifts array order up and currentSelection.name matches the first entry', () => {
    let startTime = 10;
    menus.timeSinceMenuMove = startTime;
    menus.minTimeToMove = startTime - 1;
    spyOn(controls, 'getDirection').and.returnValue('up');
    let actual = ['first', 'second', 'third'];
    let expected = ['third', 'first', 'second'];

    menus.shiftListOrder(actual);

    expect(actual).toEqual(expected);
  });
  it('shiftListOrder shifts array order down', () => {
    let startTime = 10;
    menus.timeSinceMenuMove = startTime;
    menus.minTimeToMove = startTime - 1;
    spyOn(controls, 'getDirection').and.returnValue('down');
    let actual = ['first', 'second', 'third'];
    let expected = ['second', 'third', 'first'];

    menus.shiftListOrder(actual);

    expect(actual).toEqual(expected);
  });
  it('shiftListOrder does not shifts array order when no direction is returned', () => {
    spyOn(controls, 'getDirection').and.returnValue("");
    let actual = ['first', 'second', 'third'];
    let expected = ['first', 'second', 'third'];

    menus.shiftListOrder(actual);

    expect(actual).toEqual(expected);
  });

  it('drawEntries sets currentSelection entry when entry name matches', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    menus.currentSelection.name = 'play';
    menus.drawEntries(menus.screens.main.entries);

    expect(menus.currentSelection.entry.file).toBe(menus.screens.main.entries[menus.currentSelection.name].file);
  });

  xit('drawSelectionMarker calls drawImage', () => {
    // only needed when drawing ship image in menu
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');
    menus.currentSelection.name = 'play';
    menus.currentSelection.entry = menus.screens.main.entries.play;

    menus.drawSelectionMarker(menus.screens.pointers.entries);

    expect(game.gameArea.context.drawImage).toHaveBeenCalledTimes(2);
  });

  it('drawTexts calls text.component.update when text components are present', () => {
    let testScreen = Object.assign({}, menus.screens.instructions.text);
    let testComponent = new Component(knobsAndLevers.text.baseParams);
    spyOn(testComponent, 'update');
    spyOn(menus, 'buildDefaultComponent').and.returnValue(testComponent);

    menus.drawTexts(testScreen);

    expect(testScreen.entries[0].component.update).toHaveBeenCalledTimes(2);
  });
  it('drawTexts does not set fontSize if not on overridden on text object', () => {
    let testComponent = new Component(knobsAndLevers.text.baseParams);
    spyOn(testComponent, 'update');
    let testMenu = {
      text : {
        entries : [
          {
            name : 'winning',
            text : 'CENTIPEDE! (warblegarble)',
            component : testComponent,
            position : {x : 115, y : 100},
          },
        ],
      }
    };
    spyOn(menus, 'buildDefaultComponent').and.returnValue(testComponent);

    menus.drawTexts(testMenu.text);

    expect(testMenu.text.entries[0].component.fontSize)
      .toBe(knobsAndLevers.text.baseParams.fontSize);
    expect(testMenu.text.entries[0].component.update).toHaveBeenCalledTimes(1);
  });
  it('drawTexts does nothing if entries is empty', () => {
    testText = {entries: []};

    // does this really even need a test?
    // there's nothing to check, but else branch needs covered
    menus.drawTexts(testText);

    expect(true).toBe(true);
  });

  it('checkForSelection calls currentSelectionEntry action when enough time has passed', () => {
    let startTime = 30;
    menus.timeSinceSelection = startTime;
    menus.minTimeToSelect = 30;
    menus.currentSelection.entry = menus.screens.main.entries.play;
    spyOn(controls.keyboard, 'flowControlButtonPressed').and.returnValue(true);
    spyOn(menus.currentSelection.entry, 'action');

    menus.checkForSelection();

    expect(menus.timeSinceSelection).toBe(startTime + 1);
    expect(controls.keyboard.flowControlButtonPressed).toHaveBeenCalled();
    expect(menus.currentSelection.entry.action).toHaveBeenCalled();
  });
  it('checkForSelection does not call currentSelectionEntry action when not enough time has passed', () => {
    startTime = 0;
    menus.timeSinceSelection = startTime;
    menus.minTimeToSelect = 30;
    menus.currentSelection.entry = menus.screens.main.entries.play;
    spyOn(controls.keyboard, 'flowControlButtonPressed').and.returnValue(true);
    spyOn(menus.currentSelection.entry, 'action');

    menus.checkForSelection();

    expect(menus.timeSinceSelection).toBe(startTime + 1);
    expect(controls.keyboard.flowControlButtonPressed).not.toHaveBeenCalled();
    expect(menus.currentSelection.entry.action).not.toHaveBeenCalled();
  });

  it('addInitials updates initials text entry if text entry length is less than 3', () => {
    let expected = 'AB';
    menus.screens.initials.text.entries[2].text = 'A';
    let textToAdd = 'B';
    spyOn(main, 'saveScore');

    menus.addInitials(textToAdd);

    expect(menus.screens.initials.text.entries[2].text).toBe(expected);
  });
  it('addInitials calls main.saveScore if text is 3 characters long', () => {
    let expected = 'ABC';
    menus.screens.initials.text.entries[2].text = expected;
    let textToAdd = 'B';
    spyOn(main, 'saveScore');
    spyOn(menus, 'reset');

    menus.addInitials(textToAdd);

    expect(menus.screens.initials.text.entries[2].text).toBe(expected);
    expect(menus.reset).toHaveBeenCalled();
    expect(main.saveScore).toHaveBeenCalledWith(expected);
  });

  it('setLeaderboardTexts adds an entry to main texts array for each leaderboard record', () => {
    spyOn(supporting, 'compare').and.callThrough();
    supporting.fieldToCompare = 'score';
    menus.leaderboards = [{initials : 'ASD', score : 1}, {initials : 'EFG', score : 2}];
    let expected = {first : 'EFG: 2', second : 'ASD: 1'};

    menus.setLeaderboardTexts();
    let actual = menus.screens.main.text.entries;

    expect(supporting.compare).toHaveBeenCalledTimes(1);
    expect(actual[0].text).toBe(expected.first);
    expect(actual[1].text).toBe(expected.second);
  });
  it('setLeaderboardTexts returns if leaderboards is falsey', () => {
    spyOn(supporting, 'compare').and.callThrough();
    menus.leaderboards = undefined;

    menus.setLeaderboardTexts();

    expect(supporting.compare).not.toHaveBeenCalled();
  });
});
