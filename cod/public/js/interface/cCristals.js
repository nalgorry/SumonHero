var cCristals = (function () {
    function cCristals(game, x, y, color, pathOption) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.color = color;
        this.pathOption = pathOption;
        this.maxDistance = 30;
        //lets create the cristal
        this.sprite = this.game.add.sprite(x, y);
        this.sprite.anchor.set(0.5);
        var cristalSprite = this.game.add.sprite(0, 0, cristalColor[color]);
        cristalSprite.anchor.set(0.5);
        this.sprite.addChild(cristalSprite);
        //lets add the events to detect when we are over a cristal
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputOver.add(this.mouseOver, this);
        this.sprite.events.onInputOut.add(this.mouseOut, this);
    }
    cCristals.prototype.mouseOut = function () {
    };
    cCristals.prototype.mouseOver = function () {
    };
    cCristals.prototype.lightBlueCristal = function () {
        if (this.color == cristalColor.blue_cristal) {
            var backCircle = this.game.add.graphics(0, 0);
            backCircle.beginFill(0x07b215);
            backCircle.drawCircle(0, 0, this.maxDistance * 2);
            //lets put the circle in the back
            var sprite = this.sprite;
            sprite.addChild(backCircle);
            sprite.swapChildren(sprite.children[0], sprite.children[1]);
        }
    };
    cCristals.prototype.turnOffCristal = function () {
        if (this.color == cristalColor.blue_cristal) {
            this.sprite.removeChildAt(0);
        }
    };
    //check if a card was drop over a cristal
    cCristals.prototype.checkDistance = function () {
        //first we check if the cristal is blue, if not we just leave
        if (this.color != cristalColor.blue_cristal) {
            return false;
        }
        //the poin1 is the mouse poss
        var point1 = this.game.input.activePointer.position;
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
