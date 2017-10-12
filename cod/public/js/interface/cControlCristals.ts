class cControlCristals {

    private arrayCristals:cCristals[] = []; //to store all the cristals to do the checks

    constructor (public game:Phaser.Game) {
        
        this.initCristals();

    }

    private initCristals(){

        //lets init the blue cristal of the player
        this.arrayCristals.push( new cCristals(this.game, 56, 340, cristalColor.blue_cristal , enumPathOptions.up ));
        this.arrayCristals.push( new cCristals(this.game, 244, 216, cristalColor.blue_cristal, enumPathOptions.up ) );
        this.arrayCristals.push( new cCristals(this.game, 244, 278, cristalColor.blue_cristal, enumPathOptions.upS) );
        this.arrayCristals.push( new cCristals(this.game, 244, 386, cristalColor.blue_cristal, enumPathOptions.downS) );
        this.arrayCristals.push( new cCristals(this.game, 244, 458, cristalColor.blue_cristal, enumPathOptions.down) );
        
        //lets init the red cristals of the other player
        this.arrayCristals.push( new cCristals(this.game, 894, 338, cristalColor.red_cristal, enumPathOptions.up) );
        this.arrayCristals.push( new cCristals(this.game, 720, 220, cristalColor.red_cristal, enumPathOptions.up) );
        this.arrayCristals.push( new cCristals(this.game, 720, 278, cristalColor.red_cristal, enumPathOptions.upS) );
        this.arrayCristals.push( new cCristals(this.game, 720, 386, cristalColor.red_cristal, enumPathOptions.downS) );
        this.arrayCristals.push( new cCristals(this.game, 720, 458, cristalColor.red_cristal, enumPathOptions.down) );

        //finaly the white ones
        this.arrayCristals.push( new cCristals(this.game, 480, 176, cristalColor.white_cristal, enumPathOptions.up) );
        this.arrayCristals.push( new cCristals(this.game, 480, 334, cristalColor.white_cristal, enumPathOptions.centerS) );
        this.arrayCristals.push( new cCristals(this.game, 480, 502, cristalColor.white_cristal, enumPathOptions.up) );

    }

    //when the user get a card
    public activateBlueCristals() {
        this.arrayCristals.forEach(cristal => {
            cristal.lightBlueCristal();
        });
    }

    //when the user drop a card
    public turnOffBlueCristals() {
        this.arrayCristals.forEach(cristal => {
            cristal.turnOffCristal();
        });

    }

    //when we check if the card was release over the cristal
    public checkRelease():cCristals {
        
        var selCristal:cCristals = undefined;
        //lets check every cristal if it is close enough
        this.arrayCristals.forEach(cristal => {
            if (cristal.checkDistance() == true) {
                selCristal = cristal;
            }
            
        });

        return selCristal;
    }

}