var heroeOrientation;
(function (heroeOrientation) {
    heroeOrientation[heroeOrientation["playerHeroe"] = 0] = "playerHeroe";
    heroeOrientation[heroeOrientation["enemyHeroe"] = 1] = "enemyHeroe";
})(heroeOrientation || (heroeOrientation = {}));
var cControlHeroes = (function () {
    function cControlHeroes(game, gameInterface) {
        this.game = game;
        this.gameInterface = gameInterface;
        this.heroe = new cThisHeroe(game, new Phaser.Point(50, 350), heroeOrientation.playerHeroe);
        this.heroe.playerHit.add(this.playerHit, this, null, this.heroe, true);
        this.enemyHeroe = new cOtherHeroe(game, new Phaser.Point(1230, 350), heroeOrientation.enemyHeroe, gameInterface);
        this.enemyHeroe.playerHit.add(this.playerHit, this, null, this.heroe, false);
        var timer = game.time.create();
        timer.loop(1000, this.heroeAtack, this);
        timer.start();
    }
    cControlHeroes.prototype.playerHit = function (damage, heroe, enemyHit) {
        this.gameInterface.monsterHitHeroe(enemyHit, damage);
    };
    cControlHeroes.prototype.heroeAtack = function () {
        var enemyMonsters = this.gameInterface.controlMonsters.getEnemyMonsters();
        this.heroe.atack(enemyMonsters);
        var playerMonsters = this.gameInterface.controlMonsters.getPlayerMonsters();
        this.enemyHeroe.atack(playerMonsters);
    };
    return cControlHeroes;
}());
