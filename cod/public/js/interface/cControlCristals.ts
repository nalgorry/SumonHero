class cControlCristals {

    private arrayCristals:cCristals[] = []; //to store all the cristals to do the checks
    public arrayShareCristals:cCristals[] = [];
    public numBlueCristals:number = 4;

    constructor (public game:Phaser.Game, public controlInterfase:cControlInterface) {
        
        this.initCristals();

    }

    private initCristals(){

        var oneQuarterPoss:number = 1150;
        var oneQuarterCenterPoss:number = 780;
        var centerPoss:number = 2400;

        //lets init the blue cristal of the player
        this.arrayCristals.push( new cCristals(this.game, 56, 340, cristalColor.blue_cristal , enumPathOptions.allOptions, 0, enumCristalType.heroeCristal ));
        this.arrayCristals.push( new cCristals(this.game, 244, 216, cristalColor.blue_cristal, enumPathOptions.up , oneQuarterPoss, enumCristalType.fixedCristal));
        this.arrayCristals.push( new cCristals(this.game, 244, 278, cristalColor.blue_cristal, enumPathOptions.upS, oneQuarterCenterPoss, enumCristalType.fixedCristal));
        this.arrayCristals.push( new cCristals(this.game, 244, 386, cristalColor.blue_cristal, enumPathOptions.downS, oneQuarterCenterPoss, enumCristalType.fixedCristal));
        this.arrayCristals.push( new cCristals(this.game, 244, 458, cristalColor.blue_cristal, enumPathOptions.down, oneQuarterPoss, enumCristalType.fixedCristal));
        
        //lets init the red cristals of the other player
        this.arrayCristals.push( new cCristals(this.game, 894, 338, cristalColor.red_cristal, enumPathOptions.up, 0, enumCristalType.enemyCristal));
        this.arrayCristals.push( new cCristals(this.game, 720, 220, cristalColor.red_cristal, enumPathOptions.up, oneQuarterPoss, enumCristalType.enemyCristal));
        this.arrayCristals.push( new cCristals(this.game, 720, 278, cristalColor.red_cristal, enumPathOptions.upS, oneQuarterCenterPoss, enumCristalType.enemyCristal));
        this.arrayCristals.push( new cCristals(this.game, 720, 386, cristalColor.red_cristal, enumPathOptions.downS, oneQuarterCenterPoss, enumCristalType.enemyCristal));
        this.arrayCristals.push( new cCristals(this.game, 720, 458, cristalColor.red_cristal, enumPathOptions.down, oneQuarterPoss, enumCristalType.enemyCristal));

        //finaly the white ones

        var cristal_1 =  new cCristals(this.game, 480, 176, cristalColor.white_cristal, enumPathOptions.up, centerPoss, enumCristalType.centerCristal);
        var cristal_2 = new cCristals(this.game, 480, 334, cristalColor.white_cristal, enumPathOptions.centerOfMap, centerPoss, enumCristalType.centerCristal);
        var cristal_3 = new cCristals(this.game, 480, 502, cristalColor.white_cristal, enumPathOptions.down, centerPoss, enumCristalType.centerCristal);

        this.arrayCristals.push(cristal_1);
        this.arrayCristals.push(cristal_2);
        this.arrayCristals.push(cristal_3);

        this.arrayShareCristals.push(cristal_1);
        this.arrayShareCristals.push(cristal_2);
        this.arrayShareCristals.push(cristal_3);


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
    public checkRelease(card:cCards):cCristals {
        
        var selCristal:cCristals = undefined;
        //lets check every cristal if it is close enough
        this.arrayCristals.forEach(cristal => {
            if (cristal.checkDistance(card) == true) {
                selCristal = cristal;
            }
            
        });

        return selCristal;
    }

    public changeCristalColor(cristal:cCristals, color: cristalColor) {
        cristal.changeCristalColor(color);

        //lets update the number of cristal we have 
        if (color = cristalColor.blue_cristal) {
            this.numBlueCristals ++;
        } else {
            this.numBlueCristals --;
        }

        this.controlInterfase.updateManaSpeed(this.numBlueCristals);

    }

    public restartCristals() {
        //lets restart the white cristals
        this.arrayShareCristals.forEach(cristal => {
            this.changeCristalColor(cristal, cristalColor.white_cristal);
        });

        this.controlInterfase.updateManaSpeed(this.numBlueCristals);
    }

}