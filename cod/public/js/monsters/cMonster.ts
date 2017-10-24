class cMonster extends Phaser.Sprite{

    private showPath:boolean = false;

    private monsterPath = []; //here we have all the paths to move the monsters
    private pathNumber:number = 0;
    private loopSpeedNumber:number = 0;
    private loopSpeed:number = 0;
    private speed:number; //the distance of every point in the path
    private life:number;
    
    //to control monster atacks
    public speedCounter:number = 0;
    public isAtacking:boolean = false;

    public eMonsterHitHeroe:Phaser.Signal;
    public eMonsterDie:Phaser.Signal;

    constructor (public game:Phaser.Game, 
        public id:number,
        path:any[], 
        public isEnemy:boolean,
        startPoss:number,
        public data:cMonsterData) {

        super(game, 0, 0)
        
        //left define the start position of the monster, base on the path selected
        path = <any>path.slice(-path.length + startPoss);

        this.x = path[0].x;
        this.y = path[0].y;
        this.anchor.set(0.5);

        //lets create the bug
        var bugSprite = this.game.add.sprite(0, 0, 'bugs', data.tilePoss);
        bugSprite.anchor.set(0.5);
        bugSprite.y -= 20;

        this.addChild(bugSprite);

        //lets create the weapon MUAJAJA (evil laugh)
        var weaponSprite = this.game.add.sprite(data.weaponX, data.weaponY, 'items', data.weaponTilePoss);
        weaponSprite.anchor.set(0.5);

        this.addChild(weaponSprite);

        //lets define for now the speed of the monster
        this.speed = this.data.maxSpeed;
        this.life = this.data.maxLife;

        //lets make it rotate!
        if (this.isEnemy == false) {
            
        } else {
           // this.scale.x *= -1;
        }

        //lets define the path it will follow
        this.makePathConstantSpeed(path);

        this.x = this.monsterPath[0].x;
        this.y = this.monsterPath[0].y;

        //to control the events of the monster
        this.eMonsterHitHeroe = new Phaser.Signal();
        this.eMonsterDie = new Phaser.Signal();
        
        //to use the update loop
        this.game.add.existing(this);

    }

    private makePathConstantSpeed(path) {

        var distance:number = 0;
        //we have the path, but we need to make it so the speed is constant.

        //to draw the path
        if (this.showPath) {
            var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
            bmd.addToWorld();
            
            bmd.clear();
        }

        var n = 0;
        //we make an array of the point that will follow the sprite animation
        path.forEach(point => {
             
             if (distance  >= this.speed) {
                
                if (this.showPath) {
                    bmd.rect(point.x - 3, point.y - 3, 6, 6, 'rgba(0, 255, 0, 1)');
                }
                
                this.monsterPath.push(path[n]);
                distance = 0;

             } else {
                if (n > 0) {
                    distance += Phaser.Math.distance(path[n-1].x, path[n-1].y, point.x, point.y);
                }
             }

             n ++;
            
        });

    }

    private monsterHitHeroe() {
        
        this.destroyMonster();
        //lets inform that this happend
        this.eMonsterHitHeroe.dispatch(this);
    }

    public destroyMonster() {
        this.destroy(true);
        this.destroy(true);
    }

    public monsterIsHit(damage:number) {


        this.life -= damage;

        console.log(damage);

        //lets check if the monster is dead!
        if (this.life <= 0) {
            this.eMonsterDie.dispatch(this);
        }

    }

    public update() {

        //lets control if we have to update the movement
        if (this.isAtacking == false) {
            if (this.loopSpeedNumber == this.loopSpeed) {

                //lets move the monster
                this.x = this.monsterPath[this.pathNumber].x;
                this.y = this.monsterPath[this.pathNumber].y;

                this.pathNumber++;

                //lets check if the movement have finish!
                if (this.pathNumber >= this.monsterPath.length) {
                    this.monsterHitHeroe()
                }

                this.loopSpeedNumber = 0

            } else {

                this.loopSpeedNumber++;

            }
        }

    }


}