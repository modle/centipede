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
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherObject) {
    var crash = true;
    if (this.getBottom() < otherObject.getTop() || this.getTop() > otherObject.getBottom() || this.getRight() < otherObject.getLeft() || this.getLeft() > otherObject.getRight()) {
      crash = false;
    }
    return crash;
  }
  this.crashWithSidesOnly = function(otherObject) {
    var crash = true;
    if (this.getRight() < otherObject.getLeft() || this.getLeft() > otherObject.getRight()) {
      crash = false;
    }
    return crash;
  }
  this.getMiddleX = function() {
    return this.x + this.width / 2;
  }
  this.getMiddleY = function() {
    return this.y + this.height / 2;
  }
  this.getTop = function() {
    return this.y;
  }
  this.getBottom = function() {
    return this.y + this.height;
  }
  this.getLeft = function() {
    return this.x;
  }
  this.getRight = function() {
    return this.x + this.width;
  }
}
