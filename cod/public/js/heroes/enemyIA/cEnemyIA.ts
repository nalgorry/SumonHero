class cEnemyIA {

    private monsterNumber:number = 0;
    private timer:Phaser.Timer;
    public timerStep = 5000;

    constructor(public game:Phaser.Game,
    public gameInterface:cControlInterface) {

        //lets create the timer to do all we need
        this.timer = game.time.create(false);
         

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

    public startEnemyAI(timerStep:number) {

        this.timerStep += timerStep;
        console.log(this.timerStep);

        this.timer.loop(this.timerStep, this.loop, this);
        this.timer.start();
    }

}