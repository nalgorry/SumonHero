class preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {

        //  Set-up our preloader sprite
        this.preloadBar = this.add.sprite(100, 250, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);


        //all the objets

        this.game.load.spritesheet('heroe', 'assets/char_test40.png', 40,70 );
        this.game.load.spritesheet('weapon1', 'assets/weapon1.png', 120,120 );
        this.game.load.spritesheet('spells', 'assets/spells.png', 50, 50 );
        this.game.load.image('back', 'assets/back.png');
        
        this.game.load.image('white_cristal', 'assets/white_cristal.png');
        this.game.load.image('red_cristal', 'assets/red_cristal.png');
        this.game.load.image('blue_cristal', 'assets/blue_cristal.png');

        this.game.load.image('arrow', 'assets/arrow.png');
        this.game.load.image('fireball', 'assets/rocket.png');
        this.game.load.image('ninja_star', 'assets/ninja-star.png');

        //  Load our actual games assets
        this.game.load.spritesheet('bugs', 'assets/bugs.png', 40, 40);
        this.game.load.spritesheet('items', 'assets/items.png', 40, 40);
        //this.game.load.spritesheet('monster_2', 'assets/monster_2.png',170 ,119 );
        //this.game.load.image('monster_3', 'assets/monster_3.png' );
        //this.game.load.image('monster_4', 'assets/monster_4.png' );
        //this.game.load.image('monster_5', 'assets/cosmic_monster.png' );
        //this.game.load.image('monster_6', 'assets/monster_6.png' );
    
        this.game.load.json('monsterData', 'js/monsters/monsterData.json');
    }

    create() {

        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMainMenu, this);

    }

    startMainMenu() {

        this.game.state.start('mainMenu', true, false);

    }

}