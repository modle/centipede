
var dom = {
  links : {
    devblog : {text : 'dev blog.', url : 'http://blog.matthewodle.com/category/centipede/'},
    source : {text : 'gitlab.', url : 'https://gitlab.com/taciturn-pachyderm/centipede'},
    otherGames : {text : 'other games.', url : 'http://blog.matthewodle.com/games/'},
  },
  instructions : '<strong>Centipede!</strong><br><strong>WASD</strong> : move<br><strong><strong>',
  mobileWarning : "Mobile is not supported.<br><br>" +
                    "The use of a keyboard is required.<br><br>" +
                    "Sorry!<br><br>" +
                    "To show how bad we feel, here's a gif so you can see what you're missing (that's not rude at all, we promise!)<br><br>" +
                    "<img src='app/static/media/images/centipede.gif' style='width: 100%;'></img>" +
                    "<br><br><br><br><br><br><br><br>.",
  init : function() {
    this.addElement(this.getLinksElement());
    if (supporting.isMobile()) {
      this.addElement(this.getMobileMessageElement());
      return;
    };
    this.addElement(this.getInstructionsElement());
    console.log("dom initialized");
  },
  addElement : function(element) {
    document.body.insertBefore(element, document.body.childNodes[0]);
  },
  getLinksElement : function() {
    let element = document.createElement('div');
    element.className = 'linkButtonWrapper';
    Array.from(Object.keys(this.links)).forEach( link => {
      let aLink = document.createElement('div');
      aLink.className = 'linkButton';
      aLink.onclick = function() { window.open(dom.links[link].url) };
      aLink.innerHTML = this.links[link].text;
      element.appendChild(aLink);
    });
    return element;
  },
  getInstructionsElement : function() {
    let element = document.createElement('div');
    element.className = 'instructions';
    element.innerHTML = this.instructions;
    return element;
  },
  getMobileMessageElement : function() {
    let element = document.createElement('div');
    element.innerHTML = this.mobileWarning;
    return element;
  },
};
