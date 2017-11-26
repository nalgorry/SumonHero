class cMonster extends cBasicActor{

    private showPath:boolean = false;

    private monsterPath = []; //here we have all the paths to move the monsters
    private pathNumber:number = 0;
    private loopSpeedNumber:number = 0;
    private loopSpeed:number = 0;
    private speed:number; //the distance of every point in the path

    private bugSprite:Phaser.Sprite;
    private weaponSprite:Phaser.Sprite;
    
    public isDead:boolean = false; //to control if a spell hit after the monster die.
    public monsterAtacked:cBasicActor;
    
    //to control monster atacks
    public speedCounter:number = 0;
    public isAtacking:boolean = false;

    //to control the walk animations
    public isMoving:boolean = false;

    public weaponAnimation1:Phaser.Tween;
    public weaponAnimation2:Phaser.Tween;


    public eMonsterHitHeroe:Phaser.Signal;
    public eMonsterDie:Phaser.Signal;
    public eMonsterAreaAtack:Phaser.Signal;

    

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

        //all the sprites that generates the bug
        this.sprite =  this.game.add.sprite(0, 0)
        this.addChild(this.sprite);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.monsterClick, this)

        //lets create the bug
        this.bugSprite = this.game.add.sprite(0, 0, 'bugs', data.tilePoss);
        this.bugSprite.anchor.set(0.5);
        this.bugSprite.y -= 20;

        this.sprite.addChild(this.bugSprite);

        //lets create the weapon MUAJAJA (evil laugh)
        this.weaponSprite = this.game.add.sprite(data.weaponX, data.weaponY, 'items', data.weaponTilePoss);
        this.weaponSprite.anchor.set(0, 1);

        this.sprite.addChild(this.weaponSprite);

        //lets define for now the speed of the monster
        this.speed = this.data.maxSpeed;
        this.life = this.data.maxLife;

        //lets make it rotate!
        if (this.isEnemy == false) {
            
        } else {
           this.sprite.scale.x *= -1;
        }

        //lets define the path it will follow
        this.makePathConstantSpeed(path);

        this.x = this.monsterPath[0].x;
        this.y = this.monsterPath[0].y;

        //to control the events of the monster
        this.eMonsterHitHeroe = new Phaser.Signal();
        this.eMonsterDie = new Phaser.Signal();
        this.eMonsterAreaAtack = new Phaser.Signal();
        
        //to use the update loop
        this.game.add.existing(this);

    }

    private monsterClick() {
        //this.monsterAtack(this);
        console.log(this.life);
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

    public monsterAtack(defender:cBasicActor) {
        
        switch (this.data.atackType) {
            case enumAtackType.range:
                
                this.animateArrow(defender);

                break;
                case enumAtackType.sword:

                this.animateSwordAtack(defender);

                break
                case enumAtackType.explosion:
                this.animateExplosion();

            default:
                break;
        }

    }

    private animateArrow(defender:cBasicActor) {
        //lets create the proyectile
        var arrow = new cControlSpellAnim(this.game, this, defender, enumRayAnimations.arrow,0);

        arrow.evenAnimationFinish.add(this.monsterHit,this, null, defender, null, defender);
    }

    private animateExplosion() {

        //lets make this monster explote only once
        if (this.isDead == false) {

            var ori = this.sprite.scale.x;
            var boomSprite = this.game.add.sprite(this.x + 30 * ori, this.y - 30, 'bombexploding')
            boomSprite.anchor.set(0.5);

            var animation = boomSprite.animations.add('boom');

            animation.play(15, false, true);

            animation.onComplete.add(this.boomExplote,this)

            this.isDead = true;
        }

    }

    private boomExplote() {
        
        //lets kill the character that drop the boom
        this.destroyMonster();
        this.eMonsterAreaAtack.dispatch(this)

    }

    private animateSwordAtack(defender:cBasicActor) {
        
        var animSpeed = 200;

        //to control the orientacion of animations
        var ori:number = this.sprite.scale.x

        //the animations for the character 
        var animation1 = this.game.add.tween(this.sprite)
        animation1.to( { x: 20 * ori}, animSpeed, Phaser.Easing.Linear.None, true);

        var animation2 = this.game.add.tween(this.sprite)
        animation2.to( { x: 0}, animSpeed, Phaser.Easing.Linear.None, false);

        animation1.chain(animation2);

        //the animations for the sword
        var swordAnimation1 = this.game.add.tween(this.weaponSprite).to( 
            { angle: -90 }, 100, Phaser.Easing.Linear.None, true);

        var swordAnimation2 = this.game.add.tween(this.weaponSprite).to( 
            { angle: 45 }, 100, Phaser.Easing.Linear.None, false);
        
        var swordAnimation3 = this.game.add.tween(this.weaponSprite).to( 
            { angle: 0}, 100, Phaser.Easing.Linear.None, false);

        swordAnimation1.chain(swordAnimation2);
        swordAnimation2.chain(swordAnimation3);

        swordAnimation3.onComplete.add(this.monsterHit, this, null, defender);

    }

    private monsterHit(sprite, tween, defender:cBasicActor) {
        //lets calculate the damage we will do here, but the actual damage will happend when the animation finish.
        var damage = this.data.atack;

        defender.IsHit(damage);
        
    }

    private monsterHitHeroe() {
        
        this.destroyMonster();
        //lets inform that this happend
        this.eMonsterHitHeroe.dispatch(this);
    }

    public destroyMonster() {

        this.eMonsterDie.dispatch(this);
        var deadAnimation = this.game.add.tween(this).to( { alpha: 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
        deadAnimation.onComplete.add(this.destroySprite,this);
        this.isDead = true;

    }

    destroySprite() {
        this.destroy(true);
    }


    public IsHit(damage:number) {

        this.life -= damage;

       //lets check if the monster is dead!
        if (this.life <= 0 && this.isDead == false) {
            this.destroyMonster();         
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
                    this.isAtacking = true;
                }

                this.loopSpeedNumber = 0

                //lets animate the character 
                this.startMoveAnimation()

            } else {

                this.loopSpeedNumber++;

            }
        } else {
            this.stopMoveAnimation();
        }

    }

    private startMoveAnimation() {

        if (this.isMoving == false) {

            //animamos
        switch (this.data.atackType) {
            case enumAtackType.range:
                    this.animateArrowMovement();
                break;
                case enumAtackType.sword:
                    this.animateSwordMovement();
                break
                case enumAtackType.explosion:
                    this.animateExplosionMovement();
            default:
                break;
        }

            this.isMoving = true;

        }

    }

    private stopMoveAnimation() {

        if (this.isMoving == true) {

            //detenemos todas las animaciones

            this.isMoving = false;

            if (this.weaponAnimation1 != undefined) {
                this.weaponAnimation1.stop();
            }
            
            if (this.weaponAnimation2 != undefined) {
                this.weaponAnimation2.stop();
            }

        }

    }

    private animateSwordMovement() {
               var animSpeed = 200;

        //to control the orientacion of animations
        var ori:number = this.sprite.scale.x

        //the animations for the character 
        /*
        var animation1 = this.game.add.tween(this.sprite)
        animation1.to( { x: 20 * ori}, animSpeed, Phaser.Easing.Linear.None, true);

        var animation2 = this.game.add.tween(this.sprite)
        animation2.to( { x: 0}, animSpeed, Phaser.Easing.Linear.None, false);
        animation1.chain(animation2);

        */
        

        //animate the weapon
        this.weaponAnimation1 = this.game.add.tween(this.weaponSprite).to( 
            { angle: -10, y: 2 }, 800, Phaser.Easing.Linear.None, true);

        this.weaponAnimation2 = this.game.add.tween(this.weaponSprite).to( 
            { angle: 0, y: -4 }, 800, Phaser.Easing.Linear.None, false);
        
        this.weaponAnimation1.chain(this.weaponAnimation2);
        this.weaponAnimation2.chain(this.weaponAnimation1);

    }

    private animateArrowMovement() {
        //animate the weapon
        this.weaponAnimation1 = this.game.add.tween(this.weaponSprite).to( 
            { angle: -2, y: this.data.weaponY + 2 }, 800, Phaser.Easing.Linear.None, true);

        this.weaponAnimation2 = this.game.add.tween(this.weaponSprite).to( 
            { angle: 0, y: this.data.weaponY - 2 }, 800, Phaser.Easing.Linear.None, false);
        
        this.weaponAnimation1.chain(this.weaponAnimation2);
        this.weaponAnimation2.chain(this.weaponAnimation1);


    }

        private animateExplosionMovement() {
        //animate the weapon
        this.weaponAnimation1 = this.game.add.tween(this.weaponSprite).to( 
            { angle: -2, y: this.data.weaponY + 2 }, 800, Phaser.Easing.Linear.None, true);

        this.weaponAnimation2 = this.game.add.tween(this.weaponSprite).to( 
            { angle: 0, y: this.data.weaponY - 2 }, 800, Phaser.Easing.Linear.None, false);
        
        this.weaponAnimation1.chain(this.weaponAnimation2);
        this.weaponAnimation2.chain(this.weaponAnimation1);


    }


}

