class cSpellData {

    public id:number;
    public possInSheet:number;
    public coolDownTimeSec:number;
    public heroeText:string;
    

    constructor(JSONData:any) {

        this.id = JSONData.id;
        this.possInSheet = JSONData.possInSheet;
        this.coolDownTimeSec = JSONData.coolDownTimeSec;
        this.heroeText = JSONData.heroeText;

    }

}