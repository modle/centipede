describe('COMPONENT SPEC: ', () => {
  let spec = 'COMPONENT';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    component = constructComponent({});
    dials.init();
    game.init();
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
  it('background update gets called if background is present', () => {
    let component = constructComponent({background : {update : function(){}}});
    spyOn(component.background, 'update');
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(component, 'makeARectangle');
    component.update();
    expect(component.background.update).toHaveBeenCalled();
  });
  it('makeACentipede gets called on update when component type is centipede', () => {
    let component = constructComponent({});
    component.type = 'centipede';
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(customComponents, 'makeACentipede');

    component.update();

    expect(customComponents.makeACentipede).toHaveBeenCalled();
  });
  it('makeARectangle gets called on update when component has no type', () => {
    let component = constructComponent({});
    game.init();
    game.gameArea.context = game.gameArea.canvas.getContext("2d");
    spyOn(component, 'makeARectangle');

    component.update();

    expect(component.makeARectangle).toHaveBeenCalled();
  });

  function setUpTriangleBuildTest(moveVertically, direction) {
    let component = constructComponent({});
    component.moveVertically = moveVertically;
    component.directionX = direction.x;
    component.directionY = direction.y;
    return component;
  }
  it('getCentipedeVertices calls TriangleVertices with down when centipede is moving downward', () => {
    let component = setUpTriangleBuildTest(true, {x : 0, y : 1});
    let context = game.gameArea.canvas.getContext("2d");
    spyOn(window, 'TriangleVertices');

    customComponents.getCentipedeVertices(true, component);

    expect(window.TriangleVertices).toHaveBeenCalledWith('down', component);
  });
  it('getCentipedeVertices calls getUpTriangle when centipede is moving upward', () => {
    let component = setUpTriangleBuildTest(true, {x : 0, y : -1});
    let context = game.gameArea.canvas.getContext("2d");
    spyOn(window, 'TriangleVertices');

    customComponents.getCentipedeVertices(true, component);

    expect(window.TriangleVertices).toHaveBeenCalledWith('up', component);
  });
  it('getCentipedeVertices calls getRightTriangle when centipede is moving to the right', () => {
    let component = setUpTriangleBuildTest(false, {x : 1, y : 0});
    let context = game.gameArea.canvas.getContext("2d");
    spyOn(window, 'TriangleVertices');

    customComponents.getCentipedeVertices(false, component);

    expect(window.TriangleVertices).toHaveBeenCalledWith('right', component);
  });
  it('getCentipedeVertices calls getLeftTriangle when centipede is moving to the left', () => {
    let component = setUpTriangleBuildTest(false, {x : -1, y : 0});
    let context = game.gameArea.canvas.getContext("2d");
    spyOn(window, 'TriangleVertices');

    customComponents.getCentipedeVertices(false, component);

    expect(window.TriangleVertices).toHaveBeenCalledWith('left', component);
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
        color : "black",
        extraArgs : {type:"text"},
      }
    );
    game.init();
    let context = game.gameArea.canvas.getContext("2d");
    testComponent.makeText(context);
    expect(context.font).toEqual('10px press-start');
  });
  it('makeACentipede makes a centipede', () => {
    let vertices = {x1 : 1, y1 : 0, x2 : 0, y2 : 1, x3 : 0, y3 : -1};
    spyOn(customComponents, 'getCentipedeVertices').and.returnValue(vertices);
    game.init();
    let ctx = game.gameArea.canvas.getContext("2d");
    spyOn(ctx, 'moveTo');
    spyOn(ctx, 'lineTo');
    spyOn(ctx, 'fill');

    customComponents.makeACentipede(ctx, false, {});

    expect(ctx.moveTo).toHaveBeenCalled();
    expect(ctx.lineTo).toHaveBeenCalledTimes(2);
    expect(ctx.fill).toHaveBeenCalled();
  });
  it('newPos updates the position appropriately', () => {
    let component = createTestComponent({});
    let defaultPos = {x : 0, y : 0};
    let testSpeed = 1;
    component.speedX = testSpeed;
    component.speedY = testSpeed;
    component.x = defaultPos.x;
    component.y = defaultPos.y;

    component.newPos();

    expect(component.x).toBe(defaultPos.x + testSpeed);
    expect(component.y).toBe(defaultPos.y + testSpeed);
  });
  it('crashWith crashes', () => {
    let component = createTestComponent({});
    let somethingElse = {
      getTop : function() {return component.y},
      getRight : function() {return component.x + component.width},
      getLeft : function() {return component.x},
      getBottom : function() {return component.y + component.height},
    };
    let expected = true;

    let result = component.crashWith(somethingElse);

    expect(result).toBe(expected);
  });
  it('crashWithXOnly crashes', () => {
    let component = createTestComponent({});
    let somethingElse = {
      getRight : function() {return component.x + component.width},
      getLeft : function() {return component.x},
    };
    let expected = true;

    let result = component.crashWithXOnly(somethingElse);

    expect(result).toBe(expected);
  });
  it('crashWithXOnly does not crash', () => {
    let component = createTestComponent({});
    let somethingElse = {
      getRight : function() {return component.x - 1},
      getLeft : function() {return component.x - component.width},
    };
    let expected = false;

    let result = component.crashWithXOnly(somethingElse);

    expect(result).toBe(expected);
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
  it('TriangleVertices represents triangle pointing up', () => {
    let expected = {x1 : 10, x2 : 15, x3 : 20, y1: 20, y2 : 10, y3 : 20};
    let component = createTestComponent();

    let theVerticesObject = new TriangleVertices('up', component);

    let actual = {};
    with (theVerticesObject) {
      actual.x1 = x1;
      actual.y1 = y1;
      actual.x2 = x2;
      actual.y2 = y2;
      actual.x3 = x3;
      actual.y3 = y3;
    };
    expect(actual).toEqual(expected);
  });
  it('TriangleVertices represents triangle pointing down', () => {
    let expected = {x1 : 10, x2 : 15, x3 : 20, y1: 10, y2 : 20, y3 : 10};
    let component = createTestComponent();

    let theVerticesObject = new TriangleVertices('down', component);

    let actual = {};
    with (theVerticesObject) {
      actual.x1 = x1;
      actual.y1 = y1;
      actual.x2 = x2;
      actual.y2 = y2;
      actual.x3 = x3;
      actual.y3 = y3;
    };
    expect(actual).toEqual(expected);
  });
  it('TriangleVertices represents triangle pointing right', () => {
    let expected = {x1 : 10, x2 : 20, x3 : 10, y1: 10, y2 : 15, y3 : 20};
    let component = createTestComponent();

    let theVerticesObject = new TriangleVertices('right', component);

    let actual = {};
    with (theVerticesObject) {
      actual.x1 = x1;
      actual.y1 = y1;
      actual.x2 = x2;
      actual.y2 = y2;
      actual.x3 = x3;
      actual.y3 = y3;
    };
    expect(actual).toEqual(expected);
  });
  it('TriangleVertices represents triangle pointing left', () => {
    let expected = {x1 : 20, x2 : 10, x3 : 20, y1: 10, y2 : 15, y3 : 20};
    let component = createTestComponent();

    let theVerticesObject = new TriangleVertices('left', component);

    let actual = {};
    with (theVerticesObject) {
      actual.x1 = x1;
      actual.y1 = y1;
      actual.x2 = x2;
      actual.y2 = y2;
      actual.x3 = x3;
      actual.y3 = y3;
    };
    expect(actual).toEqual(expected);
  });
});
