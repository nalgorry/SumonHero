class cControlButton extends Phaser.Sprite {

    public buttonClick:Phaser.Signal;
    private textOption:Phaser.BitmapText;

    public constructor(public game:Phaser.Game, x:number, y:number, text:string) {
        super (game, x, y);
        
        this.createLvlBoton(x,y,text);

        this.buttonClick = new Phaser.Signal();

        game.add.existing(this);
    }

     private createLvlBoton(x:number, y:number, text:string) {
   
        this.textOption = this.game.add.bitmapText(0, 0,  'gotic_white', text , 20);
        this.textOption.anchor.set(0.5);

        //normal state button 
        var bitmapBoton = this.game.add.graphics(-35, -8);
        bitmapBoton.beginFill(0x363636);
        bitmapBoton.lineStyle(2, 0x000000, 1);
        bitmapBoton.drawRect(-(this.textOption.width)/2, -38/2/2, this.textOption.width + 70, 38);
        bitmapBoton.endFill();
        bitmapBoton.alpha = 0.9;

        //onmouseover state button 
        var bitmapBotonOver = this.game.add.graphics(-35, -8);
        bitmapBotonOver.beginFill(0x363636);
        bitmapBotonOver.lineStyle(2, 0xFFFFFF, 1);
        bitmapBotonOver.drawRect(-(this.textOption.width)/2, -38/2/2, this.textOption.width + 70, 38);
        bitmapBotonOver.endFill();
        bitmapBotonOver.alpha = 0.9;
        bitmapBotonOver.visible = false;
        

        //var backGround = this.controlGame.game.add.sprite(-24, -8, bitmapBoton);
        //backGround.alpha = 0.9;

        this.addChild(bitmapBoton);
        this.addChild(bitmapBotonOver);
        this.addChild(this.textOption);

        this.inputEnabled = true;

        this.events.onInputDown.add(this.botonLvlUpDown,this);
        this.events.onInputOver.add(this.botonLvlUpOver,this);
        this.events.onInputOut.add(this.botonLvlUpOut,this);
        
    }

    public botonLvlUpDown (btton:Phaser.Sprite) {
        this.buttonClick.dispatch(this);
    }

    public botonLvlUpOver(button:Phaser.Sprite) {
        this.children[0].visible = false;
        this.children[1].visible = true;

    }

    public botonLvlUpOut(button:Phaser.Sprite) {
        this.children[0].visible = true;
        this.children[1].visible = false;

    }


}