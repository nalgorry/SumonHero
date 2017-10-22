var cControlGame = (function () {
    function cControlGame(game) {
        this.game = game;
        //lets add the stage
        game.add.sprite(0, 0, 'back');
        //lets init the map
        this.initMap();
        //lets init the controler for the monsters
        this.controlMonsters = new cControlMonsters(game);
        //lets init the game interface
        this.controlInterface = new cControlInterface(game, this.controlMonsters);
        this.controlMonsters.gameInterface = this.controlInterface;
        //lets init the heroes
        this.controlHeroes = new cControlHeroes(game, this.controlInterface);
    }
    cControlGame.prototype.initMap = function () {
    };
    return cControlGame;
}());
