describe('Testing centipede-controls functions', () => {
  it('getMenuKeyPush returns only currently-pushed keys', () => {
    controls.keysDown = {"38" : true, "50" : true, "40" : false,};

    let results = controls.getMenuKeyPush();

    expect(results.includes("38")).toBeTruthy();
    expect(results.includes("50")).toBeTruthy();
    expect(results.includes("40")).toBeFalsy();
  });
});
