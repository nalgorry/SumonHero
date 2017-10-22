class cEnemyIA {

    constructor(public game:Phaser.Game,
    public gameInterface:cControlInterface) {

        console.log("empieza la enemy IA");

                //lets create the timer to do all we need
        var timer = game.time.create(false);
        timer.loop(2000, this.update, this);
        timer.start();

    }

    private update () {
        this.gameInterface.controlMonsters.createEnemyMonster(this.game.rnd.integerInRange(0,3));

    }

}