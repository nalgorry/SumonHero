class cMonster extends cBasicActor{

    private showPath:boolean = false;

    private monsterPath = []; //here we have all the paths to move the monsters
    private pathNumber:number = 0;
    private loopSpeedNumber:number = 0;
    private loopSpeed:number = 0; /////the number of update loops to update the speed
    private speed:number; //the distance of every point in the path
    private atackSpeed:number // the atack speed of the monster

    private firstAtack:boolean;

    private bugSprite:Phaser.Sprite;
    private weaponSprite:Phaser.Sprite;
    
    public isDead:boolean = false; //to control if a spell hit after the monster die.
    public monsterAtacked:cBasicActor;

    //to show the life of the monster
    private lifeBar:Phaser.Sprite;
    private bitmapVida:Phaser.Graphics;
    private bitmapBack:Phaser.Graphics;
    private barHeight:number = 10;
    private barWidth:number = 40;
    private actualBarColor:number;
    
    //to control monster atacks
    public speedCounter:number = 0;
    public isAtacking:boolean = false;

    //to control the walk animations
    private isMoving:boolean = false;

    private weaponAnimation1:Phaser.Tween;
    private weaponAnimation2:Phaser.Tween;

    public eMonsterHitHeroe:Phaser.Signal;
    public eMonsterDie:Phaser.Signal;
    public eMonsterAreaAtack:Phaser.Signal;

    //efects of the spells
    private shieldActivated:boolean = false;
    private spriteShield:Phaser.Sprite;
    private monsterSlowed:boolean = false;
    private slowTimer:Phaser.Timer;
    private fireDamageTimer:Phaser.Timer;
    private resefireTimerCount:boolean = false;


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
        this.firstAtack = this.data.firstAtack;

        //all the sprites that generates the bug
        this.sprite =  this.game.add.sprite(0, 0)
        this.addChild(this.sprite);
        //this.sprite.inputEnabled = true;
        //this.sprite.events.onInputDown.add(this.monsterClick, this)

        //lets create the bug
        this.bugSprite = this.game.add.sprite(0, 0, 'bugs', data.tilePoss);
        this.bugSprite.anchor.set(0.5);
        this.bugSprite.y -= 20;

        this.sprite.addChild(this.bugSprite);

        //lets create the weapon MUAJAJA (evil laugh)
        this.weaponSprite = this.game.add.sprite(data.weaponX, data.weaponY, 'items', data.weaponTilePoss);
        this.weaponSprite.anchor.set(0, 1);
        
        if (data.weaponAngle != undefined) {
            this.weaponSprite.angle = data.weaponAngle;
        }

        this.sprite.addChild(this.weaponSprite);

        //lets define for now the speed of the monster
        this.speed = this.data.maxSpeed;
        this.life = this.data.maxLife;
        this.atackSpeed = this.data.atackSpeed;

        //lets make it rotate!
        if (this.isEnemy == false) {
            
        } else {
           this.sprite.scale.x *= -1;
        }

        //lets define the path it will follow
        this.makePathConstantSpeed(path);

        this.x = this.monsterPath[0].x;
        this.y = this.monsterPath[0].y;

        //lets create a mega super bar to show the life when monster is hit
        this.createBar();

        //to control the events of the monster
        this.eMonsterHitHeroe = new Phaser.Signal();
        this.eMonsterDie = new Phaser.Signal();
        this.eMonsterAreaAtack = new Phaser.Signal();
        
        //to use the update loop
        this.game.add.existing(this);

    }

    public createBar() {

        var x = -20;
        var y = -55;

        //back
        this.lifeBar = this.game.add.sprite(x, y);
        this.lifeBar.anchor.setTo(1);

        this.bitmapBack = this.game.add.graphics(x ,y);
        this.bitmapBack.beginFill(0x363636);
        this.bitmapBack.drawRect(0, 0, this.barWidth , this.barHeight);
        this.bitmapBack.endFill();
        this.bitmapBack.alpha = 0;
        this.sprite.addChild(this.bitmapBack);
        

        //actual bar
        this.bitmapVida = this.game.add.graphics(0, 0);
        this.bitmapVida.beginFill(0x0B632B);
        this.bitmapVida.drawRect(0, 0, this.barWidth, this.barHeight);
        this.bitmapVida.endFill();
        this.lifeBar.addChild(this.bitmapVida);
        this.lifeBar.alpha = 0;
        
        this.sprite.addChild(this.lifeBar);

        //lets save the actual color of the bar in case we need to change it 
        this.actualBarColor = 0x0B632B

    }

    private updateLifeBar(damage:number) {
        this.updateBar(this.lifeBar, this.life, this.data.maxLife);
    }

    private updateBar(bar:Phaser.Sprite, value:number, maxValue:number) {
        var  result:number = value;

        //lets check if we need to show the bar 
        if (value  >= maxValue) {
            this.game.add.tween(bar).to(
             { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
            this.bitmapBack.alpha = 0;
             return;
        } else {
            bar.alpha = 1;
            this.bitmapBack.alpha = 1;
        }

        //check min value 
        if (value  <= 0) {
            result = 0;
            value = 0;
        }

        //lets check the color
        var color:number;
        if (value / maxValue > 0.7) {
            color = 0x0B632B;
        }
        if (value / maxValue <= 0.7 && value / maxValue >= 0.4) {
            color = 0xE8F578;
        } else if (value / maxValue <= 0.4) {
            color = 0xE82A2A;
        }

        //lets change the color if we need to 
        if (color != this.actualBarColor && value != 0) {
            this.bitmapVida.clear();
            this.bitmapVida.beginFill(color);
            this.bitmapVida.drawRect(0, 0, this.barWidth, this.barHeight);
            this.bitmapVida.endFill();

            this.actualBarColor = color;
        }

        this.game.add.tween(bar.scale).to(
             { x: value / maxValue }, 200, Phaser.Easing.Linear.None, true);

    }

    private monsterClick() {
        this.isAtacking = true;
        this.monsterAtack(this);
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

    public resolveAtack(defender:cBasicActor ) {

        var atacker = this;

        //if we have a special atack we dont wait to use it
        if (this.firstAtack == true) {
            atacker.monsterAtack(defender);
        }
        
        if (atacker.speedCounter >= atacker.atackSpeed) {

            atacker.monsterAtack(defender);
            
            atacker.speedCounter = 0;
        } else {

            atacker.speedCounter += 100;
        }

    }

    public monsterAtack(defender:cBasicActor) {
        
        switch (this.data.id) {
            case enumMonstersType.bow:
                    this.animateArrowAtack(defender);
                break;
            case enumMonstersType.cold_wizard:
                this.animateColdWizardAtack(defender);
            break;
            case enumMonstersType.fire_wizard:
                this.animateFireWizardAtack(defender);
            break;
            case enumMonstersType.star_ninja:
                this.animateStarNinjaAtack(defender);
            break;
            case enumMonstersType.dager:
            case enumMonstersType.sword:
                this.animateSwordAtack(defender);
            break
            case enumMonstersType.explosion:
                this.animateExplosion();
            break;
            case enumMonstersType.hammer:
                this.animateHammer(defender);
            break;
            case enumMonstersType.ninja:
                this.animateNinja(defender);
            default:
                break;
        }

    }

    private animateNinja(defender:cBasicActor) {

        if (this.firstAtack == true) {

            var addPath = 100;

            this.pathNumber += addPath;

            //lets check if we have the space to the the atack
            if (this.pathNumber >= this.monsterPath.length) {
                this.firstAtack = false;
                return;
            }

            var newX = this.monsterPath[this.pathNumber].x;
            var newY = this.monsterPath[this.pathNumber].y;

           
            var anim = this.game.add.tween(this).to( 
            { x: newX , y: newY }, 400, Phaser.Easing.Linear.None, true);

            anim.onComplete.add(this.ninjaFirstAtackFinish, this);

            
            this.monsterHit(null, null, defender);

            this.firstAtack = false;

        } else {
            this.animateSwordAtack(defender);
        }
    }

    private ninjaFirstAtackFinish() {

    }

    private animateArrowAtack(defender:cBasicActor) {
        //lets create the proyectile
        var arrow = new cControlSpellAnim(this.game, this, defender, enumRayAnimations.arrow, 0);

        arrow.evenAnimationFinish.add(this.monsterHit,this, null, defender, null, defender);
    }

    private animateColdWizardAtack(defender:cBasicActor) {
        //lets create the proyectile
        var arrow = new cControlSpellAnim(this.game, this, defender, enumRayAnimations.iceball, 0);

        arrow.evenAnimationFinish.add(this.coldWizardHit,this, null, defender, null, defender);
    }

    private coldWizardHit(sprite, tween, defender:cBasicActor) {

        this.monsterHit(sprite, tween, defender);
        defender.slowMonster(2000);
    }

    private animateStarNinjaAtack(defender:cBasicActor) {
        //lets create the proyectile
        var arrow = new cControlSpellAnim(this.game, this, defender, enumRayAnimations.ninjaStar, 0);

        arrow.evenAnimationFinish.add(this.starNinjaHit,this, null, defender, null, defender);

        //this moster increase it atack speed every hit
        var speedIncrease:number = parseInt(this.data.special_2);
        var maxSpeedIncrease:number = parseInt(this.data.special_1);

        if (this.atackSpeed > maxSpeedIncrease) {
            this.atackSpeed -= speedIncrease;
        }

    }

    private starNinjaHit(sprite, tween, defender:cBasicActor) {

        this.monsterHit(sprite, tween, defender);
        
    }

    private animateFireWizardAtack(defender:cBasicActor) {
        //lets create the proyectile
        var arrow = new cControlSpellAnim(this.game, this, defender, enumRayAnimations.fireball, 0);

        arrow.evenAnimationFinish.add(this.fireWizardHit,this, null, defender, null, defender);
    }

    private fireWizardHit(sprite, tween, defender:cBasicActor) {

        this.monsterHit(sprite, tween, defender);

        var damage = parseInt(this.data.special_1);
        var speedDamage = parseInt(this.data.special_2);
        var numberOfTimes = parseInt(this.data.special_3);

        defender.addFireAtack(damage, speedDamage, numberOfTimes);
        
    }

    public addFireAtack(damage:number, speedDamage:number, numberOfTimes:number) {

        if (this.isDead == true) {return}


        //lets check if the monster alreade has a fire damage over it
        if (this.fireDamageTimer == undefined) {
            this.fireDamageTimer = this.game.time.create();
            this.fireDamageTimer.repeat(speedDamage, numberOfTimes , this.doFireDamage,this, damage, speedDamage, numberOfTimes);
            this.fireDamageTimer.start();
        } else {
            this.resefireTimerCount = true;
        }


    }

    private doFireDamage(damage:number, speedDamage:number, numberOfTimes:number ) {
        this.IsHit(damage);

        //lets check if we need to restart the count of fire damage
        if (this.resefireTimerCount == true) {

            console.log("entra aca");
            this.fireDamageTimer.destroy();

            this.fireDamageTimer = this.game.time.create();
            this.fireDamageTimer.repeat(speedDamage, numberOfTimes , this.doFireDamage, this, damage, speedDamage, numberOfTimes);
            this.fireDamageTimer.start();

            this.resefireTimerCount = false;

        }
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

        }

    }

    private boomExplote() {
        
        //lets kill the character that drop the boom
        this.destroyMonster();
        this.eMonsterAreaAtack.dispatch(this);

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

    private animateHammer(defender:cBasicActor) {
        
        //to control the orientacion of animations
        var ori:number = this.sprite.scale.x

        //the animations for the character 
        var animation1 = this.game.add.tween(this.sprite)
        animation1.to( { x: 20 * ori}, 300, Phaser.Easing.Linear.None, true);

        var animation2 = this.game.add.tween(this.sprite)
        animation2.to( { x: 0}, 300, Phaser.Easing.Linear.None, false);

        animation1.chain(animation2);

        //the animations for the sword
        var animation1 = this.game.add.tween(this.weaponSprite).to( 
            { angle: '0' }, 150, Phaser.Easing.Linear.None, true);

        var animation2 = this.game.add.tween(this.weaponSprite).to( 
            { angle: '+140' }, 150, Phaser.Easing.Linear.None, false);
        
        var animation3 = this.game.add.tween(this.weaponSprite).to( 
            { angle: '-140'}, 150, Phaser.Easing.Linear.None, false);

        animation1.chain(animation2);
        animation2.chain(animation3);

        animation3.onComplete.add(this.hammerHit, this, null, defender);

    }

    private hammerHit(monster) {
        this.eMonsterAreaAtack.dispatch(this)
    }

    private monsterHit(sprite, tween, defender:cBasicActor) {
        //lets calculate the damage we will do here, but the actual damage will happend when the animation finish.
        var damage = this.data.atack;

        if (this.firstAtack) {
            damage = damage * 2
        }

        defender.IsHit(damage);
        
    }

    private monsterHitHeroe() {
        
        this.destroyMonster();
        //lets inform that this happend
        this.eMonsterHitHeroe.dispatch(this);
    }

    public destroyMonster() {

        if (this.isDead == true) {return} //lets check if it is not already dead!

        this.eMonsterDie.dispatch(this);
        var deadAnimation = this.game.add.tween(this).to( { alpha: 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
        deadAnimation.onComplete.add(this.destroySprite,this);
        this.isDead = true;

    }

    destroySprite() {
        this.destroy(true);
    }


    public IsHit(damage:number) {

        //lets check if the monster is already dead before hit it again.
        if (this.isDead) {return}

        //some times this happends, i need to understand why...
        if (isNaN(this.life)) {
            console.log("esto no deberia pasar, nan en la vida del monstruo!");
            console.log("el daño fue" + damage);
            this.destroyMonster();
            return
        }

        if (this.shieldActivated == true) {
            damage = damage / 2;
        }

        this.life -= damage;
        this.updateLifeBar(damage);

       //lets check if the monster is dead!
        if (this.life <= 0 && this.isDead == false) {
            this.destroyMonster();         
        }

    }

    public update() {

        //lets control if we have to update the movement
        if (this.isAtacking == false) {
            if (this.loopSpeedNumber == this.loopSpeed) {

                //lets check if the movement have finish!
                if (this.pathNumber >= this.monsterPath.length) {
                    this.monsterHitHeroe()
                    this.isAtacking = true;
                } else {

                    //lets move the monster
                    this.x = this.monsterPath[this.pathNumber].x;
                    this.y = this.monsterPath[this.pathNumber].y;

                    this.pathNumber++;
                    this.loopSpeedNumber = 0

                    //lets animate the character 
                    this.startMoveAnimation()

                    //lets reset the speed of the ninja star monster
                    if (this.data.id == enumMonstersType.star_ninja) {
                        this.atackSpeed = this.data.atackSpeed;
                    }
                }             

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
        switch (this.data.id) {
            case enumMonstersType.bow:
            case enumMonstersType.star_ninja:
                    this.animateArrowMovement();
                break;
                case enumMonstersType.sword:
                case enumMonstersType.hammer:
                case enumMonstersType.dager:
                case enumMonstersType.shield:
                case enumMonstersType.cold_wizard:
                case enumMonstersType.fire_wizard:
                    this.animateSwordMovement();
                break
                case enumMonstersType.explosion:
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
            { angle: '-10', y: "+2" }, 800, Phaser.Easing.Linear.None, true);

        this.weaponAnimation2 = this.game.add.tween(this.weaponSprite).to( 
            { angle: '+10', y: "-2" }, 800, Phaser.Easing.Linear.None, false);
        
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

    public slowMonster(timeMs:number) {

        //lets check if the monster is still alive before doing anything
        if (this.isDead == true) {return}
        
        this.monsterSlowed = true;

        //lets slow the monster 
        this.loopSpeed = 1;
        
        //lets start the timer to desactivate the events
        if (this.slowTimer != undefined) {
            this.slowTimer.destroy();
        }

        this.slowTimer = this.game.time.create();
        this.slowTimer.add(timeMs, this.slowFinish,this);
        this.slowTimer.start();

    }

    private slowFinish() {
        this.loopSpeed = 0;
        this.loopSpeedNumber = 0;
        this.monsterSlowed = false;
    }

    public activateShield(spellData:cSpellData) {
        
        this.shieldActivated = true;

        //lets create the sprite over the monster
        this.spriteShield = this.game.add.sprite(0, -50, 'spells', spellData.possInSheet);
        this.spriteShield.anchor.set(0.5);
        this.spriteShield.scale.set(0.25);

        this.addChild(this.spriteShield);
        
        //lets start the timer to desactivate the events
        var timer = this.game.time.create();
        timer.add(spellData.durationSec * 1000, this.desactivateShield,this);
        timer.start();

    }

    private desactivateShield() {
        this.spriteShield.destroy();
        this.shieldActivated = false;
    }


}

