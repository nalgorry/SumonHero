var cControlCristals = (function () {
    function cControlCristals(game, controlInterfase) {
        this.game = game;
        this.controlInterfase = controlInterfase;
        this.arrayCristals = []; //to store all the cristals to do the checks
        this.arrayShareCristals = [];
        this.arrayEnemyCristals = [];
        this.numBlueCristals = 4;
        this.cristalClick = new Phaser.Signal();
        this.initCristals();
    }
    cControlCristals.prototype.initCristals = function () {
        var oneQuarterPoss = 1600;
        var oneQuarterSPoss = 1200;
        var centerPoss = 3200;
        //lets init the blue cristal of the player
        this.arrayCristals.push(new cCristals(this.game, 100, 325, cristalColor.blue_cristal, 4 /* allOptions */, 0, 1 /* heroeCristal */));
        this.arrayCristals.push(new cCristals(this.game, 260, 195, cristalColor.blue_cristal, 0 /* up */, oneQuarterPoss, 2 /* fixedCristal */));
        this.arrayCristals.push(new cCristals(this.game, 260, 270, cristalColor.blue_cristal, 2 /* upS */, oneQuarterSPoss, 2 /* fixedCristal */));
        this.arrayCristals.push(new cCristals(this.game, 260, 374, cristalColor.blue_cristal, 3 /* downS */, oneQuarterSPoss, 2 /* fixedCristal */));
        this.arrayCristals.push(new cCristals(this.game, 260, 452, cristalColor.blue_cristal, 1 /* down */, oneQuarterPoss, 2 /* fixedCristal */));
        //lets init the red cristals of the other player
        var cristal_enemy1 = new cCristals(this.game, 1184, 325, cristalColor.red_cristal, 4 /* allOptions */, 0, 4 /* enemyCristal */);
        var cristal_enemy2 = new cCristals(this.game, 1020, 200, cristalColor.red_cristal, 0 /* up */, oneQuarterPoss, 4 /* enemyCristal */);
        var cristal_enemy3 = new cCristals(this.game, 1020, 268, cristalColor.red_cristal, 2 /* upS */, oneQuarterSPoss, 4 /* enemyCristal */);
        var cristal_enemy4 = new cCristals(this.game, 1020, 376, cristalColor.red_cristal, 3 /* downS */, oneQuarterSPoss, 4 /* enemyCristal */);
        var cristal_enemy5 = new cCristals(this.game, 1020, 453, cristalColor.red_cristal, 1 /* down */, oneQuarterPoss, 4 /* enemyCristal */);
        //finaly the white ones
        var cristal_1 = new cCristals(this.game, 642, 100, cristalColor.white_cristal, 0 /* up */, centerPoss, 3 /* centerCristal */);
        var cristal_2 = new cCristals(this.game, 642, 325, cristalColor.white_cristal, 5 /* centerOfMap */, centerPoss, 3 /* centerCristal */);
        var cristal_3 = new cCristals(this.game, 642, 545, cristalColor.white_cristal, 1 /* down */, centerPoss, 3 /* centerCristal */);
        this.arrayCristals.push(cristal_1);
        this.arrayCristals.push(cristal_2);
        this.arrayCristals.push(cristal_3);
        this.arrayCristals.push(cristal_enemy1);
        this.arrayCristals.push(cristal_enemy2);
        this.arrayCristals.push(cristal_enemy3);
        this.arrayCristals.push(cristal_enemy4);
        this.arrayCristals.push(cristal_enemy5);
        this.arrayEnemyCristals.push(cristal_enemy1);
        this.arrayEnemyCristals.push(cristal_enemy2);
        this.arrayEnemyCristals.push(cristal_enemy3);
        this.arrayEnemyCristals.push(cristal_enemy4);
        this.arrayEnemyCristals.push(cristal_enemy5);
        this.arrayShareCristals.push(cristal_1);
        this.arrayShareCristals.push(cristal_2);
        this.arrayShareCristals.push(cristal_3);
    };
    //when the user get a card
    cControlCristals.prototype.activateBlueCristals = function () {
        this.arrayCristals.forEach(function (cristal) {
            cristal.lightBlueCristal();
        });
        //lets activate the mouse call back to know when to release the monster
        this.game.input.addMoveCallback(this.mouseMoveWithCard, this);
    };
    cControlCristals.prototype.mouseMoveWithCard = function () {
        var cristal = this.checkRelease(new Phaser.Point(this.game.input.x, this.game.input.y), false);
        if (cristal != undefined) {
            cristal.setMouseOverColor();
            this.lastCristalOnMouse = cristal;
        }
        else {
            if (this.lastCristalOnMouse != undefined) {
                this.lastCristalOnMouse.resetMouseOverColor();
                this.lastCristalOnMouse = undefined;
            }
        }
    };
    //when the user drop a card
    cControlCristals.prototype.turnOffBlueCristals = function () {
        this.arrayCristals.forEach(function (cristal) {
            cristal.turnOffCristal();
        });
    };
    cControlCristals.prototype.spellClicked = function () {
        //lets activate the cristals
        this.activateBlueCristals();
        this.eventCristalClick = this.game.input.onDown.add(this.spellLineCristalSel, this);
    };
    cControlCristals.prototype.spellLineCristalSel = function () {
        this.eventCristalClick.detach();
        var cristalClick = this.checkRelease(new Phaser.Point(this.game.input.x, this.game.input.y), true);
        this.turnOffBlueCristals();
        this.cristalClick.dispatch(cristalClick);
    };
    //when we check if the card was release over the cristal
    cControlCristals.prototype.checkRelease = function (point, desactivateMouseEvent) {
        var selCristal = undefined;
        //lets check every cristal if it is close enough
        this.arrayCristals.forEach(function (cristal) {
            if (cristal.checkDistance(point) == true) {
                selCristal = cristal;
            }
        });
        //desactivate the call back of the cristals
        if (desactivateMouseEvent) {
            this.game.input.deleteMoveCallback(this.mouseMoveWithCard, this);
            this.lastCristalOnMouse = undefined;
        }
        return selCristal;
    };
    cControlCristals.prototype.changeCristalColor = function (cristal, color) {
        //lets check if we really need to change the color of the cristal
        if (cristal.color == color) {
            return;
        }
        cristal.changeCristalColor(color);
        //lets update the number of cristal we have 
        if (color == cristalColor.blue_cristal) {
            this.numBlueCristals++;
        }
        else {
            this.numBlueCristals--;
        }
        this.controlInterfase.updateManaSpeed(this.numBlueCristals);
    };
    cControlCristals.prototype.restartCristals = function () {
        var _this = this;
        //lets restart the white cristals
        this.arrayShareCristals.forEach(function (cristal) {
            _this.changeCristalColor(cristal, cristalColor.white_cristal);
        });
        this.controlInterfase.updateManaSpeed(this.numBlueCristals);
    };
    return cControlCristals;
}());
