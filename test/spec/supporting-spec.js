describe('Testing supporting functions', () => {
  it('everyInterval should return true when n is a factor of frame number', () => {
    game.gameArea.frameNo = 10;
    expect(everyinterval(10)).toBeTruthy();
  });
  it('everyInterval should return false when n is a factor of frame number', () => {
    game.gameArea.frameNo = 3;
    expect(everyinterval(10)).not.toBeTruthy();
  });
});
