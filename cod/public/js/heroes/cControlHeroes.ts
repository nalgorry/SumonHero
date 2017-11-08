enum heroeOrientation {
            playerHeroe,
            enemyHeroe
        }

class cControlHeroes {

    public heroe:cThisHeroe;
    public enemyHeroe:cOtherHeroe;


    constructor(public game:Phaser.Game, public gameInterface:cControlInterface) {

        this.heroe = new cThisHeroe(game, new Phaser.Point(20, 360), heroeOrientation.playerHeroe);
        this.heroe.playerHit.add(this.playerHit, this, null, this.heroe, true);


        this.enemyHeroe = new cOtherHeroe(game, new Phaser.Point(940, 360), heroeOrientation.enemyHeroe, gameInterface);
        this.enemyHeroe.playerHit.add(this.playerHit, this, null, this.heroe, false);

        var timer = game.time.create();
        timer.loop(1000, this.heroeAtack,this);
        timer.start();

    }

    private playerHit(damage:number, heroe:cBasicHeroe, enemyHit:boolean) {
        this.gameInterface.monsterHitHeroe(enemyHit ,damage);
    }

    private heroeAtack() {
        var enemyMonsters = this.gameInterface.controlMonsters.getEnemyMonsters();
        this.heroe.atack(enemyMonsters);
        var playerMonsters = this.gameInterface.controlMonsters.getPlayerMonsters();
        this.enemyHeroe.atack(playerMonsters);
    }


}