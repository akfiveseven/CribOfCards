//fight.js
import Phaser, { Scene } from "phaser";
import seedrandom from 'seedrandom';
import html from "../util/seedform.html";


var width, height;
var centerX, centerY;
var mainFontColor, bgColor;
var mainFontFamily;


var seed, seedSize, seedIndex = 0;



export default class Fight extends Phaser.Scene {

    constructor() {

        super({ key: 'fight' });

    }

    preload() {
      this.initSeed();

      this.load.html('seedSelect', html);


      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width/2;
      centerY  = height/2;
      mainFontColor = '#ded9cc';
      bgColor = '#2e2e2e';
      mainFontFamily = 'MyCustomFont';

    }

    create() {

      const inputField = this.add.dom(centerX, centerY, 'input', 'background-color: white;');
      inputField.node.setAttribute('placeholder', 'Seed String');


      const submitButton = this.add.dom(centerX, centerY-200, 'button', '', 'Submit');

      submitButton.node.setAttribute('type', 'submit');

      
      
      submitButton.node.addEventListener('click', function () {
        const inputValue = inputField.node.value;
  
        console.log("Input value:", inputValue);
      });
      
    

      

      

      



     
 

      //this.someText = this.addClickableText(centerX, centerY, "Get random num from seed (output in console)", mainFontFamily, '16px', mainFontColor, this.getRandomNumberFromSeed ).on('pointerdown', () => this.getRandomNumberFromSeed() );
      
    }


    addClickableText(posX, posY, text, family, size, color) { // ONLY WORKS IF clickFunc has no parameters


      let result = this.add.text(posX, posY, text, { fontFamily: family, fontSize: size, fill: color })
        .setOrigin(0.5, 0.5)
        .setInteractive();

      return result;

    }

    getRandomNumberFromSeed() {
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
    
    update() {

    }

    initSeed() {
      seed = this.getSeed('blah blah blah');
      seedSize = this.sizeOfSeed(seed);
      console.log("initial seed: " + seed);
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

    initRandomGenerator(seed) {
      return new Math.seedrandom(seed);
    }

    getRandomNumber(generator) {
      return generator();
    }




    displayText(textObj, selection) {
      if (selection == true) {
        textObj.setActive(true).setVisible(true);
      }
      else {
        textObj.setActive(false).setVisible(false);
      } 
    }
    

    doNothing() {
      // This function is used as a placeholder function
    }




}
