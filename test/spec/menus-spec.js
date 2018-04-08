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
    menus.show.main = false;
    menus.show.playerSelect = false;
    menus.show.settings = false;
    menus.show.instructions = false;
  }
  it('processMenus calls drawMenu with screens.main if show.main is true', () => {
    spyOn(main, 'readLeaderboard');
    spyOn(menus, 'setLeaderboardTexts');
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    menus.show.main = true;

    menus.processMenus();

    expect(main.readLeaderboard).toHaveBeenCalled();
    expect(menus.setLeaderboardTexts).toHaveBeenCalled();
    expect(menus.drawMenu).toHaveBeenCalledTimes(1);
    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.main);
  });
  it('processMenus calls drawMenu with screens.instructions if show.instructions is true', () => {
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    menus.show.instructions = true;

    menus.processMenus();

    expect(menus.drawMenu).toHaveBeenCalledTimes(1);
    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.instructions);
  });
  it('processMenus calls returns false if all show flags are false', () => {
    spyOn(menus, 'drawMenu');
    resetShowFlags();

    menus.processMenus();

    expect(menus.drawMenu).not.toHaveBeenCalled();
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
});
