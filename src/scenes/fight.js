//fight.js
import Phaser, { Scene } from "phaser";
import entity from "../util/entity.js"
import log from "../util/log.js";
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

        this.deckIcon; // deck sprite object

        // player
        this.playerNameText;
        this.playerStatHoverText;
        this.pHPBarHoverText;
        this.pStatIconHoverText;
        this.pStatValueHoverText;

        this.playerSprite;
        this.playerHealthBar;
        this.playerStatIconArray = [];
        this.playerStatValueArray; 
        this.playerStatValueTextArray = [];
        
        // enemy
        this.enemyNameText;
        this.eStatIconHoverText;
        this.enemyIntentsText;

        this.enemySprite;
        this.enemyHealthBar;
        this.enemyStatIconArray = [];
        this.eStatValueArray; 
        this.enemyStatTextArray = [];

        this.playerNameText;
        this.enemyNameText;

        // card deck area
        this.cardArray = [];
        // this.cardSprites, this.cardCostText, this.cardAnnText;
        this.cardHoverText;
        this.endTurnSprite;



        this.deckSceneCardIcon;
        this.deckSceneCardNameText;
        this.deckSceneCardDescText;
        this.deckSceneForward;
        this.deckSceneBackward;


        this.myLog;
        this.logText;
        this.logTurn;
        this.logTurnMessage;



    }

    init(data) {
        seed     = data.seedOut;
        seedSize = data.seedSizeOut;
        seedIndex = data.seedIndexOut;
        objs = data.objsOut;
        player = objs.getPlayer();
        enemy = objs.getEnemy();
        deck = objs.getDeck();
        this.playerStatValueArray = [player.hp + "/" + player.maxHP, player.mana + "/" + player.maxMana, player.ap, player.ad, player.mp, player.md, Math.floor(player.crit*100) + "%", player.critID]
        this.eStatValueArray = [enemy.hp + "/" + enemy.maxHP, enemy.mana + "/" + enemy.maxMana, enemy.ap, enemy.ad, enemy.mp, enemy.md, Math.floor(enemy.crit*100) + "%", enemy.critID]
    }



    create() {
        this.fightScene();
        this.createLog();
    }



    update() {
        this.refreshStats();
    }

    createLog() {
        /*
        this.myLog = new log();
        this.logText = this.addText(centerX-(width*0.4), centerY-(height*0.45), "LOG: " + this.myLog.currentIndex + "/" + this.myLog.entryList.length, mainFontFamily, '16px', mainFontColor);
        this.logTurn = this.addText(centerX-(width*0.4), centerY-(height*0.4), "", mainFontFamily, '16px', mainFontColor);
        this.logTurnMessage = this.addText(centerX-(width*0.4), centerY-(height*0.35), "", mainFontFamily, '16px', mainFontColor);
        //this.myLog.pushEntry(1, "[INPUT]\n[OUTPUT]")
        //this.myLog.pushEntry(2, "[INdfgT]\n[OUTdfghT]")
        //this.addText(centerX, centerY, this.myLog.getEntry(0).message, mainFontFamily, '16px', mainFontColor);
        //this.addText(centerX, centerY-50, this.myLog.getEntry(1).message, mainFontFamily, '16px', mainFontColor);
        */
    }

    endTurnHandler() {

    }


    refreshStats() {
        //this.logText.setText("LOG: " + this.myLog.currentIndex + "/" + this.myLog.entryList.length);
        this.playerStatValueArray = [player.hp + "/" + player.maxHP, player.mana + "/" + player.maxMana, player.ap, player.ad, player.mp, player.md, Math.floor(player.crit*100) + "%", player.critID]
        //this.logTurnCountText.setText("LOG: " + this.logIndex + "/" + this.logList.length);
        //this.eStatValueArray = [enemy.hp + "/" + enemy.maxHP, enemy.mana + "/" + enemy.maxMana, enemy.ap, enemy.ad, enemy.mp, enemy.md, Math.floor(enemy.crit*100) + "%", enemy.critID]
        for (let i = 0; i < this.playerStatValueArray.length; i++) {
            this.playerStatValueTextArray[i].setText(this.playerStatValueArray[i]);
            if (i == 6 || i == 7) {
                //this.enemyStatIconArray[i].setActive(false).setVisible(false);
                //this.enemyStatTextArray[i].setActive(false).setVisible(false);
            }
            else {
                //this.enemyStatTextArray[i].setText(this.eStatValueArray[i]);
            }
        }
    }

  
    fightScene() {
        this.deckSceneCardIcon = this.addImage(centerX, centerY, 'blank', 3).setActive(false).setVisible(false);

        this.playerSprite = this.addImage(width*(0.075), height*(0.87), 'character', 2.5).on('pointerdown', () => this.doNothing());
        this.playerHealthBar = this.add.sprite(width*(0.075), height*(0.70), 'hpspritesheet', 10).setScale(2)
        this.playerNameText = this.addText(width*0.05-(width*0.038), height*0.4-(height*0.035), "PLAYER", mainFontFamily, '16px', mainFontColor);
        this.playerNameText.setOrigin(0, 0);
        //this.createPlayerStatObjects();

        let y = height * (0.4);
        for (let i = 0; i < statIconSpriteKeys.length; i++) {
            let imgObj = this.addImage(width*(1/40), y, statIconSpriteKeys[i], 1);
            let txtObj = this.addText(width*(1/26), y-8, this.playerStatValueArray[i], mainFontFamily, '16px', mainFontColor);
            txtObj.on('pointerover', () => this.showHoverText(i, 0)).on('pointerout', () => this.playerStatHoverText.setActive(false).setVisible(false));
            imgObj.on('pointerover', () => this.showHoverText(i, 1)).on('pointerout', () => this.playerStatHoverText.setActive(false).setVisible(false));
            this.playerStatIconArray.push(imgObj)
            this.playerStatValueTextArray.push(txtObj)
            y = y + 25;
        }

        this.playerStatHoverText = this.addText(width*0.05-(width*0.038), height*(0.4)-(height*0.05), "Hello", mainFontFamily, '12px', mainFontColor).setActive(false).setVisible(false).setOrigin(0, 0);

        this.enemyNameText = this.addText(width*0.6-(width*0.0485), height*0.15-(height*0.035), "ENEMY", mainFontFamily, '16px', mainFontColor);
        this.enemyNameText.setOrigin(0, 0);
        this.enemyNameText.setActive(false).setVisible(false);
        this.enemySprite = this.addImage(width*(0.85), height*(0.40), enemy.img, 3);
        this.enemyHealthBar = this.add.sprite(width*(0.85), height*(0.40)-(height*0.25), 'hpspritesheet', 10).setScale(3)
        this.enemyIntentsText = this.addText(width*(0.85), height*(0.4)-(height*0.33), "INTENTS: <Intents here>", mainFontFamily, '16px', mainFontColor).setOrigin(0.5, 0.5);
        this.enemyIntentsText.setActive(false).setVisible(false);
        //this.createEnemyStatObjects();
        for (let i = 0; i < this.enemyStatIconArray.length; i++) {
            this.enemyStatIconArray[i].setActive(false).setVisible(false);
            this.enemyStatTextArray[i].setActive(false).setVisible(false);
        }
        //this.createEnemyOutput(); //log
        //this.createPlayerOutput();

        /*
        this.logTurnText = this.addText(width*(0.25), height*(0.1), "Turn: " + turnCount, mainFontFamily, '16px', mainFontColor);
        this.logBackward = this.addImage(width*(0.25)-(width*0.025), height*(0.15), 'back', 0.4);
        this.logForward = this.addImage(width*(0.25)+(width*0.15), height*(0.15), 'play', 0.4);
        this.logTurnCountText = this.addText(width*(0.25), height*(0.065), "LOG: " + this.logIndex + "/" + this.logList.length, mainFontFamily, '16px', mainFontColor);
        //this.logBackward.setActive(false).setVisible(false)
        //this.logForward.setActive(false).setVisible(false)
        */
        //this.logForward.angle = 180;

        this.endTurnText = this.addText(width*0.915, height*0.95, "END TURN", mainFontFamily, '24px', mainFontColor).on('pointerdown', () => this.endTurnHandler());
        this.deckIcon = this.addImage(50, 50, 'deckIcon', 1).on('pointerdown', () => this.toggleFightScene());
        //this.endTurnText = this.addText(width*0.9, height*0.67, "END TURN", mainFontFamily, '16px', mainFontColor);
        
        // NEXT CREATE DECK AREA STUFF
        
        
        /*
        let x = width*0.2
        for (let i = 0; i < 5; i++) {
            this.addImage(x, height*0.8, 'blank', 1.65)
            x = x + 300;
        }
        */
        

        /*
        let x = width*0.15
        for (let i = 0; i < 6; i++) {
            this.addImage(x, height*0.8, 'blank', 1.65)
            x = x + 275;
        }
        */

        /*
        let x = width*0.15
        for (let i = 0; i < 7; i++) {
            this.addImage(x, height*0.8, 'blank', 1.65)
            x = x + 225;
        }
        */

        /*
        let x = width*0.15
        for (let i = 0; i < 8; i++) {
            this.addImage(x, height*0.8, 'blank', 1.65)
            x = x + 210;
        }
        */
        
        
        /*
        let x = width*0.15
        for (let i = 0; i < 9; i++) {
            this.addImage(x, height*0.8, 'blank', 1.65)
            x = x + 190;
        }
        */
        

    }





    createEnemyStatObjects() {
        let y = height * (0.15);

        for (let i = 0; i < statIconSpriteKeys.length; i++) {
            let imgObj = this.addImage(width*0.6-(width*0.043), y, statIconSpriteKeys[i], 1);
            let txtObj = this.addText(width*0.6-(width*0.033), y-8, this.eStatValueArray[i], mainFontFamily, '16px', mainFontColor);
            this.enemyStatIconArray.push(imgObj);
            this.enemyStatTextArray.push(txtObj);
            y = y + 25;
        }
    }

    createPlayerStatObjects() {
        let y = height * (0.4);
        for (let i = 0; i < statIconSpriteKeys.length; i++) {
            let imgObj = this.addImage(width*(1/40), y, statIconSpriteKeys[i], 1);
            let txtObj = this.addText(width*(1/26), y-8, this.playerStatValueArray[i], mainFontFamily, '16px', mainFontColor);
            txtObj.on('pointerover', () => this.showHoverText(i, 0)).on('pointerout', () => this.playerStatHoverText.setActive(false).setVisible(false));
            imgObj.on('pointerover', () => this.showHoverText(i, 1)).on('pointerout', () => this.playerStatHoverText.setActive(false).setVisible(false));
            this.playerStatIconArray.push(imgObj)
            this.playerStatValueTextArray.push(txtObj)
            y = y + 25;
        }


    }

    showHoverText(idx, flag) {
        switch (idx) {
            case 0:
                this.playerStatHoverText.setText("Health Points (HP)")
                break;
            case 1:
                this.playerStatHoverText.setText("Mana")
                break;
            case 2:
                this.playerStatHoverText.setText("Attack Power (AP)")
                break;
            case 3:
                this.playerStatHoverText.setText("Attack Defense (AD)")
                break;
            case 4:
                this.playerStatHoverText.setText("Magic Power (MP)")
                break;
            case 5:
                this.playerStatHoverText.setText("Magic Defense (MD)")
                break;
            case 6:
                this.playerStatHoverText.setText("Critical Chance")
                break;
            case 7:
                this.playerStatHoverText.setText("Critical Effect")
                break;
        }

        this.playerStatHoverText.setActive(true).setVisible(true);
    }


    showHealth() {

    }

    hideHealth() {

    }


    toggleFightScene() {
        fightDeckFlag = !fightDeckFlag;
        this.enemyIntentsText.setActive(false).setVisible(false);
        //this.logTurnText.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        //this.createEnemyOutput();
        //this.playerTurnOutputTextArray.push(objThing);

        this.playerSprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.enemySprite.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.playerHealthBar.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.enemyHealthBar.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.enemyNameText.setActive(false).setVisible(false);
        this.playerNameText.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        this.endTurnText.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        //this.logForward.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        //this.logBackward.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        //this.logTurnCountText.setActive(fightDeckFlag).setVisible(fightDeckFlag);
        for (let i = 0; i < this.playerStatValueTextArray.length; i++) {
          this.playerStatIconArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
          this.playerStatValueTextArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
          this.enemyStatIconArray[i].setActive(false).setVisible(false);
          this.enemyStatTextArray[i].setActive(false).setVisible(false);
        }

        /*
        for (let i = 0; i < this.enemyTurnOutputTextArray.length; i++) {
            this.enemyTurnOutputTextArray[i].setActive(fightDeckFlag).setVisible(fightDeckFlag);
        }
        */

        this.createDeckScene();

    }

    createDeckScene() {
        this.deckSceneCardIcon.setActive(!fightDeckFlag).setVisible(!fightDeckFlag);
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
