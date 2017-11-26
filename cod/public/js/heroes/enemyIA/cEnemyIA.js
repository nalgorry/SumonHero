var cEnemyIA = (function () {
    function cEnemyIA(game, gameInterface) {
        this.game = game;
        this.gameInterface = gameInterface;
        this.monsterNumber = 0;
        console.log("empieza la enemy IA");
        //lets create the timer to do all we need
        this.timer = game.time.create(false);
        this.timer.loop(5000, this.loop, this);
        this.timer.start();
    }
    cEnemyIA.prototype.loop = function () {
        var monsterType = this.game.rnd.integerInRange(1, 3);
        var pathNumber = this.game.rnd.integerInRange(0, 3);
        this.gameInterface.controlMonsters.createEnemyMonster(pathNumber, 0, monsterType);
        this.monsterNumber++;
    };
    cEnemyIA.prototype.stopEnemyAI = function () {
        this.timer.stop();
    };
    cEnemyIA.prototype.startEnemyAI = function () {
        this.timer.loop(5000, this.loop, this);
        this.timer.start();
        console.log("entra");
    };
    return cEnemyIA;
}());
