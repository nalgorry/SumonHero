class cCristals {

    sprite:Phaser.Sprite;
    sprite_back_circle:Phaser.Sprite;
    maxDistance:number = 30;

    public playerControl:boolean;
    public enemyControl:boolean;

    constructor(public game:Phaser.Game,
        public x:number, public y:number,
        public color:cristalColor, 
        public pathOption:enumPathOptions,
        public monsterStartPoss:number,
        public cristalType:enumCristalType) {

        //lets create the cristal
        this.sprite = this.game.add.sprite(x, y);
        this.sprite.anchor.set(0.5);

        var cristalSprite = this.game.add.sprite(0, 0, cristalColor[color]);
        cristalSprite.anchor.set(0.5);
        this.sprite.addChild(cristalSprite);

        //lets add the events to detect when we are over a cristal
        this.sprite.inputEnabled = true;

        this.sprite.events.onInputOver.add(this.mouseOver,this);
        this.sprite.events.onInputOut.add(this.mouseOut,this);

    }

    private mouseOut() {
        
    }

    private mouseOver() {


    }

    public lightBlueCristal() {

        if (this.color == cristalColor.blue_cristal) {
            
                this.makeCircle();

        }

    }

    private makeCircle() {
        var backCircle = this.game.add.graphics(0,0);
        backCircle.beginFill(0x0d5118);
        backCircle.drawEllipse(0, 15, this.maxDistance, this.maxDistance * 0.8);

        //lets put the circle in the back
        this.sprite_back_circle = this.game.add.sprite(0, 0);
        this.sprite_back_circle.anchor.set(0.5);
        this.sprite_back_circle.alpha = 0.6;
        this.sprite_back_circle.addChild(backCircle);
        
        this.sprite.addChild(this.sprite_back_circle);
        this.sprite.swapChildren(this.sprite.children[0],this.sprite.children[1])
        
        //lets add some really cool animation
        this.sprite_back_circle.scale.set(0.8);
        var tweenA = this.game.add.tween(this.sprite_back_circle.scale).to( { x: 1, y: 1 }, 800, Phaser.Easing.Cubic.Out ,true);
        var tweenB = this.game.add.tween(this.sprite_back_circle.scale).to( { x: 0.8, y: 0.8 }, 800, Phaser.Easing.Cubic.In ,false);

        tweenA.chain(tweenB);
        tweenB.chain(tweenA);
    }

    public turnOffCristal() {
        
        if (this.sprite_back_circle != undefined) {
            this.sprite_back_circle.destroy();
        }

    }

    //check if a card was drop over a cristal
    public checkDistance():boolean {

        //first we check if the cristal is blue, if not we just leave
        if (this.color !=cristalColor.blue_cristal) { return false }

        //the poin1 is the mouse poss
        var point1 = this.game.input.activePointer.position;
        var point2 = new Phaser.Point(this.sprite.x, this.sprite.y);

        var distance = point1.distance(point2);

        if (distance <= this.maxDistance) {
            return true
        } else {
            return false
        }

    }

}

enum cristalColor {
    blue_cristal,
    red_cristal,
    white_cristal
}