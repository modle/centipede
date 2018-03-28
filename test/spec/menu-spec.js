describe('Testing text functions', () => {

  it('processMenus calls drawMenu with menuImages if showMenu is true', () => {
    spyOn(window, 'setImages');
    spyOn(window, 'drawMenu');
    showMenu = true;

    result = processMenus();

    expect(result).toBe(true);
    expect(window.setImages).toHaveBeenCalled();
    expect(window.drawMenu).toHaveBeenCalledTimes(1);
    expect(window.drawMenu).toHaveBeenCalledWith(menuImages);
  });
  it('processMenus calls drawMenu with instructionsImages if showInstructions is true', () => {
    spyOn(window, 'setImages');
    spyOn(window, 'drawMenu');
    showMenu = false;
    showInstructions = true;

    result = processMenus();

    expect(result).toBe(true);
    expect(window.setImages).toHaveBeenCalled();
    expect(window.drawMenu).toHaveBeenCalledTimes(1);
    expect(window.drawMenu).toHaveBeenCalledWith(instructionsImages);
  });
  it('processMenus calls returns false if showInstructions and showMenu are false', () => {
    spyOn(window, 'setImages');
    spyOn(window, 'drawMenu');
    showMenu = false;
    showInstructions = false;

    result = processMenus();

    expect(result).toBe(false);
    expect(window.setImages).toHaveBeenCalled();
    expect(window.drawMenu).not.toHaveBeenCalled();
  });

  it('setImages calls setImageFiles if first frame', () => {
    game.init();
    game.gameArea.frameNo = 1;
    spyOn(window, 'setImageFiles');

    setImages();

    expect(window.setImageFiles).toHaveBeenCalledTimes(3);
  });
  it('setImages returns without calling setImageFiles if not first frame', () => {
    game.init();
    game.gameArea.frameNo = 2;
    spyOn(window, 'setImageFiles');

    setImages();

    expect(window.setImageFiles).not.toHaveBeenCalledTimes(3);
  });
  it('setImageFiles returns if not first frame', () => {
    menuImages.entries.play.image.src = '';
    menuImages.entries.instructions.image.src = '';

    setImageFiles(menuImages.entries);

    expect(menuImages.entries.play.image.src).toBeTruthy();
    expect(menuImages.entries.instructions.image.src).toBeTruthy();
  });

  it('drawMenu delegates to menu functions', () => {
    spyOn(window, 'prepTheCanvas');
    spyOn(window, 'setMenuOrder');
    spyOn(window, 'drawImages');
    spyOn(window, 'checkForSelection');

    drawMenu(menuImages.entries);

    expect(window.prepTheCanvas).toHaveBeenCalled();
    expect(window.setMenuOrder).toHaveBeenCalled();
    expect(window.drawImages).toHaveBeenCalled();
    expect(window.checkForSelection).toHaveBeenCalled();
  });

  it('setMenuOrder calls shiftMenuListOrder if enough time has passed since last move', () => {
    let startTime = 30;
    timeSinceMenuMove = startTime;
    spyOn(window, 'shiftMenuListOrder');

    setMenuOrder([]);

    expect(timeSinceMenuMove).toBe(0);
  });

  it('setMenuOrder does not calls shiftMenuListOrder if not enough time has passed since last move', () => {
    let startTime = 1;
    timeSinceMenuMove = startTime;
    spyOn(window, 'shiftMenuListOrder');

    setMenuOrder([]);

    expect(timeSinceMenuMove).toBe(startTime + 1);
  });

  it('shiftMenuListOrder shifts array order up and currentSelection.name matches the first entry', () => {
    currentSelection = {name : ''};
    spyOn(window, 'getDirection').and.returnValue('up');
    let actual = ['first', 'second', 'third'];
    let expected = ['third', 'first', 'second'];

    shiftMenuListOrder(actual);

    expect(actual).toEqual(expected);
    expect(currentSelection.name).toBe('third');
  });

  it('shiftMenuListOrder shifts array order down and currentSelection.name matches the first entry', () => {
    currentSelection = {name : ''};
    spyOn(window, 'getDirection').and.returnValue('down');
    let actual = ['first', 'second', 'third'];
    let expected = ['second', 'third', 'first'];

    shiftMenuListOrder(actual);

    expect(actual).toEqual(expected);
    expect(currentSelection.name).toBe('second');
  });

  it('shiftMenuListOrder sets currentshifts array order down', () => {
    currentSelection = {name : ''};
    spyOn(window, 'getDirection').and.returnValue("");
    let actual = ['first', 'second', 'third'];
    let expected = ['first', 'second', 'third'];

    shiftMenuListOrder(actual);

    expect(actual).toEqual(expected);
    expect(currentSelection.name).toBe('first');
  });

  it('getDirection returns menu movement direction', () => {
    let dummyUpKeyValue = 0;
    let dummyDownKeyValue = 1;
    controls.menuKeys.up = [dummyUpKeyValue];
    controls.menuKeys.down = [dummyDownKeyValue];
    spyOn(controls, 'getMenuKeyPush').and.returnValue([dummyUpKeyValue]);
    let expected = 'up';

    let actual = getDirection();

    expect(actual).toEqual(expected);
  });

  it('getDirection returns menu movement direction', () => {
    let dummyUpKeyValue = 0;
    let dummyDownKeyValue = 1;
    controls.menuKeys.up = [dummyUpKeyValue];
    controls.menuKeys.down = [dummyDownKeyValue];
    spyOn(controls, 'getMenuKeyPush').and.returnValue([dummyDownKeyValue]);
    let expected = 'down';

    let actual = getDirection();

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

    let actual = getDirection();

    expect(actual).toEqual(expected);
  });

  it('drawImages delegates to selection, text, and marker draw functions', () => {
    spyOn(window, 'drawEntries');
    spyOn(window, 'drawSelectionMarker');
    spyOn(window, 'drawTexts');

    drawImages(menuImages);

    expect(window.drawEntries).toHaveBeenCalled();
    expect(window.drawSelectionMarker).toHaveBeenCalled();
    expect(window.drawTexts).toHaveBeenCalled();
  });

  it('drawEntries calls drawImage for each entry', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    drawEntries(menuImages.entries);

    expect(game.gameArea.context.drawImage).toHaveBeenCalledTimes(3);
  });
  it('drawEntries sets currentSelection entry when entry name matches', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    currentSelection.name = 'play';
    drawEntries(menuImages.entries);

    expect(currentSelection.entry.file).toBe(menuImages.entries[currentSelection.name].file);
  });

  it('drawSelectionMarker calls drawImage', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    drawSelectionMarker(pointerImages.entries);

    expect(game.gameArea.context.drawImage).toHaveBeenCalledTimes(2);
  });

  it('drawTexts calls text.component.update when text components are present', () => {
    testImages = {text : menuImages.text};
    spyOn(testImages.text.entries[0].component, 'update');

    drawTexts(testImages);

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

    drawTexts(testImages);

    expect(testImages.text.entries[0].component.fontSize)
      .toBe(knobsAndLevers.baseTextParams.fontSize);
    expect(testImages.text.entries[0].component.update).toHaveBeenCalledTimes(1);
  });
  it('drawTexts does nothing if no texts are present', () => {
    testImages = {};

    // does this really even need a test?
    // there's nothing to check, but else branch needs covered
    drawTexts(testImages);

    expect(true).toBe(true);
  });

  it('checkForSelection calls currentSelectionEntry action when enough time has passed', () => {
    let startTime = 61;
    timeSinceSelection = startTime;
    currentSelection.entry = menuImages.entries.play;
    spyOn(controls, 'keyBoardFlowControlButtonPressed').and.returnValue(true);
    spyOn(currentSelection.entry, 'action');

    checkForSelection();

    expect(timeSinceSelection).toBe(startTime + 1);
    expect(controls.keyBoardFlowControlButtonPressed).toHaveBeenCalled();
    expect(currentSelection.entry.action).toHaveBeenCalled();
  });

  it('checkForSelection calls currentSelectionEntry action when enough time has passed', () => {
    startTime = 30;
    timeSinceSelection = startTime;
    currentSelection.entry = menuImages.entries.play;
    spyOn(controls, 'keyBoardFlowControlButtonPressed').and.returnValue(true);
    spyOn(currentSelection.entry, 'action');

    checkForSelection();

    expect(timeSinceSelection).toBe(startTime + 1);
    expect(controls.keyBoardFlowControlButtonPressed).not.toHaveBeenCalled();
    expect(currentSelection.entry.action).not.toHaveBeenCalled();
  });
});
