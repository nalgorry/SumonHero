class cEnemyIA {

    private timer:Phaser.Timer;
    public timerSpecial:Phaser.Timer;

    public timerStep:number;    
    public specialStep:number;
    
    public gameLvl:number;

    constructor(public game:Phaser.Game,
    public gameInterface:cControlInterface) {

        //lets create the timer to do all we need
        this.timer = game.time.create(false);
        this.timerSpecial = game.time.create();
         
    }

    public stopEnemyAI() {
        this.timer.stop();
        this.timerSpecial.stop();
    }

    private showMsg(msg:string) {
        var msgSprite = this.game.add.sprite(1080, 380, "enemy_msg" );
        msgSprite.anchor.set(0.5);
        msgSprite.alpha = 0;

        var text = this.game.add.bitmapText(0, 0, "gotic_black", msg, 16);
        text.anchor.set(0.5);
        text.align = "center";
        text.x -=14;
        msgSprite.addChild(text)

        var cardEnabled = this.game.add.tween(msgSprite).to( { alpha: 1}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

        cardEnabled.onComplete.add(this.msgComplete, this, null, text);

    }

    private msgComplete(s:Phaser.Sprite, t:Phaser.Tween, text:Phaser.BitmapText) {
  
        var quake = this.game.add.tween(text)
            .to({y: "-4" }, 150, Phaser.Easing.Bounce.InOut, false, 0, 8, true);
        
        // let the earthquake begins
        quake.start();

        quake.onComplete.add(this.clearMsg, this, null, s);

    }

    private clearMsg(s:Phaser.Sprite, t:Phaser.Tween, fullSprite:Phaser.Sprite) {
        var msg = this.game.add.tween(fullSprite).to( { alpha: 0}, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        msg.onComplete.add(this.deleteMsg, this);
    }

    private deleteMsg(s:Phaser.Sprite, t:Phaser.Tween) {
        s.destroy();
    }

    public startEnemyAI(gameLvl:number) {

        this.gameLvl = gameLvl;
        var startMsg:string;

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
                break;
            case 5:
                this.timerStep = 4000;
                this.timer.loop(this.timerStep, this.loopLvl_5, this);
                
                this.specialStep = this.game.rnd.integerInRange(18000, 30000);
                this.timerSpecial.add(this.specialStep, this.special_5, this);
                this.timerSpecial.start();
                startMsg = "You are not \n ready for this!";
                break;
        
            default:
                break;
        }

        this.showMsg(startMsg);

        this.timer.start();
    }

    private special_5() {

        //lets do a super atack!!
        this.showMsg("You are dead now!");

        //we create 4 monsters at the same time 
        for (var i = 1; i <= 4; i++) {
            var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[i];
            this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss , enumMonstersType.bow);
        }

        //we create a bom in the initial space muajaja
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[0];
        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss , enumMonstersType.explosion);

        //lets restart the timer
        this.specialStep = this.game.rnd.integerInRange(12000, 22000);
        this.timerSpecial.add(this.specialStep, this.special_5, this);
        this.timerSpecial.start();
    }

    private loopLvl_1 () {
        
        //lets define the variable for the first lvl 
        var monsterType = this.game.rnd.integerInRange(0,2);
        var numCristal = 0;

        var monsterOptions = [enumMonstersType.bow, enumMonstersType.dager, enumMonstersType.sword];

        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];

        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss , monsterOptions[monsterType]);

    }

    private loopLvl_2 () {
        
        //lets define the variable for the first lvl 
        var monsterType = this.game.rnd.integerInRange(0,2);
        var numCristal = this.game.rnd.integerInRange(0,4);

        var monsterOptions = [enumMonstersType.bow, enumMonstersType.dager, enumMonstersType.sword];

        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];

        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss , monsterOptions[monsterType]);


    }

    private loopLvl_3 () {
        
        var monsterOptions = [enumMonstersType.bow, enumMonstersType.dager, enumMonstersType.sword, enumMonstersType.cold_wizard];
        var monsterType = this.game.rnd.integerInRange(0,monsterOptions.length - 1);

        var numCristal = this.game.rnd.integerInRange(0,4);
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];

        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss , monsterOptions[monsterType]);

    }

    private loopLvl_4 () {
        
        var monsterOptions = [ 
            enumMonstersType.dager, 
            enumMonstersType.cold_wizard,
            enumMonstersType.explosion];

        var monsterType = this.game.rnd.integerInRange(0,monsterOptions.length - 1);

        var numCristal = this.game.rnd.integerInRange(0,4);
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];

        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss , monsterOptions[monsterType]);

    }

    private loopLvl_5 () {
        
        var monsterOptions = [ 
            enumMonstersType.dager, 
            enumMonstersType.bow,
            enumMonstersType.sword,
            enumMonstersType.ninja];

        var monsterType = this.game.rnd.integerInRange(0,monsterOptions.length - 1);

        var numCristal = this.game.rnd.integerInRange(0,4);
        var cristal = this.gameInterface.controlCristals.arrayEnemyCristals[numCristal];

        this.gameInterface.controlMonsters.createEnemyMonster(cristal.getCristalPath(), cristal.monsterStartPoss , monsterOptions[monsterType]);

    }


}