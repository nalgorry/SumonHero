var cEnemyIA = (function () {
    function cEnemyIA(game, gameInterface) {
        this.game = game;
        this.gameInterface = gameInterface;
        this.monsterNumber = 0;
        this.timerStep = 5000;
        //lets create the timer to do all we need
        this.timer = game.time.create(false);
    }
    cEnemyIA.prototype.loopFirstLvl = function () {
        //lets define the variable for the first lvl 
        var monsterType = this.game.rnd.integerInRange(0, 2);
        var pathNumber = this.game.rnd.integerInRange(0, 3);
        var monsterOptions = [3 /* bow */, 4 /* dager */, 1 /* sword */];
        this.gameInterface.controlMonsters.createEnemyMonster(pathNumber, 0, monsterOptions[monsterType]);
        this.monsterNumber++;
    };
    cEnemyIA.prototype.stopEnemyAI = function () {
        this.timer.stop();
    };
    cEnemyIA.prototype.startEnemyAI = function (gameLvl) {
        this.gameLvl = gameLvl;
        switch (gameLvl) {
            case 1:
                this.timerStep = 5000;
                this.timer.loop(this.timerStep, this.loopFirstLvl, this);
                break;
            case 2:
                this.timerStep = 4000;
                this.timer.loop(this.timerStep, this.loopFirstLvl, this);
                break;
            default:
                break;
        }
        console.log("la velocidad Actual es" + this.timerStep);
        this.timer.start();
    };
    return cEnemyIA;
}());
