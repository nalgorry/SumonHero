enum enumRayAnimations {
    ray,
    arrow,
    fireball,
    ninjaStar,
}

class cControlSpellAnim {

    evenAnimationFinish:Phaser.Signal;

    constructor(public game: Phaser.Game, 
            spriteFrom:Phaser.Sprite, 
            public spriteTo:Phaser.Sprite, 
            rayAnimationType:enumRayAnimations,
            public spellDamage: number = 0,
            color:number = 0x000000,
            fromOfset:Phaser.Point = null, 
            toOfset:Phaser.Point = null) {

                //lets iniciate the events
                this.evenAnimationFinish = new Phaser.Signal;

                //lets check if we have to do a ray 
                if (spriteFrom != null && rayAnimationType != undefined) {

                    //lets see wich ray we have to do 
                    switch (rayAnimationType) {
                        case enumRayAnimations.arrow:
                            var ray3 = new cControlArrow(game,spriteFrom,spriteTo);
                            ray3.finish.add(this.rayFinish,this);
                            break;
                        case enumRayAnimations.fireball:
                            var ray = new cControlMissile(game,spriteFrom,spriteTo,'fireball',false,250,5);
                            ray.finish.add(this.rayFinish,this);
                            break;
                        case enumRayAnimations.ninjaStar:
                            var ray = new cControlMissile(game,spriteFrom,spriteTo,'ninja_star',true,400,30);
                            ray.finish.add(this.rayFinish,this);
                            break;
                        case enumRayAnimations.ray:
                            var ray2 = new cControlRay(game,spriteFrom,spriteTo, color,
                                fromOfset, toOfset);
                            ray2.finish.add(this.rayFinish,this);
                            break;
                    
                        default:
                            break;
                    }

                }
                else  {
                    this.rayFinish();
                }


                
    }

    public rayFinish() {
        this.evenAnimationFinish.dispatch();
        this.showDamageText();

     }

 
    private showDamageText() {
        //texto con el daño
        if (this.spellDamage == 0 || this.spellDamage == undefined) { return }

        if (this.spellDamage > 0) { //daño real 
            var styleHit = { font: "18px Arial", fill: "#750303", fontWeight: 900 }
        } else { //curacción
            var styleHit = { font: "18px Arial", fill: "#113d01", fontWeight: 900 }
            this.spellDamage = -this.spellDamage;
        };

        var completeText = this.game.add.sprite(0 , -40);
        
        //texto que se muestra
        var hitText = this.game.add.text(0,0, this.spellDamage.toString(), styleHit);            

        //hago un recuadro blanco abajo del texto
        var rectangleBack = this.game.add.bitmapData(hitText.width, 20);
        rectangleBack.ctx.beginPath();
        rectangleBack.ctx.rect(0, 0, hitText.width, 20);
        rectangleBack.ctx.fillStyle = '#ffffff';
        rectangleBack.ctx.fill();

        var textBack = this.game.add.sprite(0, 0, rectangleBack);
        textBack.alpha = 0.6;

        completeText.addChild(textBack);
        completeText.addChild(hitText);
        
        this.spriteTo.addChild(completeText);

        var tweenText = this.game.add.tween(completeText).to({y: '-40'}, 1000, Phaser.Easing.Cubic.Out, true);
        tweenText.onComplete.add(this.removeTweenText,completeText);
    
    }

    removeTweenText(sprite:Phaser.Sprite) {        
        sprite.destroy();        
    }




}