class cControlCards {

    private sprite:Phaser.Sprite;
    private arrayCards:cCards[] = [];


    constructor(public game:Phaser.Game, public userInterfase:cControlInterface) {

        this.initCards();

    }

    private initCards(){
        //lets add the cards that will let put monsters
        var y:number = 530;
        
        this.arrayCards.push(this.createNewCard (20, y, enumMonstersType.dager));
        this.arrayCards.push(this.createNewCard (100, y, enumMonstersType.sword));
        this.arrayCards.push(this.createNewCard (180, y, enumMonstersType.bow));
        this.arrayCards.push(this.createNewCard (180 + 80, y, enumMonstersType.explosion));

    }

    private createNewCard(x:number, y:number, monsterType:enumMonstersType):cCards {
        
        //create the card
        var monsterData = this.userInterfase.controlMonsters.monsterData[monsterType];

        var newCard = new cCards(this.game, x, y, monsterData);

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