class cBasicHeroe extends cBasicActor{

    private bugSprite:Phaser.Sprite;
    private weaponSprite:Phaser.Sprite;
    private orientation:heroeOrientation;
    private atackDistance = 220;
    private heroeAtack = 5;
    public playerHit:Phaser.Signal;

    constructor (public game:Phaser.Game, initPos:Phaser.Point, orientation:heroeOrientation) {

        super(game, 0, 0);

        this.orientation = orientation;
        this.playerHit = new Phaser.Signal;
        this.life = 100;

        this.initHeroes(initPos, orientation);

    }

     public initHeroes(initPos:Phaser.Point, orientation:heroeOrientation) {

        //lets create the heroe
        this.sprite = this.game.add.sprite(0, 0);
        this.addChild(this.sprite);
        this.position.set(initPos.x, initPos.y);
        this.game.add.existing(this);


        //lets create the bug
        this.bugSprite = this.game.add.sprite(0, 0, 'bugs', 15);
        this.bugSprite.anchor.set(0.5);
        this.bugSprite.y -= 20;

        this.sprite.addChild(this.bugSprite);

        //lets create the weapon MUAJAJA (evil laugh)
        this.weaponSprite = this.game.add.sprite(-5, 20, 'items', 15);
        this.weaponSprite.anchor.set(0, 1);
        this.bugSprite.addChild(this.weaponSprite);

        if (orientation == heroeOrientation.enemyHeroe) {
            this.bugSprite.scale.x = -1;
        }

    }

    //atack the closest monster in range
    public atack(arrayEnemyMonsters:cMonster[]) {
        
        var monsterToAtack:cMonster;

        var closestDistance:number = this.atackDistance;
        
        for  (let idMonster in arrayEnemyMonsters) {

            var monster = arrayEnemyMonsters[idMonster];
            
            var distance = this.position.distance(monster.position);

            if (distance <= closestDistance) {

                closestDistance = distance;
                monsterToAtack = monster;

            }
            
        }

        if (monsterToAtack != undefined) {
            //lets create the proyectile
            var arrow = new cControlSpellAnim(this.game, this, monsterToAtack, enumRayAnimations.ray,0);

            arrow.evenAnimationFinish.add(this.monsterHit,this, null, monsterToAtack, null, monsterToAtack);
        }

    }

    private monsterHit(sprite, tween, defender:cMonster) {
        //lets calculate the damage we will do here, but the actual damage will happend when the animation finish.
        var damage = this.heroeAtack;

        defender.IsHit(damage);
        
    }

    public IsHit(damage:number) {

        this.life -= damage;

        this.playerHit.dispatch(damage);

    }

    public animateSpell() {

        var tween1 = this.game.add.tween(this.weaponSprite).to({y: this.weaponSprite.y -  15, angle: -15}, 1000, Phaser.Easing.Cubic.Out, true);
        var tween2 = this.game.add.tween(this.weaponSprite).to({y: this.weaponSprite.y, angle: 0 }, 500, Phaser.Easing.Linear.None, false);

        tween1.chain(tween2);
    }
    
}