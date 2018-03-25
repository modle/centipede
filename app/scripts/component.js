/*jslint white: true */

function Component(args) {
  this.remove = false;
  this.speedX = 0;
  this.speedY = 0;
  this.x = args.x;
  this.y = args.y;
  this.width = args.width;
  this.height = args.height;
  if (Array.from(Object.keys(args)).includes('background')) {
    this.background = args.background;
  };
  this.color = args.color;
  if (Array.from(Object.keys(args)).includes('extraArgs')) {
    this.type = args.extraArgs.type;
    this.fontSize = args.fontSize;
    this.fontType = args.fontType;
    if (Array.from(Object.keys(args.extraArgs)).includes('speed')) {
      this.speedX = args.extraArgs.speed.x;
      this.speedY = args.extraArgs.speed.y;
    };
  };
  this.update = function() {
    if (this.background) {
      this.background.update();
    }
    let ctx = game.gameArea.context;
    ctx.fillStyle = this.color;
    if (this.type == "text") {
      this.makeText(ctx);
    } else if (this.type == "centipede") {
      this.makeACentipede(ctx);
    } else {
      this.makeARectangle(ctx);
    };
  };
  this.stop = function() {
    this.speedX = 0;
    this.speedY = 0;
  },
  this.makeText = function(ctx) {
    ctx.font = this.fontSize + " " + this.fontType;
    ctx.fillText(this.text, this.x, this.y);
  };
  this.makeACentipede = function(ctx) {
    ctx.beginPath();
    let vertices = this.getCentipedeVertices(ctx);
    ctx.moveTo(vertices['x1'], vertices['y1']);
    ctx.lineTo(vertices['x2'], vertices['y2']);
    ctx.lineTo(vertices['x3'], vertices['y3']);
    ctx.fill();
  };
  this.getCentipedeVertices = function(ctx) {
    if (this.moveVertically) {
      if (this.directionY > 0) {
        return getDownTriangle(ctx, this);
      } else {
        return getUpTriangle(ctx, this);
      };
    } else {
      if (this.directionX > 0) {
        return getRightTriangle(ctx, this);
      } else {
        return getLeftTriangle(ctx, this);
      };
    };
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
  this.crashWithSidesOnly = function(otherObject) {
    let crash = true;
    // delay collision slightly by allowing objects to overlap by 1 pixel
    if (this.getRight() < otherObject.getLeft() + 1 || this.getLeft() > otherObject.getRight() - 1) {
      crash = false;
    };
    return crash;
  };
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
}

function getUpTriangle(ctx, myObject) {
  vertices = {};
  vertices['x1'] = myObject.x;
  vertices['y1'] = myObject.y + myObject.height;
  vertices['x2'] = myObject.x + myObject.width/2;
  vertices['y2'] = myObject.y;
  vertices['x3'] = myObject.x + myObject.width;
  vertices['y3'] = myObject.y + myObject.height;
  return vertices;
}

function getDownTriangle(ctx, myObject) {
  vertices = {};
  vertices['x1'] = myObject.x;
  vertices['y1'] = myObject.y;
  vertices['x2'] = myObject.x + myObject.width/2;
  vertices['y2'] = myObject.y + myObject.height;
  vertices['x3'] = myObject.x + myObject.width;
  vertices['y3'] = myObject.y;
  return vertices;
}

function getRightTriangle(ctx, myObject) {
  vertices = {};
  vertices['x1'] = myObject.x;
  vertices['y1'] = myObject.y;
  vertices['x2'] = myObject.x + myObject.width;
  vertices['y2'] = myObject.y + myObject.height/2;
  vertices['x3'] = myObject.x;
  vertices['y3'] = myObject.y + myObject.height;
  return vertices;
}

function getLeftTriangle(ctx, myObject) {
  vertices = {};
  vertices['x1'] = myObject.x + myObject.width;
  vertices['y1'] = myObject.y;
  vertices['x2'] = myObject.x;
  vertices['y2'] = myObject.y + myObject.height/2;
  vertices['x3'] = myObject.x + myObject.width;
  vertices['y3'] = myObject.y + myObject.height;
  return vertices;
}
