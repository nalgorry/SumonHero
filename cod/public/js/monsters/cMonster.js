var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cMonster = (function (_super) {
    __extends(cMonster, _super);
    function cMonster(game, id, path, isEnemy, startPoss, data) {
        _super.call(this, game, 0, 0);
        this.game = game;
        this.id = id;
        this.isEnemy = isEnemy;
        this.data = data;
        this.showPath = false;
        this.monsterPath = []; //here we have all the paths to move the monsters
        this.pathNumber = 0;
        this.loopSpeedNumber = 0;
        this.loopSpeed = 0;
        this.isDead = false; //to control if a spell hit after the monster die.
        //to control monster atacks
        this.speedCounter = 0;
        this.isAtacking = false;
        //to control the walk animations
        this.isMoving = false;
        //left define the start position of the monster, base on the path selected
        path = path.slice(-path.length + startPoss);
        this.x = path[0].x;
        this.y = path[0].y;
        this.anchor.set(0.5);
        //all the sprites that generates the bug
        this.sprite = this.game.add.sprite(0, 0);
        this.addChild(this.sprite);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.monsterClick, this);
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
        }
        else {
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
    cMonster.prototype.monsterClick = function () {
        //this.monsterAtack(this);
        console.log(this.life);
    };
    cMonster.prototype.makePathConstantSpeed = function (path) {
        var _this = this;
        var distance = 0;
        //we have the path, but we need to make it so the speed is constant.
        //to draw the path
        if (this.showPath) {
            var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
            bmd.addToWorld();
            bmd.clear();
        }
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
    cMonster.prototype.monsterAtack = function (defender) {
        switch (this.data.atackType) {
            case 2 /* range */:
                this.animateArrow(defender);
                break;
            case 1 /* sword */:
                this.animateSwordAtack(defender);
                break;
            case 3 /* explosion */:
                this.animateExplosion();
            default:
                break;
        }
    };
    cMonster.prototype.animateArrow = function (defender) {
        //lets create the proyectile
        var arrow = new cControlSpellAnim(this.game, this, defender, enumRayAnimations.arrow, 0);
        arrow.evenAnimationFinish.add(this.monsterHit, this, null, defender, null, defender);
    };
    cMonster.prototype.animateExplosion = function () {
        //lets make this monster explote only once
        if (this.isDead == false) {
            var ori = this.sprite.scale.x;
            var boomSprite = this.game.add.sprite(this.x + 30 * ori, this.y - 30, 'bombexploding');
            boomSprite.anchor.set(0.5);
            var animation = boomSprite.animations.add('boom');
            animation.play(15, false, true);
            animation.onComplete.add(this.boomExplote, this);
            this.isDead = true;
        }
    };
    cMonster.prototype.boomExplote = function () {
        //lets kill the character that drop the boom
        this.destroyMonster();
        this.eMonsterAreaAtack.dispatch(this);
    };
    cMonster.prototype.animateSwordAtack = function (defender) {
        var animSpeed = 200;
        //to control the orientacion of animations
        var ori = this.sprite.scale.x;
        //the animations for the character 
        var animation1 = this.game.add.tween(this.sprite);
        animation1.to({ x: 20 * ori }, animSpeed, Phaser.Easing.Linear.None, true);
        var animation2 = this.game.add.tween(this.sprite);
        animation2.to({ x: 0 }, animSpeed, Phaser.Easing.Linear.None, false);
        animation1.chain(animation2);
        //the animations for the sword
        var swordAnimation1 = this.game.add.tween(this.weaponSprite).to({ angle: -90 }, 100, Phaser.Easing.Linear.None, true);
        var swordAnimation2 = this.game.add.tween(this.weaponSprite).to({ angle: 45 }, 100, Phaser.Easing.Linear.None, false);
        var swordAnimation3 = this.game.add.tween(this.weaponSprite).to({ angle: 0 }, 100, Phaser.Easing.Linear.None, false);
        swordAnimation1.chain(swordAnimation2);
        swordAnimation2.chain(swordAnimation3);
        swordAnimation3.onComplete.add(this.monsterHit, this, null, defender);
    };
    cMonster.prototype.monsterHit = function (sprite, tween, defender) {
        //lets calculate the damage we will do here, but the actual damage will happend when the animation finish.
        var damage = this.data.atack;
        defender.IsHit(damage);
    };
    cMonster.prototype.monsterHitHeroe = function () {
        this.destroyMonster();
        //lets inform that this happend
        this.eMonsterHitHeroe.dispatch(this);
    };
    cMonster.prototype.destroyMonster = function () {
        this.eMonsterDie.dispatch(this);
        var deadAnimation = this.game.add.tween(this).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
        deadAnimation.onComplete.add(this.destroySprite, this);
        this.isDead = true;
    };
    cMonster.prototype.destroySprite = function () {
        this.destroy(true);
    };
    cMonster.prototype.IsHit = function (damage) {
        this.life -= damage;
        //lets check if the monster is dead!
        if (this.life <= 0 && this.isDead == false) {
            this.destroyMonster();
        }
    };
    cMonster.prototype.update = function () {
        //lets control if we have to update the movement
        if (this.isAtacking == false) {
            if (this.loopSpeedNumber == this.loopSpeed) {
                //lets move the monster
                this.x = this.monsterPath[this.pathNumber].x;
                this.y = this.monsterPath[this.pathNumber].y;
                this.pathNumber++;
                //lets check if the movement have finish!
                if (this.pathNumber >= this.monsterPath.length) {
                    this.monsterHitHeroe();
                    this.isAtacking = true;
                }
                this.loopSpeedNumber = 0;
                //lets animate the character 
                this.startMoveAnimation();
            }
            else {
                this.loopSpeedNumber++;
            }
        }
        else {
            this.stopMoveAnimation();
        }
    };
    cMonster.prototype.startMoveAnimation = function () {
        if (this.isMoving == false) {
            //animamos
            switch (this.data.atackType) {
                case 2 /* range */:
                    this.animateArrowMovement();
                    break;
                case 1 /* sword */:
                    this.animateSwordMovement();
                    break;
                case 3 /* explosion */:
                    this.animateExplosionMovement();
                default:
                    break;
            }
            this.isMoving = true;
        }
    };
    cMonster.prototype.stopMoveAnimation = function () {
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
    };
    cMonster.prototype.animateSwordMovement = function () {
        var animSpeed = 200;
        //to control the orientacion of animations
        var ori = this.sprite.scale.x;
        //the animations for the character 
        /*
        var animation1 = this.game.add.tween(this.sprite)
        animation1.to( { x: 20 * ori}, animSpeed, Phaser.Easing.Linear.None, true);

        var animation2 = this.game.add.tween(this.sprite)
        animation2.to( { x: 0}, animSpeed, Phaser.Easing.Linear.None, false);
        animation1.chain(animation2);

        */
        //animate the weapon
        this.weaponAnimation1 = this.game.add.tween(this.weaponSprite).to({ angle: -10, y: 2 }, 800, Phaser.Easing.Linear.None, true);
        this.weaponAnimation2 = this.game.add.tween(this.weaponSprite).to({ angle: 0, y: -4 }, 800, Phaser.Easing.Linear.None, false);
        this.weaponAnimation1.chain(this.weaponAnimation2);
        this.weaponAnimation2.chain(this.weaponAnimation1);
    };
    cMonster.prototype.animateArrowMovement = function () {
        //animate the weapon
        this.weaponAnimation1 = this.game.add.tween(this.weaponSprite).to({ angle: -2, y: this.data.weaponY + 2 }, 800, Phaser.Easing.Linear.None, true);
        this.weaponAnimation2 = this.game.add.tween(this.weaponSprite).to({ angle: 0, y: this.data.weaponY - 2 }, 800, Phaser.Easing.Linear.None, false);
        this.weaponAnimation1.chain(this.weaponAnimation2);
        this.weaponAnimation2.chain(this.weaponAnimation1);
    };
    cMonster.prototype.animateExplosionMovement = function () {
        //animate the weapon
        this.weaponAnimation1 = this.game.add.tween(this.weaponSprite).to({ angle: -2, y: this.data.weaponY + 2 }, 800, Phaser.Easing.Linear.None, true);
        this.weaponAnimation2 = this.game.add.tween(this.weaponSprite).to({ angle: 0, y: this.data.weaponY - 2 }, 800, Phaser.Easing.Linear.None, false);
        this.weaponAnimation1.chain(this.weaponAnimation2);
        this.weaponAnimation2.chain(this.weaponAnimation1);
    };
    return cMonster;
}(cBasicActor));
