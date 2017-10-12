class cCristals {

    sprite:Phaser.Sprite;
    maxDistance:number = 30;

    constructor(public game:Phaser.Game,
        public x:number, public y:number,
        public color:cristalColor, 
        public pathOption:enumPathOptions) {

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
            var backCircle = this.game.add.graphics(0,0);
            backCircle.beginFill(0x07b215);
            backCircle.drawCircle(0, 0, this.maxDistance * 2);
            
            //lets put the circle in the back
            var sprite = this.sprite;
            sprite.addChild(backCircle);
            sprite.swapChildren(sprite.children[0], sprite.children[1]);
        }

    }

    public turnOffCristal() {
        
        if (this.color == cristalColor.blue_cristal) {
            this.sprite.removeChildAt(0);
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