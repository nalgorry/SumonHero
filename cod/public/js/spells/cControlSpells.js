var cControlSpells = (function () {
    function cControlSpells(game, controlMonsters, controlHeroes) {
        this.game = game;
        this.controlMonsters = controlMonsters;
        this.controlHeroes = controlHeroes;
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
    cControlSpells.prototype.createnumSpells = function () {
        var gameWidth = this.game.width;
        this.arrayselSpells = new Array();
        //hechizo 1
        var newSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(930 + 110 * 0, 620), this.SpellData[enumSpells.direct_kill]);
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick, this);
        //hechizo 2
        var newSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(930 + 110 * 1, 620), this.SpellData[enumSpells.heal_monsters]);
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick, this);
        //hechizo 3
        var newSpell = new cSpell(this.game);
        newSpell.iniciateSpell(new Phaser.Point(930 + 110 * 2, 620), this.SpellData[enumSpells.shield]);
        this.arrayselSpells.push(newSpell);
        newSpell.signalSpellSel.add(this.spellClick, this);
    };
    cControlSpells.prototype.spellClick = function (sender) {
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
