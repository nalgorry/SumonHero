var cCristals = (function () {
    function cCristals(game, x, y, color, pathOption, monsterStartPoss, cristalType) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.color = color;
        this.pathOption = pathOption;
        this.monsterStartPoss = monsterStartPoss;
        this.cristalType = cristalType;
        this.maxDistance = 55;
        this.showCircleDistnace = 55;
        //lets create the cristal
        this.sprite = this.game.add.sprite(x, y);
        this.sprite.anchor.set(0.5);
        this.cristalSprite = this.game.add.sprite(0, 0, cristalColor[color]);
        this.cristalSprite.anchor.set(0.5);
        this.sprite.addChild(this.cristalSprite);
        //lets add the events to detect when we are over a cristal
        this.sprite.inputEnabled = true;
    }
    cCristals.prototype.setMouseOverColor = function () {
        // console.log("entra al crista");
    };
    cCristals.prototype.resetMouseOverColor = function () {
        //console.log("sale dele cristal");
    };
    cCristals.prototype.getCristalPath = function () {
        if (this.pathOption == 4 /* allOptions */) {
            //lets choose a random path 
            return this.game.rnd.integerInRange(0, 3);
        }
        else if (this.pathOption == 5 /* centerOfMap */) {
            return this.game.rnd.integerInRange(2, 3);
        }
        else {
            return this.pathOption;
        }
    };
    cCristals.prototype.lightBlueCristal = function () {
        if (this.color == cristalColor.blue_cristal) {
            this.makeCircle();
        }
    };
    cCristals.prototype.changeCristalColor = function (newColor) {
        this.cristalSprite.loadTexture(cristalColor[newColor]);
        this.color = newColor;
    };
    cCristals.prototype.makeCircle = function () {
        this.backCircle = this.game.add.graphics(0, 0);
        this.backCircle.beginFill(0x0d5118);
        this.backCircle.drawEllipse(0, 15, this.showCircleDistnace, this.showCircleDistnace * 0.5);
        //lets put the circle in the back
        this.sprite_back_circle = this.game.add.sprite(0, 0);
        this.sprite_back_circle.anchor.set(0.5);
        this.sprite_back_circle.alpha = 0.6;
        this.sprite_back_circle.addChild(this.backCircle);
        this.sprite.addChild(this.sprite_back_circle);
        this.sprite.swapChildren(this.sprite.children[0], this.sprite.children[1]);
        //lets add some really cool animation
        this.sprite_back_circle.scale.set(0.8);
        var tweenA = this.game.add.tween(this.sprite_back_circle.scale).to({ x: 1, y: 1 }, 800, Phaser.Easing.Cubic.Out, true);
        var tweenB = this.game.add.tween(this.sprite_back_circle.scale).to({ x: 0.8, y: 0.8 }, 800, Phaser.Easing.Cubic.In, false);
        tweenA.chain(tweenB);
        tweenB.chain(tweenA);
    };
    cCristals.prototype.turnOffCristal = function () {
        if (this.sprite_back_circle != undefined) {
            this.sprite_back_circle.destroy();
        }
    };
    //check if a card was drop over a cristal
    cCristals.prototype.checkDistance = function (point1) {
        //first we check if the cristal is blue, if not we just leave
        if (this.color != cristalColor.blue_cristal) {
            return false;
        }
        //the poin1 is the mouse poss
        //var point1 = this.game.input.activePointer.position;
        var point2 = new Phaser.Point(this.sprite.x, this.sprite.y);
        var distance = point1.distance(point2);
        if (distance <= this.maxDistance) {
            return true;
        }
        else {
            return false;
        }
    };
    return cCristals;
}());
var cristalColor;
(function (cristalColor) {
    cristalColor[cristalColor["blue_cristal"] = 0] = "blue_cristal";
    cristalColor[cristalColor["red_cristal"] = 1] = "red_cristal";
    cristalColor[cristalColor["white_cristal"] = 2] = "white_cristal";
})(cristalColor || (cristalColor = {}));
