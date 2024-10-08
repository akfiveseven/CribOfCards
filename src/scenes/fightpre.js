//fight.js
import Phaser, { Scene } from "phaser";
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
var anotherFlag = false;
var storedCards = [];

var myCardArr = [];

var myOtherFlag = false;

//const slime = new entity("Sticky Slime", 10, 10, 0, 0, 10, 10, 25, 0, 0, 'slime', 0, 0);


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
        turnCount = 1;
        enemy = new entity("Sticky Slime", 100, 100, 0, 0, 10, 10, 25, 0, 0, 'slime', 0, 0);

        this.playerSprite;
        this.enemySprite;

        this.hoverText;
        this.turnText;



    }

    init(data) {
        //entityVar = data.playerEn;
        seed = data.seedOut;
        seedSize = data.seedSizeOut;
        seedIndex = data.seedIndexOut;
        objs = data.objsOut;
        player = objs.getPlayer();
    }



    create() {



        cardArray = [];
        statsObj = [];
        cardTextArray = [];
        manaTextArray = [];
        this.hoverText = this.addClickableText(width*(0.1555), height*(0.95), "hello", mainFontFamily, '16px', mainFontColor);
        this.hoverText.setActive(false).setVisible(false);

        console.log("fight seed passed: " + seed);
        console.log(seedSize);
        console.log(seedIndex);

        deckObj = objs.getDeck();
        if (myOtherFlag == false) {
            myOtherFlag = true;
            deckObj.initPlayerCards();
        }

        this.turnText = this.addClickableText(width*(0.07), height*(0.05), "Turn " + turnCount, mainFontFamily, '18px', mainFontColor);

        if (player.stage == 2) {
            player.stage++;
            enemy = new entity("Sticky Slime", 1000, 1000, 0, 0, 10, 10, 25, 0, 0, 'slime', 0, 0);
            turnCount = 1;
        }


        let statStrings = ["player health - current hp / max hp", "player mana - current mana / max mana", "H3", "H4", "H5", "H6", "H7", "H8"];
        let otherStrings = ['heartIcon', 'manaIcon', 'apIcon', 'adIcon', 'mpIcon', 'mdIcon', 'critIcon', 'critEffect'];
        let textObjs = [];

        for (let i = 0; i < 8; i++) {
            textObjs.push(this.addClickableText(width*(0.01), height*(0.3), statStrings[i], mainFontFamily, '12px', mainFontColor));
            this.toggleDisplayText(textObjs[i], false);
        }



        //this.addClickableText(centerX, centerY, "<GET RANDOM>", mainFontFamily, '48px', mainFontColor).on('pointerdown', () => this.getRandomNumberFromSeed());
        //this.addClickableText(centerX, centerY-300, "<GOTO LEVEL>", mainFontFamily, '48px', mainFontColor).on('pointerdown', () => this.scene.start('level', { seedPassed: seed, seedSizePassed: seedSize, seedIndexPassed: seedIndex, objsPassed: objs }) );


        this.addImage(width*(0.065), height*(0.90), 'character', 1.5);
        this.addImage(width*(0.8), height*(0.35), enemy.img, 2);
        this.pHPSprite = this.add.sprite(width*(0.065), height*(0.755), 'hpspritesheet', 10).setOrigin(0.5, 0.5).setScale(1); // player hp sprite
        this.eHPSprite = this.add.sprite(width*(0.8), height*(0.1), 'hpspritesheet', 10).setOrigin(0.5, 0.5).setScale(2); // player hp sprite

        let playerHealth = player.hp + "/" + player.maxHP;
        let playerMana = player.mana + "/" + player.maxMana;

        let baseY = 0.35; // add 0.035
        let baseY2 = 0.34; // add 0.035

        let someObj = [];
        someObj.push(playerHealth, playerMana, player.ap, player.ad, player.mp, player.md, player.crit, player.critID);

        for (let i = 0; i <= 7; i++) {
            this.addImage(width*(0.02), height*(baseY), otherStrings[i], 1).on('pointerover', () => this.toggleDisplayText(textObjs[i], true)).on('pointerout', () => this.toggleDisplayText(textObjs[i], false));
            statsObj.push(this.addClickableText(width*(0.045), height*(baseY2), someObj[i], mainFontFamily, '12px', mainFontColor).on('pointerover', () => this.toggleDisplayText(textObjs[i], true)).on('pointerout', () => this.toggleDisplayText(textObjs[i], false)));
            //statsObj[i].setActive(false).setVisible(false);
            baseY = baseY + 0.035;
            baseY2 = baseY2 + 0.035;
        }
        someFlag = true;



        if (anotherFlag == false) {
            this.makeCards();
        }
        else {
            this.loadCards();
        }
        this.endButton = this.addClickableText(width*(0.85), height*(0.95), "END", mainFontFamily, '24px', mainFontColor)
            .setActive(false).setVisible(false)
            .on('pointerdown', () => this.clickEnd());
        this.deckIcon = this.addImage(width*(0.035), height*(0.05), 'deckIcon', 1).on('pointerdown', () => this.startDeckScene());




        //==============================



    }

    startDeckScene() {
        anotherFlag = true;
        for (let i = 0; i <= 8; i++) {
            cardArray[i].setActive(false).setVisible(false);
            cardTextArray[i].setActive(false).setVisible(false);
            manaTextArray[i].setActive(false).setVisible(false);
        }

        this.scene.start('deck', { objsPassed: objs });  
    }

    loadCards() {
        console.log("loading");
        let baseX = 0;
        cardArray = [];
        cardTextArray = [];
        manaTextArray = [];
        for (let i = 0; i <= 6; i++) {


            let node = this.addImage(width*(0.185)+baseX, height*(0.85), myCardArr[i].spriteImage, 0.75).setScale(1.05)
                .on('pointerdown', () => this.clickCard(i, myCardArr[i])).on('pointerover', () => this.hoverCard(myCardArr[i])).on('pointerout', () => this.disableCap());
            let nodeText = this.addClickableText(width*(0.185)+baseX, height*(0.85)+20, myCardArr[i].ann, mainFontFamily, '12px', mainFontColor).setOrigin(0.5, 0.5).on('pointerdown', () => this.clickCard(i, myCardArr[i])).on('pointerover', () => this.hoverCard(myCardArr[i])).on('pointerout', () => this.disableCap());
            let manaText = this.addClickableText(width*(0.185)+baseX-26, height*(0.85)-43, myCardArr[i].cost, mainFontFamily, '10px', mainFontColor).setOrigin(0.5, 0.5);
            cardArray.push(node);
            cardTextArray.push(nodeText);
            manaTextArray.push(manaText);
            baseX = baseX + 120;
        }
    }

    hoverCard(card) {
        this.hoverText.setText(card.cap);
        this.hoverText.setActive(true).setVisible(true);
    }

    disableCap() {
        this.hoverText.setActive(false).setVisible(false);
    }

    makeCards() {
        console.log("making");
        let baseX = 0;
        myCardArr = [];
        for (let i = 0; i <= 6; i++) {
            let randomNum = this.getRoll() / 100;
            let card = deckObj.getRandomCard(randomNum);

            myCardArr.push(card);

            let node = this.addImage(width*(0.185)+baseX, height*(0.85), card.spriteImage, 0.75).setScale(1.05)
                .on('pointerdown', () => this.clickCard(i, card)).on('pointerover', () => this.hoverCard(card)).on('pointerout', () => this.disableCap());
            let nodeText = this.addClickableText(width*(0.185)+baseX, height*(0.85)+20, card.ann, mainFontFamily, '12px', mainFontColor).setOrigin(0.5, 0.5).on('pointerdown', () => this.clickCard(i, card)).on('pointerover', () => this.hoverCard(card)).on('pointerout', () => this.disableCap());
            let manaText = this.addClickableText(width*(0.185)+baseX-26, height*(0.85)-43, card.cost, mainFontFamily, '10px', mainFontColor).setOrigin(0.5, 0.5);
            cardArray.push(node);
            cardTextArray.push(nodeText);
            manaTextArray.push(manaText);
            baseX = baseX + 120;
        }
    }


    clickCard(index, card) {
        if (player.mana >= card.cost) {
            this.executeCard(card);
            this.endButton.setActive(true).setVisible(true);
            this.deckIcon.setActive(false).setVisible(false);
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
        this.deckIcon.setActive(true).setVisible(true);

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
        if (someFlag == true) {
            this.refreshStats();
        }
        this.calcHealth();
        this.turnText.setText("Turn " + turnCount);


        if (enemy.hp <= 0) {
            player.stage++;
            objs.setPlayer(player);
            this.scene.start('level', { seedPassed: seed, seedSizePassed: seedSize, seedIndexPassed: seedIndex, objsPassed: objs});  
        }
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
