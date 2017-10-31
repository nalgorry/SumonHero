var cControlCristals = (function () {
    function cControlCristals(game) {
        this.game = game;
        this.arrayCristals = []; //to store all the cristals to do the checks
        this.initCristals();
    }
    cControlCristals.prototype.initCristals = function () {
        var oneQuarterPoss = 1150;
        var oneQuarterCenterPoss = 780;
        var centerPoss = oneQuarterCenterPoss * 2;
        //lets init the blue cristal of the player
        this.arrayCristals.push(new cCristals(this.game, 56, 340, cristalColor.blue_cristal, 4 /* allOptions */, 0));
        this.arrayCristals.push(new cCristals(this.game, 244, 216, cristalColor.blue_cristal, 0 /* up */, oneQuarterPoss));
        this.arrayCristals.push(new cCristals(this.game, 244, 278, cristalColor.blue_cristal, 2 /* upS */, oneQuarterCenterPoss));
        this.arrayCristals.push(new cCristals(this.game, 244, 386, cristalColor.blue_cristal, 3 /* downS */, oneQuarterCenterPoss));
        this.arrayCristals.push(new cCristals(this.game, 244, 458, cristalColor.blue_cristal, 1 /* down */, oneQuarterPoss));
        //lets init the red cristals of the other player
        this.arrayCristals.push(new cCristals(this.game, 894, 338, cristalColor.red_cristal, 0 /* up */, 0));
        this.arrayCristals.push(new cCristals(this.game, 720, 220, cristalColor.red_cristal, 0 /* up */, oneQuarterPoss));
        this.arrayCristals.push(new cCristals(this.game, 720, 278, cristalColor.red_cristal, 2 /* upS */, oneQuarterCenterPoss));
        this.arrayCristals.push(new cCristals(this.game, 720, 386, cristalColor.red_cristal, 3 /* downS */, oneQuarterCenterPoss));
        this.arrayCristals.push(new cCristals(this.game, 720, 458, cristalColor.red_cristal, 1 /* down */, oneQuarterPoss));
        //finaly the white ones
        this.arrayCristals.push(new cCristals(this.game, 480, 176, cristalColor.white_cristal, 0 /* up */, centerPoss));
        this.arrayCristals.push(new cCristals(this.game, 480, 334, cristalColor.white_cristal, 2 /* upS */, centerPoss));
        this.arrayCristals.push(new cCristals(this.game, 480, 502, cristalColor.white_cristal, 1 /* down */, centerPoss));
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
    return cControlCristals;
}());
