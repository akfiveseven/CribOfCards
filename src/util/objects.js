import entity from "./entity.js"
import cards from "./cards.js"

var playerObject, enemyObject;

var deckObject;

export default class Objects {

    constructor() {
        playerObject = new entity("PLAYER", 100, 100, 150, 150, 5, 35, 3, 5, 0.25, 'character', 0, 1, 1);
        enemyObject = new entity("Sticky Slime", 100, 100, 0, 0, 10, 10, 25, 0, 0, 'slime', 0, 0);
        deckObject = new cards();
    }


    getPlayer() {
        return playerObject;
    }

    getEnemy() {
        return enemyObject;
    }


    getDeck() {
        return deckObject;
    }

    setPlayer(input) {
        playerObject = input;
    }

    setEnemy(input) {
        enemyObject = input;
    }

    setDeck(input) {
        deckObject = input;
    }

}


// name, currHP, maxHP, currMana, maxMana, attackPower, magicPower, attackDefense, magicDefense, critChance, spriteString, gold, stage, critID

