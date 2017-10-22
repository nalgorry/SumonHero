var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cMonster = (function (_super) {
    __extends(cMonster, _super);
    function cMonster(game, id, path, isEnemy, startPoss) {
        _super.call(this, game, 0, 0);
        this.game = game;
        this.id = id;
        this.isEnemy = isEnemy;
        this.showPath = false;
        this.monsterPath = []; //here we have all the paths to move the monsters
        this.pathNumber = 0;
        this.loopSpeedNumber = 0;
        this.loopSpeed = 0;
        this.speed = 1; //the distance of every point in the path
        //left define the start position of the monster, base on the path selected
        path = path.slice(-path.length + startPoss);
        this.sprite = this.game.add.sprite(path[0].x, path[0].y);
        this.sprite.anchor.set(0.5);
        //lets create the bug
        var bugSprite = this.game.add.sprite(0, 0, 'bugs', 0);
        bugSprite.anchor.set(0.5);
        bugSprite.y -= 20;
        this.sprite.addChild(bugSprite);
        //lets make it rotate!
        if (this.isEnemy == false) {
            this.angularSpeed = this.speed / 20 * 180 / 3.14159;
        }
        else {
            this.angularSpeed = -this.speed / 20 * 180 / 3.14159;
            bugSprite.scale.y *= -1;
        }
        //lets define the path it will follow
        this.makePathConstantSpeed(path);
        this.sprite.x = this.monsterPath[0].x;
        this.sprite.y = this.monsterPath[0].y;
        //to control the events of the monster
        this.eMonsterHitHeroe = new Phaser.Signal();
        //to use the update loop
        this.game.add.existing(this);
    }
    cMonster.prototype.makePathConstantSpeed = function (path) {
        var _this = this;
        var distance = 0;
        //we have the path, but we need to make it so the speed is constant.
        //to draw the path
        var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
        bmd.addToWorld();
        bmd.clear();
        var n = 0;
        //we make an array of the point that will follow the sprite animation
        path.forEach(function (point) {
            if (distance >= _this.speed) {
                if (_this.showPath) {
                    bmd.rect(point.x - 3, point.y - 3, 6, 6, 'rgba(0, 255, 0, 1)');
                }
                _this.monsterPath.push(path[n]);
                distance = 0;
            }
            else {
                if (n > 0) {
                    distance += Phaser.Math.distance(path[n - 1].x, path[n - 1].y, point.x, point.y);
                }
            }
            n++;
        });
    };
    cMonster.prototype.monsterHitHeroe = function () {
        this.destroyMonster();
        //lets inform that this happend
        this.eMonsterHitHeroe.dispatch(this);
    };
    cMonster.prototype.destroyMonster = function () {
        this.destroy();
        this.sprite.destroy();
    };
    cMonster.prototype.update = function () {
        //lets control if we have to update the movement
        if (this.loopSpeedNumber == this.loopSpeed) {
            //lets move the monster
            this.sprite.x = this.monsterPath[this.pathNumber].x;
            this.sprite.y = this.monsterPath[this.pathNumber].y;
            this.pathNumber++;
            //lets rotate the monster acording it speed
            var bug = this.sprite.children[0]; //to avoid the error angle is not defined
            bug.angle += this.angularSpeed;
            //lets check if the movement have finish!
            if (this.pathNumber >= this.monsterPath.length) {
                this.monsterHitHeroe();
            }
            this.loopSpeedNumber = 0;
        }
        else {
            this.loopSpeedNumber++;
        }
    };
    return cMonster;
}(Phaser.Sprite));
