class cControlInterface {

    private controlCards:cControlCards;
    public controlCristals:cControlCristals;
    public controlHeroes:cControlHeroes;
    public controlMenu:cControlMenu;
    private controlSpells:cControlSpells;

    private playerBars:cControlBars;
    private enemyBars:cControlBars;

    private speedMana = 1;

    private baseSpeedMana = 1;
    private speedBars = 100;

    public gameLvl:number = 1;
    private textGameLvl:Phaser.BitmapText;
    private timer:Phaser.TimerEvent //to control the bars of the game 

    private gameStop:boolean = false; 

    //to show a message when game finish
    private spriteMenu: Phaser.Sprite;
    
    constructor (public game:Phaser.Game, public controlMonsters:cControlMonsters) {

        this.playerBars = new cControlBars(game, 10, 368, 80, true); //create the player bars to control mana and life
        this.enemyBars = new cControlBars(game, 1190, 368, 80, false); //create the enemy bars

        this.controlMenu = new cControlMenu(this.game, this)
        
        this.initCards(); //init the cards of the game 

        this.initCristals(); //init all the cristals :)

        this.initLvlSel();

        this.stopGame(); //lets stop the game to show the lvl menu

    }

    private initSpells(){
        //lets init the spells
        this.controlSpells = new cControlSpells(this.game,this.controlMonsters, 
            this.controlHeroes, this.controlCristals);
    }

    public initLvlSel() {

        var lvl = this.game.add.bitmapText(10, 10, "gotic_black", "LVL " + this.gameLvl, 32);
        lvl.inputEnabled = true;
        lvl.events.onInputDown.add(this.skipLvl,this);

        this.textGameLvl = lvl;

    }

    private skipLvl() {

        this.stopGame();
        
        this.nextLvl();

    }

    public updateManaSpeed(numCristals:number)   {

        switch (numCristals) {
            case 4:
                this.speedMana = this.baseSpeedMana * 1;
                break;
            case 5:
                this.speedMana = this.baseSpeedMana * 1.1;
                break;
            case 6:
                this.speedMana = this.baseSpeedMana * 1.15;
                break;
            case 7:
                this.speedMana = this.baseSpeedMana * 1.2;
                break;
        
            default:
                break;
        }

    }


    public getSharedCristals() {
        return this.controlCristals.arrayShareCristals;
    }

    public monsterHitHeroe(isEnemy:boolean, damage: number) {

        //lets update the bars and control if one of the heroes is dead
        if (isEnemy) {
            var dead = this.playerBars.UpdateLife(-damage);

            if (dead == true) {
                this.heroeDead(false)
            }

        } else {
            var dead = this.enemyBars.UpdateLife(-damage);
            
            if (dead == true) {
                this.heroeDead(true)
            }
        }
        
    }

    private heroeDead(youWin:boolean) {

        if (this.gameStop) {return}

        this.controlMenu.showLvlFinish(youWin)

        //lets stop the game
        this.stopGame();

    }


    public tryAgain() {
        this.startGame();
    }

    public nextLvl() {
        this.gameLvl ++;

        this.textGameLvl.text = "LVL " + this.gameLvl;

        this.controlMenu.startLvlMenu();

        //in the lvl 2 we start the spell sistem
        if (this.gameLvl == 2) { this.initSpells() }

    }

    public startLvl() {
        this.startGame();
    }

    private stopGame() {
        //lets stop the enemy AI
        if (this.controlHeroes != undefined){
            this.controlHeroes.enemyHeroe.enemyIA.stopEnemyAI();
        }
        //lets stop the timer 
        if (this.timer != undefined) {
            this.timer.timer.destroy();
        }
        
        this.gameStop = true;

    }

    private startGame() {
        
        if (this.spriteMenu != undefined) {
            this.spriteMenu.destroy();
        }

        //start enemy!
        this.controlHeroes.enemyHeroe.enemyIA.startEnemyAI(this.gameLvl);

        this.gameStop = false;
        //lets kill all the monster from the previus games!
        this.controlMonsters.restart();

        this.playerBars.restartBars();
        this.enemyBars.restartBars();

        this.controlCristals.restartCristals();

        //lets add the timer to update the manas bars
        this.timer = this.game.time.events.loop(this.speedBars, this.updateBars, this);
        this.timer.timer.start();

        //lets add the new cards if needed
        this.controlCards.addNewCards(this.gameLvl);


    }

    private updateBars() {

        //update the mana of the player
        this.playerBars.UpdateMana(this.speedMana);
        
        //enable the cards acording to the mana needed
        this.controlCards.checkManaCards(this.playerBars.mana);
    }

    
    private initCards() {

        this.controlCards = new cControlCards(this.game, this);

    }

    private initCristals() {
        this.controlCristals = new cControlCristals(this.game, this);

    }

    public checkCardRelease(card:cCards) {

        //first we desativate the blue cristals 
        this.controlCristals.turnOffBlueCristals();

        //then we see if we have to generate a monster or not
        var cristal = this.controlCristals.checkRelease(card.getCenter());
        
        if (cristal != undefined) {
            //lets check if we have the mana to do it
            if (this.playerBars.UpdateMana(-card.monsterData.manaCost) == true) {

                var direction = cristal.pathOption

                if (cristal.pathOption == enumPathOptions.allOptions) {
                    //lets choose a random path 
                    direction = this.game.rnd.integerInRange(0,3);
                }  else if (cristal.pathOption == enumPathOptions.centerOfMap) {
                    direction = this.game.rnd.integerInRange(2,3);
                }
                //lets add the new monster to the map!
                this.controlMonsters.createNewMonster(direction, cristal.monsterStartPoss, card.monsterData.id);
            
            }

        }

    }


    public cardDragStart(card:cCards) {
        this.controlCristals.activateBlueCristals();
    }

}


