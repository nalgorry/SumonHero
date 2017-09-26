var cControlMonster = (function () {
    function cControlMonster(game) {
        this.game = game;
        var monster = new cMonster(game, new Phaser.Point(150, 150), 0);
        var monster = new cMonster(game, new Phaser.Point(150, 150), 1);
        var monster = new cMonster(game, new Phaser.Point(150, 150), 2);
        var monster = new cMonster(game, new Phaser.Point(150, 150), 3);
    }
    return cControlMonster;
}());
