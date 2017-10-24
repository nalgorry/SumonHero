class cEnemyIA {

    private monsterNumber:number = 0;

    constructor(public game:Phaser.Game,
    public gameInterface:cControlInterface) {

        console.log("empieza la enemy IA");

                //lets create the timer to do all we need
        var timer = game.time.create(false);
        timer.loop(2000, this.update, this);
        timer.start();

    }

    private update () {
        
        var monsterType = this.game.rnd.integerInRange(1,3);
        var pathNumber = this.game.rnd.integerInRange(0,3);

        this.gameInterface.controlMonsters.createEnemyMonster(pathNumber,monsterType);

        this.monsterNumber ++;

    }

}