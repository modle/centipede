describe('Testing metrics functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, metrics);
  });
  it('metrics gets constructed', () => {
    console.log('metrics gets constructed');
    expect(testObj).toBeTruthy();
  });
});
