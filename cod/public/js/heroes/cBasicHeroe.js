var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cBasicHeroe = (function (_super) {
    __extends(cBasicHeroe, _super);
    function cBasicHeroe(game, initPos, orientation) {
        _super.call(this, game, 0, 0);
        this.game = game;
        this.atackDistance = 220;
        this.heroeAtack = 7;
        this.orientation = orientation;
        this.playerHit = new Phaser.Signal;
        this.life = 100;
        this.initHeroes(initPos, orientation);
    }
    cBasicHeroe.prototype.initHeroes = function (initPos, orientation) {
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
    };
    //atack the closest monster in range
    cBasicHeroe.prototype.atack = function (arrayEnemyMonsters) {
        var monsterToAtack;
        var closestDistance = this.atackDistance;
        for (var idMonster in arrayEnemyMonsters) {
            var monster = arrayEnemyMonsters[idMonster];
            var distance = this.position.distance(monster.position);
            if (distance <= closestDistance) {
                closestDistance = distance;
                monsterToAtack = monster;
            }
        }
        if (monsterToAtack != undefined) {
            //lets create the proyectile
            var arrow = new cControlSpellAnim(this.game, this, monsterToAtack, enumRayAnimations.darkBall, 0, null, new Phaser.Point(36 * this.bugSprite.scale.x, -38), new Phaser.Point(0, -38));
            arrow.evenAnimationFinish.add(this.monsterHit, this, null, monsterToAtack, null, monsterToAtack);
        }
    };
    cBasicHeroe.prototype.monsterHit = function (sprite, tween, defender) {
        //lets calculate the damage we will do here, but the actual damage will happend when the animation finish.
        var damage = this.heroeAtack;
        defender.IsHit(damage);
    };
    cBasicHeroe.prototype.IsHit = function (damage) {
        this.life -= damage;
        this.playerHit.dispatch(damage);
    };
    cBasicHeroe.prototype.animateSpell = function () {
        var tween1 = this.game.add.tween(this.weaponSprite).to({ y: this.weaponSprite.y - 15, angle: -15 }, 1000, Phaser.Easing.Cubic.Out, true);
        var tween2 = this.game.add.tween(this.weaponSprite).to({ y: this.weaponSprite.y, angle: 0 }, 500, Phaser.Easing.Linear.None, false);
        tween1.chain(tween2);
    };
    return cBasicHeroe;
}(cBasicActor));
