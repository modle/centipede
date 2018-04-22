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
    this.image = new Image();
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
    if (this.type == 'text') {
      this.makeText(ctx);
    } else if (this.type == 'background') {
      return;
    } else if (this.type == 'laser') {
      this.makeARectangle(ctx);
    } else {
      customComponents.drawComponent(ctx, this);
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
  drawComponent : function(ctx, obj) {
    let filename = this.imageFileNameGenerator[obj.type](obj);
    if (!filename) {
      throw 'filename error when drawing component';
    };
    obj.image.src = knobsAndLevers.mediaPath + filename + '.png';
    ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
  },
  imageFileNameGenerator : {
    'centipede' : function(obj) {return 'centipede-head-1-' + customComponents.getCentipedeDirection(obj);},
    'player' : function(obj) {return obj.name ? obj.name : 'player1';},
    'spider' : function(obj) {return 'spider-1';},
    'mushroom' : function(obj) {return 'mushroom-' + (obj.poisoned ? 'poisoned-' : '') + obj.hitPoints;},
    'worm' : function(obj) {return obj.speedX > 0 ? 'worm-2' : 'worm-1';},
    'fly' : function(obj) {return 'flea-1';},
  },
  getCentipedeDirection : function(obj) {
    let direction = '';
    if (obj.moveVertically) {
      direction = obj.directionY > 0 ? 'down' : 'up';
    } else {
      direction = obj.directionX > 0 ? 'right' : 'left';
    };
    return direction;
  },
};
