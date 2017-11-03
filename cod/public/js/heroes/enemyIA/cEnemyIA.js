var cEnemyIA = (function () {
    function cEnemyIA(game, gameInterface) {
        this.game = game;
        this.gameInterface = gameInterface;
        this.monsterNumber = 0;
        console.log("empieza la enemy IA");
        //lets create the timer to do all we need
        var timer = game.time.create(false);
        timer.loop(4000, this.update, this);
        timer.start();
    }
    cEnemyIA.prototype.update = function () {
        var monsterType = this.game.rnd.integerInRange(1, 3);
        var pathNumber = this.game.rnd.integerInRange(0, 3);
        this.gameInterface.controlMonsters.createEnemyMonster(pathNumber, 0, monsterType);
        this.monsterNumber++;
    };
    return cEnemyIA;
}());
