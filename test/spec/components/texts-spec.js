describe('Testing text functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, texts);
  });
  it('texts gets constructed', () => {
    console.log('texts gets constructed');
    expect(testObj).toBeTruthy();
  });
});
