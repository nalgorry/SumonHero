class cMonsterData {

    public id:number;
    public monsterName:string;
    public tilePoss:number;
    public color:string;
    public atack:number;
    public defence:number;
    public maxLife:number;
    public maxSpeed:number;
    public special:string;
    public atackSpeed:number;
    public atackType:number;
    public hitRange:number;
    public weaponTilePoss:number;
    public weaponX:number;
    public weaponY:number;


    constructor(JSONData:any) {

        this.id = JSONData.id;
        this.monsterName = JSONData.id;
        this.tilePoss = JSONData.tilePoss;
        this.color = JSONData.color;
        this.atack = JSONData.atack;
        this.defence = JSONData.defence;
        this.maxSpeed = JSONData.maxSpeed;
        this.maxLife = JSONData.life;
        this.special = JSONData.special;
        this.atackSpeed = JSONData.atackSpeed;
        this.atackType = JSONData.atackType;
        this.hitRange = JSONData.hitRange;
        this.weaponTilePoss = JSONData.weaponTilePoss;
        this.weaponX = JSONData.weaponX;
        this.weaponY = JSONData.weaponY;

    }

}