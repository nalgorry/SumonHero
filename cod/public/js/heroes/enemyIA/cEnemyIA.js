var cEnemyIA = (function () {
    function cEnemyIA(game, gameInterface) {
        this.game = game;
        this.gameInterface = gameInterface;
        console.log("empieza la enemy IA");
        //lets create the timer to do all we need
        var timer = game.time.create(false);
        timer.loop(2000, this.update, this);
        timer.start();
    }
    cEnemyIA.prototype.update = function () {
        this.gameInterface.controlMonsters.createEnemyMonster(this.game.rnd.integerInRange(0, 3));
    };
    return cEnemyIA;
}());
