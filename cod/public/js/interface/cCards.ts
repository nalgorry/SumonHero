class cCards {

    public sprite:Phaser.Sprite;
    public eventDragStart:Phaser.Signal;
    public eventDragStop:Phaser.Signal;

    private cardWidth:number = 60;
    private cardHeight:number = 90 

    constructor(public game:Phaser.Game, 
        public x:number,
        public y:number, 
        public monsterData:cMonsterData) {

        //properties of the cards
        var cardColor = 0x9eb3c1; 
        var lineColor = 0x215072;
        var manaBackColor = 0xADDDED;

        var cardWidth:number = 80;
        var cardHeight:number = 120;
        
        this.sprite = this.game.add.sprite(x, y);
        this.sprite.anchor.set(0.5);
        
        this.sprite.inputEnabled = true;
        //this.sprite.events.onInputUp.add(this.floorItemClick,this)

        var backCircle = this.game.add.graphics(0,0);
        backCircle.beginFill(cardColor);
        backCircle.lineStyle(1, lineColor);
        backCircle.drawRect(0, 0, cardWidth, cardHeight);

        this.sprite.input.enableDrag();

        this.sprite.events.onDragStart.add(this.onDragStart, this);
        this.sprite.events.onDragStop.add(this.onDragStop, this);
        this.sprite.events.onInputOver.add(this.onInputOver,this);
        this.sprite.events.onInputOut.add(this.onInputOut,this);

        //lets activate the events that will be use to inform what is happening with each card
        this.eventDragStart = new Phaser.Signal();
        this.eventDragStop = new Phaser.Signal();

        this.sprite.addChild(backCircle);

        //lets add the picture of the bug in the card
        var bugSprite = this.game.add.sprite(cardWidth/2, 80, 'bugs', monsterData.tilePoss );
        bugSprite.anchor.set(0.5)
        
        this.sprite.addChild(bugSprite);

        var weaponSprite = this.game.add.sprite(monsterData.weaponX, monsterData.weaponY + 20, 'items', monsterData.weaponTilePoss);
        weaponSprite.anchor.set(0, 1);
        if (monsterData.weaponAngle != undefined) {
            weaponSprite.angle = monsterData.weaponAngle;
            console.log("entra");
        }

        bugSprite.addChild(weaponSprite);

        //lets put the mana cost now! (wow so great)
        var backMana = this.game.add.graphics(cardWidth / 2, 8);
        backMana.beginFill(manaBackColor);
        backMana.lineStyle(1, lineColor);
        backMana.drawRect(0, 0, 25, 25);
        backMana.angle = 45;
        backMana.pivot.set(0.5, 0.5);
        this.sprite.addChild(backMana);
        //and now the number!,

        var textMana = this.game.add.bitmapText(cardWidth/2, 22, 'gotic_black', this.monsterData.manaCost.toString() , 18)
        textMana.anchor.set(0.5);

        this.sprite.addChild(textMana);
        
    }

    private onDragStart() {
        this.eventDragStart.dispatch(this);
    }

    private onDragStop() {
        this.eventDragStop.dispatch(this);
        
        //lets restore the card original poss
        this.sprite.x = this.x ;
        this.sprite.y = this.y;

    }

    private onInputOver() {

    }

    private onInputOut() {

    }

    public checkMana(mana:Number) {
        
        if (mana >= this.monsterData.manaCost) {
            var cardEnabled = this.game.add.tween(this.sprite).to( { alpha: 1}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
        } else {
            var cardEnabled = this.game.add.tween(this.sprite).to( { alpha: 0.3}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
        }

    }

    public getCenter():Phaser.Point {
        var poss = new Phaser.Point(this.sprite.x + this.cardWidth/2, this.sprite.y + this.cardHeight/2);

        return poss;
    }


}