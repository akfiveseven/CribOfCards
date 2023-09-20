//fight.js
import Phaser, { Scene } from "phaser";
import seedrandom from 'seedrandom';


var width, height;
var centerX, centerY;
var mainFontColor, bgColor;
var mainFontFamily;

var seed, seedSize, seedIndex = 0;

var entityVar;

var seed;


export default class Fight extends Phaser.Scene {

    constructor() {

        super({ key: 'fight' });

        width = window.innerWidth;
        height = window.innerHeight;
        centerX = width/2;
        centerY  = height/2;
        mainFontColor = '#ded9cc';
        bgColor = '#2e2e2e';
        mainFontFamily = 'MyCustomFont';
        //this.initSeed();
    }

    init(data) {
        //entityVar = data.playerEn;
        seed = data.seedOut;
        seedSize = data.seedSizeOut;
        seedIndex = data.seedIndexOut;
    }



    create() {
      console.log("fight seed passed: " + seed);
      console.log(seedSize);
      console.log(seedIndex);


      this.addClickableText(centerX, centerY, "<GET RANDOM>", mainFontFamily, '48px', mainFontColor).on('pointerdown', () => this.getRandomNumberFromSeed() );
      this.addClickableText(centerX, centerY-300, "<GOTO LEVEL>", mainFontFamily, '48px', mainFontColor).on('pointerdown', () => this.scene.start('level', { seedPassed: seed, seedSizePassed: seedSize, seedIndexPassed: seedIndex }) );

      this.addClickableText(centerX-50, centerY, "hello", mainFontFamily, '36px', mainFontColor);
      
 
      //==============================
      //this.someText = this.addClickableText(centerX, centerY, "Get random num from seed (output in console)", mainFontFamily, '16px', mainFontColor, this.getRandomNumberFromSeed ).on('pointerdown', () => this.getRandomNumberFromSeed() );
      
    }
    ss() {
      console.log("SDFJH");
    }

    update() {

    }

    //================================================= PHASER TEXT & IMAGE OBJECTS =================================================== 
    addClickableText(posX, posY, text, family, size, color, func) { // ONLY WORKS IF clickFunc has no parameters


      let result = this.add.text(posX, posY, text, { fontFamily: family, fontSize: size, fill: color })
        .setOrigin(0.5, 0.5)
        .setInteractive();

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
