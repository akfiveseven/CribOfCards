export default class entity {
    constructor(name, currHP, maxHP, currMana, maxMana, attackPower, magicPower, attackDefense, magicDefense, critChance, spriteString, gold, stage, critID) {
        this.name = name;
        this.hp = currHP;
        this.maxHP = maxHP;
        this.mana = currMana;
        this.maxMana = maxMana;
        this.ap = attackPower;
        this.mp = magicPower;
        this.ad = attackDefense;
        this.md = magicDefense;
        this.crit = critChance;
        this.img = spriteString;
        this.gold = gold;
        this.stage = stage;
        this.critID = critID;
    }

    getPlayer() { return playerObject; }
}

const playerObject = new entity("PLAYER", 100, 100, 150, 150, 5, 35, 3, 5, 0.25, 'character', 0, 1, 1);