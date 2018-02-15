var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var preloader = (function (_super) {
    __extends(preloader, _super);
    function preloader() {
        _super.apply(this, arguments);
    }
    preloader.prototype.preload = function () {
        //  Set-up our preloader sprite
        this.preloadBar = this.add.sprite(this.game.width / 2, 500, 'preloadBar');
        this.preloadBar.anchor.set(0.5);
        this.load.setPreloadSprite(this.preloadBar);
        //all the objets
        this.game.load.spritesheet('heroe', 'assets/char_test40.png', 40, 70);
        this.game.load.spritesheet('weapon1', 'assets/weapon1.png', 120, 120);
        this.game.load.spritesheet('spells', 'assets/spells.png', 128, 128);
        this.game.load.image('back', 'assets/back.png');
        this.game.load.image('white_cristal', 'assets/white_cristal.png');
        this.game.load.image('red_cristal', 'assets/red_cristal.png');
        this.game.load.image('blue_cristal', 'assets/blue_cristal.png');
        //load the help items
        this.game.load.spritesheet('menu_card', 'assets/menus/menu_card.png', 61, 108);
        this.game.load.image('spells_help', 'assets/menus/spells_help.png');
        this.game.load.image('example_cristal', 'assets/menus/example_cristal.png');
        this.game.load.image('white_arrow', 'assets/white_arrow.png');
        this.game.load.image('arrow', 'assets/arrow.png');
        this.game.load.spritesheet('fireball', 'assets/all_rockets.png', 24, 24);
        this.game.load.image('ninja_star', 'assets/ninja-star.png');
        //  Load our actual games assets
        this.game.load.spritesheet('bugs', 'assets/bugs.png', 55, 55);
        this.game.load.spritesheet('items', 'assets/items.png', 40, 40);
        this.game.load.spritesheet('bombexploding', 'assets/bombexploding.png', 32, 64);
        this.game.load.image('pathArrow', 'assets/patharrow.png');
        this.game.load.image('enemy_msg', 'assets/enemy_msg.png');
        //load the fonts
        this.game.load.bitmapFont('gotic_white', 'assets/fonts/showg_white.png', 'assets/fonts/showg_white.fnt');
        this.game.load.bitmapFont('gotic_black', 'assets/fonts/showg_black.png', 'assets/fonts/showg_black.fnt');
        this.game.load.bitmapFont('arial', 'assets/fonts/arial20.png', 'assets/fonts/arial20.fnt');
        //this.game.load.spritesheet('monster_2', 'assets/monster_2.png',170 ,119 );
        //this.game.load.image('monster_3', 'assets/monster_3.png' );
        //this.game.load.image('monster_4', 'assets/monster_4.png' );
        //this.game.load.image('monster_5', 'assets/cosmic_monster.png' );
        //this.game.load.image('monster_6', 'assets/monster_6.png' );
        this.game.load.json('monsterData', 'js/monsters/monsterData.json');
        this.game.load.json('spellData', 'js/spells/spellData.json');
    };
    preloader.prototype.create = function () {
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMainMenu, this);
    };
    preloader.prototype.startMainMenu = function () {
        this.game.state.start('mainMenu', true, false);
    };
    return preloader;
}(Phaser.State));
