class cControlMonsters {

    public gameInterface:cControlInterface;
    
    private showPath:boolean = false;

    public monsterData:cMonsterData[] = [];
    private arrayMonsters:cMonster[] = []; //to store all the active monsters
    private arrayEnemyMonsters:cMonster[] = []; //to store all the active monsters
    private pathCreatePoints = []; // store the points that generate each path
    private paths:number[][] = []; //ths actual points of the path

    private monsterId:number = 0;

    private monsterRadius = 20;


    constructor(public game:Phaser.Game) {
  
        this.initPosiblePaths();   

        this.readMonsterData();    

        var timer = game.time.create();
        timer.loop(100, this.checkMonstersHit,this)
        timer.start();

        this.testMonster(enumPathOptions.up, 500, enumMonstersType.explosion);

    }

    private testMonster(pathOption:enumPathOptions, startPosition:number, monsterType:enumMonstersType) {
        
        var monster = new cMonster(this.game, this.monsterId, this.paths[pathOption], false, startPosition, this.monsterData[monsterType]);

        monster.isAtacking = true;

        var enemyMonster = new cMonster(this.game, this.monsterId, this.paths[pathOption], true, startPosition + 500, this.monsterData[monsterType]);

        enemyMonster.isAtacking = true;
        
        monster.eMonsterHitHeroe.add(this.monsterHitHeroe, this);
        monster.eMonsterDie.add(this.monsterDie, this);

    }

    private readMonsterData() {

        var phaserJSON = this.game.cache.getJSON('monsterData');

        phaserJSON.monsterData.forEach(element => {
            this.monsterData[element.id] = new cMonsterData(element);
        });

    }

    //this function will control when the monsters colide
    private checkMonstersHit(){

        //lets reset the atack mode of the enemys
        Object.keys(this.arrayEnemyMonsters).forEach(keyEnemyMonster => {
            var enemy:cMonster = this.arrayEnemyMonsters[keyEnemyMonster];

            enemy.isAtacking = false;
        });
        
        //lets check if our monsters can atack the monster of the enemy
        Object.keys(this.arrayMonsters).forEach(keyMonster => {

            var monster:cMonster = this.arrayMonsters[keyMonster];
            
            var monsterPoss:Phaser.Point = monster.position;

            monster.isAtacking = false;

            Object.keys(this.arrayEnemyMonsters).forEach(keyEnemyMonster => {
                
                var enemy:cMonster = this.arrayEnemyMonsters[keyEnemyMonster];

                var enemyPoss:Phaser.Point = enemy.position;
                var distance = enemyPoss.distance(monsterPoss);

                //lets check if the monster can atack an enemy
                if (distance <= monster.data.hitRange) {
                    
                    monster.isAtacking = true;
                    this.resolveAtack(monster, enemy);

                }

                //lets check if the enemy can atack the monster 
                if (distance <= enemy.data.hitRange) {
                    
                    enemy.isAtacking = true;
                    this.resolveAtack(enemy, monster);

                }

            });


        });


    }

    private resolveAtack(atacker:cMonster, defender:cMonster ) {
        
        if (atacker.speedCounter >= atacker.data.atackSpeed) {

            this.monsterAtack(atacker, defender);
            
            atacker.speedCounter = 0;
        } else {

            atacker.speedCounter += 100;
        }

    }

    private monsterAtack(atacker:cMonster, defender:cMonster) {
        
        //lets calculate the damage we will do here, but the actual damage will happend when the animation finish.
        var damage = atacker.data.atack;

        defender.monsterIsHit(damage);

        atacker.monsterAtack(defender);


    }

    private monsterDie(monster:cMonster) {
        
        console.log("entra aca");
        //it can happend that the moster is kill twice
        if(monster != undefined) {

            //lets delete the monster for the array
            delete this.arrayMonsters["m" + monster.id];
            delete this.arrayEnemyMonsters["m" + monster.id];

            //lets delete the monster
            monster.destroyMonster();
        }
    }

     public createEnemyMonster(pathOption:enumPathOptions, monsterType:number) {
        
        //lets copy the path and then reverse it
        var path:any[] = <any>this.paths[pathOption].slice();
        path.reverse();
        var monster = new cMonster(this.game, this.monsterId, path ,true, 0, this.monsterData[monsterType]);
        this.arrayEnemyMonsters["m" + this.monsterId] = monster;
        this.monsterId ++;

        monster.eMonsterHitHeroe.add(this.monsterHitHeroe, this);
        monster.eMonsterDie.add(this.monsterDie, this);

    }
    
    public createNewMonster(pathOption:enumPathOptions, startPosition:number, monsterType:number) {
        
        var monster = new cMonster(this.game, this.monsterId, this.paths[pathOption], false, startPosition, this.monsterData[monsterType]);
        
        this.arrayMonsters["m" + this.monsterId] = monster;
        this.monsterId ++;

        monster.eMonsterHitHeroe.add(this.monsterHitHeroe, this);
        monster.eMonsterDie.add(this.monsterDie, this);

    }

    private monsterHitHeroe(monster: cMonster) {
        
        //we should calculate the damage here? or direct in the monster? mmm
        //may be if i want to use some kind of power that will increise the power it should be here.
         var damage = this.game.rnd.integerInRange(45, 50);

        this.gameInterface.monsterHitHeroe(monster, damage);

        //we delete the monster of the two arrays
        delete this.arrayMonsters["m" + monster.id];
        delete this.arrayEnemyMonsters["m" + monster.id];

    }

    //lest create all the posible paths for the monster,
    private initPosiblePaths() {

        this.pathCreatePoints[0] = {
            'x': [ 66, 240, 480, 720, 908 ],
            'y': [ 350, 230, 186, 230, 350 ]
        };

        this.pathCreatePoints[1] = {
            'x': [ 66, 240, 480, 720, 908 ],
            'y': [ 350, 475, 520, 476, 350 ]
        };

        this.pathCreatePoints[2] = {
            'x': [ 66, 240, 370, 480, 600, 720, 908 ],
            'y': [ 350, 295, 305, 350, 400, 410, 350]
        };

        this.pathCreatePoints[3] = {
            'x': [ 66, 240, 370, 480, 600, 720, 908 ],
            'y': [ 350, 410, 400, 350, 305, 295, 350]
        };

        //create the camcull paths that will be used to create the path of the monster acording it speed.
        this.pathCreatePoints.forEach(path => {
            this.makePath(path);    
        })
        

    }

    private makePath(points) {

        if (this.showPath) {
            var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
            bmd.addToWorld();
            
            bmd.clear();
        }

        var x = 1 / this.game.width / 5;

        var totalDistance:number = 0;

        var catmullPath = [];

        //lets uses a catmull interpolation to make the path where the monster move
        var n:number = 0;
        for (var i = 0; i <= 1; i += x)
        {
            
            var px = Phaser.Math.catmullRomInterpolation(points.x, i);
            var py = Phaser.Math.catmullRomInterpolation(points.y, i);

            catmullPath.push({ x: px, y: py });

            //lets show all the points of the path
            if (this.showPath) {
                bmd.rect(px, py, 1, 1, 'rgba(0, 0, 0, 1)');
            }

            //lets calculate the distance of the path
            if (i > 0) {
                totalDistance += Phaser.Math.distance(catmullPath[n-1].x, catmullPath[n-1].y, px, py);
            }

            n++;
        }

                
        // lets show the point use to make the path
        if (this.showPath) {
            for (var p = 0; p < points.x.length; p++)
            {
                bmd.rect(points.x[p]-3, points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)');
            }
        }

        //lets store the path to use it later
        this.paths.push(catmullPath);

    }


}

