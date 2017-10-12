class cControlBars {

    //to control the player bars
    private lifeBar:Phaser.Sprite;
    private manaBar:Phaser.Sprite;
    private life:number;
    private mana:number;
    private maxLife = 100;
    private maxMana = 100;


    constructor(public game:Phaser.Game, x:number, y:number){
        
        this.initBars(x, y);

    }

      private initBars(x:number, y:number) {

        //lets set the life and mana to maxvalues
        this.life = this.maxLife;
        this.mana = this.maxMana;

        //the size of the bars
        var barHeight:number = 20;
        var barWidth:number = 158;

        //vida
        var bitmapVida = this.game.add.bitmapData(barWidth, barHeight);
        bitmapVida.ctx.beginPath();
        bitmapVida.ctx.rect(0, 0, barWidth, barHeight);
        bitmapVida.ctx.fillStyle = '#e33133';
        bitmapVida.ctx.fill();
        this.lifeBar = this.game.add.sprite(x, y + bitmapVida.height,bitmapVida);
        this.lifeBar.anchor.setTo(1);
        
        //mana
        var bitmapMana = this.game.add.bitmapData(barWidth, barHeight);
        bitmapMana.ctx.beginPath();
        bitmapMana.ctx.rect(0, 0, barWidth, barHeight);
        bitmapMana.ctx.fillStyle = '#0099ff';
        bitmapMana.ctx.fill();
        this.manaBar = this.game.add.sprite(x , y + 25 + bitmapMana.height,bitmapMana);
        this.manaBar.anchor.setTo(1);

        //lets put the bars in it max values 
        this.ResizeBar(this.lifeBar,this.life,this.maxLife);
        this.ResizeBar(this.manaBar,this.mana,this.maxMana);
        
    }

    //devuelve true si el personaje llego a cero vida
    public UpdateLife(addValue:number):boolean {
        //controlo si se murio o no 
        if (this.life > -addValue) {
            this.life = this.UpdateBar(this.lifeBar,this.life,this.maxLife,addValue);
            return false;
        } else {
            this.life = 0;
            return true;
        }

        
    }

    //returns true if we have enough mana 
    public UpdateMana(addValue:number):boolean {

        if (this.mana >= -addValue) {
            this.mana = this.UpdateBar(this.manaBar,this.mana,this.maxMana,addValue);
            return true
        } else {
            return false
        }

    }

        private UpdateBar(bar:Phaser.Sprite,value:number,maxValue:number,addValue:number) {

        console.log("hola")
        //controlo si no se paso del maximo
        if (value + addValue <= maxValue) {
            value += addValue;
        } else {
            value = maxValue;
        }

        this.ResizeBar(bar,value,maxValue);

        return value;
    }
    
    private ResizeBar(bar: Phaser.Sprite,value:number,maxValue:number) {
        this.game.add.tween(bar.scale).to(
             { x: -value / maxValue }, 25, Phaser.Easing.Linear.None, true);
    }


    



}