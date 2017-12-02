var cEnemyIA = (function () {
    function cEnemyIA(game, gameInterface) {
        this.game = game;
        this.gameInterface = gameInterface;
        this.monsterNumber = 0;
        this.timerStep = 5000;
        //lets create the timer to do all we need
        this.timer = game.time.create(false);
        this.timer.loop(this.timerStep, this.loop, this);
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
    cEnemyIA.prototype.startEnemyAI = function (timerStep) {
        this.timerStep += timerStep;
        console.log(this.timerStep);
        this.timer.loop(this.timerStep, this.loop, this);
        this.timer.start();
    };
    return cEnemyIA;
}());
