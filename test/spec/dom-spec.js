describe('Testing dom functions', () => {
  beforeEach(function () {
    testObj = Object.assign({}, dom);
    knobsAndLevers.init();
  });
  it('dom gets constructed', () => {
    expect(testObj).toBeTruthy();
  });
  it('init initializes instructions when not mobile', () => {
    spyOn(testObj, 'addElement');
    spyOn(supporting, 'isMobile').and.returnValue(false);

    testObj.init();

    expect(testObj.addElement).toHaveBeenCalledWith(testObj.getLinksElement());
    expect(testObj.addElement).not.toHaveBeenCalledWith(testObj.getMobileMessageElement());
    expect(testObj.addElement).toHaveBeenCalledWith(testObj.getInstructionsElement());
  });
  it('init does not initialize instructions when mobile', () => {
    spyOn(testObj, 'addElement');
    spyOn(supporting, 'isMobile').and.returnValue(true);

    testObj.init();

    expect(testObj.addElement).toHaveBeenCalledWith(testObj.getLinksElement());
    expect(testObj.addElement).toHaveBeenCalledWith(testObj.getMobileMessageElement());
    expect(testObj.addElement).not.toHaveBeenCalledWith(testObj.getInstructionsElement());
  });
  it('getLinksElement returns links element', () => {
    let expected = document.createElement('div');
    expected.className = 'linkButtonWrapper';
    Array.from(Object.keys(dom.links)).forEach( link => {
      let aLink = document.createElement('div');
      aLink.className = 'linkButton';
      aLink.onclick = function() { window.open(dom.links[link].url) };
      aLink.innerHTML = dom.links[link].text;
      expected.appendChild(aLink);
    });

    let actual = testObj.getLinksElement();

    expect(actual).toEqual(expected);
  });
  it('getInstructionsElement returns instructions element', () => {
    let expected = document.createElement('div');
    expected.className = 'instructions';
    expected.innerHTML = dom.instructions;

    let actual = testObj.getInstructionsElement();

    expect(actual).toEqual(expected);
  });
  it('getMobileMessageElement returns mobile message element', () => {
    let expected = document.createElement('div');
    expected.innerHTML = dom.mobileWarning;

    let actual = testObj.getMobileMessageElement();

    expect(actual).toEqual(expected);
  });
  it('addElement adds element to document body', () => {
    let element = testObj.getMobileMessageElement();

    testObj.addElement(element);

    expect(document.contains(element)).toBeTruthy();
    element.parentNode.removeChild(element);
  });
});
