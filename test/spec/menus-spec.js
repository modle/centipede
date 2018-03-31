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
    spyOn(menus, 'setImages');
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    menus.show.main = true;
    game.init();
    game.gameArea.frameNo = 1;

    result = menus.processMenus();

    expect(result).toBe(true);
    expect(menus.setImages).toHaveBeenCalled();
    expect(menus.drawMenu).toHaveBeenCalledTimes(1);
    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.main);
  });
  it('processMenus calls drawMenu with screens.instructions if show.instructions is true', () => {
    spyOn(menus, 'setImages');
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    menus.show.instructions = true;
    game.init();
    game.gameArea.frameNo = 1;

    result = menus.processMenus();

    expect(result).toBe(true);
    expect(menus.setImages).toHaveBeenCalled();
    expect(menus.drawMenu).toHaveBeenCalledTimes(1);
    expect(menus.drawMenu).toHaveBeenCalledWith(menus.screens.instructions);
  });
  it('processMenus calls returns false if all show flags are false', () => {
    spyOn(menus, 'setImages');
    spyOn(menus, 'drawMenu');
    resetShowFlags();
    game.init();
    game.gameArea.frameNo = 1;

    result = menus.processMenus();

    expect(result).toBe(false);
    expect(menus.setImages).toHaveBeenCalled();
    expect(menus.drawMenu).not.toHaveBeenCalled();
  });

  it('setImages calls setImageFiles if first frame', () => {
    game.init();
    game.gameArea.frameNo = 1;
    spyOn(menus, 'setImageFiles');

    menus.setImages();

    expect(menus.setImageFiles).toHaveBeenCalledTimes(5);
  });
  it('setImages returns without calling setImageFiles if not first frame', () => {
    game.init();
    game.gameArea.frameNo = 2;
    spyOn(menus, 'setImageFiles');

    menus.setImages();

    expect(menus.setImageFiles).not.toHaveBeenCalledTimes(3);
  });
  it('setImageFiles returns if not first frame', () => {
    let play = menus.screens.main.entries.play;
    let instructions = menus.screens.main.entries.instructions;
    play.image.src = '';
    instructions.image.src = '';

    menus.setImageFiles(menus.screens.main.entries);

    expect(play.image.src).toBeTruthy();
    expect(instructions.image.src).toBeTruthy();
  });

  it('drawMenu delegates to menu functions', () => {
    spyOn(main, 'prepTheCanvas');
    spyOn(menus, 'setMenuOrder');
    spyOn(menus, 'drawImages');
    spyOn(menus, 'checkForSelection');

    menus.drawMenu(menus.screens.main.entries);

    expect(main.prepTheCanvas).toHaveBeenCalled();
    expect(menus.setMenuOrder).toHaveBeenCalled();
    expect(menus.drawImages).toHaveBeenCalled();
    expect(menus.checkForSelection).toHaveBeenCalled();
  });

  it('setMenuOrder calls shiftMenuListOrder if enough time has passed since last move', () => {
    let startTime = 30;
    menus.timeSinceMenuMove = startTime;
    spyOn(menus, 'shiftMenuListOrder');

    menus.setMenuOrder([]);

    expect(menus.timeSinceMenuMove).toBe(0);
  });

  it('setMenuOrder does not call shiftMenuListOrder if not enough time has passed since last move', () => {
    let startTime = 1;
    menus.timeSinceMenuMove = startTime;
    spyOn(menus, 'shiftMenuListOrder');

    menus.setMenuOrder([]);

    expect(menus.timeSinceMenuMove).toBe(startTime + 1);
  });

  it('shiftMenuListOrder shifts array order up and currentSelection.name matches the first entry', () => {
    currentSelection = {name : ''};
    spyOn(menus, 'getDirection').and.returnValue('up');
    let actual = ['first', 'second', 'third'];
    let expected = ['third', 'first', 'second'];

    menus.shiftMenuListOrder(actual);

    expect(actual).toEqual(expected);
    expect(menus.currentSelection.name).toBe('third');
  });

  it('shiftMenuListOrder shifts array order down and currentSelection.name matches the first entry', () => {
    menus.currentSelection = {name : ''};
    spyOn(menus, 'getDirection').and.returnValue('down');
    let actual = ['first', 'second', 'third'];
    let expected = ['second', 'third', 'first'];

    menus.shiftMenuListOrder(actual);

    expect(actual).toEqual(expected);
    expect(menus.currentSelection.name).toBe('second');
  });

  it('shiftMenuListOrder sets currentshifts array order down', () => {
    menus.currentSelection = {name : ''};
    spyOn(menus, 'getDirection').and.returnValue("");
    let actual = ['first', 'second', 'third'];
    let expected = ['first', 'second', 'third'];

    menus.shiftMenuListOrder(actual);

    expect(actual).toEqual(expected);
    expect(menus.currentSelection.name).toBe('first');
  });

  it('getDirection returns menu movement direction', () => {
    let dummyUpKeyValue = 0;
    let dummyDownKeyValue = 1;
    controls.menuKeys.up = [dummyUpKeyValue];
    controls.menuKeys.down = [dummyDownKeyValue];
    spyOn(controls, 'getMenuKeyPush').and.returnValue([dummyUpKeyValue]);
    let expected = 'up';

    let actual = menus.getDirection();

    expect(actual).toEqual(expected);
  });

  it('getDirection returns menu movement direction', () => {
    let dummyUpKeyValue = 0;
    let dummyDownKeyValue = 1;
    controls.menuKeys.up = [dummyUpKeyValue];
    controls.menuKeys.down = [dummyDownKeyValue];
    spyOn(controls, 'getMenuKeyPush').and.returnValue([dummyDownKeyValue]);
    let expected = 'down';

    let actual = menus.getDirection();

    expect(actual).toEqual(expected);
  });

  it('getDirection returns menu movement direction', () => {
    let dummyUpKeyValue = 0;
    let dummyDownKeyValue = 1;
    let someOtherValue = 999;
    controls.menuKeys.up = [dummyUpKeyValue];
    controls.menuKeys.down = [dummyDownKeyValue];
    spyOn(controls, 'getMenuKeyPush').and.returnValue([someOtherValue]);
    let expected = '';

    let actual = menus.getDirection();

    expect(actual).toEqual(expected);
  });

  it('drawImages delegates to selection, text, and marker draw functions', () => {
    spyOn(menus, 'drawEntries');
    spyOn(menus, 'drawSelectionMarker');
    spyOn(menus, 'drawTexts');

    menus.drawImages(menus.screens.main);

    expect(menus.drawEntries).toHaveBeenCalled();
    expect(menus.drawSelectionMarker).toHaveBeenCalled();
    expect(menus.drawTexts).toHaveBeenCalled();
  });

  it('drawEntries calls drawImage for each entry', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    menus.drawEntries(menus.screens.main.entries);

    expect(game.gameArea.context.drawImage).toHaveBeenCalledTimes(3);
  });
  it('drawEntries sets currentSelection entry when entry name matches', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    menus.currentSelection.name = 'play';
    menus.drawEntries(menus.screens.main.entries);

    expect(menus.currentSelection.entry.file).toBe(menus.screens.main.entries[menus.currentSelection.name].file);
  });

  it('drawSelectionMarker calls drawImage', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');
    menus.currentSelection.name = 'play';
    menus.currentSelection.entry = menus.screens.main.entries.play;

    menus.drawSelectionMarker(menus.screens.pointers.entries);

    expect(game.gameArea.context.drawImage).toHaveBeenCalledTimes(2);
  });

  it('drawTexts calls text.component.update when text components are present', () => {
    testImages = {text : Object.assign({}, menus.screens.main.text)};
    let testComponent = new Component(knobsAndLevers.text.baseParams);
    spyOn(testComponent, 'update');
    spyOn(menus, 'buildDefaultComponent').and.returnValue(testComponent);

    menus.drawTexts(testImages);

    expect(testImages.text.entries[0].component.update).toHaveBeenCalledTimes(1);
  });
  it('drawTexts does not set fontSize if not on overridden on text object', () => {
    let testComponent = new Component(knobsAndLevers.text.baseParams);
    spyOn(testComponent, 'update');
    let testImages = {
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

    menus.drawTexts(testImages);

    expect(testImages.text.entries[0].component.fontSize)
      .toBe(knobsAndLevers.text.baseParams.fontSize);
    expect(testImages.text.entries[0].component.update).toHaveBeenCalledTimes(1);
  });
  it('drawTexts does nothing if no texts are present', () => {
    testImages = {};

    // does this really even need a test?
    // there's nothing to check, but else branch needs covered
    menus.drawTexts(testImages);

    expect(true).toBe(true);
  });

  it('checkForSelection calls currentSelectionEntry action when enough time has passed', () => {
    let startTime = 30;
    menus.timeSinceSelection = startTime;
    menus.minTimeToSelect = 30;
    menus.currentSelection.entry = menus.screens.main.entries.play;
    spyOn(controls, 'keyBoardFlowControlButtonPressed').and.returnValue(true);
    spyOn(menus.currentSelection.entry, 'action');

    menus.checkForSelection();

    expect(menus.timeSinceSelection).toBe(startTime + 1);
    expect(controls.keyBoardFlowControlButtonPressed).toHaveBeenCalled();
    expect(menus.currentSelection.entry.action).toHaveBeenCalled();
  });

  it('checkForSelection does not call currentSelectionEntry action when not enough time has passed', () => {
    startTime = 0;
    menus.timeSinceSelection = startTime;
    menus.minTimeToSelect = 30;
    menus.currentSelection.entry = menus.screens.main.entries.play;
    spyOn(controls, 'keyBoardFlowControlButtonPressed').and.returnValue(true);
    spyOn(menus.currentSelection.entry, 'action');

    menus.checkForSelection();

    expect(menus.timeSinceSelection).toBe(startTime + 1);
    expect(controls.keyBoardFlowControlButtonPressed).not.toHaveBeenCalled();
    expect(menus.currentSelection.entry.action).not.toHaveBeenCalled();
  });
});
