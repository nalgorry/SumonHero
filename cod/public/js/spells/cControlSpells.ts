class cControlSpells {

    public arrayselSpells:cSpell[] = [];
    public SpellData:cSpellData[] = []; //to store the data of the spell
    private cristalCallBack:Phaser.SignalBinding;


    constructor (public game:Phaser.Game, 
        public controlMonsters:cControlMonsters,
        public controlHeroes:cControlHeroes,
        public controlCristals:cControlCristals) {
        
        this.readSpellsData();

        this.createnumSpells();

    }

    private readSpellsData() {

        var phaserJSON = this.game.cache.getJSON('spellData');

        phaserJSON.spellData.forEach(element => {
            this.SpellData[element.id] = new cSpellData(element);
        });

    }

    public restartPowers() {

        this.arrayselSpells.forEach(spell => {
            spell.coolDownFinish();
        });

    }

    private createnumSpells() {

        var gameWidth:number = this.game.width;
        
        this.arrayselSpells = new Array<cSpell>();

        //to poss the spells
        var y = 600;
        var x = 800;
        var xSpace = 150;

        //hechizo 1
        var newSpell:cSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(x + xSpace * 0, y), this.SpellData[enumSpells.direct_kill]);
        
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick,this);
     
        //hechizo 2
        var newSpell:cSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(x + xSpace * 1, y), this.SpellData[enumSpells.heal_monsters]);
        
        this.arrayselSpells.push(newSpell); 
        newSpell.signalSpellSel.add(this.spellClick,this);          

        //hechizo 3
        var newSpell:cSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(x + xSpace * 2, y), this.SpellData[enumSpells.shield]);
        
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick,this);                

    }

    public spellClick(sender:cSpell) {

        this.heroeAnimation(sender);

        switch (sender.data.id) {
            case enumSpells.direct_kill:
                this.controlCristals.spellAtackLine();
                this.cristalCallBack = this.controlCristals.cristalClick.add(this.cristalClick, this,null, sender);
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

    public cristalClick(cristal:cCristals, spell:cSpell) {
        
        if (cristal != undefined) {
            
            //lets destroy all in the line of this spell
            this.controlMonsters.spellAtackLine(cristal.getCristalPath())

            //lets put the spell on coll dawn 
            spell.spellColdDown();
        }

        this.cristalCallBack.detach();
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