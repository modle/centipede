describe('DOM SPEC: ', () => {
  let spec = 'DOM';
  beforeAll(function () {
    console.log('running ' + spec + ' SPEC');
  });
  afterAll(function () {
    console.log(spec + ' SPEC complete');
  });
  beforeEach(function () {
    testObj = Object.assign({}, dom);
    knobsAndLevers.init();
  });
  it('dom gets constructed', () => {
    expect(testObj).toBeTruthy();
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
