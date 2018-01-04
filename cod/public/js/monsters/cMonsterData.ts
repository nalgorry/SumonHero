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
    public hitRange:number;
    public weaponTilePoss:number;
    public weaponX:number;
    public weaponY:number;
    public areaHitRange:number;
    public manaCost:number;
    public respawnTime:number;
    public weaponAngle:number;
    public firstAtack:boolean;
    public special_1:string; //some moster have special habilites that need this specials
    public special_2:string;
    public special_3:string;


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
        this.hitRange = JSONData.hitRange;
        this.weaponTilePoss = JSONData.weaponTilePoss;
        this.weaponX = JSONData.weaponX;
        this.weaponY = JSONData.weaponY;
        this.areaHitRange = JSONData.areaHitRange;
        this.manaCost = JSONData.manaCost;
        this.respawnTime = JSONData.respawnTime;
        this.weaponAngle = JSONData.weaponAngle;
        this.firstAtack = JSONData.firstAtack;
        this.special_1 = JSONData.special_1;
        this.special_2 = JSONData.special_2;
        this.special_3 = JSONData.special_3;

    }

}
