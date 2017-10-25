var cControlCards = (function () {
    function cControlCards(game, userInterfase) {
        this.game = game;
        this.userInterfase = userInterfase;
        this.arrayCards = [];
        this.initCards();
    }
    cControlCards.prototype.initCards = function () {
        //lets add the cards that will let put monsters
        this.arrayCards.push(this.createNewCard(20, 500, 1 /* sword */));
        this.arrayCards.push(this.createNewCard(100, 500, 2 /* explosion */));
        this.arrayCards.push(this.createNewCard(180, 500, 3 /* bow */));
    };
    cControlCards.prototype.createNewCard = function (x, y, monsterType) {
        //create the card
        var monsterData = this.userInterfase.controlMonsters.monsterData[monsterType];
        var newCard = new cCards(this.game, x, y, monsterType, monsterData.tilePoss);
        //lets check what if something happends with this card
        newCard.eventDragStart.add(this.cardDragStart, this);
        newCard.eventDragStop.add(this.cardRelease, this);
        return newCard;
    };
    cControlCards.prototype.cardDragStart = function (card) {
        this.userInterfase.cardDragStart(card);
    };
    cControlCards.prototype.cardRelease = function (card) {
        this.userInterfase.checkCardRelease(card);
    };
    return cControlCards;
}());
