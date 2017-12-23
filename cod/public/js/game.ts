
class InitGame {

    public game: Phaser.Game;
    

    constructor() {

        var conf = {
            width: 960,
            height: 640,
            renderer: Phaser.WEBGL,
            parent: 'content',
            state: null,
            //enableDebug: false,
        };

        this.game = new Phaser.Game(conf);

        this.game.state.add('boot', boot, false);
        this.game.state.add('preloader', preloader, false);
        this.game.state.add('mainMenu', mainMenu, false);

        this.game.state.start('boot');

    }


} //fin
window.onload = () => {

    var game = new InitGame();

};

