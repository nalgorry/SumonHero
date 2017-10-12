class cControlCards {

    private sprite:Phaser.Sprite;
    private arrayCards:cCards[] = [];


    constructor(public game:Phaser.Game, public userInterfase:cControlInterface) {

        this.initCards();

    }

    private initCards(){
        //lets add the cards that will let put monsters
        this.arrayCards.push(this.createNewCard (20, 500));
        this.arrayCards.push(this.createNewCard (100, 500));

    }

    private createNewCard(x:number, y:number):cCards {
        
        //create the card
        var newCard = new cCards(this.game, x, y);

        //lets check what if something happends with this card
        newCard.eventDragStart.add(this.cardDragStart, this);
        newCard.eventDragStop.add(this.cardRelease, this);


        return newCard;
    }

    private cardDragStart(card:cCards) {
        this.userInterfase.cardDragStart(card);
    }

    private cardRelease(card:cCards)  {
        this.userInterfase.checkCardRelease(card);
    }



}