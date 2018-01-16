var cControlMonsters = (function () {
    function cControlMonsters(game) {
        this.game = game;
        this.showPath = false;
        this.monsterData = []; //to store the data (life, atack, etc)
        this.arrayMonsters = []; //to store all the active monsters
        this.arrayEnemyMonsters = []; //to store all the active monsters
        this.pathCreatePoints = []; // store the points that generate each path
        this.paths = []; //ths actual points of the path
        this.monsterId = 0;
        this.monsterRadius = 20;
        this.initPosiblePaths();
        this.readMonsterData();
        var timer = game.time.create();
        timer.loop(100, this.checkMonsterPostion, this);
        timer.start();
        // this.testMonster(enumPathOptions.up, 500, enumMonstersType.explosion);
    }
    cControlMonsters.prototype.restart = function () {
        //lets destroy all the monsters in the game
        for (var keyMonster in this.arrayMonsters) {
            var monster = this.arrayMonsters[keyMonster];
            monster.destroyMonster();
        }
        ;
        //lets check enemy monsters
        for (var keyMonster in this.arrayEnemyMonsters) {
            var monster = this.arrayEnemyMonsters[keyMonster];
            monster.destroyMonster();
        }
        ;
        this.arrayEnemyMonsters = [];
        this.arrayMonsters = [];
    };
    cControlMonsters.prototype.getEnemyMonsters = function () {
        return this.arrayEnemyMonsters;
    };
    cControlMonsters.prototype.getPlayerMonsters = function () {
        return this.arrayMonsters;
    };
    cControlMonsters.prototype.testMonster = function (pathOption, startPosition, monsterType) {
        var monster = new cMonster(this.game, this.monsterId, this.paths[pathOption], false, startPosition, this.monsterData[monsterType]);
        monster.isAtacking = true;
        var enemyMonster = new cMonster(this.game, this.monsterId, this.paths[pathOption], true, startPosition + 500, this.monsterData[monsterType]);
        enemyMonster.isAtacking = true;
        monster.eMonsterDie.add(this.monsterDie, this);
    };
    cControlMonsters.prototype.readMonsterData = function () {
        var _this = this;
        var phaserJSON = this.game.cache.getJSON('monsterData');
        phaserJSON.monsterData.forEach(function (element) {
            _this.monsterData[element.id] = new cMonsterData(element);
        });
    };
    cControlMonsters.prototype.checkMonsterPostion = function () {
        //check if the monster will enter atack mode 
        this.checkMonstersHit();
        //check if the monster can capture a cristal 
        this.checkCristalCapture();
    };
    cControlMonsters.prototype.checkCristalCapture = function () {
        var _this = this;
        var sharedCristals = this.gameInterface.getSharedCristals();
        //lets check if the monster is in the cristal 
        sharedCristals.forEach(function (cristal) {
            //lets check player monsters
            for (var keyMonster in _this.arrayMonsters) {
                var monster = _this.arrayMonsters[keyMonster];
                var distance = monster.position.distance(cristal.sprite.position);
                if (distance <= 30) {
                    cristal.playerControl = true;
                    break;
                }
                else {
                    cristal.playerControl = false;
                }
            }
            ;
            //lets check enemy monsters
            for (var keyMonster in _this.arrayEnemyMonsters) {
                var monster = _this.arrayEnemyMonsters[keyMonster];
                var distance = monster.position.distance(cristal.sprite.position);
                if (distance <= 30) {
                    cristal.enemyControl = true;
                    break;
                }
                else {
                    cristal.enemyControl = false;
                }
            }
            ;
        });
        //let change the color of the cristal 
        sharedCristals.forEach(function (cristal) {
            if (cristal.playerControl == true && cristal.enemyControl == false) {
                _this.gameInterface.controlCristals.changeCristalColor(cristal, cristalColor.blue_cristal);
            }
            else if (cristal.playerControl == false && cristal.enemyControl == true) {
                _this.gameInterface.controlCristals.changeCristalColor(cristal, cristalColor.red_cristal);
            }
        });
    };
    //this function will control when the monsters colide
    cControlMonsters.prototype.checkMonstersHit = function () {
        var arrayMonsterAtacking = [];
        //lets check the enemies and the enemy heroe first
        for (var keyEnemyMonster in this.arrayEnemyMonsters) {
            var enemy = this.arrayEnemyMonsters[keyEnemyMonster];
            enemy.isAtacking = false;
            //lets check if the monster can atack the player heroe first
            var playerHeroe = this.gameInterface.controlHeroes.heroe;
            var heroeDistance = enemy.position.distance(playerHeroe.position);
            if (heroeDistance <= enemy.data.hitRange) {
                this.activateAtack(arrayMonsterAtacking, enemy, playerHeroe);
            }
        }
        ;
        //lets check if the monster can atack each other
        for (var keyMonster in this.arrayMonsters) {
            var monster = this.arrayMonsters[keyMonster];
            monster.isAtacking = false;
            //lets check if the monster can atack the enemy heroe first
            var enemyHeroe = this.gameInterface.controlHeroes.enemyHeroe;
            var heroeDistance = monster.position.distance(enemyHeroe.position);
            if (heroeDistance <= monster.data.hitRange) {
                this.activateAtack(arrayMonsterAtacking, monster, enemyHeroe);
            }
            //to hit always the closer monster
            var monsterHitDistance = monster.data.hitRange;
            for (var keyEnemyMonster in this.arrayEnemyMonsters) {
                var enemy = this.arrayEnemyMonsters[keyEnemyMonster];
                var enemyHitDistance = enemy.data.hitRange;
                var distance = enemy.position.distance(monster.position);
                //lets check if the monster can atack an enemy
                if (distance <= monsterHitDistance) {
                    this.activateAtack(arrayMonsterAtacking, monster, enemy);
                    monsterHitDistance = distance;
                }
                //lets check if the enemy can atack the monster 
                if (distance <= enemyHitDistance) {
                    this.activateAtack(arrayMonsterAtacking, enemy, monster);
                    enemyHitDistance = distance;
                }
            }
            ;
        }
        ;
        //now we resolve the atacks
        for (var _i = 0, arrayMonsterAtacking_1 = arrayMonsterAtacking; _i < arrayMonsterAtacking_1.length; _i++) {
            var monster_1 = arrayMonsterAtacking_1[_i];
            monster_1.resolveAtack(monster_1.monsterAtacked);
        }
    };
    //activate the atack mode of the monster 
    cControlMonsters.prototype.activateAtack = function (arrayMonsterAtacking, monster, enemyHit) {
        if (monster.isAtacking == false) {
            arrayMonsterAtacking.push(monster);
        }
        monster.monsterAtacked = enemyHit;
        monster.isAtacking = true;
    };
    cControlMonsters.prototype.monsterDie = function (monster) {
        //lets delete the monster for the array
        delete this.arrayMonsters["m" + monster.id];
        delete this.arrayEnemyMonsters["m" + monster.id];
    };
    cControlMonsters.prototype.createEnemyMonster = function (pathOption, startPosition, monsterType) {
        //lets copy the path and then reverse it
        var path = this.paths[pathOption].slice();
        path.reverse();
        var monster = this.createMonster(path, startPosition, monsterType, true);
        this.arrayEnemyMonsters["m" + this.monsterId] = monster;
        this.monsterId++;
    };
    cControlMonsters.prototype.createNewMonster = function (pathOption, startPosition, monsterType) {
        var monster = this.createMonster(this.paths[pathOption], startPosition, monsterType, false);
        this.arrayMonsters["m" + this.monsterId] = monster;
        this.monsterId++;
    };
    cControlMonsters.prototype.createMonster = function (arrayPath, startPosition, monsterType, enemyMonster) {
        var monster = new cMonster(this.game, this.monsterId, arrayPath, enemyMonster, startPosition, this.monsterData[monsterType]);
        monster.eMonsterDie.add(this.monsterDie, this);
        monster.eMonsterAreaAtack.add(this.monsterAreaAtack, this);
        return monster;
    };
    //it happens when the moster do a area atack
    cControlMonsters.prototype.monsterAreaAtack = function (monster) {
        var offSet = new Phaser.Point(0, 0);
        switch (monster.data.id) {
            case 5 /* hammer */:
                //lets set the offset where the bug hit!
                var offSet = new Phaser.Point(30 * monster.sprite.scale.x, 0);
            case 2 /* explosion */:
                //lets check wich array we have to uses 
                var array;
                var heroe;
                if (monster.isEnemy == true) {
                    array = this.arrayMonsters;
                    heroe = this.gameInterface.controlHeroes.heroe;
                }
                else {
                    array = this.arrayEnemyMonsters;
                    heroe = this.gameInterface.controlHeroes.enemyHeroe;
                }
                //lets check if the area atack afects the enemy heroe
                var mosterHitPos = new Phaser.Point(offSet.x + monster.x, offSet.y + monster.y);
                var heroeDistance = mosterHitPos.distance(heroe.position);
                if (heroeDistance <= monster.data.hitRange) {
                    heroe.IsHit(monster.data.atack);
                }
                //lets get all the monster afected.
                Object.keys(array).forEach(function (keyEnemyMonster) {
                    var enemy = array[keyEnemyMonster];
                    var mosterHitPos = new Phaser.Point(offSet.x + monster.x, offSet.y + monster.y);
                    ;
                    var distance = mosterHitPos.distance(enemy.position);
                    if (distance <= monster.data.areaHitRange) {
                        enemy.IsHit(monster.data.atack);
                    }
                });
                break;
            default:
                break;
        }
    };
    //lest create all the posible paths for the monster,
    cControlMonsters.prototype.initPosiblePaths = function () {
        var _this = this;
        this.pathCreatePoints[0] = {
            'x': [96, 190, 360, 640, 902, 1082, 1184],
            'y': [340, 250, 160, 115, 160, 250, 340]
        };
        this.pathCreatePoints[1] = {
            'x': [96, 190, 360, 640, 902, 1082, 1184],
            'y': [340, 430, 512, 560, 518, 428, 340]
        };
        this.pathCreatePoints[2] = {
            'x': [96, 190, 360, 530, 640, 750, 902, 1090, 1184],
            'y': [340, 304, 280, 300, 340, 380, 400, 380, 340]
        };
        this.pathCreatePoints[3] = {
            'x': [96, 190, 360, 530, 640, 750, 902, 1090, 1184],
            'y': [340, 370, 400, 380, 340, 300, 280, 300, 340]
        };
        //create the camcull paths that will be used to create the path of the monster acording it speed.
        this.pathCreatePoints.forEach(function (path) {
            _this.makePath(path);
        });
    };
    cControlMonsters.prototype.makePath = function (points) {
        if (this.showPath) {
            var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
            bmd.addToWorld();
            bmd.clear();
        }
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
    //this spell kill two random monsters 
    cControlMonsters.prototype.spellDirectKill = function () {
        //lets get the active monsters 
        var monsters = Object.keys(this.arrayEnemyMonsters);
        //if there is no monster in play we just exit this
        if (monsters.length == 0) {
            return;
        }
        //lets check if there are enougth monsters to kill
        var monsterToKill = 2;
        if (monsters.length < monsterToKill) {
            monsterToKill = monsters.length;
        }
        //lets kill them! MUAJAJA
        console.log(monsterToKill);
        for (var i = 1; i <= monsterToKill; i++) {
            var rnd = this.game.rnd.integerInRange(0, monsters.length - 1);
            var idMonster = monsters[rnd];
            var monster = this.arrayEnemyMonsters[idMonster];
            monster.destroyMonster();
            //we remove the monster kill to avoid kill it twice
            monsters.splice(rnd, 1);
        }
    };
    cControlMonsters.prototype.spellHealMonsters = function () {
        //lets check player monsters
        for (var keyMonster in this.arrayMonsters) {
            var monster = this.arrayMonsters[keyMonster];
            monster.life = monster.data.maxLife;
        }
        ;
    };
    cControlMonsters.prototype.spellShieldMonsters = function (spellData) {
        //lets check player monsters
        for (var keyMonster in this.arrayMonsters) {
            var monster = this.arrayMonsters[keyMonster];
            monster.activateShield(spellData);
        }
        ;
    };
    return cControlMonsters;
}());
