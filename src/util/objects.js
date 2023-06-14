import entity from "./entity.js"
import cards from "./cards.js"

export default class Objects {

  getPlayer() {
    return playerObject;
  }

  getDeck() {
    return deckObject;
  }

}


// name, currHP, maxHP, currMana, maxMana, attackPower, magicPower, attackDefense, magicDefense, critChance, spriteString, gold, stage, critID

const playerObject = new entity("PLAYER", 100, 100, 150, 150, 5, 35, 3, 5, 0.25, 'character', 0, 1, 1);

const deckObject = new cards();
