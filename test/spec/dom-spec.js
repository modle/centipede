describe('Testing dom functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, dom);
  });
  it('dom gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
  it('init initializes instructions when not mobile', () => {
    spyOn(testObj, 'addLinks');
    spyOn(testObj, 'addMobileMessage');
    spyOn(testObj, 'addInstructions');
    spyOn(supporting, 'isMobile').and.returnValue(false);
    testObj.init();
    expect(testObj.addLinks).toHaveBeenCalled();
    expect(testObj.addMobileMessage).not.toHaveBeenCalled();
    expect(testObj.addInstructions).toHaveBeenCalled();
  });
  it('init does not initialize instructions when mobile', () => {
    spyOn(testObj, 'addLinks');
    spyOn(testObj, 'addMobileMessage');
    spyOn(testObj, 'addInstructions');
    spyOn(supporting, 'isMobile').and.returnValue(true);
    testObj.init();
    expect(testObj.addLinks).toHaveBeenCalled();
    expect(testObj.addMobileMessage).toHaveBeenCalled();
    expect(testObj.addInstructions).not.toHaveBeenCalled();
  });
  xit('addLinks adds links to document body', () => {
  });
  xit('addInstructions adds insctructions to document body', () => {
  });
  xit('addMobileMessage adds mobile message to document body', () => {
  });
});
