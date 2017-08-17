var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cMonster = (function (_super) {
    __extends(cMonster, _super);
    function cMonster(game, initPos) {
        _super.call(this, game, 0, 0);
        this.game = game;
        this.paths = []; //here we have all the paths to move the monsters
        //lets test the monster
        this.sprite = this.game.add.sprite(initPos.x, initPos.y, 'monster_01');
        this.sprite.scale.set(0.9);
        this.sprite.anchor.set(0.5, 1);
        this.initPaths();
        console.log(this.paths);
        this.sprite.x = this.paths[0][0].x;
        this.sprite.y = this.paths[0][0].y;
    }
    cMonster.prototype.initPaths = function () {
        var points = {
            'x': [66, 240, 480, 720, 908],
            'y': [350, 230, 186, 230, 346]
        };
        this.makePath(points);
    };
    cMonster.prototype.makePath = function (points) {
        var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
        bmd.addToWorld();
        bmd.clear();
        var x = 1 / this.game.width;
        this.paths[0] = [];
        for (var i = 0; i <= 1; i += x) {
            var px = Phaser.Math.catmullRomInterpolation(points.x, i);
            var py = Phaser.Math.catmullRomInterpolation(points.y, i);
            this.paths[0].push({ x: px, y: py });
            bmd.rect(px, py, 1, 1, 'rgba(0, 0, 0, 1)');
        }
        for (var p = 0; p < points.x.length; p++) {
            bmd.rect(points.x[p] - 3, points.y[p] - 3, 6, 6, 'rgba(255, 0, 0, 1)');
        }
    };
    return cMonster;
}(Phaser.Sprite));
