var cEnemyIA = (function () {
    function cEnemyIA(game, gameInterface) {
        this.game = game;
        this.gameInterface = gameInterface;
        //lets create the timer to do all we need
        this.timer = game.time.create(false);
        this.timerSpecial = game.time.create();
    }
    cEnemyIA.prototype.stopEnemyAI = function () {
        this.timer.stop();
        this.timerSpecial.stop();
    };
    cEnemyIA.prototype.showMsg = function (msg) {
        var msgSprite = this.game.add.sprite(1080, 380, "enemy_msg");
        msgSprite.anchor.set(0.5);
        msgSprite.alpha = 0;
        var text = this.game.add.bitmapText(0, 0, "gotic_black", msg, 16);
        text.anchor.set(0.5);
        text.align = "center";
        text.x -= 14;
        msgSprite.addChild(text);
        var cardEnabled = this.game.add.tween(msgSprite).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        cardEnabled.onComplete.add(this.msgComplete, this, null, text);
    };
    cEnemyIA.prototype.msgComplete = function (s, t, text) {
        var quake = this.game.add.tween(text)
            .to({ y: "-4" }, 150, Phaser.Easing.Bounce.InOut, false, 0, 8, true);
        // let the earthquake begins
        quake.start();
        quake.onComplete.add(this.clearMsg, this, null, s);
    };
    cEnemyIA.prototype.clearMsg = function (s, t, fullSprite) {
        var msg = this.game.add.tween(fullSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        msg.onComplete.add(this.deleteMsg, this);
    };
    cEnemyIA.prototype.deleteMsg = function (s, t) {
        s.destroy();
    };
    cEnemyIA.prototype.startEnemyAI = function (gameLvl) {
        this.gameLvl = gameLvl;
        var startMsg;
        switch (gameLvl) {
            case 1:
                this.timerStep = 5000;
                this.timer.loop(this.timerStep, this.loopLvl_1, this);
                startMsg = "I will kill you!";
                break;
            case 2:
                this.timerStep = 4000;
                this.timer.loop(this.timerStep, this.loopLvl_2, this);
                startMsg = "my monsters are \n more powerfull!";
                break;
            case 3:
                this.timerStep = 3500;
                this.timer.loop(this.timerStep, this.loopLvl_3, this);
                startMsg = "I will freaze you \n to dead!";
                break;
            case 4:
                this.timerStep = 3500;
                this.timer.loop(this.timerStep, this.loopLvl_4, this);
                startMsg = "Everything will \n explote!";
            case 5:
                this.timerStep = 4000;
                this.timer.loop(this.timerStep, this.loopLvl_5, this);
                this.specialStep = this.game.rnd.integerInRange(12000, 22000);
                this.timerSpecial.add(this.specialStep, this.special_5, this);
                this.timerSpecial.start();
                startMsg = "You are not \n ready for this!";
            default:
                break;
        }
        this.showMsg(startMsg);
        this.timer.start();
    };
    cEnemyIA.prototype.special_5 = function () {
        //lets do a super atack!!
        this.showMsg("You are dead now!");
        //we create 4 monsters at the same time 
        for (var i = 1; i <= 4; i++) {
            var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[i];
            this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss, 3 /* bow */);
        }
        //we create a bom in the initial space muajaja
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[0];
        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss, 2 /* explosion */);
        //lets restart the timer
        this.specialStep = this.game.rnd.integerInRange(12000, 22000);
        this.timerSpecial.add(this.specialStep, this.special_5, this);
        this.timerSpecial.start();
    };
    cEnemyIA.prototype.loopLvl_1 = function () {
        //lets define the variable for the first lvl 
        var monsterType = this.game.rnd.integerInRange(0, 2);
        var numCristal = 0;
        var monsterOptions = [3 /* bow */, 4 /* dager */, 1 /* sword */];
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];
        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss, monsterOptions[monsterType]);
    };
    cEnemyIA.prototype.loopLvl_2 = function () {
        //lets define the variable for the first lvl 
        var monsterType = this.game.rnd.integerInRange(0, 2);
        var numCristal = this.game.rnd.integerInRange(0, 4);
        var monsterOptions = [3 /* bow */, 4 /* dager */, 1 /* sword */];
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];
        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss, monsterOptions[monsterType]);
    };
    cEnemyIA.prototype.loopLvl_3 = function () {
        var monsterOptions = [3 /* bow */, 4 /* dager */, 1 /* sword */, 8 /* cold_wizard */];
        var monsterType = this.game.rnd.integerInRange(0, monsterOptions.length - 1);
        var numCristal = this.game.rnd.integerInRange(0, 4);
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];
        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss, monsterOptions[monsterType]);
    };
    cEnemyIA.prototype.loopLvl_4 = function () {
        var monsterOptions = [
            4 /* dager */,
            8 /* cold_wizard */,
            2 /* explosion */];
        var monsterType = this.game.rnd.integerInRange(0, monsterOptions.length - 1);
        var numCristal = this.game.rnd.integerInRange(0, 4);
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];
        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss, monsterOptions[monsterType]);
    };
    cEnemyIA.prototype.loopLvl_5 = function () {
        var monsterOptions = [
            4 /* dager */,
            3 /* bow */,
            1 /* sword */,
            6 /* ninja */];
        var monsterType = this.game.rnd.integerInRange(0, monsterOptions.length - 1);
        var numCristal = this.game.rnd.integerInRange(0, 4);
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];
        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss, monsterOptions[monsterType]);
    };
    return cEnemyIA;
}());
