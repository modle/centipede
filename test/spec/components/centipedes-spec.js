describe('Testing centipedes functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, centipedes);
  });
  it('centipedes gets constructed', () => {
    console.log('centipedes gets constructed');
    expect(testObj).toBeTruthy();
  });
});
