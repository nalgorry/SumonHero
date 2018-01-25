var cControlGame = (function () {
    function cControlGame(game) {
        this.game = game;
        this.initMainMenu();
    }
    cControlGame.prototype.initLvl = function () {
        //lets kill the main menu
        var startAnim = this.game.add.tween(this.spriteMainMenu).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true);
        startAnim.onComplete.add(this.destroyMenu, this);
        //lets init the controler for the monsters
        this.controlMonsters = new cControlMonsters(this.game);
        //lets init the game interface
        this.controlInterface = new cControlInterface(this.game, this.controlMonsters);
        this.controlMonsters.gameInterface = this.controlInterface;
        //lets init the heroes
        this.controlHeroes = new cControlHeroes(this.game, this.controlInterface);
        this.controlInterface.controlHeroes = this.controlHeroes;
        //lets show the lvl menu 
        this.controlInterface.controlMenu.startLvlMenu();
    };
    cControlGame.prototype.destroyMenu = function () {
        this.spriteMainMenu.destroy();
    };
    cControlGame.prototype.initMainMenu = function () {
        //to control the main menu position
        var height = 200;
        var width = 600;
        var x = this.game.width / 2;
        var y = 350;
        this.spriteMainMenu = this.game.add.sprite(x, y);
        this.spriteMainMenu.anchor.setTo(0.5);
        var bitmapEndGame = this.game.add.graphics(-width / 2, -height / 2);
        bitmapEndGame.beginFill(0x363636);
        bitmapEndGame.lineStyle(2, 0x000000, 1);
        bitmapEndGame.drawRect(0, 0, width, height);
        bitmapEndGame.endFill();
        bitmapEndGame.alpha = 0.9;
        this.spriteMainMenu.addChild(bitmapEndGame);
        //lets add some bugs
        var bug1 = this.game.add.sprite(-260, -50, 'bugs', 0);
        this.spriteMainMenu.addChild(bug1);
        var bug2 = this.game.add.sprite(260, -50, 'bugs', 1);
        bug2.scale.x = -1;
        this.spriteMainMenu.addChild(bug2);
        //lets add the text
        var textEndGame = this.game.add.bitmapText(0, -70, "gotic_white", "Kill the oponent bug", 32);
        textEndGame.anchor.setTo(0.5);
        this.spriteMainMenu.addChild(textEndGame);
        //lets add the text
        var textEndGame = this.game.add.bitmapText(0, 0, "gotic_white", "Before he kills you...", 32);
        textEndGame.anchor.setTo(0.5);
        this.spriteMainMenu.addChild(textEndGame);
        //lets add some buttons
        var buttonStart = new cControlButton(this.game, 0, 70, "Start");
        buttonStart.anchor.setTo(0.5);
        buttonStart.buttonClick.add(this.initLvl, this);
        this.spriteMainMenu.addChild(buttonStart);
    };
    return cControlGame;
}());
