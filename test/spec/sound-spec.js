
describe('Testing sound functions', () => {
  beforeEach(function () {
    path = "test/static/media/sounds/centipede.mp3";
    sound = new Sound(path, 1.0, "loop");
  });
  it('sound gets constructed', () => {
    expect(path).toBeTruthy();
  });
});
