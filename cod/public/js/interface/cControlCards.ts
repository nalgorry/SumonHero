class cControlCards {

    private sprite:Phaser.Sprite;
    private arrayCards:cCards[] = [];
    private yCards:number = 580;


    constructor(public game:Phaser.Game, public userInterfase:cControlInterface) {

        this.initCards();

    }

    private initCards(){
        //lets add the cards that will let put monsters
        var y:number = this.yCards;

        var arrayCards = this.selectRandomCards()

        this.arrayCards.push(this.createNewCard (20, y, enumMonstersType.dager));
        this.arrayCards.push(this.createNewCard (20 + 110, y, enumMonstersType.sword));
        this.arrayCards.push(this.createNewCard (20 + 110 * 2, y, enumMonstersType.bow));
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

    }

    public addNewCards(lvl:number) {
       
        switch (lvl) {
            case 3:
                this.arrayCards.push(this.createNewCard (20 + 110 * 3, this.yCards, enumMonstersType.cold_wizard));
                break;

            case 4:
                this.arrayCards.push(this.createNewCard (20 + 110 * 4, this.yCards, enumMonstersType.explosion));
                break;
        
        
            default:
                break;
        }
    }

    private selectRandomCards()  {
        var arrayCards:number[] = [];

        //lets select 5 unique cards for now
        for (var i = 0; i < 5; i++) {
        //lets make sure that we select one of each card
            do {
                var unique:boolean = true;
                var cardNumber:number = this.game.rnd.integerInRange(1,10);
                arrayCards.forEach(value => {
                    if (value == cardNumber) {
                        unique = false;
                    }
                })
                console.log(unique);
            } while (unique == false)
        
            arrayCards.push(cardNumber);
        
        }

    
        console.log(arrayCards)

        return arrayCards
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
