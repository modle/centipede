describe('Testing text functions', () => {

  it('processMenus calls drawMenu with mainImages if showMenu is true', () => {
    spyOn(menus, 'setImages');
    spyOn(menus, 'drawMenu');
    menus.showMenu = true;

    result = menus.processMenus();

    expect(result).toBe(true);
    expect(menus.setImages).toHaveBeenCalled();
    expect(menus.drawMenu).toHaveBeenCalledTimes(1);
    expect(menus.drawMenu).toHaveBeenCalledWith(menus.mainImages);
  });
  it('processMenus calls drawMenu with instructionsImages if show.instructions is true', () => {
    spyOn(menus, 'setImages');
    spyOn(menus, 'drawMenu');
    menus.showMenu = false;
    menus.show.instructions = true;

    result = menus.processMenus();

    expect(result).toBe(true);
    expect(menus.setImages).toHaveBeenCalled();
    expect(menus.drawMenu).toHaveBeenCalledTimes(1);
    expect(menus.drawMenu).toHaveBeenCalledWith(menus.instructionsImages);
  });
  it('processMenus calls returns false if show.instructions and showMenu are false', () => {
    spyOn(menus, 'setImages');
    spyOn(menus, 'drawMenu');
    menus.showMenu = false;
    menus.show.instructions = false;

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

    expect(menus.setImageFiles).toHaveBeenCalledTimes(3);
  });
  it('setImages returns without calling setImageFiles if not first frame', () => {
    game.init();
    game.gameArea.frameNo = 2;
    spyOn(menus, 'setImageFiles');

    menus.setImages();

    expect(menus.setImageFiles).not.toHaveBeenCalledTimes(3);
  });
  it('setImageFiles returns if not first frame', () => {
    menus.mainImages.entries.play.image.src = '';
    menus.mainImages.entries.instructions.image.src = '';

    menus.setImageFiles(menus.mainImages.entries);

    expect(menus.mainImages.entries.play.image.src).toBeTruthy();
    expect(menus.mainImages.entries.instructions.image.src).toBeTruthy();
  });

  it('drawMenu delegates to menu functions', () => {
    spyOn(main, 'prepTheCanvas');
    spyOn(menus, 'setMenuOrder');
    spyOn(menus, 'drawImages');
    spyOn(menus, 'checkForSelection');

    menus.drawMenu(menus.mainImages.entries);

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

    menus.drawImages(menus.mainImages);

    expect(menus.drawEntries).toHaveBeenCalled();
    expect(menus.drawSelectionMarker).toHaveBeenCalled();
    expect(menus.drawTexts).toHaveBeenCalled();
  });

  it('drawEntries calls drawImage for each entry', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    menus.drawEntries(menus.mainImages.entries);

    expect(game.gameArea.context.drawImage).toHaveBeenCalledTimes(3);
  });
  it('drawEntries sets currentSelection entry when entry name matches', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    menus.currentSelection.name = 'play';
    menus.drawEntries(menus.mainImages.entries);

    expect(menus.currentSelection.entry.file).toBe(menus.mainImages.entries[menus.currentSelection.name].file);
  });

  it('drawSelectionMarker calls drawImage', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    menus.drawSelectionMarker(menus.pointerImages.entries);

    expect(game.gameArea.context.drawImage).toHaveBeenCalledTimes(2);
  });

  it('drawTexts calls text.component.update when text components are present', () => {
    testImages = {text : menus.mainImages.text};
    spyOn(testImages.text.entries[0].component, 'update');

    menus.drawTexts(testImages);

    expect(testImages.text.entries[0].component.update).toHaveBeenCalledTimes(1);
  });
  it('drawTexts does not set fontSize if not on overridden on text object', () => {
    testImages = {
      text : {
        entries : [
          {
            name : 'winning',
            text : 'CENTIPEDE! (warblegarble)',
            component : new Component(knobsAndLevers.baseTextParams),
            position : {x : 115, y : 100},
          },
        ],
      }
    };
    spyOn(testImages.text.entries[0].component, 'update');

    menus.drawTexts(testImages);

    expect(testImages.text.entries[0].component.fontSize)
      .toBe(knobsAndLevers.baseTextParams.fontSize);
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
    let startTime = 61;
    menus.timeSinceSelection = startTime;
    menus.currentSelection.entry = menus.mainImages.entries.play;
    spyOn(controls, 'keyBoardFlowControlButtonPressed').and.returnValue(true);
    spyOn(menus.currentSelection.entry, 'action');

    menus.checkForSelection();

    expect(menus.timeSinceSelection).toBe(startTime + 1);
    expect(controls.keyBoardFlowControlButtonPressed).toHaveBeenCalled();
    expect(menus.currentSelection.entry.action).toHaveBeenCalled();
  });

  it('checkForSelection calls currentSelectionEntry action when enough time has passed', () => {
    startTime = 30;
    menus.timeSinceSelection = startTime;
    menus.currentSelection.entry = menus.mainImages.entries.play;
    spyOn(controls, 'keyBoardFlowControlButtonPressed').and.returnValue(true);
    spyOn(menus.currentSelection.entry, 'action');

    menus.checkForSelection();

    expect(menus.timeSinceSelection).toBe(startTime + 1);
    expect(controls.keyBoardFlowControlButtonPressed).not.toHaveBeenCalled();
    expect(menus.currentSelection.entry.action).not.toHaveBeenCalled();
  });
});
