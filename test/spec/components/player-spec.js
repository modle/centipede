describe('Testing game-piece functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, player);
  });
  it('player gets constructed', () => {
    console.log('player gets constructed');
    expect(testObj).toBeTruthy();
  });
});
