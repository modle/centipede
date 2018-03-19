describe('Testing component functions', () => {
  beforeEach(function () {
    component = constructComponent({});
  });
  function constructComponent(args) {
    return new Component(args);
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
  it('function is executed if contained in constructorFuctions', () => {
    let aTestObj = {};
    aTestObj.aFunction = function() {
      console.log('a function call');
    }
    spyOn(aTestObj, 'aFunction');
    let component = constructComponent(
      { constructorFunctions : [aTestObj.aFunction] }
    );
    expect(aTestObj.aFunction).toHaveBeenCalled();
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
    console.log(context.font);
    console.log(testComponent);
    expect(context.font).toEqual('10px Arial');
  });

});
