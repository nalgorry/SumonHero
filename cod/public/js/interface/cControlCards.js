var cControlCards = (function () {
    function cControlCards(game) {
        this.game = game;
        this.initiCard();
    }
    cControlCards.prototype.initiCard = function () {
        this.sprite = this.game.add.sprite(20, 500);
        this.sprite.inputEnabled = true;
        //this.sprite.events.onInputUp.add(this.floorItemClick,this)
        var cardColor = 0x0000FF;
        var backCircle = this.game.add.graphics(0, 0);
        backCircle.beginFill(cardColor);
        backCircle.alpha = 0.5;
        backCircle.drawRect(0, 0, 60, 90);
        this.sprite.input.enableDrag();
        this.sprite.events.onDragStart.add(this.onDragStart, this);
        this.sprite.events.onDragStop.add(this.onDragStop, this);
        this.sprite.events.onInputOver.add(this.onInputOver, this);
        this.sprite.events.onInputOut.add(this.onInputOut, this);
        this.sprite.addChild(backCircle);
        //var itemSprite = this.game.add.sprite();
        //this.sprite.addChild(itemSprite);
    };
    cControlCards.prototype.onDragStart = function () {
    };
    cControlCards.prototype.onDragStop = function () {
    };
    cControlCards.prototype.onInputOver = function () {
    };
    cControlCards.prototype.onInputOut = function () {
    };
    return cControlCards;
}());
