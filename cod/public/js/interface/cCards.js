var cCards = (function () {
    function cCards(game, x, y, monsterData) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.monsterData = monsterData;
        this.sprite = this.game.add.sprite(x, y);
        this.sprite.inputEnabled = true;
        //this.sprite.events.onInputUp.add(this.floorItemClick,this)
        var cardColor = 0x9eb3c1;
        var lineColor = 0x215072;
        var manaBackColor = 0xADDDED;
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
        var bugSprite = this.game.add.sprite(cardWidth / 2, 60, 'bugs', monsterData.tilePoss);
        bugSprite.anchor.set(0.5);
        this.sprite.addChild(bugSprite);
        var weaponSprite = this.game.add.sprite(monsterData.weaponX, monsterData.weaponY + 20, 'items', monsterData.weaponTilePoss);
        weaponSprite.anchor.set(0, 1);
        bugSprite.addChild(weaponSprite);
        //lets put the mana cost now! (wow so great)
        var backMana = this.game.add.graphics(cardWidth / 2, 4);
        backMana.beginFill(manaBackColor);
        backMana.lineStyle(1, lineColor);
        backMana.drawRect(0, 0, 20, 20);
        backMana.angle = 45;
        backMana.pivot.set(0.5, 0.5);
        this.sprite.addChild(backMana);
        //and now the number!,
        var textMana = this.game.add.bitmapText(cardWidth / 2, 16, 'gotic_black', this.monsterData.manaCost.toString(), 14);
        textMana.anchor.set(0.5);
        this.sprite.addChild(textMana);
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
    cCards.prototype.checkMana = function (mana) {
        if (mana >= this.monsterData.manaCost) {
            this.sprite.alpha = 1;
        }
        else {
            this.sprite.alpha = 0.5;
        }
    };
    return cCards;
}());
