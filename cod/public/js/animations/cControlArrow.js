var cControlArrow = (function () {
    function cControlArrow(game, spriteFrom, spriteTo) {
        this.game = game;
        this.finish = new Phaser.Signal();
        this.makeArrow(spriteFrom, spriteTo);
    }
    cControlArrow.prototype.makeArrow = function (spriteFrom, spriteTo) {
        var xOffset = 0;
        var yOffset = -20;
        var arrow = this.game.add.sprite(0, 0, 'arrow');
        spriteTo.addChild(arrow);
        arrow.position.setTo(spriteFrom.x - spriteTo.x + xOffset, spriteFrom.y - spriteTo.y + yOffset);
        arrow.anchor.set(0.5);
        var angle = (360 / (2 * Math.PI)) * Phaser.Math.angleBetween(spriteFrom.x, spriteFrom.y, spriteTo.x, spriteTo.y) + 90;
        arrow.angle = angle;
        var distance = spriteFrom.position.distance(spriteTo.position);
        var animation = this.game.add.tween(arrow).to({
            x: xOffset, y: yOffset }, distance * 2, Phaser.Easing.Linear.None, true);
        animation.onComplete.add(this.arrowComplete, this, null, arrow);
    };
    cControlArrow.prototype.arrowComplete = function (arrow) {
        //lets make the ray disapear slowly
        var desapearArrow = this.game.add.tween(arrow).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
        desapearArrow.onComplete.add(this.destroyArrow, this, null, arrow);
        this.finish.dispatch();
        return;
    };
    cControlArrow.prototype.destroyArrow = function (arrow) {
        arrow.destroy();
    };
    return cControlArrow;
}());
