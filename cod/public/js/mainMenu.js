var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainMenu = (function (_super) {
    __extends(mainMenu, _super);
    function mainMenu() {
        _super.apply(this, arguments);
        this.showElements = false;
    }
    mainMenu.prototype.create = function () {
        //lets add the stage
        this.game.add.sprite(0, 0, 'back');
        //inicio todos los parametros dele juego
        var controlGame = new cControlGame(this.game);
        //para medir los tiempos
        if (this.showElements == true) {
            this.game.time.advancedTiming = true;
        }
    };
    mainMenu.prototype.update = function () {
    };
    mainMenu.prototype.render = function () {
        if (this.showElements == true) {
            this.game.debug.text(this.game.time.fps.toString(), 2, 14, "#00ff00");
            //we only show xy on desktop 
            if (this.game.device.desktop == true) {
                var pos = this.game.input.activePointer.position;
                this.game.debug.text("x:" + pos.x + " y:" + pos.y, 180, 15);
            }
        }
    };
    return mainMenu;
}(Phaser.State));
