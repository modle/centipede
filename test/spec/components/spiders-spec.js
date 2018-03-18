describe('Testing spiders functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, spiders);
  });
  it('spiders gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
});
