class cControlCristals {

    private arrayCristals:cCristals[] = []; //to store all the cristals to do the checks
    public arrayShareCristals:cCristals[] = [];
    public numBlueCristals:number = 4;

    constructor (public game:Phaser.Game, public controlInterfase:cControlInterface) {
        
        this.initCristals();

    }

    private initCristals(){

        var oneQuarterPoss:number = 1600;
        var oneQuarterSPoss:number = 1200;
        var centerPoss:number = 3200;

           

        //lets init the blue cristal of the player
        this.arrayCristals.push( new cCristals(this.game, 100, 325, cristalColor.blue_cristal , enumPathOptions.allOptions, 0, enumCristalType.heroeCristal ));
        this.arrayCristals.push( new cCristals(this.game, 260, 195, cristalColor.blue_cristal, enumPathOptions.up , oneQuarterPoss, enumCristalType.fixedCristal));
        this.arrayCristals.push( new cCristals(this.game, 260, 270, cristalColor.blue_cristal, enumPathOptions.upS, oneQuarterSPoss, enumCristalType.fixedCristal));
        this.arrayCristals.push( new cCristals(this.game, 260, 374, cristalColor.blue_cristal, enumPathOptions.downS, oneQuarterSPoss, enumCristalType.fixedCristal));
        this.arrayCristals.push( new cCristals(this.game, 260, 452, cristalColor.blue_cristal, enumPathOptions.down, oneQuarterPoss, enumCristalType.fixedCristal));
        
        //lets init the red cristals of the other player
        this.arrayCristals.push( new cCristals(this.game, 1184, 325, cristalColor.red_cristal, enumPathOptions.up, 0, enumCristalType.enemyCristal));
        this.arrayCristals.push( new cCristals(this.game, 1020, 200, cristalColor.red_cristal, enumPathOptions.up, oneQuarterPoss, enumCristalType.enemyCristal));
        this.arrayCristals.push( new cCristals(this.game, 1020, 268, cristalColor.red_cristal, enumPathOptions.upS, 0, enumCristalType.enemyCristal));
        this.arrayCristals.push( new cCristals(this.game, 1020, 376, cristalColor.red_cristal, enumPathOptions.downS, 0, enumCristalType.enemyCristal));
        this.arrayCristals.push( new cCristals(this.game, 1020, 453, cristalColor.red_cristal, enumPathOptions.down, oneQuarterPoss, enumCristalType.enemyCristal));

        //finaly the white ones

        var cristal_1 =  new cCristals(this.game, 642, 100, cristalColor.white_cristal, enumPathOptions.up, centerPoss, enumCristalType.centerCristal);
        var cristal_2 = new cCristals(this.game, 642, 325, cristalColor.white_cristal, enumPathOptions.centerOfMap, centerPoss, enumCristalType.centerCristal);
        var cristal_3 = new cCristals(this.game, 642, 545, cristalColor.white_cristal, enumPathOptions.down, centerPoss, enumCristalType.centerCristal);

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

        //lets check if we really need to change the color of the cristal
        if (cristal.color == color) {return}

        cristal.changeCristalColor(color);

        //lets update the number of cristal we have 
        if (color == cristalColor.blue_cristal) {
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