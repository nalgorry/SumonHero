class cOtherHeroe extends cBasicHeroe {
    
    public enemyIA:cEnemyIA

    constructor (public game:Phaser.Game, 
        initPos:Phaser.Point, orientation:heroeOrientation,
        public gameInterface:cControlInterface) {

        super(game, initPos, orientation);

        this.enemyIA = new cEnemyIA(game, gameInterface);

    }


}