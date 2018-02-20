class mainMenu extends Phaser.State {

    showElements = true;
 
    create() {

        //lets add the stage
        this.game.add.sprite(0,0,'back');
        
        //inicio todos los parametros dele juego
        var controlGame = new cControlGame(this.game);

        //para medir los tiempos
        if (this.showElements == true) {
            this.game.time.advancedTiming = true;
        }

    }

    update() {
               
    }


    render() {

        if (this.showElements == true) {
            

            this.game.debug.text(this.game.time.fps.toString(), 2, 14, "#00ff00");
            
            //we only show xy on desktop 
            if (this.game.device.desktop == true) {
                var pos = this.game.input.activePointer.position;
                this.game.debug.text("x:" + pos.x + " y:" + pos.y, 180, 15);
            }
        }

    }
 
}