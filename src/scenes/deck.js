//deck.js
import Phaser, { Scene } from "phaser";
import Objects from "../util/objects.js"
import entity from "../util/entity.js"
import seedrandom from 'seedrandom';


var width, height;
var centerX, centerY;
var mainFontColor, bgColor;
var mainFontFamily;

var seed, seedSize, seedIndex = 0;

var entityVar;

var seed;

var objs;

var cardArray = [];
var cardTextArray = [];
var manaTextArray = [];

var turnCount;
var player, enemy;
var deckObj;

var statsObj = [];

var someFlag = false;
let x, idx;

//const slime = new entity("Sticky Slime", 10, 10, 0, 0, 10, 10, 25, 0, 0, 'slime', 0, 0);


export default class Deck extends Phaser.Scene {

    constructor() {

        super({ key: 'deck' });

        width = window.innerWidth;
        height = window.innerHeight;
        centerX = width/2;
        centerY  = height/2;
        mainFontColor = '#ded9cc';
        bgColor = '#2e2e2e';
        mainFontFamily = 'MyCustomFont';
        turnCount = 1;
        //this.initSeed();
    }


    init(data) {
        objs = data.objsPassed;
    }



    create() {
      idx = 0;
      x = objs;
      x = x.getDeck().getCardArray();
      this.myImg = this.add.image(centerX, centerY, x[idx].spriteImage);
      this.myText = this.addClickableText(centerX, centerY+25, x[idx].ann, 'MyCustomFont', '16px', '#ded9cc').setOrigin(0.5, 0.5);
      this.myText2 = this.addClickableText(centerX, centerY-100, "Card: " + (idx+1) + "/" + x.length, 'MyCustomFont', '16px', '#ded9cc').setOrigin(0.5, 0.5);
      this.addClickableText(centerX+100, centerY+25, "NEXT", 'MyCustomFont', '16px', '#ded9cc').setOrigin(0.5, 0.5).on('pointerdown', () => this.nextClick());
      this.addClickableText(centerX-100, centerY+25, "PREV", 'MyCustomFont', '16px', '#ded9cc').setOrigin(0.5, 0.5).on('pointerdown', () => this.prevClick());
      this.addClickableText(centerX, centerY+200, "EXIT", 'MyCustomFont', '16px', '#ded9cc').setOrigin(0.5, 0.5).on('pointerdown', () => this.exitDeck());


      
    }

    exitDeck() {
      this.scene.start('fight', { objsOut: objs });
    }
      
    nextClick() {
      console.log("x: " + x.length);
      console.log("idx: " + idx);
      if (idx >= x.length-1)
        idx = -1;
      idx++;
      this.myImg.setActive(false).setVisible(false);
      this.myText.setActive(false).setVisible(false);
      this.myImg = this.add.image(centerX, centerY, x[idx].spriteImage);
      this.myText = this.addClickableText(centerX, centerY+25, x[idx].ann, 'MyCustomFont', '16px', '#ded9cc').setOrigin(0.5, 0.5);
    }

    prevClick() {
      if (idx <= 0)
        idx = x.length;
      idx--;
      this.myImg.setActive(false).setVisible(false);
      this.myText.setActive(false).setVisible(false);
      this.myImg = this.add.image(centerX, centerY, x[idx].spriteImage);
      this.myText = this.addClickableText(centerX, centerY+25, x[idx].ann, 'MyCustomFont', '16px', '#ded9cc').setOrigin(0.5, 0.5);
    }


    makeCards() {
      let baseX = 0;
      for (let i = 0; i <= 8; i++) {
        let randomNum = this.getRoll() / 100;
        let card = deckObj.getRandomCard(randomNum);



        let node = this.addImage(width*(0.185)+baseX, height*(0.85), card.spriteImage, 0.75)
          .on('pointerdown', () => this.clickCard(i, card));
        let nodeText = this.addClickableText(width*(0.185)+baseX, height*(0.85)+20, card.ann, mainFontFamily, '12px', mainFontColor).setOrigin(0.5, 0.5).on('pointerdown', () => this.clickCard(i, card));
        let manaText = this.addClickableText(width*(0.185)+baseX-26, height*(0.85)-43, card.cost, mainFontFamily, '10px', mainFontColor).setOrigin(0.5, 0.5);
        cardArray.push(node);
        cardTextArray.push(nodeText);
        manaTextArray.push(manaText);
        baseX = baseX + 85;
      }
    }


    clickCard(index, card) {
      if (player.mana >= card.cost) {
        this.executeCard(card);
        this.endButton.setActive(true).setVisible(true);
        player.mana = player.mana - card.cost;
        cardArray[index].setActive(false).setVisible(false);
        cardTextArray[index].setActive(false).setVisible(false);
        manaTextArray[index].setActive(false).setVisible(false);
      }

    }

    executeCard(c) {
      console.log(c.name);
      if (c.name == "atk") {
        let hpCalc = (c.mag + player.ap) - enemy.ad;
        if (hpCalc < 0)
          hpCalc = 0;
        if (enemy.ad > 0)
          enemy.ad--;
        enemy.hp = enemy.hp - hpCalc;
      }
      else if (c.name == "mag") {
        let hpCalc = (c.mag + player.mp) - enemy.md;
        if (hpCalc < 0)
          hpCalc = 0;
        if (enemy.md > 0)
          enemy.md--;
        enemy.hp = enemy.hp - hpCalc;
      }
    }


    clickEnd() {
      for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].setActive(false).setVisible(false);
        cardTextArray[i].setActive(false).setVisible(false);
        manaTextArray[i].setActive(false).setVisible(false);
      }
      cardArray = [];
      cardTextArray = [];
      manaTextArray = [];
      turnCount++;
      this.makeCards();
      this.endButton.setActive(false).setVisible(false);
      
    }

    ss() {
      console.log("SDFJH");
    }

    calcHealth() {
      let health = player.hp / player.maxHP;
      let eHealth = enemy.hp / enemy.maxHP;
      health = health * 10;
      health = parseInt(health);
      eHealth = eHealth * 10;
      eHealth = parseInt(eHealth);
      if (health == 0) {
        health = 1;
      }
      this.pHPSprite.setFrame(health);
      if (player.hp == 0) {
        this.pHPSprite.setFrame(0);
      }
      if (eHealth == 0) {
        eHealth = 1;
      }
      this.eHPSprite.setFrame(eHealth);
      if (enemy.hp == 0) {
        this.eHPSprite.setFrame(0);
      }
    }

    refreshStats() {
      //statsObj[1].setText(player.mana + "/" player.maxMana);
      /*
      if (someFlag == true) {
      }
      */
      statsObj[0].setText(player.hp + "/" + player.maxHP);
      statsObj[1].setText(player.mana + "/" + player.maxMana);
      statsObj[2].setText(player.ap);
      statsObj[3].setText(player.ad);
      statsObj[4].setText(player.mp);
      statsObj[5].setText(player.md);
      statsObj[6].setText(player.crit);
      statsObj[7].setText(player.critID);
      
    }

    update() {

      this.myText2.setText("Card: " + (idx+1) + "/" + x.length, 'MyCustomFont', '16px', '#ded9cc');
    }

    addImage(posX, posY, img, scale) {
      let result = this.add.image(posX, posY, img).setScale(scale)
        .setOrigin(0.5, 0.5)
        .setInteractive();

      return result;
    }

    hoverStat() {

    }

    //================================================= PHASER TEXT & IMAGE OBJECTS =================================================== 
    addClickableText(posX, posY, text, family, size, color) { // ONLY WORKS IF clickFunc has no parameters


      let result = this.add.text(posX, posY, text, { fontFamily: family, fontSize: size, fill: color })
        .setInteractive();
        //.setOrigin(0.5, 0.5)

      return result;

    }


    toggleDisplayText(textObj, selection) {
      if (selection == true) {
        textObj.setActive(true).setVisible(true);
      }
      else {
        textObj.setActive(false).setVisible(false);
      } 
    }

    //================================================= SEED FUNCTIONS =================================================== 

    initSeed() {
      seed = this.getSeed('blah blah blah');
      seedSize = this.sizeOfSeed(seed);
      console.log("initial seed: " + seed);
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


//=================================================  ===================================================    

    doNothing() {
      // This function is used as a placeholder function
    }





}
