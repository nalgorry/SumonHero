var cControlInterface = (function () {
    function cControlInterface(game) {
        this.game = game;
        this.arrayCardsSel = [];
        this.initCards();
    }
    cControlInterface.prototype.initCards = function () {
        //lets start all the monsters cards
        var card = new cControlCards(this.game);
    };
    return cControlInterface;
}());
