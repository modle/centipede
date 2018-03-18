describe('Testing lasers functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, lasers);
  });
  it('lasers gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
});
