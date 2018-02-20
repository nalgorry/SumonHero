var cControlSpells = (function () {
    function cControlSpells(game, controlMonsters, controlHeroes, controlCristals) {
        this.game = game;
        this.controlMonsters = controlMonsters;
        this.controlHeroes = controlHeroes;
        this.controlCristals = controlCristals;
        this.arrayselSpells = [];
        this.SpellData = []; //to store the data of the spell
        this.readSpellsData();
        this.createnumSpells();
    }
    cControlSpells.prototype.readSpellsData = function () {
        var _this = this;
        var phaserJSON = this.game.cache.getJSON('spellData');
        phaserJSON.spellData.forEach(function (element) {
            _this.SpellData[element.id] = new cSpellData(element);
        });
    };
    cControlSpells.prototype.restartPowers = function () {
        this.arrayselSpells.forEach(function (spell) {
            spell.coolDownFinish();
        });
    };
    cControlSpells.prototype.createnumSpells = function () {
        var gameWidth = this.game.width;
        this.arrayselSpells = new Array();
        //to poss the spells
        var y = 600;
        var x = 900;
        var xSpace = 150;
        //hechizo 1
        var newSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(x + xSpace * 0, y), this.SpellData[enumSpells.direct_kill]);
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick, this);
        //hechizo 2
        var newSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(x + xSpace * 1, y), this.SpellData[enumSpells.shield]);
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick, this);
        //hechizo 3
        //var newSpell:cSpell = new cSpell(this.game);
        //newSpell.iniciateSpell(new Phaser.Point(x + xSpace * 2, y), this.SpellData[enumSpells.heal_monsters]);
        //this.arrayselSpells.push(newSpell);
        //newSpell.signalSpellSel.add(this.spellClick,this);                
    };
    cControlSpells.prototype.spellClick = function (sender) {
        this.heroeAnimation(sender);
        switch (sender.data.id) {
            case enumSpells.direct_kill:
                this.controlCristals.spellClicked();
                this.cristalCallBack = this.controlCristals.cristalClick.add(this.cristalClickAtack, this, null, sender);
                break;
            case enumSpells.shield:
                this.controlCristals.spellClicked();
                this.cristalCallBack = this.controlCristals.cristalClick.add(this.cristalClickDefend, this, null, sender);
                break;
            case enumSpells.heal_monsters:
            //this.controlMonsters.spellHealMonsters();
            default:
                break;
        }
    };
    cControlSpells.prototype.cristalClickAtack = function (cristal, spell) {
        //lets destroy all in the line of this spell
        this.controlMonsters.spellAtackLine(cristal.getCristalPath());
        //lets put the spell on coll dawn 
        spell.spellColdDown();
        this.cristalCallBack.detach();
    };
    cControlSpells.prototype.cristalClickDefend = function (cristal, spell) {
        this.controlMonsters.spellShieldMonsters(spell.data, cristal.getCristalPath());
        //lets put the spell on coll dawn 
        spell.spellColdDown();
        this.cristalCallBack.detach();
    };
    cControlSpells.prototype.heroeAnimation = function (sender) {
        //lets make the heroe do something cool when a spell is activated
        this.controlHeroes.heroe.animateSpell();
        //create the text that show what the heroe do
        var text = new cControlShowUpText(this.game, 25, 300, sender.data.heroeText);
    };
    return cControlSpells;
}());
var enumSpells;
(function (enumSpells) {
    enumSpells[enumSpells["direct_kill"] = 1] = "direct_kill";
    enumSpells[enumSpells["heal_monsters"] = 2] = "heal_monsters";
    enumSpells[enumSpells["shield"] = 3] = "shield";
})(enumSpells || (enumSpells = {}));
