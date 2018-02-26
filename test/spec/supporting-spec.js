describe('Testing supporting functions', () => {
  let gameArea = {frameNo : 10};
  it('everyInterval should return true when n is a factor of frame number', () => {
    expect(everyinterval(10)).toBeTruthy();
  });
});
