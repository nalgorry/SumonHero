var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cOtherHeroe = (function (_super) {
    __extends(cOtherHeroe, _super);
    function cOtherHeroe(game, initPos, orientation, gameInterface) {
        _super.call(this, game, initPos, orientation);
        this.game = game;
        this.gameInterface = gameInterface;
        this.enemyIA = new cEnemyIA(game, gameInterface);
    }
    return cOtherHeroe;
}(cBasicHeroe));
