var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cThisHeroe = (function (_super) {
    __extends(cThisHeroe, _super);
    function cThisHeroe(game, initPos, orientation) {
        _super.call(this, game, initPos, orientation);
    }
    return cThisHeroe;
}(cBasicHeroe));
