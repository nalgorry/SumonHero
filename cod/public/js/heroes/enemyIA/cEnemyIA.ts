class cEnemyIA {

    private monsterNumber:number = 0;
    private timer:Phaser.Timer;

    constructor(public game:Phaser.Game,
    public gameInterface:cControlInterface) {

        console.log("empieza la enemy IA");

                //lets create the timer to do all we need
        this.timer = game.time.create(false);
        this.timer.loop(5000, this.loop, this);
        this.timer.start();

    }

    private loop () {
        
        var monsterType = this.game.rnd.integerInRange(1,3);
        var pathNumber = this.game.rnd.integerInRange(0,3);

        this.gameInterface.controlMonsters.createEnemyMonster(pathNumber, 0 ,monsterType);

        this.monsterNumber ++;

    }

    public stopEnemyAI() {
        this.timer.stop();
    }

    public startEnemyAI() {
        this.timer.loop(5000, this.loop, this);
        this.timer.start();
        console.log("entra");
    }

}