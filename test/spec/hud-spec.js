describe('Testing hud functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, hud);
  });
  it('hud gets constructed', () => {
    console.log('hud gets constructed');
    expect(testObj).toBeTruthy();
  });
});
