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
    //when a actor is hit
    cBasicActor.prototype.IsHit = function (damage) {
    };
    //when a actor is slowed
    cBasicActor.prototype.slowMonster = function (time) {
    };
    //when we do continues damage trow fire
    cBasicActor.prototype.addFireAtack = function (damage, speedDamage, NumberOfTimes) {
    };
    return cBasicActor;
}(Phaser.Sprite));
