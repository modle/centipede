describe('Testing text functions', () => {
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

  it('drawImages calls drawImage', () => {
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(game.gameArea.context, 'drawImage');

    drawImages(menuImages.entries, menuImages.order);

    expect(game.gameArea.context.drawImage).toHaveBeenCalledTimes(4);
  });
});
