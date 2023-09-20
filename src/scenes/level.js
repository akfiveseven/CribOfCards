import Phaser, { Scene } from "phaser";
import Objects from "../util/objects.js"
import seedrandom from 'seedrandom';


var objs = new Objects();

var player;

var width, height;

var centerX, centerY;

var seed, seedSize, seedIndex;

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
  }

  create () {


      this.levelText = this.add.text(centerX, centerY, "<GOTO FIGHT>", { fontFamily: 'MyCustomFont', fontSize: '48px', fill: '#ded9cc' })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.startLevel());

      this.add.text(centerX, centerY-100, "<GET RANDOM>", { fontFamily: 'MyCustomFont', fontSize: '48px', fill: '#ded9cc' })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.getRandomNumberFromSeed());

      console.log("Seed passed is: " + seed);
      console.log(seedSize);
      console.log(seedIndex);




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

  startLevel() {
    this.levelText.setActive(false).setVisible(false); 

    this.scene.start('fight', { seedOut: seed, seedSizeOut: seedSize, seedIndexOut: seedIndex });


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

  }


  // Returns a random number from 1 to range specified
  getRandomNumberInRange(range) {
    return Math.floor(Math.random() * range) + 1;
  }

}
