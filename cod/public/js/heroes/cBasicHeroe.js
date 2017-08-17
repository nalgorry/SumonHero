var cBasicHeroe = (function () {
    function cBasicHeroe(game, initPos, orientation) {
        this.game = game;
        this.orientation = orientation;
        this.initHeroes(initPos, orientation);
    }
    cBasicHeroe.prototype.initHeroes = function (initPos, orientation) {
        //lets create the heroe
        this.heroeSprite = this.game.add.sprite(initPos.x, initPos.y);
        //lets add the sprites
        this.armorSprite = this.game.add.sprite(0, 0, 'heroe', 0);
        this.armorSprite.anchor.set(0.5, 1);
        this.heroeSprite.addChild(this.armorSprite);
        this.weaponSprite = this.game.add.sprite(0, 0, 'weapon1', 0);
        this.weaponSprite.anchor.set(0.5, 1);
        this.heroeSprite.addChild(this.weaponSprite);
        //lets add some animations
        this.armorSprite.animations.add('idle_right', [0, 1, 2, 3, 4], 4, true);
        this.armorSprite.animations.add('idle_left', [24, 25, 26, 27, 28], 4, true);
        this.weaponSprite.animations.add('idle_right', [0, 1, 2, 3, 4], 4, true);
        this.weaponSprite.animations.add('idle_left', [24, 25, 26, 27, 28], 4, true);
        //lets start in iddle 
        this.armorSprite.animations.play(heroeOrientation[orientation]);
        this.weaponSprite.animations.play(heroeOrientation[orientation]);
        //lets put the weapon in the right z index
        if (orientation == heroeOrientation.idle_right) {
            this.heroeSprite.children[0] = this.weaponSprite;
            this.heroeSprite.children[1] = this.armorSprite;
        }
    };
    return cBasicHeroe;
}());
