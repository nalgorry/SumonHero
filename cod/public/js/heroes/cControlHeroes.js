var heroeOrientation;
(function (heroeOrientation) {
    heroeOrientation[heroeOrientation["idle_left"] = 0] = "idle_left";
    heroeOrientation[heroeOrientation["idle_right"] = 1] = "idle_right";
})(heroeOrientation || (heroeOrientation = {}));
var cControlHeroes = (function () {
    function cControlHeroes(game, gameInterface) {
        this.game = game;
        this.gameInterface = gameInterface;
        this.heroe = new cThisHeroe(game, new Phaser.Point(940, 360), heroeOrientation.idle_left);
        this.otherHeroe = new cOtherHeroe(game, new Phaser.Point(20, 360), heroeOrientation.idle_right, gameInterface);
    }
    return cControlHeroes;
}());
