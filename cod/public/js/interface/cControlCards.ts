class cControlCards {

    private sprite:Phaser.Sprite;
    private arrayCards:cCards[] = [];


    constructor(public game:Phaser.Game, public userInterfase:cControlInterface) {

        this.initCards();

    }

    private initCards(){
        //lets add the cards that will let put monsters
        var y:number = 610;
        
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

    public checkManaCards(mana:Number) {
        
        this.arrayCards.forEach(card => {
            card.checkMana(mana);
        });

    }



}
