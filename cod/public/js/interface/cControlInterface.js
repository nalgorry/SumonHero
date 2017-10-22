var cControlInterface = (function () {
    function cControlInterface(game, controlMonsters) {
        this.game = game;
        this.controlMonsters = controlMonsters;
        this.speedBars = 50;
        this.initInterfaceBack(); //all that goes to the back will go here
        this.playerBars = new cControlBars(game, 30, 20); //create the player bars to control mana and life
        this.enemyBars = new cControlBars(game, 760, 20); //create the enemy bars
        this.initCards(); //init the cards of the game 
        this.initCristals(); //init all the cristals :)
        //to control the update of the bars        
        var timer = this.game.time.events.loop(this.speedBars, this.updateBars, this);
    }
    cControlInterface.prototype.monsterHitHeroe = function (monster, damage) {
        if (monster.isEnemy) {
            this.playerBars.UpdateLife(-damage);
        }
        else {
            this.enemyBars.UpdateLife(-damage);
        }
    };
    cControlInterface.prototype.updateBars = function () {
        this.playerBars.UpdateMana(1);
    };
    cControlInterface.prototype.initInterfaceBack = function () {
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
    };
    cControlInterface.prototype.initCards = function () {
        this.controlCards = new cControlCards(this.game, this);
    };
    cControlInterface.prototype.initCristals = function () {
        this.controlCristals = new cControlCristals(this.game);
    };
    cControlInterface.prototype.checkCardRelease = function (card) {
        //first we desativate the blue cristals 
        this.controlCristals.turnOffBlueCristals();
        //then we see if we have to generate a monster or not
        var cristal = this.controlCristals.checkRelease();
        if (cristal != undefined) {
            //lets check if we have the mana to do it
            if (this.playerBars.UpdateMana(-card.manaCost) == true) {
                //lets add the new monster to the map!
                this.controlMonsters.createNewMonster(cristal.pathOption, cristal.monsterStartPoss);
            }
        }
    };
    cControlInterface.prototype.cardDragStart = function (card) {
        this.controlCristals.activateBlueCristals();
    };
    return cControlInterface;
}());
