//fight.js
import Phaser, { Scene } from "phaser";
import entity from "../util/entity.js"
import seedrandom from 'seedrandom';

var width, height;
var centerX, centerY;

var mainFontFamily;
var mainFontColor, bgColor;

var seed, seedSize, seedIndex;


var cardImageArray, cardTextArray, manaTextArray;

var turnCount;

var objs;
var player, enemy, deck;

var fightDeckFlag;

var iconArray = [];
var statArray = [];


export default class Fight extends Phaser.Scene {

    constructor() {

        super({ key: 'fight' });

        
        width = window.innerWidth;
        height = window.innerHeight;

        mainFontFamily = 'MyCustomFont';
        mainFontColor = "#ded9cc";
        bgColor = '#2e2e2e';

        centerX = width/2;
        centerY = height/2;

        turnCount = 1;
        fightDeckFlag = true;


        this.playerSprite;
        this.enemySprite;

        this.pHPSprite;
        this.eHPSprite;

        this.iconArray = [];
        this.statArray = [];
        
        this.healthText;


    }

    init(data) {
        seed     = data.seedOut;
        seedSize = data.seedSizeOut;
        seedIndex = data.seedIndexOut;
        objs = data.objsOut;
        player = objs.getPlayer();
        enemy = objs.getEnemy();
        deck = objs.getDeck();
    }



    create() {
        this.fightScene();
    }



    update() {

    }
  
    fightScene() {
        this.deckSprite = this.addImage(50, 50, 'deckIcon', 1)
            .on('pointerdown', () => this.toggleFightScene());

        this.playerSprite = this.addImage(width*(0.05), height*(0.9), 'character', 1.5)
            .on('pointerdown', () => this.doNothing());
        this.enemySprite = this.addImage(width*(0.85), height*(0.35), enemy.img, 2);

        this.pHPSprite = this.add.sprite(width*(0.05), height*(0.8), 'hpspritesheet', 10).setScale(1)
        this.healthText = this.addText(width*(0.05), height*(0.7), player.hp).setActive(false).setVisible(false)
        this.eHPSprite = this.add.sprite(width*(0.85), height*(0.1), 'hpspritesheet', 10).setScale(3)
        let arr = ['heartIcon', 'manaIcon', 'apIcon', 'adIcon', 'mpIcon', 'mdIcon', 'critIcon', 'critEffect']
        let textArr = [player.hp + "/" + player.maxHP, player.mana + "/" + player.maxMana, player.ap, player.ad, player.mp, player.md, Math.floor(player.crit*100) + "%", player.critID]
        let y = height*(0.4);
        for (let i = 0; i < arr.length; i++) {
          let imgObj = this.addImage(30, y, arr[i], 1);
          let txtObj = this.addText(50, y-5, textArr[i], mainFontFamily, '16px', mainFontColor);
          iconArray.push(imgObj)
          statArray.push(txtObj)
          y = y + 25;
        }
    }

    showHealth() {

    }

    hideHealth() {

    }


    toggleFightScene() {
        fightDeckFlag = !fightDeckFlag;
        this.playerSprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.enemySprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.pHPSprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.eHPSprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        for (let i = 0; i < iconArray.length; i++) {
          iconArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
          statArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
        }
    }


    addImage(posX, posY, sprite, scale) {
        let result = this.add.image(posX, posY, sprite)
            .setScale(scale)
            .setInteractive();
        return result;
    }

    addText(posX, posY, text, font, size, color) {
        let result = this.add.text(posX, posY, text, { fontFamily: font, fontSize: size, fill: color })
            .setInteractive();
        return result;

    }


    //========================================================


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
