var cControlMenu = (function () {
    function cControlMenu(game, controlInterface) {
        this.game = game;
        this.controlInterface = controlInterface;
    }
    cControlMenu.prototype.startLvlMenu = function () {
        if (this.spriteMenu != undefined) {
            this.spriteMenu.destroy();
        }
        //lets put the background
        var height = 400;
        var width = 600;
        var x = this.game.width / 2;
        var y = 350;
        this.spriteMenu = this.game.add.sprite(x, y);
        this.spriteMenu.anchor.setTo(0.5);
        this.spriteMenu.alpha = 0;
        var showMenu = this.game.add.tween(this.spriteMenu).to({ alpha: 0.95 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        var bitmapEndGame = this.game.add.graphics(-width / 2, -height / 2);
        bitmapEndGame.beginFill(0x363636);
        bitmapEndGame.lineStyle(2, 0x000000, 1);
        bitmapEndGame.drawRect(0, 0, width, height);
        bitmapEndGame.endFill();
        bitmapEndGame.alpha = 0.95;
        this.spriteMenu.addChild(bitmapEndGame);
        //lets add the text
        var text = this.game.add.bitmapText(0, -180, "gotic_white", "Lvl " + this.controlInterface.gameLvl.toString(), 32);
        text.anchor.setTo(0.5);
        this.spriteMenu.addChild(text);
        //lets show the Menu for the lvl 
        this.lvlMessage();
        //lets add some buttons
        var buttonTryAgain = new cControlButton(this.game, -180, 170, "Exit");
        buttonTryAgain.anchor.setTo(0.5);
        //buttonTryAgain.buttonClick.add(this.tryAgain, this);
        this.spriteMenu.addChild(buttonTryAgain);
        var buttonStartLvl = new cControlButton(this.game, 180, 170, "Start!");
        buttonStartLvl.anchor.setTo(0.5);
        buttonStartLvl.buttonClick.add(this.startLvl, this);
        this.spriteMenu.addChild(buttonStartLvl);
    };
    cControlMenu.prototype.startLvl = function () {
        this.game.add.tween(this.spriteMenu).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.controlInterface.startLvl();
    };
    cControlMenu.prototype.lvlMessage = function () {
        var lvl = this.controlInterface.gameLvl;
        switch (lvl) {
            case 1:
                //lets add the text
                var text = this.game.add.bitmapText(0, -120, "gotic_white", "Move yours monster to the \n blue cristals to atack!", 24);
                text.align = "center";
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                //lets add some help... how the hell is this game played?
                var image = this.game.add.sprite(-140, 40, 'menu_card', 0);
                image.anchor.set(0.5);
                image.scale.set(1.2);
                this.spriteMenu.addChild(image);
                var image = this.game.add.sprite(140, 20, 'example_cristal');
                image.anchor.set(0.5);
                this.spriteMenu.addChild(image);
                var image = this.game.add.sprite(0, 20, 'white_arrow');
                image.scale.set(0.8);
                image.angle = 0;
                image.anchor.set(0.5);
                this.spriteMenu.addChild(image);
                break;
            case 2:
                //lets add the text
                var text = this.game.add.bitmapText(0, -120, "gotic_white", "If you are in trouble, use your powers!", 24);
                text.align = "center";
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                var image = this.game.add.sprite(0, 0, 'spells_help');
                image.anchor.set(0.5);
                this.spriteMenu.addChild(image);
                var text = this.game.add.bitmapText(-180, 80, "gotic_white", "Atack a line", 24);
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                var text = this.game.add.bitmapText(0, 120, "gotic_white", "Heal all monsters", 24);
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                var text = this.game.add.bitmapText(180, 80, "gotic_white", "Defend monsters", 24);
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                var image = this.game.add.sprite(0, 82, 'white_arrow');
                image.scale.set(0.3);
                image.angle = -90;
                image.anchor.set(0.5);
                this.spriteMenu.addChild(image);
                var image = this.game.add.sprite(-180, 40, 'white_arrow');
                image.scale.set(0.3);
                image.angle = -20;
                image.anchor.set(0.5);
                this.spriteMenu.addChild(image);
                var image = this.game.add.sprite(180, 40, 'white_arrow');
                image.scale.set(0.3);
                image.scale.y *= -1;
                image.angle = -140;
                image.anchor.set(0.5);
                this.spriteMenu.addChild(image);
                break;
            case 3:
                //lets add the text
                var text = this.game.add.bitmapText(0, -120, "gotic_white", "New Monster Avaible!", 24);
                text.align = "center";
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                var image = this.game.add.sprite(-0, 0, 'menu_card', 1);
                image.anchor.set(0.5);
                image.scale.set(1.2);
                this.spriteMenu.addChild(image);
                var text = this.game.add.bitmapText(0, 100, "gotic_white", "I will freeze your enemies.", 24);
                text.align = "center";
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                break;
            case 4:
                //lets add the text
                var text = this.game.add.bitmapText(0, -120, "gotic_white", "New Monster Avaible!", 24);
                text.align = "center";
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                var image = this.game.add.sprite(-0, 0, 'menu_card', 2);
                image.anchor.set(0.5);
                this.spriteMenu.addChild(image);
                var text = this.game.add.bitmapText(0, 100, "gotic_white", "I will explote for you.", 24);
                text.align = "center";
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                break;
            case 5:
                //lets add the text
                var text = this.game.add.bitmapText(0, -120, "gotic_white", "BOSS enemy", 48);
                text.align = "center";
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                var text = this.game.add.bitmapText(0, 0, "gotic_white", "BE CAREFULL", 62);
                text.align = "center";
                text.anchor.setTo(0.5);
                this.spriteMenu.addChild(text);
                break;
        }
    };
    cControlMenu.prototype.showLvlFinish = function (youWin) {
        if (this.spriteMenu != undefined) {
            this.spriteMenu.destroy();
        }
        //lets put the background
        var height = 200;
        var width = 500;
        var x = this.game.width / 2;
        var y = 350;
        this.spriteMenu = this.game.add.sprite(x, y);
        this.spriteMenu.anchor.setTo(0.5);
        var bitmapEndGame = this.game.add.graphics(-width / 2, -height / 2);
        bitmapEndGame.beginFill(0x363636);
        bitmapEndGame.lineStyle(2, 0x000000, 1);
        bitmapEndGame.drawRect(0, 0, width, height);
        bitmapEndGame.endFill();
        bitmapEndGame.alpha = 0.9;
        this.spriteMenu.addChild(bitmapEndGame);
        //lets add the text
        var text = this.game.add.bitmapText(0, -70, "gotic_white", "Lvl " + this.controlInterface.gameLvl.toString() + " Finish!", 32);
        text.anchor.setTo(0.5);
        this.spriteMenu.addChild(text);
        var result;
        if (youWin) {
            result = "YOU WIN :)";
        }
        else {
            result = "YOU LOSE :(";
        }
        //lets add the text
        var text = this.game.add.bitmapText(0, 0, "gotic_white", result, 32);
        text.anchor.setTo(0.5);
        this.spriteMenu.addChild(text);
        //lets add some buttons
        var buttonTryAgain = new cControlButton(this.game, -140, 70, "Try Again!");
        buttonTryAgain.anchor.setTo(0.5);
        buttonTryAgain.buttonClick.add(this.tryAgain, this);
        this.spriteMenu.addChild(buttonTryAgain);
        //only if you win you can continue
        if (youWin) {
            var buttonStartLvl = new cControlButton(this.game, 140, 70, "Next Lvl ->");
            buttonStartLvl.anchor.setTo(0.5);
            buttonStartLvl.buttonClick.add(this.nextLvl, this);
            this.spriteMenu.addChild(buttonStartLvl);
        }
    };
    cControlMenu.prototype.tryAgain = function () {
        this.game.add.tween(this.spriteMenu).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.controlInterface.tryAgain();
    };
    cControlMenu.prototype.nextLvl = function () {
        this.game.add.tween(this.spriteMenu).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.controlInterface.nextLvl();
    };
    return cControlMenu;
}());
