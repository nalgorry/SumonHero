class cSpellData {

    public id:number;
    public possInSheet:number;
    public coolDownTimeSec:number;
    public heroeText:string;
    public durationSec:number;
    public hasCallBack:boolean;
    

    constructor(JSONData:any) {

        this.id = JSONData.id;
        this.possInSheet = JSONData.possInSheet;
        this.coolDownTimeSec = JSONData.coolDownTimeSec;
        this.heroeText = JSONData.heroeText;
        this.durationSec = JSONData.durationSec;
        this.hasCallBack = JSONData.hasCallBack;

    }

}