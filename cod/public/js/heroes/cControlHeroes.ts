enum heroeOrientation {
            idle_left,
            idle_right
        }

class cControlHeroes {

    private heroe:cThisHeroe;
    private otherHeroe:cOtherHeroe;


    constructor(public game:Phaser.Game) {

        this.heroe = new cThisHeroe(game, new Phaser.Point(940, 360), heroeOrientation.idle_left);
        this.otherHeroe = new cOtherHeroe(game, new Phaser.Point(20, 360), heroeOrientation.idle_right);

    }


}