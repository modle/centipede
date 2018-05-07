describe('TEXTS SPEC: ', () => {
  let spec = 'TEXTS';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, texts);
    testParams = dials.text.baseParams;
    testParams.x = 0;
    testParams.y = 0;
    testComponent = new Component(testParams);
  });
  it('init constructs components', () => {
    spyOn(testObj, 'getLivesParams').and.returnValue(testComponent);
    spyOn(testObj, 'getLevelParams').and.returnValue(testComponent);
    spyOn(testObj, 'getPausedMessageParams').and.returnValue(testComponent);
    spyOn(testObj, 'getDiedTextParams').and.returnValue(testComponent);
    spyOn(testObj, 'getGameOverTextParams').and.returnValue(testComponent);

    testObj.init();

    expect(testObj.getLivesParams).toHaveBeenCalled();
    expect(testObj.getLevelParams).toHaveBeenCalled();
    expect(testObj.getPausedMessageParams).toHaveBeenCalled();
    expect(testObj.getDiedTextParams).toHaveBeenCalled();
    expect(testObj.getGameOverTextParams).toHaveBeenCalled();
  });
});
