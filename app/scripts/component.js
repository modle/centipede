/*jslint white: true */
function Component(args) {
  this.remove = false;
  this.speedX = 0;
  this.speedY = 0;
  this.x = args.x;
  this.y = args.y;
  this.width = args.width;
  this.height = args.height;
  if (args.background) {
    this.background = args.background;
  };
  this.color = args.color;
  if (args.fontSize) {
    this.fontSize = args.fontSize;
  };
  if (args.extraArgs) {
    this.type = args.extraArgs.type;
    if (args.extraArgs.speed) {
      this.speedX = args.extraArgs.speed.x;
      this.speedY = args.extraArgs.speed.y;
    };
  };
  this.update = function() {
    if (this.background) {
      this.background.update();
    };
    let ctx = game.gameArea.context;
    ctx.fillStyle = this.color;
    if (this.type == "text") {
      this.makeText(ctx);
    } else if (this.type == "centipede") {
      customComponents.makeACentipede(ctx, this.moveVertically, this);
    // to draw the ship instead of a square
    // } else if (this.type == "player") {
    //   let playerImage = new Image();
    //   playerImage.src = knobsAndLevers.mediaPath + "ship.png";
    //   ctx.drawImage(playerImage, this.x, this.y);
    } else {
      this.makeARectangle(ctx);
    };
  };
  this.stop = function() {
    this.speedX = 0;
    this.speedY = 0;
  },
  this.makeText = function(ctx) {
    ctx.font = this.fontSize + " " + knobsAndLevers.text.font;
    ctx.fillText(this.text, this.x, this.y);
  };
  this.makeARectangle = function(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function(otherObject) {
    let crash = true;
    if (this.getBottom() < otherObject.getTop() || this.getTop() > otherObject.getBottom() || this.getRight() < otherObject.getLeft() || this.getLeft() > otherObject.getRight()) {
      crash = false;
    };
    return crash;
  };
  this.crashWithXOnly = function(otherObject) {
    let crash = true;
    // delay collision slightly by allowing objects to overlap by 1 pixel
    if (this.getRight() < otherObject.getLeft() + 1 || this.getLeft() > otherObject.getRight() - 1) {
      crash = false;
    };
    return crash;
  };
  this.crashWithYOnly = function(otherObject) {
    let crash = true;
    if (this.getBottom() < otherObject.getTop() + 1 || this.getTop() > otherObject.getBottom() - 1) {
      crash = false;
    };
    return crash;
  };
  this.crashWithMiddle = function(otherObject) {
    let crash = false;
    if (this.crashWithMiddleX(otherObject) && this.crashWithYOnly(otherObject)) {
      crash = true;
    };
    return crash;
  };
  this.crashWithMiddleX = function(otherObject) {
    let thisMiddleX = this.getMiddleX();
    let otherMiddleX = otherObject.getMiddleX();
    return thisMiddleX < otherMiddleX + 5 && thisMiddleX > otherMiddleX - 5 && this.crashWithYOnly(otherObject);
  };
  this.crashWithMiddleY = function(otherObject) {
    let thisMiddleY = this.getMiddleY();
    let otherMiddleY = otherObject.getMiddleY();
    return thisMiddleY < otherMiddleY + 5 && thisMiddleY > otherMiddleY - 5;
  }
  this.getMiddleX = function() {
    return this.x + this.width / 2;
  };
  this.getMiddleY = function() {
    return this.y + this.height / 2;
  };
  this.getTop = function() {
    return this.y;
  };
  this.getBottom = function() {
    return this.y + this.height;
  };
  this.getLeft = function() {
    return this.x;
  };
  this.getRight = function() {
    return this.x + this.width;
  };
};

var customComponents = {
  makeACentipede : function(ctx, isVertical, baseObject) {
    ctx.beginPath();
    let vertices = this.getCentipedeVertices(isVertical, baseObject);
    ctx.moveTo(vertices.x1, vertices.y1);
    ctx.lineTo(vertices.x2, vertices.y2);
    ctx.lineTo(vertices.x3, vertices.y3);
    ctx.fill();
  },
  getCentipedeVertices : function(isVertical, baseObject) {
    let direction = '';
    if (isVertical) {
      direction = baseObject.directionY > 0 ? 'down' : 'up';
    } else {
      direction = baseObject.directionX > 0 ? 'right' : 'left';
    };
    return new TriangleVertices(direction, baseObject);
  },
};

function TriangleVertices(direction, dimensions) {
  with (dimensions) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x;
    this.y2 = y;
    this.x3 = x;
    this.y3 = y;
    if (direction == 'up') {
      this.y1 = y + height;
      this.x2 = x + width / 2;
      this.x3 = x + width;
      this.y3 = y + height;
    };
    if (direction == 'down') {
      this.x2 = x + width / 2;
      this.y2 = y + height;
      this.x3 = x + width;
    };
    if (direction == 'right') {
      this.x2 = x + width;
      this.y2 = y + height / 2;
      this.y3 = y + height;
    };
    if (direction == 'left') {
      this.x1 = x + width;
      this.y2 = y + height / 2;
      this.x3 = x + width;
      this.y3 = y + height;
    };
  };
};
