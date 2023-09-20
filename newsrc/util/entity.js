

// name, currHP, maxHP, currMana, maxMana, attackPower, magicPower, attackDefense, magicDefense, critChance, sprite, gold, stage


//const slime = new entity("Sticky Slime", 10, 10, 0, 0, 10, 10, 25, 0, 0, 'slime', 0, 0);

//const cat = new entity("Black Cat", 10, 10, 0, 0, 'cat', 0, 0);

export default class entity {

    // name
    // current hp
    // max hp
    // current mana
    // max mana
    // attack strength
    // ability power
    // armor (attack defense)
    // magic resist (magic defense)
    // critical hit chance
    // sprite image
    // gold
    // stage

  // name, currHP, maxHP, currMana, maxMana, attackPower, magicPower, attackDefense, magicDefense, critChance, spriteString, gold, stage, critID

    constructor(name, currHP, maxHP, currMana, maxMana, attackPower, magicPower, attackDefense, magicDefense, critChance, spriteString, gold, stage, critID) {
        this.name = name;
        this.hp = currHP;
        this.maxHP = maxHP;
        this.mana = currMana;
        this.maxMana = maxMana;
        this.ap = attackPower
        this.mp = magicPower;
        this.ad = attackDefense;
        this.md = magicDefense;
        this.crit = critChance;
        this.img = spriteString;
        this.gold = gold;
        this.stage = stage;
        this.critID = critID;
    }


    // getEnemy(specification) {
    //     if (specification == 0) { // slime
    //         return slime;
    //     }
    //     else if (specification == 1) { // cat
    //         return cat;
    //     }
    //     else if (specification == 2) { // octo

    //     }
    //     else if (specification == 3) { // bider

    //     }
    // }



}



