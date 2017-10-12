class cMonster extends Phaser.Sprite{

    private showPath:boolean = false;

    private monsterPath = []; //here we have all the paths to move the monsters
    private sprite:Phaser.Sprite;
    private pathNumber:number = 0;
    private loopSpeedNumber:number = 0;
    private loopSpeed:number = 0;
    private speed:number = 1.5; //the distance of every point in the path
    private angularSpeed:number;

    constructor (public game:Phaser.Game, initPos:Phaser.Point, path:number[]) {

        super(game, 0, 0)

        this.sprite = this.game.add.sprite(initPos.x, initPos.y);
        this.sprite.anchor.set(0.5);

        //lets create the bug
        var bugSprite = this.game.add.sprite(0, 0, 'bug_01');
        bugSprite.anchor.set(0.5);
        bugSprite.y -= 20;

        this.sprite.addChild(bugSprite);

        this.angularSpeed = this.speed / 20 * 180 / 3.14159;

        //lets define the path it will follow
        this.makePathConstantSpeed(path);

        this.sprite.x = this.monsterPath[0].x;
        this.sprite.y = this.monsterPath[0].y;

        //to use the update loop
        this.game.add.existing(this);

    }

    private makePathConstantSpeed(path) {

        var distance:number = 0;
        //we have the path, but we need to make it so the speed is constant.

        //to draw the path
        var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
        bmd.addToWorld();
        
        bmd.clear();

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
        this.destroy();

        this.sprite.destroy();
    }


    public update() {

        //lets control if we have to update the movement
        if (this.loopSpeedNumber == this.loopSpeed) {

            //lets move the monster
            this.sprite.x = this.monsterPath[this.pathNumber].x;
            this.sprite.y = this.monsterPath[this.pathNumber].y;

            this.pathNumber++;

            //lets rotate the monster acording it speed
            var bug = <Phaser.Sprite>this.sprite.children[0]; //to avoid the error angle is not defined
            bug.angle += this.angularSpeed;


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