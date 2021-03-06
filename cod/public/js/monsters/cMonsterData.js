var cMonsterData = (function () {
    function cMonsterData(JSONData) {
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
    return cMonsterData;
}());
