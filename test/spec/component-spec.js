describe('Testing component functions', () => {
  beforeEach(function () {
    component = constructComponent({});
    knobsAndLevers.init();
  });
  function constructComponent(args) {
    return new Component(args);
  };
  function createTestComponent() {
    componentArgs = {
      x : 10,
      y : 10,
      width : 10,
      height : 10,
      extraArgs : {
        speed : {
          x : 1,
          y : 1,
        },
      },
    };
    return new Component(componentArgs);
  };
  it('component gets constructed', () => {
    expect(component).toBeTruthy();
    expect(component.background).toBeFalsy();
    expect(component.remove).toBeFalsy();
    expect(component.x).toBeUndefined();
    expect(component.y).toBeUndefined();
    expect(component.width).toBeUndefined();
    expect(component.height).toBeUndefined();
    expect(component.color).toBeUndefined();
  });
  it('component gets constructed with background', () => {
    let component = constructComponent({background : 'aBackground'});
    expect(component.background).toBeTruthy();
  });
  it('speedX,speedY are 0,0 if speed is not in extraArgs', () => {
    let component = constructComponent({extraArgs : {}});
    expect(component.speedX).toEqual(0);
    expect(component.speedY).toEqual(0);
  });
  it('speedX,speedY are 1,1 if speed is 1,1 in extraArgs', () => {
    let component = constructComponent({extraArgs : {speed : {x : 1, y : 1}}});
    expect(component.speedX).toEqual(1);
    expect(component.speedY).toEqual(1);
  });
  it('makeText gets called on update when component type is text', () => {
    let component = constructComponent({});
    component.type = 'text';
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(component, 'makeText');
    component.update();
    expect(component.makeText).toHaveBeenCalled();
  });
  it('makeACentipede gets called on update when component type is centipede', () => {
    let component = constructComponent({});
    component.type = 'centipede';
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(component, 'makeACentipede');
    component.update();
    expect(component.makeACentipede).toHaveBeenCalled();
  });
  it('makeARectangle gets called on update when component has no type', () => {
    let component = constructComponent({});
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(component, 'makeARectangle');
    component.update();
    expect(component.makeARectangle).toHaveBeenCalled();
  });
  it('speedX,speedY is set to 0,0 when stop is called', () => {
    let component = constructComponent({});
    component.speedX = 1;
    component.speedY = 1;
    component.stop();
    expect(component.speedX).toEqual(0);
    expect(component.speedY).toEqual(0);
  });
  xit('makeText makes text', () => {
    let testComponent = constructComponent(
      {
        x : 0,
        y : 0,
        fontSize : 30,
        fontType : 'Arial',
        color : "black",
        extraArgs : {type:"text"},
      }
    );
    game.init();
    let context = game.gameArea.canvas.getContext("2d");
    testComponent.makeText(context);
    expect(context.font).toEqual('10px Arial');
  });
  xit('makeACentipede makes a centipede', () => {

  });
  xit('getCentipedeVertices makes returns upTriangle', () => {

  });
  xit('getCentipedeVertices makes returns downTriangle', () => {

  });
  xit('getCentipedeVertices makes returns leftTriangle', () => {

  });
  xit('getCentipedeVertices makes returns rightTriangle', () => {

  });
  xit('makeARectangle calls fillRect', () => {

  });
  xit('newPos updates the position appropriately', () => {

  });
  xit('crashWith crashes', () => {

  });
  xit('crashWith does not crash', () => {

  });
  xit('crashWithSidesOnly crashes with sides', () => {

  });
  xit('crashWithSidesOnly does not crash with top/bottom', () => {

  });
  it('getMiddleX returns horizontal center of component', () => {
    let component = createTestComponent();
    let expected = component.x + component.width / 2;
    let actual = component.getMiddleX();
    expect(actual).toEqual(expected);
  });
  it('getMiddleY returns vertical center of component', () => {
    let component = createTestComponent();
    let expected = component.y + component.height / 2;
    let actual = component.getMiddleY();
    expect(actual).toEqual(expected);
  });
  it('getTop returns y top of component', () => {
    let component = createTestComponent();
    let expected = component.y;
    let actual = component.getTop();
    expect(actual).toEqual(expected);
  });
  it('getBottom returns y bottom of component', () => {
    let component = createTestComponent();
    let expected = component.y + component.height;
    let actual = component.getBottom();
    expect(actual).toEqual(expected);
  });
  it('getLeft returns x left of component', () => {
    let component = createTestComponent();
    let expected = component.x;
    let actual = component.getLeft();
    expect(actual).toEqual(expected);
  });
  it('getRight returns x right of component', () => {
    let component = createTestComponent();
    let expected = component.x + component.width;
    let actual = component.getRight();
    expect(actual).toEqual(expected);
  });
  it('getUpTriangle returns triangle pointing up', () => {
    let expected = {x1 : 10, x2 : 15, x3 : 20, y1: 20, y2 : 10, y3 : 20};
    let component = createTestComponent();
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    actual = getUpTriangle(game.gameArea.context, component);
    expect(actual).toEqual(expected);
  });
  it('getDownTriangle returns triangle pointing down', () => {
    let expected = {x1 : 10, x2 : 15, x3 : 20, y1: 10, y2 : 20, y3 : 10};
    let component = createTestComponent();
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    actual = getDownTriangle(game.gameArea.context, component);
    expect(actual).toEqual(expected);
  });
  it('getRightTriangle returns triangle pointing right', () => {
    let expected = {x1 : 10, x2 : 20, x3 : 10, y1: 10, y2 : 15, y3 : 20};
    let component = createTestComponent();
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    actual = getRightTriangle(game.gameArea.context, component);
    expect(actual).toEqual(expected);
  });
  it('getLeftTriangle returns triangle pointing left', () => {
    let expected = {x1 : 20, x2 : 10, x3 : 20, y1: 10, y2 : 15, y3 : 20};
    let component = createTestComponent();
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    actual = getLeftTriangle(game.gameArea.context, component);
    expect(actual).toEqual(expected);
  });
});
