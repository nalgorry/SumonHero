class cControlSpells {

    public arrayselSpells: Array<cSpell>;
    public SpellData:cSpellData[] = []; //to store the data of the spell


    constructor (public game:Phaser.Game, 
        public controlMonsters:cControlMonsters,
        public controlHeroes:cControlHeroes) {
        
        this.readSpellsData();

        this.createnumSpells();
    }

    private readSpellsData() {

        var phaserJSON = this.game.cache.getJSON('spellData');

        phaserJSON.spellData.forEach(element => {
            this.SpellData[element.id] = new cSpellData(element);
        });

    }

    private createnumSpells() {

        var gameWidth:number = this.game.width;
        
        this.arrayselSpells = new Array<cSpell>();

        //hechizo 1
        var newSpell:cSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(930 + 110 * 0, 620), this.SpellData[enumSpells.direct_kill]);
        
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick,this);
     
        //hechizo 2
        var newSpell:cSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(930 + 110 * 1, 620), this.SpellData[enumSpells.heal_monsters]);
        
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick,this);          

        //hechizo 3
        var newSpell:cSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(930 + 110 * 2, 620), this.SpellData[enumSpells.shield]);
        
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick,this);                

    }

    public spellClick(sender:cSpell) {

        this.heroeAnimation(sender);

        switch (sender.data.id) {
            case enumSpells.direct_kill:
                this.controlMonsters.spellDirectKill();
                break;
            case enumSpells.heal_monsters:
                this.controlMonsters.spellHealMonsters();
                break;
            case enumSpells.shield:
                this.controlMonsters.spellShieldMonsters(sender.data);
            default:
                break;
        }
        
    }

    private heroeAnimation(sender:cSpell) {

        //lets make the heroe do something cool when a spell is activated
        this.controlHeroes.heroe.animateSpell();

        //create the text that show what the heroe do
        var text = new cControlShowUpText(this.game, 25, 300, sender.data.heroeText);
    }


}

enum enumSpells {
    direct_kill = 1, 
    heal_monsters = 2,
    shield =3,
}