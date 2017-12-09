class cControlShowUpText {

    constructor(public game:Phaser.Game, x:number, y:number, showText:string ) {

        console.log("entra");

        var completeText = this.game.add.sprite(x , y);
        
        //texto que se muestra
        var text = this.game.add.bitmapText(0 , 0 , 'gotic_black', showText, 18);            

        //hago un recuadro blanco abajo del texto
        var rectangleBack = this.game.add.bitmapData(text.width, 20);
        rectangleBack.ctx.beginPath();
        rectangleBack.ctx.rect(0, 0, text.width, 20);
        rectangleBack.ctx.fillStyle = '#ffffff';
        rectangleBack.ctx.fill();

        var textBack = this.game.add.sprite(0, 0, rectangleBack);
        textBack.alpha = 0.6;

        completeText.addChild(textBack);
        completeText.addChild(text);

        var tweenText = this.game.add.tween(completeText).to({y: '-40'}, 1000, Phaser.Easing.Cubic.Out, true);
        tweenText.onComplete.add(this.removeTweenText,completeText);

    }

    removeTweenText(sprite:Phaser.Sprite) {        
        sprite.destroy();        
    }



}