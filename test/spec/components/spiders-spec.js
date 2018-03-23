describe('Testing spiders functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, spiders);
  });
  it('init sets interval from knobsAndLevers', () => {
    let expected = knobsAndLevers.spider.initialInterval;

    testObj.init();

    expect(testObj.interval).toBe(expected);
  });

  it('manage delegates to spawn, update, and clearOutsideCanvas', () => {
    spyOn(testObj, 'spawn');
    spyOn(testObj, 'update');
    spyOn(testObj, 'clearOutsideCanvas');

    testObj.manage();

    expect(testObj.spawn).toHaveBeenCalled();
    expect(testObj.update).toHaveBeenCalled();
    expect(testObj.clearOutsideCanvas).toHaveBeenCalled();
  });

  it('spawn returns if spiders are maxed out', () => {
    spyOn(testObj, 'maxedOut').and.returnValue(true);
    spyOn(testObj, 'updateInterval');
    spyOn(testObj, 'make');

    testObj.spawn();

    expect(testObj.maxedOut).toHaveBeenCalled();
    expect(testObj.updateInterval).not.toHaveBeenCalled();
    expect(testObj.make).not.toHaveBeenCalled();
  });
  it('spawn returns if not updateInterval', () => {
    spyOn(testObj, 'maxedOut').and.returnValue(false);;
    spyOn(testObj, 'updateInterval').and.returnValue(false);
    spyOn(testObj, 'make');

    testObj.spawn();

    expect(testObj.maxedOut).toHaveBeenCalled();
    expect(testObj.updateInterval).toHaveBeenCalled();
    expect(testObj.make).not.toHaveBeenCalled();
  });
  it('spawn calls make if updateInterval is true', () => {
    spyOn(testObj, 'maxedOut').and.returnValue(false);;
    spyOn(testObj, 'updateInterval').and.returnValue(true);
    spyOn(testObj, 'make');

    testObj.spawn();

    expect(testObj.maxedOut).toHaveBeenCalled();
    expect(testObj.updateInterval).toHaveBeenCalled();
    expect(testObj.make).toHaveBeenCalled();
  });

  it('maxedOut returns true if spiders array >= max', () => {
    testObj.spiders = [];
    while (testObj.spiders.length < knobsAndLevers.spider.maxNumber) {
      testObj.spiders.push({});
    };

    let result = testObj.maxedOut();

    expect(result).toBeTruthy();
  });

  it('maxedOut returns false if spiders array < max', () => {
    testObj.spiders = [];

    let result = testObj.maxedOut();

    expect(result).toBeFalsy();
  });

  it('updateInterval returns false if cannot update', () => {
    let expected = false;
    spyOn(testObj, 'canUpdate').and.returnValue(expected);
    spyOn(testObj, 'setInterval');

    let actual = testObj.updateInterval();

    expect(actual).toEqual(expected);
    expect(testObj.canUpdate).toHaveBeenCalled();
    expect(testObj.setInterval).not.toHaveBeenCalled();
  });
  it('updateInterval sets interval and returns true if can update', () => {
    let expected = true;
    spyOn(testObj, 'canUpdate').and.returnValue(expected);
    spyOn(testObj, 'setInterval');

    let actual = testObj.updateInterval();

    expect(actual).toEqual(expected);
    expect(testObj.canUpdate).toHaveBeenCalled();
    expect(testObj.setInterval).toHaveBeenCalled();
  });

  it('canUpdate returns false if not interval', () => {
    let expected = false;
    spyOn(supporting, 'everyinterval').and.returnValue(expected);
    spyOn(game, 'getFrameNo').and.returnValue(10);

    let actual = testObj.canUpdate();

    expect(supporting.everyinterval).toHaveBeenCalled();
    expect(actual).toEqual(expected);
  });

  it('setInterval calls get random', () => {
    spyOn(supporting, 'getRandom');

    testObj.setInterval();

    expect(supporting.getRandom).toHaveBeenCalled();
  });

  it('make adds a spider', () => {
    testObj.spiders = [];

    testObj.make();

    expect(testObj.spiders.length).toBeGreaterThan(0);
  });

  it('update delegates to spider management functions when spiders array not empty', () => {
    testObj.spiders = [new Component(knobsAndLevers.spider.args)];
    spyOn(testObj, 'updateSpeed');
    spyOn(testObj, 'updatePos');
    spyOn(testObj, 'updateComponent');
    spyOn(testObj, 'updateYDirection');

    testObj.update();

    expect(testObj.updateSpeed).toHaveBeenCalledWith(testObj.spiders[0]);
    expect(testObj.updatePos).toHaveBeenCalledWith(testObj.spiders[0]);
    expect(testObj.updateComponent).toHaveBeenCalledWith(testObj.spiders[0]);
    expect(testObj.updateYDirection).toHaveBeenCalledWith(testObj.spiders[0]);
  });
  it('update handles empty spiders array', () => {
    testObj.spiders = [];
    spyOn(testObj, 'updateSpeed');
    spyOn(testObj, 'updatePos');
    spyOn(testObj, 'updateComponent');
    spyOn(testObj, 'updateYDirection');

    testObj.update();

    expect(testObj.updateSpeed).not.toHaveBeenCalled();
    expect(testObj.updatePos).not.toHaveBeenCalled();
    expect(testObj.updateComponent).not.toHaveBeenCalled();
    expect(testObj.updateYDirection).not.toHaveBeenCalled();
  });

  it('updateSpeed calls getRandom to set speedY only when not valid intervals', () => {
    spyOn(supporting, 'everyinterval').and.returnValue(false);
    spyOn(game, 'getFrameNo').and.returnValue(10);
    spyOn(supporting, 'getRandom');

    testObj.updateSpeed({});

    expect(supporting.everyinterval).toHaveBeenCalled();
    expect(supporting.getRandom).toHaveBeenCalled();
  });

  it('updateSpeed calls getRandom twice to set speedX and speedY when valid intervals', () => {
    spyOn(supporting, 'everyinterval').and.returnValue(true);
    spyOn(game, 'getFrameNo').and.returnValue(10);
    spyOn(supporting, 'getRandom');

    testObj.updateSpeed({});

    expect(supporting.everyinterval).toHaveBeenCalled();
    expect(supporting.getRandom).toHaveBeenCalledTimes(2);
  });

  it('updatePos calls spider.newPos', () => {
    let spider = {newPos : function(){}};
    spyOn(spider, 'newPos');

    testObj.updatePos(spider);

    expect(spider.newPos).toHaveBeenCalled();
  });

  it('updateComponent calls spider.update', () => {
    let spider = {update : function(){}};
    spyOn(spider, 'update');

    testObj.updateComponent(spider);

    expect(spider.update).toHaveBeenCalled();
  });

  it('updateYDirection sets spider to negative directionY if it hits bottom of play area', () => {
    game.init();
    let expected = -1;
    let spider = {y : knobsAndLevers.canvasHeight, height : 1, directionY : -expected};

    testObj.updateYDirection(spider);

    expect(spider.directionY).toBe(expected);
  });
  it('updateYDirection sets spider to positive directionY if it hits top of play area', () => {
    game.init();
    game.gameArea.gamePieceTopLimit = 10;
    let expected = 1;
    let spider = {y : 1, height : 1, directionY : -expected};

    testObj.updateYDirection(spider);

    expect(spider.directionY).toBe(expected);
  });
  it('updateYDirection does nothing if neither condition is met', () => {
    game.init();
    game.gameArea.gamePieceTopLimit = 10;
    let expected = 1;
    let spider = {y : 10, height : 1, directionY : expected};

    testObj.updateYDirection(spider);

    expect(spider.directionY).toBe(expected);
  });

  it('clearOutsideCanvas does nothing if spiders is empty', () => {
    testObj.spiders = [];

    expect(testObj.spiders.length).toBe(0);

    testObj.clearOutsideCanvas();

    expect(testObj.spiders.length).toBe(0);
  })

  it('clearOutsideCanvas filters spiders outside right canvas edge', () => {
    let testWidth = 10;
    let outsideWidth = testWidth + 1;
    let insideWidth = testWidth - 1;
    game.init();
    game.gameArea.canvas.width = testWidth;
    testObj.spiders = [{x : outsideWidth}, {x : insideWidth}];
    console.log(testObj.spiders);

    expect(testObj.spiders.length).toBe(2);

    testObj.clearOutsideCanvas();

    expect(testObj.spiders.length).toBe(1);
    expect(testObj.spiders[0].x).toBe(insideWidth);
  })

  it('clear clears spider array', () => {
    testObj.spiders = [{}];

    expect(testObj.spiders.length).toBe(1);

    testObj.clear();

    expect(testObj.spiders.length).toBe(0);
  })
});
