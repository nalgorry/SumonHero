var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cMonster = (function (_super) {
    __extends(cMonster, _super);
    function cMonster(game, initPos, numPath) {
        _super.call(this, game, 0, 0);
        this.game = game;
        this.monsterPath = []; //here we have all the paths to move the monsters
        this.pathNumber = 0;
        this.loopSpeedNumber = 0;
        this.loopSpeed = 0;
        this.speed = 0.9; //the distance of every point in the path
        this.sprite = this.game.add.sprite(initPos.x, initPos.y);
        this.sprite.anchor.set(0.5);
        //lets create the bug
        var bugSprite = this.game.add.sprite(0, 0, 'bug_01');
        bugSprite.anchor.set(0.5);
        bugSprite.y -= 20;
        this.sprite.addChild(bugSprite);
        this.angularSpeed = this.speed / 20 * 180 / 3.14159;
        cMonster.initPaths();
        this.makePath(cMonster.pathOptions[numPath]);
        this.sprite.x = this.monsterPath[0].x;
        this.sprite.y = this.monsterPath[0].y;
        //to use the update loop
        this.game.add.existing(this);
    }
    //lest create all the posible paths for the monster,
    cMonster.initPaths = function () {
        cMonster.pathOptions[0] = {
            'x': [66, 240, 480, 720, 908],
            'y': [350, 230, 186, 230, 350]
        };
        cMonster.pathOptions[1] = {
            'x': [66, 240, 480, 720, 908],
            'y': [350, 475, 520, 476, 350]
        };
        cMonster.pathOptions[2] = {
            'x': [66, 240, 370, 480, 600, 720, 908],
            'y': [350, 295, 305, 350, 400, 410, 350]
        };
        cMonster.pathOptions[3] = {
            'x': [66, 240, 370, 480, 600, 720, 908],
            'y': [350, 410, 400, 350, 305, 295, 350]
        };
        //create the camcull paths that will be used to create the path of the monster acording it speed.
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
                this.pathNumber = 0;
            }
            this.loopSpeedNumber = 0;
        }
        else {
            this.loopSpeedNumber++;
        }
    };
    cMonster.prototype.makePath = function (points) {
        var _this = this;
        var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
        bmd.addToWorld();
        bmd.clear();
        var x = 1 / this.game.width / 5;
        var totalDistance = 0;
        var acumDist = [];
        var catmullPath = [];
        //lets uses a catmull interpolation to make the path where the monster move
        var n = 0;
        for (var i = 0; i <= 1; i += x) {
            var px = Phaser.Math.catmullRomInterpolation(points.x, i);
            var py = Phaser.Math.catmullRomInterpolation(points.y, i);
            catmullPath.push({ x: px, y: py });
            //lets show all the points of the path
            bmd.rect(px, py, 1, 1, 'rgba(0, 0, 0, 1)');
            //lets calculate the distance of the path
            if (i > 0) {
                totalDistance += Phaser.Math.distance(catmullPath[n - 1].x, catmullPath[n - 1].y, px, py);
            }
            acumDist.push(totalDistance);
            n++;
        }
        //we have the path, but we need to make it so the speed is constant.
        var nPoint = 0; //to check wich point we are doing
        var counter = 0;
        acumDist.forEach(function (distance) {
            if (distance >= _this.speed * nPoint) {
                bmd.rect(catmullPath[counter].x - 3, catmullPath[counter].y - 3, 6, 6, 'rgba(0, 255, 0, 1)');
                nPoint++;
                _this.monsterPath.push(catmullPath[counter]);
            }
            counter++;
        });
        // lets show the point use to make the path
        for (var p = 0; p < points.x.length; p++) {
            bmd.rect(points.x[p] - 3, points.y[p] - 3, 6, 6, 'rgba(255, 0, 0, 1)');
        }
    };
    cMonster.pathOptions = []; // store the points that generate each path
    return cMonster;
}(Phaser.Sprite));
