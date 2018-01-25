var cSpell = (function () {
    function cSpell(game) {
        this.game = game;
        this.isSpellOnCoolDown = false;
        this.posInSpriteSheet = 1;
    }
    cSpell.prototype.iniciateSpell = function (spellPos, data) {
        this.sprite = this.game.add.sprite(spellPos.x, spellPos.y, 'spells', data.possInSheet);
        this.sprite.scale.set(0.75);
        this.sprite.inputEnabled = true;
        this.data = data;
        this.sprite.events.onInputDown.add(this.spellSelected, this);
        this.signalSpellSel = new Phaser.Signal();
        //creo el recuadro para el coolDownTimeSec
        //circulo interior
        this.spriteFocusCool = this.game.add.graphics(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2);
        this.spriteFocusCool.lineStyle(2, 0x141417, 1);
        this.spriteFocusCool.pivot.x = 0.5;
        this.spriteFocusCool.pivot.y = 0.5;
        this.spriteFocusCool.beginFill(0x141417);
        this.spriteFocusCool.alpha = 0.75;
        this.spriteFocusCool.drawCircle(0, 0, 96);
        this.spriteFocusCool.visible = false;
        //circulo fijo
        this.spriteFocusFixCool = this.game.add.graphics(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2);
        this.spriteFocusFixCool.lineStyle(2, 0x141417, 1);
        this.spriteFocusFixCool.beginFill(0x141417);
        this.spriteFocusFixCool.alpha = 0.3;
        this.spriteFocusFixCool.drawCircle(0, 0, 96);
        this.spriteFocusFixCool.visible = false;
        this.fiveSecondsText = this.game.add.bitmapText(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2 - 8, 'gotic_white', "", 48);
        this.fiveSecondsText.anchor.set(0.5);
    };
    cSpell.prototype.spellSelected = function () {
        if (this.isSpellOnCoolDown == false) {
            this.signalSpellSel.dispatch(this);
            //lets check if we need to activate the cold down, or another action is needed before do it
            if (this.data.hasCallBack == false) {
                this.spellColdDown();
            }
        }
    };
    cSpell.prototype.spellColdDown = function () {
        this.isSpellOnCoolDown = true;
        this.spriteFocusCool.visible = true;
        this.spriteFocusFixCool.visible = true;
        this.spriteFocusCool.scale.set(1, 1);
        this.game.add.tween(this.spriteFocusCool.scale).to({ x: 0, y: 0 }, this.data.coolDownTimeSec * 1000, Phaser.Easing.Linear.None, true);
        this.game.time.events.add(Phaser.Timer.SECOND * this.data.coolDownTimeSec, this.coolDownFinish, this);
        //lets add a timer to make a number apear when 5 sec are left
        this.game.time.events.add(Phaser.Timer.SECOND * this.data.coolDownTimeSec - 5000, this.fiveSecondsAlert, this);
    };
    cSpell.prototype.fiveSecondsAlert = function () {
        this.fiveSecondsText.text = "5";
        var timer = this.game.time.create(false);
        timer.loop(1000, this.updateLeftTime, this, timer);
        timer.start();
    };
    cSpell.prototype.updateLeftTime = function (timer) {
        var newTime = parseInt(this.fiveSecondsText.text) - 1;
        if (newTime >= 1) {
            this.fiveSecondsText.text = newTime.toString();
        }
        else {
            this.fiveSecondsText.text = "";
            timer.destroy();
        }
    };
    cSpell.prototype.coolDownFinish = function () {
        this.spriteFocusCool.visible = false;
        this.spriteFocusFixCool.visible = false;
        this.isSpellOnCoolDown = false;
    };
    return cSpell;
}());
