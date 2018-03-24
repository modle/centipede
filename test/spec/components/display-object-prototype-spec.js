describe('Testing display-object-protoype functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, displayObjectPrototype);
  });
  it('manage delegates', () => {
    spyOn(testObj, 'spawn');
    spyOn(testObj, 'update');
    spyOn(testObj, 'clearOutsideCanvas');

    testObj.manage();

    expect(testObj.spawn).toHaveBeenCalled();
    expect(testObj.update).toHaveBeenCalled();
    expect(testObj.clearOutsideCanvas).toHaveBeenCalled();
  });
});
