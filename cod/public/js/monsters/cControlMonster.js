var cControlMonster = (function () {
    function cControlMonster(game) {
        this.game = game;
        var monster = new cMonster(game, new Phaser.Point(150, 150));
    }
    return cControlMonster;
}());
