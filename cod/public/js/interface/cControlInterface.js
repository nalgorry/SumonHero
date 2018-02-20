var cControlInterface = (function () {
    function cControlInterface(game, controlMonsters) {
        this.game = game;
        this.controlMonsters = controlMonsters;
        this.speedMana = 1;
        this.baseSpeedMana = 1.05;
        this.speedBars = 100;
        this.gameLvl = 1;
        this.gameStop = false;
        this.playerBars = new cControlBars(game, 10, 368, 80, true); //create the player bars to control mana and life
        this.enemyBars = new cControlBars(game, 1190, 368, 80, false); //create the enemy bars
        this.controlMenu = new cControlMenu(this.game, this);
        this.initCards(); //init the cards of the game 
        this.initCristals(); //init all the cristals :)
        this.initLvlSel();
        this.stopGame(); //lets stop the game to show the lvl menu
    }
    cControlInterface.prototype.initSpells = function () {
        //lets init the spells
        this.controlSpells = new cControlSpells(this.game, this.controlMonsters, this.controlHeroes, this.controlCristals);
    };
    cControlInterface.prototype.initLvlSel = function () {
        var lvl = this.game.add.bitmapText(10, 10, "gotic_black", "LVL " + this.gameLvl, 32);
        lvl.inputEnabled = true;
        lvl.events.onInputDown.add(this.skipLvl, this);
        this.textGameLvl = lvl;
    };
    cControlInterface.prototype.skipLvl = function () {
        this.stopGame();
        this.nextLvl();
    };
    cControlInterface.prototype.updateManaSpeed = function (numCristals) {
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
        this.controlMenu.showLvlFinish(youWin);
        //lets stop the game
        this.stopGame();
    };
    cControlInterface.prototype.tryAgain = function () {
        this.startGame();
    };
    cControlInterface.prototype.nextLvl = function () {
        this.gameLvl++;
        this.textGameLvl.text = "LVL " + this.gameLvl;
        this.controlMenu.startLvlMenu();
        //in the lvl 2 we start the spell sistem
        if (this.gameLvl == 2) {
            this.initSpells();
        }
    };
    cControlInterface.prototype.startLvl = function () {
        this.startGame();
    };
    cControlInterface.prototype.stopGame = function () {
        //lets stop the enemy AI
        if (this.controlHeroes != undefined) {
            this.controlHeroes.enemyHeroe.enemyIA.stopEnemyAI();
        }
        //lets stop the timer 
        if (this.timer != undefined) {
            this.timer.timer.destroy();
        }
        this.gameStop = true;
    };
    cControlInterface.prototype.startGame = function () {
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
        //lets restart the powers
        if (this.controlSpells != undefined) {
            this.controlSpells.restartPowers();
        }
        if (this.gameLvl == 1) {
            this.createTutorial();
        }
    };
    cControlInterface.prototype.createTutorial = function () {
        this.helpSprite = this.game.add.sprite(150, 500);
        var s = this.game.add.sprite(55, 25, "blackArrow");
        s.anchor.set(0.5);
        s.scale.set(1.2);
        s.angle = -45;
        this.helpSprite.addChild(s);
        var text = this.game.add.bitmapText(-38, -20, "gotic_black", "move yours \n monsters to the \n blue cristals", 20);
        text.anchor.setTo(0.5);
        this.helpSprite.addChild(text);
        var quake = this.game.add.tween(s)
            .to({ y: "-4" }, 300, Phaser.Easing.Bounce.InOut, true, 0, 200, true);
    };
    cControlInterface.prototype.endCristalTutorial = function () {
        if (this.helpSprite != undefined) {
            var anim = this.game.add.tween(this.helpSprite).to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            anim.onComplete.add(this.destroyCristalTutorial, this);
        }
    };
    cControlInterface.prototype.destroyCristalTutorial = function () {
        this.helpSprite.destroy();
    };
    cControlInterface.prototype.updateBars = function () {
        //update the mana of the player
        this.playerBars.UpdateMana(this.speedMana);
        //enable the cards acording to the mana needed
        this.controlCards.checkManaCards(this.playerBars.mana);
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
        var cristal = this.controlCristals.checkRelease(card.getCenter(), true);
        if (cristal != undefined) {
            //lets destroy the tutorial 
            this.endCristalTutorial();
            //lets check if we have the mana to do it
            if (this.playerBars.UpdateMana(-card.monsterData.manaCost) == true) {
                //lets add the new monster to the map!
                this.controlMonsters.createNewMonster(cristal.getCristalPath(), cristal.monsterStartPoss, card.monsterData.id);
            }
        }
    };
    cControlInterface.prototype.cardDragStart = function (card) {
        this.controlCristals.activateBlueCristals();
    };
    return cControlInterface;
}());
