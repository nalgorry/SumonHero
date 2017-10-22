var cControlBars = (function () {
    function cControlBars(game, x, y) {
        this.game = game;
        this.maxLife = 100;
        this.maxMana = 100;
        this.initBars(x, y);
    }
    cControlBars.prototype.initBars = function (x, y) {
        //lets set the life and mana to maxvalues
        this.life = this.maxLife;
        this.mana = this.maxMana;
        //the size of the bars
        var barHeight = 20;
        var barWidth = 158;
        //vida
        var bitmapVida = this.game.add.bitmapData(barWidth, barHeight);
        bitmapVida.ctx.beginPath();
        bitmapVida.ctx.rect(0, 0, barWidth, barHeight);
        bitmapVida.ctx.fillStyle = '#e33133';
        bitmapVida.ctx.fill();
        this.lifeBar = this.game.add.sprite(x, y + bitmapVida.height, bitmapVida);
        this.lifeBar.anchor.setTo(1);
        //mana
        var bitmapMana = this.game.add.bitmapData(barWidth, barHeight);
        bitmapMana.ctx.beginPath();
        bitmapMana.ctx.rect(0, 0, barWidth, barHeight);
        bitmapMana.ctx.fillStyle = '#0099ff';
        bitmapMana.ctx.fill();
        this.manaBar = this.game.add.sprite(x, y + 25 + bitmapMana.height, bitmapMana);
        this.manaBar.anchor.setTo(1);
        //lets put the bars in it max values 
        this.ResizeBar(this.lifeBar, this.life, this.maxLife);
        this.ResizeBar(this.manaBar, this.mana, this.maxMana);
    };
    //devuelve true si el personaje llego a cero vida
    cControlBars.prototype.UpdateLife = function (addValue) {
        //controlo si se murio o no 
        this.life = this.UpdateBar(this.lifeBar, this.life, this.maxLife, addValue);
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
