var cSpellData = (function () {
    function cSpellData(JSONData) {
        this.id = JSONData.id;
        this.possInSheet = JSONData.possInSheet;
        this.coolDownTimeSec = JSONData.coolDownTimeSec;
        this.heroeText = JSONData.heroeText;
        this.durationSec = JSONData.durationSec;
        this.hasCallBack = JSONData.hasCallBack;
    }
    return cSpellData;
}());
