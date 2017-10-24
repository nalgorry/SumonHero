var cCards = (function () {
    function cCards(game, x, y, monsterType, monsterTilePoss) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.monsterType = monsterType;
        this.monsterTilePoss = monsterTilePoss;
        this.manaCost = 50; //the cost of the card in mana 
        this.sprite = this.game.add.sprite(x, y);
        this.sprite.inputEnabled = true;
        //this.sprite.events.onInputUp.add(this.floorItemClick,this)
        var cardColor = 0x9eb3c1;
        var lineColor = 0x215072;
        var cardWidth = 60;
        var cardHeight = 90;
        var backCircle = this.game.add.graphics(0, 0);
        backCircle.beginFill(cardColor);
        backCircle.lineStyle(1, lineColor);
        backCircle.drawRect(0, 0, cardWidth, cardHeight);
        this.sprite.input.enableDrag();
        this.sprite.events.onDragStart.add(this.onDragStart, this);
        this.sprite.events.onDragStop.add(this.onDragStop, this);
        this.sprite.events.onInputOver.add(this.onInputOver, this);
        this.sprite.events.onInputOut.add(this.onInputOut, this);
        //lets activate the events that will be use to inform what is happening with each card
        this.eventDragStart = new Phaser.Signal();
        this.eventDragStop = new Phaser.Signal();
        this.sprite.addChild(backCircle);
        //lets add the picture of the bug in the card
        var bugSprite = this.game.add.sprite(cardWidth / 2, 50, 'bugs', monsterTilePoss);
        bugSprite.anchor.set(0.5);
        this.sprite.addChild(bugSprite);
    }
    cCards.prototype.onDragStart = function () {
        this.eventDragStart.dispatch(this);
    };
    cCards.prototype.onDragStop = function () {
        this.eventDragStop.dispatch(this);
        //lets restore the card original poss
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    };
    cCards.prototype.onInputOver = function () {
    };
    cCards.prototype.onInputOut = function () {
    };
    return cCards;
}());
