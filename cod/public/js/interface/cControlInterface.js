var cControlInterface = (function () {
    function cControlInterface(game, controlMonsters) {
        this.game = game;
        this.controlMonsters = controlMonsters;
        this.speedMana = 0.5;
        this.speedBars = 50;
        this.gameStop = false;
        this.initInterfaceBack(); //all that goes to the back will go here
        this.playerBars = new cControlBars(game, 30, 20); //create the player bars to control mana and life
        this.enemyBars = new cControlBars(game, 760, 20); //create the enemy bars
        this.initCards(); //init the cards of the game 
        this.initCristals(); //init all the cristals :)
        //to control the update of the bars        
        var timer = this.game.time.events.loop(this.speedBars, this.updateBars, this);
    }
    cControlInterface.prototype.updateManaSpeed = function (numCristals) {
        switch (numCristals) {
            case 4:
                this.speedMana = 0.6;
                break;
            case 5:
                this.speedMana = 0.9;
                break;
            case 6:
                this.speedMana = 1.3;
                break;
            case 7:
                this.speedMana = 1.5;
                break;
            default:
                break;
        }
    };
    cControlInterface.prototype.getSharedCristals = function () {
        return this.controlCristals.arrayShareCristals;
    };
    cControlInterface.prototype.monsterHitHeroe = function (isEnemy, damage) {
        //lets update the bars and control if one of the heroes is dead
        if (isEnemy) {
            var dead = this.playerBars.UpdateLife(-damage);
            if (dead == true) {
                this.heroeDead(false);
            }
        }
        else {
            var dead = this.enemyBars.UpdateLife(-damage);
            if (dead == true) {
                this.heroeDead(true);
            }
        }
    };
    cControlInterface.prototype.heroeDead = function (youWin) {
        if (this.gameStop) {
            return;
        }
        //lets put the background
        var height = 200;
        var width = 500;
        var x = 480;
        var y = 350;
        this.spriteEndGame = this.game.add.sprite(x, y);
        this.spriteEndGame.anchor.setTo(0.5);
        var bitmapEndGame = this.game.add.graphics(-width / 2, -height / 2);
        bitmapEndGame.beginFill(0x363636);
        bitmapEndGame.lineStyle(2, 0x000000, 1);
        bitmapEndGame.drawRect(0, 0, width, height);
        bitmapEndGame.endFill();
        bitmapEndGame.alpha = 0.9;
        this.spriteEndGame.addChild(bitmapEndGame);
        //lets add the text
        var textEndGame = this.game.add.bitmapText(0, -70, "gotic_white", "Game Finish!", 32);
        textEndGame.anchor.setTo(0.5);
        this.spriteEndGame.addChild(textEndGame);
        var result;
        if (youWin) {
            result = "YOU WIN :)";
        }
        else {
            result = "YOU LOSE :(";
        }
        //lets add the text
        var textEndGame = this.game.add.bitmapText(0, 0, "gotic_white", result, 32);
        textEndGame.anchor.setTo(0.5);
        this.spriteEndGame.addChild(textEndGame);
        //lets add some buttons
        var buttonTryAgain = new cControlButton(this.game, -140, 70, "Try Again!");
        buttonTryAgain.anchor.setTo(0.5);
        buttonTryAgain.buttonClick.add(this.tryAgain, this);
        this.spriteEndGame.addChild(buttonTryAgain);
        var buttonNextLvl = new cControlButton(this.game, 140, 70, "Next Lvl ->");
        buttonNextLvl.anchor.setTo(0.5);
        buttonNextLvl.buttonClick.add(this.nextLvl, this);
        this.spriteEndGame.addChild(buttonNextLvl);
        //lets stop the game
        this.stopGame();
    };
    cControlInterface.prototype.stopGame = function () {
        //lets stop the enemy AI
        this.controlHeroes.enemyHeroe.enemyIA.stopEnemyAI();
        this.gameStop = true;
    };
    cControlInterface.prototype.startGame = function () {
        this.spriteEndGame.destroy();
        // start enemyAI
        this.gameStop = false;
        //lets kill all the monster from the previus games!
        this.controlMonsters.restart();
        this.playerBars.restartBars();
        this.enemyBars.restartBars();
        this.controlCristals.restartCristals();
    };
    cControlInterface.prototype.tryAgain = function () {
        this.controlHeroes.enemyHeroe.enemyIA.startEnemyAI(0);
        this.startGame();
    };
    cControlInterface.prototype.nextLvl = function () {
        this.controlHeroes.enemyHeroe.enemyIA.startEnemyAI(-300);
        this.startGame();
    };
    cControlInterface.prototype.updateBars = function () {
        //update the mana of the player
        this.playerBars.UpdateMana(this.speedMana);
        //enable the cards acording to the mana needed
        this.controlCards.checkManaCards(this.playerBars.mana);
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
        backGroundDesc.alpha = 0.9;
    };
    cControlInterface.prototype.initCards = function () {
        this.controlCards = new cControlCards(this.game, this);
    };
    cControlInterface.prototype.initCristals = function () {
        this.controlCristals = new cControlCristals(this.game, this);
    };
    cControlInterface.prototype.checkCardRelease = function (card) {
        //first we desativate the blue cristals 
        this.controlCristals.turnOffBlueCristals();
        //then we see if we have to generate a monster or not
        var cristal = this.controlCristals.checkRelease(card);
        if (cristal != undefined) {
            //lets check if we have the mana to do it
            if (this.playerBars.UpdateMana(-card.monsterData.manaCost) == true) {
                var direction = cristal.pathOption;
                if (cristal.pathOption == 4 /* allOptions */) {
                    //lets choose a random path 
                    direction = this.game.rnd.integerInRange(0, 3);
                }
                else if (cristal.pathOption == 5 /* centerOfMap */) {
                    direction = this.game.rnd.integerInRange(2, 3);
                }
                //lets add the new monster to the map!
                this.controlMonsters.createNewMonster(direction, cristal.monsterStartPoss, card.monsterData.id);
            }
        }
    };
    cControlInterface.prototype.cardDragStart = function (card) {
        this.controlCristals.activateBlueCristals();
    };
    return cControlInterface;
}());
