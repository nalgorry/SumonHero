class cCards {

    public sprite:Phaser.Sprite;
    public eventDragStart:Phaser.Signal;
    public eventDragStop:Phaser.Signal;

    public manaCost:number = 50 //the cost of the card in mana 

    constructor(public game:Phaser.Game, public x:number,public y:number ) {
        
        this.sprite = this.game.add.sprite(x, y);
        
        this.sprite.inputEnabled = true;
        //this.sprite.events.onInputUp.add(this.floorItemClick,this)

        var cardColor = 0x0000FF; 

        var backCircle = this.game.add.graphics(0,0);
        backCircle.beginFill(cardColor);
        backCircle.drawRect(0, 0, 60,90);

        this.sprite.input.enableDrag();

        this.sprite.events.onDragStart.add(this.onDragStart, this);
        this.sprite.events.onDragStop.add(this.onDragStop, this);
        this.sprite.events.onInputOver.add(this.onInputOver,this);
        this.sprite.events.onInputOut.add(this.onInputOut,this);

        //lets activate the events that will be use to inform what is happening with each card
        this.eventDragStart = new Phaser.Signal();
        this.eventDragStop = new Phaser.Signal();

        this.sprite.addChild(backCircle);

        //var itemSprite = this.game.add.sprite();
        //this.sprite.addChild(itemSprite);

    }

    private onDragStart() {
        console.log("empieza");
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


}