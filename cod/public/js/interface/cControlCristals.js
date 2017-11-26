var cControlCristals = (function () {
    function cControlCristals(game, controlInterfase) {
        this.game = game;
        this.controlInterfase = controlInterfase;
        this.arrayCristals = []; //to store all the cristals to do the checks
        this.arrayShareCristals = [];
        this.numBlueCristals = 4;
        this.initCristals();
    }
    cControlCristals.prototype.initCristals = function () {
        var oneQuarterPoss = 1150;
        var oneQuarterCenterPoss = 780;
        var centerPoss = 2400;
        //lets init the blue cristal of the player
        this.arrayCristals.push(new cCristals(this.game, 56, 340, cristalColor.blue_cristal, 4 /* allOptions */, 0, 1 /* heroeCristal */));
        this.arrayCristals.push(new cCristals(this.game, 244, 216, cristalColor.blue_cristal, 0 /* up */, oneQuarterPoss, 2 /* fixedCristal */));
        this.arrayCristals.push(new cCristals(this.game, 244, 278, cristalColor.blue_cristal, 2 /* upS */, oneQuarterCenterPoss, 2 /* fixedCristal */));
        this.arrayCristals.push(new cCristals(this.game, 244, 386, cristalColor.blue_cristal, 3 /* downS */, oneQuarterCenterPoss, 2 /* fixedCristal */));
        this.arrayCristals.push(new cCristals(this.game, 244, 458, cristalColor.blue_cristal, 1 /* down */, oneQuarterPoss, 2 /* fixedCristal */));
        //lets init the red cristals of the other player
        this.arrayCristals.push(new cCristals(this.game, 894, 338, cristalColor.red_cristal, 0 /* up */, 0, 4 /* enemyCristal */));
        this.arrayCristals.push(new cCristals(this.game, 720, 220, cristalColor.red_cristal, 0 /* up */, oneQuarterPoss, 4 /* enemyCristal */));
        this.arrayCristals.push(new cCristals(this.game, 720, 278, cristalColor.red_cristal, 2 /* upS */, oneQuarterCenterPoss, 4 /* enemyCristal */));
        this.arrayCristals.push(new cCristals(this.game, 720, 386, cristalColor.red_cristal, 3 /* downS */, oneQuarterCenterPoss, 4 /* enemyCristal */));
        this.arrayCristals.push(new cCristals(this.game, 720, 458, cristalColor.red_cristal, 1 /* down */, oneQuarterPoss, 4 /* enemyCristal */));
        //finaly the white ones
        var cristal_1 = new cCristals(this.game, 480, 176, cristalColor.white_cristal, 0 /* up */, centerPoss, 3 /* centerCristal */);
        var cristal_2 = new cCristals(this.game, 480, 334, cristalColor.white_cristal, 2 /* upS */, centerPoss, 3 /* centerCristal */);
        var cristal_3 = new cCristals(this.game, 480, 502, cristalColor.white_cristal, 1 /* down */, centerPoss, 3 /* centerCristal */);
        this.arrayCristals.push(cristal_1);
        this.arrayCristals.push(cristal_2);
        this.arrayCristals.push(cristal_3);
        this.arrayShareCristals.push(cristal_1);
        this.arrayShareCristals.push(cristal_2);
        this.arrayShareCristals.push(cristal_3);
    };
    //when the user get a card
    cControlCristals.prototype.activateBlueCristals = function () {
        this.arrayCristals.forEach(function (cristal) {
            cristal.lightBlueCristal();
        });
    };
    //when the user drop a card
    cControlCristals.prototype.turnOffBlueCristals = function () {
        this.arrayCristals.forEach(function (cristal) {
            cristal.turnOffCristal();
        });
    };
    //when we check if the card was release over the cristal
    cControlCristals.prototype.checkRelease = function () {
        var selCristal = undefined;
        //lets check every cristal if it is close enough
        this.arrayCristals.forEach(function (cristal) {
            if (cristal.checkDistance() == true) {
                selCristal = cristal;
            }
        });
        return selCristal;
    };
    cControlCristals.prototype.changeCristalColor = function (cristal, color) {
        cristal.changeCristalColor(color);
        //lets update the number of cristal we have 
        if (color = cristalColor.blue_cristal) {
            this.numBlueCristals++;
        }
        else {
            this.numBlueCristals--;
        }
        this.controlInterfase.updateManaSpeed(this.numBlueCristals);
    };
    return cControlCristals;
}());
