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
        this.atackType = JSONData.atackType;
        this.hitRange = JSONData.hitRange;
        this.weaponTilePoss = JSONData.weaponTilePoss;
        this.weaponX = JSONData.weaponX;
        this.weaponY = JSONData.weaponY;
        this.areaHitRange = JSONData.areaHitRange;
        this.manaCost = JSONData.manaCost;
        this.respawnTime = JSONData.respawnTime;
    }
    return cMonsterData;
}());
