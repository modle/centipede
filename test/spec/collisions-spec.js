describe('Testing collision functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, collisions);
  });
  it('collisions gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
});
