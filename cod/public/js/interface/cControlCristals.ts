class cControlCristals {

    private arrayCristals:cCristals[] = []; //to store all the cristals to do the checks
    public arrayShareCristals:cCristals[] = [];
    public arrayEnemyCristals:cCristals[] = [];
    public numBlueCristals:number = 4;
    
    private lastCristalOnMouse:cCristals;

    public eventCristalClick: Phaser.SignalBinding; //to use spells over the cristals
    public cristalClick:Phaser.Signal = new Phaser.Signal();

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
        var cristal_enemy1 = new cCristals(this.game, 1184, 325, cristalColor.red_cristal, enumPathOptions.allOptions, 0, enumCristalType.enemyCristal);
        var cristal_enemy2 = new cCristals(this.game, 1020, 200, cristalColor.red_cristal, enumPathOptions.up, oneQuarterPoss, enumCristalType.enemyCristal);
        var cristal_enemy3 =  new cCristals(this.game, 1020, 268, cristalColor.red_cristal, enumPathOptions.upS, oneQuarterSPoss, enumCristalType.enemyCristal);
        var cristal_enemy4 = new cCristals(this.game, 1020, 376, cristalColor.red_cristal, enumPathOptions.downS, oneQuarterSPoss, enumCristalType.enemyCristal);
        var cristal_enemy5 = new cCristals(this.game, 1020, 453, cristalColor.red_cristal, enumPathOptions.down, oneQuarterPoss, enumCristalType.enemyCristal);
        
        //finaly the white ones
        var cristal_1 =  new cCristals(this.game, 642, 100, cristalColor.white_cristal, enumPathOptions.up, centerPoss, enumCristalType.centerCristal);
        var cristal_2 = new cCristals(this.game, 642, 325, cristalColor.white_cristal, enumPathOptions.centerOfMap, centerPoss, enumCristalType.centerCristal);
        var cristal_3 = new cCristals(this.game, 642, 545, cristalColor.white_cristal, enumPathOptions.down, centerPoss, enumCristalType.centerCristal);

        this.arrayCristals.push(cristal_1);
        this.arrayCristals.push(cristal_2);
        this.arrayCristals.push(cristal_3);
        this.arrayCristals.push(cristal_enemy1);
        this.arrayCristals.push(cristal_enemy2);
        this.arrayCristals.push(cristal_enemy3);
        this.arrayCristals.push(cristal_enemy4);
        this.arrayCristals.push(cristal_enemy5);

        this.arrayEnemyCristals.push(cristal_enemy1);
        this.arrayEnemyCristals.push(cristal_enemy2);
        this.arrayEnemyCristals.push(cristal_enemy3);
        this.arrayEnemyCristals.push(cristal_enemy4);
        this.arrayEnemyCristals.push(cristal_enemy5);

        this.arrayShareCristals.push(cristal_1);
        this.arrayShareCristals.push(cristal_2);
        this.arrayShareCristals.push(cristal_3);


    }

    //when the user get a card
    public activateBlueCristals() {
        this.arrayCristals.forEach(cristal => {
            cristal.lightBlueCristal();
        });

        //lets activate the mouse call back to know when to release the monster
       this.game.input.addMoveCallback(this.mouseMoveWithCard, this);
    
    }

    public mouseMoveWithCard() {
        
        var cristal = this.checkRelease(new Phaser.Point(this.game.input.x, this.game.input.y), false)

        if (cristal != undefined) {
            cristal.setMouseOverColor();
            this.lastCristalOnMouse = cristal;
        } else {
            if (this.lastCristalOnMouse != undefined) {
                this.lastCristalOnMouse.resetMouseOverColor();  
                this.lastCristalOnMouse = undefined;
            }
        }
    }

    //when the user drop a card
    public turnOffBlueCristals() {
        this.arrayCristals.forEach(cristal => {
            cristal.turnOffCristal();
        });

    }

    public spellClicked() {
        //lets activate the cristals
        this.activateBlueCristals();

       this.eventCristalClick = this.game.input.onDown.add(this.spellLineCristalSel, this);

    }

    private spellLineCristalSel() {

        this.eventCristalClick.detach();

        var cristalClick = this.checkRelease(new Phaser.Point(this.game.input.x, this.game.input.y), true)

        this.turnOffBlueCristals();

        this.cristalClick.dispatch(cristalClick);
        
        }

    //when we check if the card was release over the cristal
    public checkRelease(point:Phaser.Point, desactivateMouseEvent:boolean):cCristals {
        
        var selCristal:cCristals = undefined;
        //lets check every cristal if it is close enough
        this.arrayCristals.forEach(cristal => {
            if (cristal.checkDistance(point) == true) {
                selCristal = cristal;
            }
            
        });

        //desactivate the call back of the cristals
        if (desactivateMouseEvent) {
            this.game.input.deleteMoveCallback(this.mouseMoveWithCard, this);
            this.lastCristalOnMouse = undefined;
        }

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