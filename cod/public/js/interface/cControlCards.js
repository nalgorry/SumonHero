var cControlCards = (function () {
    function cControlCards(game, userInterfase) {
        this.game = game;
        this.userInterfase = userInterfase;
        this.arrayCards = [];
        this.yCards = 580;
        this.initCards();
    }
    cControlCards.prototype.initCards = function () {
        //lets add the cards that will let put monsters
        var y = this.yCards;
        var arrayCards = this.selectRandomCards();
        this.arrayCards.push(this.createNewCard(20, y, 4 /* dager */));
        this.arrayCards.push(this.createNewCard(20 + 110, y, 1 /* sword */));
        this.arrayCards.push(this.createNewCard(20 + 110 * 2, y, 3 /* bow */));
        //this.arrayCards.push(this.createNewCard (20 + 110 * 3, y, arrayCards[3]));
        //this.arrayCards.push(this.createNewCard (20 + 110 * 4, y, arrayCards[4]));
        /* all the cards
        this.arrayCards.push(this.createNewCard (20, y, enumMonstersType.dager));
        this.arrayCards.push(this.createNewCard (100, y, enumMonstersType.sword));
        this.arrayCards.push(this.createNewCard (180, y, enumMonstersType.bow));
        this.arrayCards.push(this.createNewCard (180 + 80, y, enumMonstersType.explosion));
        this.arrayCards.push(this.createNewCard (180 + 80 * 2, y, enumMonstersType.hammer));
        this.arrayCards.push(this.createNewCard (180 + 80 * 3, y, enumMonstersType.ninja));
        this.arrayCards.push(this.createNewCard (180 + 80 * 4, y, enumMonstersType.shield));
        this.arrayCards.push(this.createNewCard (180 + 80 * 5, y, enumMonstersType.cold_wizard));
        this.arrayCards.push(this.createNewCard (180 + 80 * 6, y, enumMonstersType.fire_wizard));
        this.arrayCards.push(this.createNewCard (180 + 80 * 7, y, enumMonstersType.star_ninja));
        */
    };
    cControlCards.prototype.addNewCards = function (lvl) {
        switch (lvl) {
            case 3:
                this.arrayCards.push(this.createNewCard(20 + 110 * 3, this.yCards, 8 /* cold_wizard */));
                break;
            case 4:
                this.arrayCards.push(this.createNewCard(20 + 110 * 4, this.yCards, 2 /* explosion */));
                break;
            default:
                break;
        }
    };
    cControlCards.prototype.selectRandomCards = function () {
        var arrayCards = [];
        //lets select 5 unique cards for now
        for (var i = 0; i < 5; i++) {
            //lets make sure that we select one of each card
            do {
                var unique = true;
                var cardNumber = this.game.rnd.integerInRange(1, 10);
                arrayCards.forEach(function (value) {
                    if (value == cardNumber) {
                        unique = false;
                    }
                });
                console.log(unique);
            } while (unique == false);
            arrayCards.push(cardNumber);
        }
        console.log(arrayCards);
        return arrayCards;
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
