describe('Testing collision functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, collisions);
  });
  it('collisions gets constructed', () => {
    console.log('collisions gets constructed');
    expect(testObj).toBeTruthy();
  });
});
