describe('Testing component functions', () => {
  beforeEach(function () {
    component = new Component({});
  });
  it('component gets constructed', () => {
    console.log('component gets constructed');
    expect(component).toBeTruthy();
  });
});
