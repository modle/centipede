describe('Testing mushrooms functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, mushrooms);
  });
  it('mushrooms gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
});
