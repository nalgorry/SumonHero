var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cBasicActor = (function (_super) {
    __extends(cBasicActor, _super);
    function cBasicActor() {
        _super.apply(this, arguments);
    }
    cBasicActor.prototype.IsHit = function (damage) {
        console.log("esto lo hace cada clase");
    };
    return cBasicActor;
}(Phaser.Sprite));
