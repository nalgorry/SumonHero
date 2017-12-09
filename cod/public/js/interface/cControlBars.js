var cControlBars = (function () {
    function cControlBars(game, x, y, barWidth, showMana) {
        this.game = game;
        this.maxLife = 500;
        this.maxMana = 150;
        this.initMana = 30;
        this.initBars(x, y, barWidth, showMana);
    }
    cControlBars.prototype.restartBars = function () {
        this.life = this.maxLife;
        this.mana = this.initMana;
        this.UpdateLife(0);
        this.UpdateMana(0);
    };
    cControlBars.prototype.initBars = function (x, y, barWidth, showMana) {
        //lets set the life and mana to maxvalues
        this.life = this.maxLife;
        this.mana = this.initMana;
        //the size of the bars
        var barHeight = 20;
        //vida
        //back
        var bitmapBack = this.game.add.graphics(barWidth, barHeight);
        bitmapBack.beginFill(0x363636);
        bitmapBack.drawRect(x - barWidth, y - barHeight, barWidth, barHeight);
        bitmapBack.endFill();
        bitmapBack.alpha = 0.9;
        //actual bar
        var bitmapVida = this.game.add.bitmapData(barWidth, barHeight);
        bitmapVida.ctx.beginPath();
        bitmapVida.ctx.rect(0, 0, barWidth, barHeight);
        bitmapVida.ctx.fillStyle = '#e33133';
        bitmapVida.ctx.fill();
        this.lifeBar = this.game.add.sprite(x, y + bitmapVida.height, bitmapVida);
        this.lifeBar.anchor.setTo(1);
        //text
        this.textLife = this.game.add.bitmapText(this.lifeBar.x + barWidth / 2 + 14, this.lifeBar.y - 4, 'gotic_white', this.life.toString(), 16);
        this.textLife.anchor.setTo(1);
        //lets put the bars in it max values 
        this.ResizeBar(this.lifeBar, this.life, this.maxLife);
        if (showMana) {
            //mana
            //back
            var bitmapBack = this.game.add.graphics(barWidth, barHeight);
            bitmapBack.beginFill(0x363636);
            bitmapBack.drawRect(x - barWidth, y + 25 - barHeight, barWidth, barHeight);
            bitmapBack.endFill();
            bitmapBack.alpha = 0.9;
            //bar
            var bitmapMana = this.game.add.bitmapData(barWidth, barHeight);
            bitmapMana.ctx.beginPath();
            bitmapMana.ctx.rect(0, 0, barWidth, barHeight);
            bitmapMana.ctx.fillStyle = '#0099ff';
            bitmapMana.ctx.fill();
            this.manaBar = this.game.add.sprite(x, y + 25 + bitmapMana.height, bitmapMana);
            this.manaBar.anchor.setTo(1);
            //text
            this.textMana = this.game.add.bitmapText(this.manaBar.x + barWidth / 2 + 14, this.manaBar.y - 4, 'gotic_white', this.mana.toString(), 16);
            this.textMana.anchor.setTo(1);
            this.ResizeBar(this.manaBar, this.mana, this.maxMana);
        }
    };
    //devuelve true si el personaje llego a cero vida
    cControlBars.prototype.UpdateLife = function (addValue) {
        //controlo si se murio o no 
        this.life = this.UpdateBar(this.lifeBar, this.life, this.maxLife, addValue);
        this.textLife.text = this.life.toString();
        //lets check if it die 
        if (this.life != 0) {
            return false;
        }
        else {
            return true;
        }
    };
    //returns true if we have enough mana 
    cControlBars.prototype.UpdateMana = function (addValue) {
        if (this.mana >= -addValue) {
            this.mana = this.UpdateBar(this.manaBar, this.mana, this.maxMana, addValue);
            this.textMana.text = Math.round(this.mana).toString();
            return true;
        }
        else {
            return false;
        }
    };
    cControlBars.prototype.UpdateBar = function (bar, value, maxValue, addValue) {
        var result = value;
        //controlo si no se paso del maximo
        if (value + addValue <= maxValue) {
            result += addValue;
        }
        else {
            result = maxValue;
        }
        //check min value 
        if (value + addValue <= 0) {
            result = 0;
        }
        this.ResizeBar(bar, result, maxValue);
        return result;
    };
    cControlBars.prototype.ResizeBar = function (bar, value, maxValue) {
        this.game.add.tween(bar.scale).to({ x: -value / maxValue }, 25, Phaser.Easing.Linear.None, true);
    };
    return cControlBars;
}());
