describe('CENTIPEDE CONTROLS SPEC: ', () => {
  let spec = 'CENTIPEDE CONTROLS';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  it('getMenuKeyPush returns only currently-pushed keys', () => {
    controls.keysDown = {"38" : true, "50" : true, "40" : false,};

    let results = controls.getMenuKeyPush();

    expect(results.includes("38")).toBeTruthy();
    expect(results.includes("50")).toBeTruthy();
    expect(results.includes("40")).toBeFalsy();
  });
});
