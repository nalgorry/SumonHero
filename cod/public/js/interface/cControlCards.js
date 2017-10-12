var cControlCards = (function () {
    function cControlCards(game, userInterfase) {
        this.game = game;
        this.userInterfase = userInterfase;
        this.arrayCards = [];
        this.initCards();
    }
    cControlCards.prototype.initCards = function () {
        //lets add the cards that will let put monsters
        this.arrayCards.push(this.createNewCard(20, 500));
        this.arrayCards.push(this.createNewCard(100, 500));
    };
    cControlCards.prototype.createNewCard = function (x, y) {
        //create the card
        var newCard = new cCards(this.game, x, y);
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
