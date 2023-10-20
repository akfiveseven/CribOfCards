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

var statIconSpriteKeys = ['heartIcon', 'manaIcon', 'apIcon', 'adIcon', 'mpIcon', 'mdIcon', 'critIcon', 'critEffect']


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

        // [OBJECT INIT]

        this.deckSprite; // deck sprite object

        // player
        this.pNameText;
        this.pStatHoverText;
        this.pHPBarHoverText;
        this.pStatIconHoverText;
        this.pStatValueHoverText;

        this.pSprite;
        this.pHPSprite;
        this.pStatIconImgArray = [];
        this.pStatValueArray; 
        this.pStatValueTextArray = [];
        
        // enemy
        this.eNameText;
        this.eStatIconHoverText;
        this.eIntentsText;

        this.eSprite;
        this.eHPSprite;
        this.eStatIconImgArray = [];
        this.eStatValueArray; 
        this.eStatValueTextArray = [];

        // chat log | refreshs when first card is used on player turn
        this.turnText = "";
        this.playerTurnOutputTextArray = [];
        this.enemyTurnOutputTextArray = [];

        // card deck area
        this.cardArray = [];
        // this.cardSprites, this.cardCostText, this.cardAnnText;
        this.cardHoverText;
        this.endTurnSprite;






    }

    init(data) {
        seed     = data.seedOut;
        seedSize = data.seedSizeOut;
        seedIndex = data.seedIndexOut;
        objs = data.objsOut;
        player = objs.getPlayer();
        enemy = objs.getEnemy();
        deck = objs.getDeck();
        this.pStatValueArray = [player.hp + "/" + player.maxHP, player.mana + "/" + player.maxMana, player.ap, player.ad, player.mp, player.md, Math.floor(player.crit*100) + "%", player.critID]
        this.eStatValueArray = [enemy.hp + "/" + enemy.maxHP, enemy.mana + "/" + enemy.maxMana, enemy.ap, enemy.ad, enemy.mp, enemy.md, Math.floor(enemy.crit*100) + "%", enemy.critID]
    }



    create() {
        this.fightScene();
    }



    update() {
        this.refreshStats();
    }


    refreshStats() {
        this.pStatValueArray = [player.hp + "/" + player.maxHP, player.mana + "/" + player.maxMana, player.ap, player.ad, player.mp, player.md, Math.floor(player.crit*100) + "%", player.critID]
        this.eStatValueArray = [enemy.hp + "/" + enemy.maxHP, enemy.mana + "/" + enemy.maxMana, enemy.ap, enemy.ad, enemy.mp, enemy.md, Math.floor(enemy.crit*100) + "%", enemy.critID]
        for (let i = 0; i < this.pStatValueArray.length; i++) {
            this.pStatValueTextArray[i].setText(this.pStatValueArray[i]);
            if (i == 6 || i == 7) {
                this.eStatIconImgArray[i].setActive(false).setVisible(false);
                this.eStatValueTextArray[i].setActive(false).setVisible(false);
            }
            else {
                this.eStatValueTextArray[i].setText(this.eStatValueArray[i]);
            }
        }
    }

  
    fightScene() {
        this.deckSprite = this.addImage(50, 50, 'deckIcon', 1)
            .on('pointerdown', () => this.toggleFightScene());

        this.pSprite = this.addImage(width*(0.05), height*(0.9), 'character', 1.5)
            .on('pointerdown', () => this.doNothing());
        this.pHPSprite = this.add.sprite(width*(0.05), height*(0.8), 'hpspritesheet', 10).setScale(1)

        this.eSprite = this.addImage(width*(0.85), height*(0.40), enemy.img, 2);
        this.eHPSprite = this.add.sprite(width*(0.85), height*(0.15), 'hpspritesheet', 10).setScale(3)

        this.createPlayerStatObjects();
        this.createEnemyStatObjects();

        this.pStatHoverText = this.addText(30, height*(0.35), "Hello", mainFontFamily, '12px', mainFontColor).setActive(false).setVisible(false);

        this.eIntentsText = this.addText(width*(0.75), height*(0.05), "INTENTS: <Intents here>", mainFontFamily, '16px', mainFontColor);

        this.turnText = this.addText(width*(0.25), height*(0.1), "Turn: " + turnCount, mainFontFamily, '16px', mainFontColor);
        this.createEnemyOutput(); //log
        //this.createPlayerOutput();
        
        // NEXT CREATE DECK AREA STUFF
        
        



    }

    createPlayerOutput() {
        let thing = ["[PLAYER]", "Used [card] -> [output effect]"];
        let y = height*(0.15);
        for (let i = 0; i < thing.length; i++) {
            let objThing = this.addText(width*(0.25), y, thing[i], mainFontFamily, '16px', mainFontColor);
            this.playerTurnOutputTextArray.push(objThing);
            y = y + 19;
        }
    }

    createEnemyOutput() {
        let thing = ["[ENEMY]", "Used [card] -> [output effect]"];
        let y = height*(0.15);
        for (let i = 0; i < thing.length; i++) {
            let objThing = this.addText(width*(0.25), y, thing[i], mainFontFamily, '16px', mainFontColor);
            this.enemyTurnOutputTextArray.push(objThing);
            y = y + 19;
        }
    }


    createEnemyStatObjects() {
        let y = height * (0.2);

        for (let i = 0; i < statIconSpriteKeys.length; i++) {
            let imgObj = this.addImage(width*(0.65), y, statIconSpriteKeys[i], 1);
            let txtObj = this.addText(width*(0.67), y-5, this.eStatValueArray[i], mainFontFamily, '16px', mainFontColor);
            this.eStatIconImgArray.push(imgObj);
            this.eStatValueTextArray.push(txtObj);
            y = y + 25;
        }
    }

    createPlayerStatObjects() {
        let y = height * (0.4);

        for (let i = 0; i < statIconSpriteKeys.length; i++) {
            let imgObj = this.addImage(30, y, statIconSpriteKeys[i], 1);
            let txtObj = this.addText(50, y-5, this.pStatValueArray[i], mainFontFamily, '16px', mainFontColor);
            txtObj.on('pointerover', () => this.showHoverText(i, 0)).on('pointerout', () => this.pStatHoverText.setActive(false).setVisible(false));
            imgObj.on('pointerover', () => this.showHoverText(i, 1)).on('pointerout', () => this.pStatHoverText.setActive(false).setVisible(false));
            this.pStatIconImgArray.push(imgObj)
            this.pStatValueTextArray.push(txtObj)
            y = y + 25;
        }


    }

    showHoverText(idx, flag) {
        if (flag == 0) {
            switch(idx) {
                case 0:
                    this.pStatHoverText.setText("0")
                    break;
                case 1:
                    this.pStatHoverText.setText("1")
                    break;
                case 2:
                    this.pStatHoverText.setText("2")
                    break;
                case 3:
                    this.pStatHoverText.setText("3")
                    break;
                case 4:
                    this.pStatHoverText.setText("4")
                    break;
                case 5:
                    this.pStatHoverText.setText("5")
                    break;
                case 6:
                    this.pStatHoverText.setText("6")
                    break;
                case 7:
                    this.pStatHoverText.setText("7")
                    break;
            }
        }
        else if (flag == 1) {
            switch(idx) {
                case 0:
                    this.pStatHoverText.setText("a")
                    break;
                case 1:
                    this.pStatHoverText.setText("b")
                    break;
                case 2:
                    this.pStatHoverText.setText("c")
                    break;
                case 3:
                    this.pStatHoverText.setText("d")
                    break;
                case 4:
                    this.pStatHoverText.setText("e")
                    break;
                case 5:
                    this.pStatHoverText.setText("f")
                    break;
                case 6:
                    this.pStatHoverText.setText("g")
                    break;
                case 7:
                    this.pStatHoverText.setText("h")
                    break;
            }


        }

        this.pStatHoverText.setActive(true).setVisible(true);
    }


    showHealth() {

    }

    hideHealth() {

    }


    toggleFightScene() {
        fightDeckFlag = !fightDeckFlag;
        this.eIntentsText.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.turnText.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        //this.createEnemyOutput();
        //this.playerTurnOutputTextArray.push(objThing);

        this.pSprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.eSprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.pHPSprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.eHPSprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        for (let i = 0; i < this.pStatValueTextArray.length; i++) {
          this.pStatIconImgArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
          this.pStatValueTextArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
          this.eStatIconImgArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
          this.eStatValueTextArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
        }

        for (let i = 0; i < this.enemyTurnOutputTextArray.length; i++) {
            this.enemyTurnOutputTextArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
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
