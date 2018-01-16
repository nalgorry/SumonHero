var cControlCards = (function () {
    function cControlCards(game, userInterfase) {
        this.game = game;
        this.userInterfase = userInterfase;
        this.arrayCards = [];
        this.initCards();
    }
    cControlCards.prototype.initCards = function () {
        //lets add the cards that will let put monsters
        var y = 610;
        this.arrayCards.push(this.createNewCard(20, y, 4 /* dager */));
        this.arrayCards.push(this.createNewCard(100, y, 1 /* sword */));
        this.arrayCards.push(this.createNewCard(180, y, 3 /* bow */));
        this.arrayCards.push(this.createNewCard(180 + 80, y, 2 /* explosion */));
        this.arrayCards.push(this.createNewCard(180 + 80 * 2, y, 5 /* hammer */));
        this.arrayCards.push(this.createNewCard(180 + 80 * 3, y, 6 /* ninja */));
        this.arrayCards.push(this.createNewCard(180 + 80 * 4, y, 7 /* shield */));
        this.arrayCards.push(this.createNewCard(180 + 80 * 5, y, 8 /* cold_wizard */));
        this.arrayCards.push(this.createNewCard(180 + 80 * 6, y, 9 /* fire_wizard */));
        this.arrayCards.push(this.createNewCard(180 + 80 * 7, y, 10 /* star_ninja */));
    };
    cControlCards.prototype.createNewCard = function (x, y, monsterType) {
        //create the card
        var monsterData = this.userInterfase.controlMonsters.monsterData[monsterType];
        var newCard = new cCards(this.game, x, y, monsterData);
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
    cControlCards.prototype.checkManaCards = function (mana) {
        this.arrayCards.forEach(function (card) {
            card.checkMana(mana);
        });
    };
    return cControlCards;
}());
