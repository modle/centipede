/*jslint white: true */

function component(width, height, color, x, y, type, extra1, extra2) {
  this.gamearea = gameArea;
  this.remove = false;
  this.type = type;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = gameArea.context;
    ctx.fillStyle = color;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillText(this.text, this.x, this.y);
    } else if (this.type == "laser") {
      this.speedX = extra1;
      this.speedY = extra2;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.type == "centipede") {
      this.makeACentipede();
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.makeACentipede = function() {
    ctx.beginPath();
    vertices = this.getCentipedeVertices();
    ctx.moveTo(vertices['x1'], vertices['y1']);
    ctx.lineTo(vertices['x2'], vertices['y2']);
    ctx.lineTo(vertices['x3'], vertices['y3']);
    ctx.fill();
  }
  this.getCentipedeVertices = function() {
    if (this.moveVertically) {
      if (this.directionY > 0) {
        return getDownTriangle(ctx, this);
      } else if (this.directionY < 0) {
        return getUpTriangle(ctx, this);
      }
    } else {
      if (this.directionX > 0) {
        return getRightTriangle(ctx, this);
      } else if (this.directionX < 0) {
        return getLeftTriangle(ctx, this);
      }
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function(otherObject) {
    var crash = true;
    if (this.getBottom() < otherObject.getTop() || this.getTop() > otherObject.getBottom() || this.getRight() < otherObject.getLeft() || this.getLeft() > otherObject.getRight()) {
      crash = false;
    }
    return crash;
  };
  this.crashWithSidesOnly = function(otherObject) {
    var crash = true;
    // delay collision slightly by allowing objects to overlap by 1 pixel
    if (this.getRight() < otherObject.getLeft() + 1 || this.getLeft() > otherObject.getRight() - 1) {
      crash = false;
    }
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