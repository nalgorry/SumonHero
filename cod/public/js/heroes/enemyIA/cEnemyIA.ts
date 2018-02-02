class cEnemyIA {

    private monsterNumber:number = 0;
    private timer:Phaser.Timer;
    public timerStep = 5000;
    public gameLvl:number;

    constructor(public game:Phaser.Game,
    public gameInterface:cControlInterface) {

        //lets create the timer to do all we need
        this.timer = game.time.create(false);
         
    

    }

    private loopFirstLvl () {
        
        //lets define the variable for the first lvl 
        var monsterType = this.game.rnd.integerInRange(0,2);
        var pathNumber = this.game.rnd.integerInRange(0,3);

        var monsterOptions = [enumMonstersType.bow, enumMonstersType.dager, enumMonstersType.sword]

        this.gameInterface.controlMonsters.createEnemyMonster(pathNumber, 0 , monsterOptions[monsterType]);

        this.monsterNumber ++;

    }

    public stopEnemyAI() {
        this.timer.stop();
    }

    public startEnemyAI(gameLvl:number) {

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
            case 3:
                this.timerStep = 3500;
                this.timer.loop(this.timerStep, this.loopFirstLvl, this);
                break;
        
            default:
                break;
        }

        this.timer.start();
    }

}