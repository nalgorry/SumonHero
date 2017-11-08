class cControlInterface {

    private controlCards:cControlCards;
    private controlCristals:cControlCristals;
    public controlHeroes:cControlHeroes;

    private playerBars:cControlBars;
    private enemyBars:cControlBars;

    private speedBars = 50;
    
    
    constructor (public game:Phaser.Game,public controlMonsters:cControlMonsters) {

        this.initInterfaceBack(); //all that goes to the back will go here

        this.playerBars = new cControlBars(game, 30, 20); //create the player bars to control mana and life
        this.enemyBars = new cControlBars(game, 760, 20); //create the enemy bars
        
        this.initCards(); //init the cards of the game 

        this.initCristals(); //init all the cristals :)

        //to control the update of the bars        
        var timer = this.game.time.events.loop(this.speedBars, this.updateBars, this);

    }


    public getSharedCristals() {
        return this.controlCristals.arrayShareCristals;
    }

    public monsterHitHeroe(isEnemy:boolean, damage: number) {

        if (isEnemy) {
            this.playerBars.UpdateLife(-damage);
        } else {
            this.enemyBars.UpdateLife(-damage);
        }
        
    }

    private updateBars() {
        this.playerBars.UpdateMana(1);
    }

    private initInterfaceBack() {
        
        //lets put the background
        var height = 80;
        var width = 960;
        
        var bitmapDescItem = this.game.add.bitmapData(width, height);
        bitmapDescItem.ctx.beginPath();
        bitmapDescItem.ctx.rect(0, 0, width, height);
        bitmapDescItem.ctx.fillStyle = '#363636';
        bitmapDescItem.ctx.fill();

        var backGroundDesc = this.game.add.sprite(0, 0, bitmapDescItem);
        backGroundDesc.anchor.setTo(0);
        backGroundDesc.fixedToCamera = true;
        backGroundDesc.alpha = 0.9;
    }

    
    private initCards() {

        this.controlCards = new cControlCards(this.game, this);

    }

    private initCristals() {
        this.controlCristals = new cControlCristals(this.game);

    }

    public checkCardRelease(card:cCards) {

        //first we desativate the blue cristals 
        this.controlCristals.turnOffBlueCristals();

        //then we see if we have to generate a monster or not
        var cristal = this.controlCristals.checkRelease();
        
        if (cristal != undefined) {
            //lets check if we have the mana to do it
            if (this.playerBars.UpdateMana(-card.monsterData.manaCost) == true) {

                var direction = cristal.pathOption

                if (cristal.pathOption == enumPathOptions.allOptions) {
                    //lets choose a random path 
                    direction = this.game.rnd.integerInRange(0,3);
                } 
                //lets add the new monster to the map!
                this.controlMonsters.createNewMonster(direction, cristal.monsterStartPoss, card.monsterData.id);
            
            }

        }

    }

    private selMonsterDirection(cristal:cCristals, cards:cCards) {


        /* to make the arrow */
       //lets create the arrow to select the directorio
       var arrow = this.game.add.sprite(cristal.x, cristal.y, 'pathArrow');
        //arrow.anchor.set(0, 0.5);

        //lets create a timer to control the arrow
        var timer = this.game.time.create(false);
        timer.loop(30, this.updateArrow, this, arrow, timer, cristal, cards);
        timer.start();


        
    }

    private updateArrow(arrow:Phaser.Sprite, timer:Phaser.Timer, cristal:cCristals, card:cCards) {

        var mousePoss = this.game.input.activePointer.position;
        
        var angle = (360 / (2 * Math.PI)) * Phaser.Math.angleBetween(arrow.x, arrow.y, mousePoss.x, mousePoss.y) ;

        arrow.angle = angle;

        if (this.game.input.activePointer.isDown)
        {

            //lets check where to put the monster now!
            var pathOption:number = 0;

            if (arrow.angle <= -28) { 
                pathOption = enumPathOptions.up;
            } else if (arrow.angle < 0) { 
                pathOption = enumPathOptions.upS;
            } else if (arrow.angle < 36) { 
                pathOption = enumPathOptions.downS;
            } else  { 
                pathOption = enumPathOptions.down;
            } 

            this.controlMonsters.createNewMonster(pathOption, cristal.monsterStartPoss, card.monsterData.id);

            timer.destroy();
            var deadAnimation = this.game.add.tween(arrow).to( { alpha: 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            deadAnimation.onComplete.add(this.destroySprite,this,null, arrow);


        }

    }


    destroySprite(arrow:Phaser.Sprite) {
        arrow.destroy(true);
    }


    public cardDragStart(card:cCards) {
        this.controlCristals.activateBlueCristals();
    }

}


