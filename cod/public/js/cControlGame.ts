class cControlGame {

    private controlHeroes:cControlHeroes;
    private controlMonsters:cControlMonster;
    private controlInterface:cControlInterface;

    constructor(public game:Phaser.Game) {

        //lets add the stage
        game.add.sprite(0,0,'back');

        //lets init the map
        this.initMap();

        //lets init the game interface
        this.controlInterface = new cControlInterface(game);

        //lets init the heroes
        this.controlHeroes = new cControlHeroes(game);

        //lets test the monster to play with the movement
        this.controlMonsters  = new cControlMonster(game);
    

    }

    private initMap() {

        var cristal = this.game.add.sprite(56, 358, 'blue_cristal');
        cristal.anchor.set(0,1);

        var cristal = this.game.add.sprite(894, 358, 'red_cristal');
        cristal.anchor.set(0,1);


        var cristal = this.game.add.sprite(244, 236, 'blue_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(244, 298, 'blue_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(244, 406, 'blue_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(244, 478, 'blue_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(480, 186, 'white_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(480, 354, 'white_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(480, 522, 'white_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(720, 236, 'red_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(720, 298, 'red_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(720, 406, 'red_cristal');
        cristal.anchor.set(0.5,1);

        var cristal = this.game.add.sprite(720, 478, 'red_cristal');
        cristal.anchor.set(0.5,1);


    }




}