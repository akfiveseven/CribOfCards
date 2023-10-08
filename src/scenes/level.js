// level.js
import Phaser, { Scene } from "phaser";
import Objects from "../util/objects.js"
import seedrandom from 'seedrandom';


var objs = new Objects();

var player, deckObj;

var width, height;

var centerX, centerY;

var seed, seedSize, seedIndex;

var objs;
var points;

var defaultStats = [];

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'level' });
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = width/2;
    centerY  = height/2;
    //player = objs.getPlayer();
  }

  init(data) {
      seed = data.seedPassed;
      seedSize = data.seedSizePassed;
      seedIndex = data.seedIndexPassed;
      objs = data.objsPassed;
      player = objs.getPlayer();
      deckObj = objs.getDeck();
  }

  create () {

      if (player.stage == 1) {
        points = 10;
        defaultStats.push(player.maxHP, player.maxMana, player.ap, player.ad, player.mp, player.md, player.crit);


        this.add.image(width*(0.15), height*(0.5), 'character').setScale(5);
        this.header = this.addClickableText(width*(0.6), height*(0.2), "Allocate " + points + " points" , '24px');
        this.hpText = this.addClickableText(width*(0.3), height*(0.4), "MAX HP:              " + player.maxHP, '24px').setOrigin(0, 0);
        this.manaText = this.addClickableText(width*(0.3), height*(0.45), "MAX MANA:            " + player.maxMana, '24px').setOrigin(0, 0);
        this.apText = this.addClickableText(width*(0.3), height*(0.5), "ATTACK POWER:       " + player.ap, '24px').setOrigin(0, 0);
        this.adText = this.addClickableText(width*(0.3), height*(0.55), "ATTACK DEFENSE:     " + player.ad, '24px').setOrigin(0, 0);
        this.mpText = this.addClickableText(width*(0.3), height*(0.6), "MAGIC POWER:        " + player.mp, '24px').setOrigin(0, 0);
        this.mdText = this.addClickableText(width*(0.3), height*(0.65), "MAGIC DEFENSE:      " + player.md, '24px').setOrigin(0, 0);
        this.critText = this.addClickableText(width*(0.3), height*(0.7), "CRIT CHANCE:        " + player.crit, '24px').setOrigin(0, 0);

        let baseY = 0.4;
        for (let i = 0; i < 7; i++) {
          this.addClickableText(width*(0.65), height*(baseY), "-", '24px')
            .on('pointerdown', () => this.minus(i))
            .setOrigin(0, 0);
          this.addClickableText(width*(0.675), height*(baseY), "+", '24px')
            .on('pointerdown', () => this.plus(i))
            .setOrigin(0, 0);
          baseY = baseY + 0.05;
        }
        this.addClickableText(width*(0.85), height*(0.85), "continue", '24px')
          .on('pointerdown', () => this.startLevel());
        //this.levelText = this.add.text(centerX, centerY, "<GOTO FIGHT>", { fontFamily: 'MyCustomFont', fontSize: '48px', fill: '#ded9cc' })
          //.setOrigin(0.5, 0.5)
          //.setInteractive()
          //.on('pointerdown', () => this.startLevel());


        console.log("Seed passed is: " + seed);
        console.log(seedSize);
        console.log(seedIndex);
      }
      else if (player.stage == 2) {
        //this.levelText.setActive(false).setVisible(false);
        this.addClickableText(centerX, height*(0.15), "You won! Pick a card.", '36px');
        let baseX = centerX-75;
        for (let i = 0; i < 2; i++) {

          let roll = this.getRoll();
          let myCard = deckObj.getRestCard(this.getRoll());
          this.add.image(baseX, centerY, myCard.spriteImage).on('pointerdown', () => this.addCard(myCard));
          this.addClickableText(baseX, centerY+25, myCard.ann, '16px').on('pointerdown', () => this.addCard(myCard));
          this.addClickableText(baseX-35, centerY-55, myCard.cost, '16px');
          baseX = baseX + 150;
        }
      }
      else {

      }






    /*
    if (player.stage == 1) {
      this.levelText = this.add.text(width*66/200, height*2/24, "Level 1", { fontFamily: 'MyCustomFont', fontSize: '128px', fill: '#ded9cc' });
      this.add.image(width/2, height/2, 'sword').setInteractive().on('pointerdown', () => this.nextThing());
      //this.versionText = this.add.text(30, height - 100, "v.0.1.10", { fontFamily: 'MyCustomFont', fontSize: '80px', fill: '#ded9cc'});
      
    }
    else if (player.stage == 2) {
      this.levelText.setText("Level 2");
    }
    */




  }

  addCard(card) {
    deckObj.pushCardToDeck(card);
    this.startLevel();
  }

  minus(idx) {
    if (points < 10) {
      if (idx == 0) {
        if (defaultStats[0] == player.maxHP)
          return;
        player.maxHP--;
        player.hp--;
      }
      else if (idx == 1) {
        if (defaultStats[1] == player.maxMana)
          return;
        player.maxMana--;
        player.mana--;
      }
      else if (idx == 2) {
        if (defaultStats[2] == player.ap)
          return;
        player.ap--;
      }
      else if (idx == 3) {
        if (defaultStats[3] == player.ad)
          return;
        player.ad--;
      }
      else if (idx == 4) {
        if (defaultStats[4] == player.mp)
          return;
        player.mp--;
      }
      else if (idx == 5) {
        if (defaultStats[5] == player.md)
          return;
        player.md--;
      }
      else if (idx == 6) {
        if (defaultStats[6] == player.crit)
          return;
        player.crit = Number(player.crit - 0.01);
      }
      points++;
    }
  }

  plus(idx) {
    if (points > 0) {
      points--;
      if (idx == 0) {
        player.maxHP++;
        player.hp++;
      }
      else if (idx == 1) {
        player.maxMana++;
        player.mana++;
      }
      else if (idx == 2)
        player.ap++;
      else if (idx == 3)
        player.ad++;
      else if (idx == 4)
        player.mp++;
      else if (idx == 5)
        player.md++;
      else if (idx == 6)
        player.crit = Number(player.crit + 0.01);

    }
  }

  addClickableText(posX, posY, text, size) { // ONLY WORKS IF clickFunc has no parameters


    let result = this.add.text(posX, posY, text, { fontFamily: 'MyCustomFont', fontSize: size, fill: '#ded9cc' })
      .setInteractive()
      .setOrigin(0.5, 0.5);

    return result;

  }

  startLevel() {
    objs.setPlayer(player);
    objs.setDeck(deckObj);
    this.scene.start('fight', { seedOut: seed, seedSizeOut: seedSize, seedIndexOut: seedIndex, objsOut: objs });

  }

  getRoll() {
    let tensDigit = this.getRandomNumberFromSeed();
    tensDigit = tensDigit * 10;
    let onesDigit = this.getRandomNumberFromSeed();
    let result = tensDigit + onesDigit;
    console.log("RESULT: " + result);
    return result;
  }

  getRandomNumberFromSeed() {
    console.log("seed pulling: " + seed);
    console.log("seed size: " + seedSize);
    console.log("seed index: " + seedIndex);
    if (seedIndex < seedSize) {
      let num1 = this.getNthDigit(seed, seedIndex);
      seedIndex = seedIndex + 1;
      console.log(seedIndex-1 + ": " + num1);
      return num1;
    }
    else {
      seed = this.reSeed(seed);
      console.log("re seed: " + seed);
      seedSize = this.sizeOfSeed(seed);
      seedIndex = 0;
      let num2 = this.getNthDigit(seed, seedIndex);
      seedIndex = seedIndex + 1;
      console.log(seedIndex-1 + ": " + num2);
      return num2;
    }
  }

  getNthDigit(number, n) {
    // Ensure n is a non-negative integer
    n = Math.floor(Math.abs(n));
    n = n + 1;
    
    // Calculate 10^n to shift the digit to the rightmost position
    const powerOfTen = Math.pow(10, n);

    // Extract the nth digit by:
    // 1. Multiplying the number by 10^n to move the desired digit to the units place
    // 2. Taking the floor of the result to remove any decimal part
    // 3. Using modulo 10 to isolate the units place digit
    const nthDigit = Math.floor(Math.abs(number) * powerOfTen) % 10;

    return nthDigit;
  }

  getSeed(inputString) {

    const seed = inputString;
    //let x = Math.random().toString();

    const generator = seedrandom(seed);

    // Generate a random number using the initialized generator
    const randomNumber = generator();


    return randomNumber;

  }

  reSeed(ogSeed) {

    const generator = seedrandom(ogSeed);
    const randomNumber = generator();
    return randomNumber;

    /*
    let myString = "0." + ogSeed.toString();
    let result = Number(myString);
    result = result * 5;
    result = result.toString().substring(2);
    result = Number(result);
    return result;
    */
  }

  sizeOfSeed(number) {
    // Convert the number to a string
    const numberString = number.toString();

    // Split the string into integer and fractional parts (if applicable)
    const parts = numberString.split('.');

    // Count the digits in the integer part
    const integerDigits = parts[0].length;

    // If there is a fractional part, add its length to the count
    let totalDigits = integerDigits;
    if (parts.length === 2) {
      totalDigits += parts[1].length;
    }

    totalDigits = totalDigits - 1;

    return totalDigits;
  }

  enableText(input) {
    input.setActive(true).setVisible(true);
  }

  disableText(input) {
    input.setActive(false).setVisible(false);
  }


  nextThing() {

    this.levelText.setActive(false).setVisible(false);


    /*
    let roll = this.getRandomNumberInRange(2);
    if (roll == 1) {
      // Fight
    }
    else if (roll == 2) {
      // Shop, Heal, Free Cards
    }
    */ 
  }

  update() {
    if (player.stage == 1) {

      this.header.setText("Allocate " + points + " points");
      this.hpText.setText("MAX HP:             " + player.maxHP);
      this.manaText.setText("MAX MANA:           " + player.maxMana);
      this.apText.setText("ATTACK POWER:       " + player.ap);
      this.adText.setText("ATTACK DEFENSE:     " + player.ad);
      this.mpText.setText("MAGIC POWER:        " + player.mp, '24px');
      this.mdText.setText("MAGIC DEFENSE:      " + player.md, '24px');
      this.critText.setText("CRIT CHANCE:        " + Math.round(player.crit * 100) / 100, '24px');
    }
  }


  // Returns a random number from 1 to range specified
  getRandomNumberInRange(range) {
    return Math.floor(Math.random() * range) + 1;
  }

}
