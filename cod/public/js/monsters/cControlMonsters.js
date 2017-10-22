var cControlMonsters = (function () {
    function cControlMonsters(game) {
        this.game = game;
        this.showPath = false;
        this.arrayMonsters = []; //to store all the active monsters
        this.arrayEnemyMonsters = []; //to store all the active monsters
        this.pathCreatePoints = []; // store the points that generate each path
        this.paths = []; //ths actual points of the path
        this.monsterId = 0;
        this.monsterRadius = 20;
        this.initPosiblePaths();
        this.readMonsterData();
        this.createEnemyMonster(0 /* up */);
        var timer = game.time.create();
        timer.loop(100, this.checkMonstersHit, this);
        timer.start();
    }
    cControlMonsters.prototype.readMonsterData = function () {
        var phaserJSON = this.game.cache.getJSON('monsterData');
        console.log(phaserJSON);
    };
    //this function will control when the monsters colide
    cControlMonsters.prototype.checkMonstersHit = function () {
        var _this = this;
        //lets check if monster colides each other 
        this.arrayMonsters.forEach(function (monster) {
            var monsterPoss = monster.sprite.position;
            _this.arrayEnemyMonsters.forEach(function (enemy) {
                var enemyPoss = enemy.sprite.position;
                var distance = enemyPoss.distance(monsterPoss);
                if (distance <= _this.monsterRadius) {
                    monster.destroyMonster();
                    enemy.destroyMonster();
                    delete _this.arrayMonsters[monster.id];
                    delete _this.arrayEnemyMonsters[enemy.id];
                }
            });
        });
    };
    cControlMonsters.prototype.createEnemyMonster = function (pathOption) {
        //lets copy the path and then reverse it
        var path = this.paths[pathOption].slice();
        path.reverse();
        var monster = new cMonster(this.game, this.monsterId, path, true, 0);
        this.arrayEnemyMonsters[this.monsterId] = monster;
        this.monsterId++;
        monster.eMonsterHitHeroe.add(this.monsterHitHeroe, this);
    };
    cControlMonsters.prototype.createNewMonster = function (pathOption, startPosition) {
        var monster = new cMonster(this.game, this.monsterId, this.paths[pathOption], false, startPosition);
        this.arrayMonsters[this.monsterId] = monster;
        this.monsterId++;
        monster.eMonsterHitHeroe.add(this.monsterHitHeroe, this);
    };
    cControlMonsters.prototype.monsterHitHeroe = function (monster) {
        //we should calculate the damage here? or direct in the monster? mmm
        //may be if i want to use some kind of power that will increise the power it should be here.
        var damage = this.game.rnd.integerInRange(20, 50);
        this.gameInterface.monsterHitHeroe(monster, damage);
        //we delete the monster of the two arrays
        delete this.arrayMonsters[monster.id];
        delete this.arrayEnemyMonsters[monster.id];
    };
    //lest create all the posible paths for the monster,
    cControlMonsters.prototype.initPosiblePaths = function () {
        var _this = this;
        this.pathCreatePoints[0] = {
            'x': [66, 240, 480, 720, 908],
            'y': [350, 230, 186, 230, 350]
        };
        this.pathCreatePoints[1] = {
            'x': [66, 240, 480, 720, 908],
            'y': [350, 475, 520, 476, 350]
        };
        this.pathCreatePoints[2] = {
            'x': [66, 240, 370, 480, 600, 720, 908],
            'y': [350, 295, 305, 350, 400, 410, 350]
        };
        this.pathCreatePoints[3] = {
            'x': [66, 240, 370, 480, 600, 720, 908],
            'y': [350, 410, 400, 350, 305, 295, 350]
        };
        //create the camcull paths that will be used to create the path of the monster acording it speed.
        this.pathCreatePoints.forEach(function (path) {
            _this.makePath(path);
        });
    };
    cControlMonsters.prototype.makePath = function (points) {
        var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
        bmd.addToWorld();
        bmd.clear();
        var x = 1 / this.game.width / 5;
        var totalDistance = 0;
        var catmullPath = [];
        //lets uses a catmull interpolation to make the path where the monster move
        var n = 0;
        for (var i = 0; i <= 1; i += x) {
            var px = Phaser.Math.catmullRomInterpolation(points.x, i);
            var py = Phaser.Math.catmullRomInterpolation(points.y, i);
            catmullPath.push({ x: px, y: py });
            //lets show all the points of the path
            if (this.showPath) {
                bmd.rect(px, py, 1, 1, 'rgba(0, 0, 0, 1)');
            }
            //lets calculate the distance of the path
            if (i > 0) {
                totalDistance += Phaser.Math.distance(catmullPath[n - 1].x, catmullPath[n - 1].y, px, py);
            }
            n++;
        }
        // lets show the point use to make the path
        if (this.showPath) {
            for (var p = 0; p < points.x.length; p++) {
                bmd.rect(points.x[p] - 3, points.y[p] - 3, 6, 6, 'rgba(255, 0, 0, 1)');
            }
        }
        //lets store the path to use it later
        this.paths.push(catmullPath);
    };
    return cControlMonsters;
}());
