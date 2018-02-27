
describe('Testing sound functions', () => {
  let path = "test/static/media/sounds/centipede.mp3";
  let sound = new Sound(path, 1.0, "loop");
  it('sound gets constructed', () => {
    console.log(sound);
    expect(path).toBeTruthy();
  });
});
