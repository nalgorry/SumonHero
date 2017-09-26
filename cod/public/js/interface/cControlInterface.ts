class cControlInterface {

    private arrayCardsSel:cControlCards[] = [];

    constructor (public game:Phaser.Game) {
        
        this.initCards();

    }

    private initCards() {

        //lets start all the monsters cards
        var card = new cControlCards(this.game);

    }

}