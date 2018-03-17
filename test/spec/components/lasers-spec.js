describe('Testing lasers functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, lasers);
  });
  it('lasers gets constructed', () => {
    console.log('lasers gets constructed');
    expect(testObj).toBeTruthy();
  });
});
