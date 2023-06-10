//fight.js
import Phaser, { Scene } from "phaser";
import entity from "../util/entity.js";
import cards from "../util/cards.js";
// import level from "../util/level.js";

//===========INSTANCE VARIABLES=============
var entityVar;
var flag;

let width;
let height;
let scaleRatio;

var player, enemy;
var cVar;
var card0, card1, card2, card3, card4, card5;
var xA, xB, xC;
var y1, y2, y3;
var enemyCard;
var cardsArr;
var annArr;
var eArr;

var cardIndex;
var battleMusic;

// FOR DECK SCENE
var cA;
var aA;
var eA;

var anInternval;


function level(name, sprite) {
    this.name = name;
    this.spriteID = sprite;
    this.image;
}

export default class Fight extends Phaser.Scene {
    constructor() {
        super({ key: 'fight' });
    }

    preload() {
        flag = 0;
        width = window.innerWidth;
        height = window.innerHeight;
        scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        cardsArr = [];
        annArr = [];
        eArr = [];
        cardIndex = 0;
        cA = [];
        aA = [];
        eA = [];
        //oldStats = [];
        anInternval = 0;

        cVar = new cards();
        player = new entity();
        this.assignRandomCritEffect();

        this.playerSprite = this.add.image();
        this.pHPSprite = this.add.sprite();

        this.enemySprite = this.add.image();
        this.eHPSprite = this.add.sprite();


        if (player.getPlayer().stage == 1) {
            cVar.initPlayerCards();
            cVar.setCaption();
            cVar.initSlimeCards();
            // name, currHP, maxHP, currMana, maxMana, attackPower, magicPower, attackDefense, magicDefense, critChance, sprite, gold, stage

            // let randomEnemyID = Math.floor(Math.random() * 2) + 1;
            // if (randomEnemyID == 1) {
            //     enemy = new entity("Sticky Slime", 1, 1, 0, 0, 10, 10, 5, 0, 0, 'slime', 0, 0, 0);
            // }
            // else if (randomEnemyID == 2) {
            //     enemy = new entity("Bider", 1, 1, 0, 0, 10, 10, 5, 0, 0, 'bider', 0, 0, 0);
            // }

            enemy = new entity("Bider", 100, 100, 0, 0, 10, 10, 5, 0, 0, 'bider', 0, 0, 0);

        }
    }

    create() {
        console.log(player.getPlayer().stage);
        if (player.getPlayer().stage == 1) {
            this.level = new level("stage", 'sword');
            this.level.image = this.add.image(width/2, height/2, this.level.spriteID).setInteractive().on('pointerdown', () => this.startLevel1());
        }

        //.setInteractive().on('pointerdown', () => this.nextThing());

    }

    startLevel1() {
        this.level.image.setActive(false).setVisible(false);
        this.playerSprite = this.add.image(width/15, height*8/10, 'wizzsheet').setScale(this.scaleRatio, this.scaleRatio); // player hp sprite
        this.pHPSprite = this.add.sprite(width/16, height*3/5, 'hpspritesheet', player.getPlayer().hp).setScale(1.8); // player hp sprite
        this.enemySprite = this.add.image(width*3/4, height*1/2, enemy.img).setScale(2.5);
        this.eHPSprite = this.add.sprite(width*3/4, height*1/12, 'hpspritesheet', enemy.hp).setScale(2.5); // player hp sprite
    }

    update() {
        scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        width = window.innerWidth;
        height = window.innerHeight;
        this.pHPSprite.setFrame(Math.round(((player.getPlayer().hp / player.getPlayer().maxHP) * 10)));
        this.eHPSprite.setFrame(Math.round(((enemy.hp / enemy.maxHP) * 10)))
        // this.responsiveUpdate();
    }

    displayGraph(levelObj) {
        // get all the vertices
        this.AdjList = levelObj.AdjList;
        var get_keys = this.AdjList.keys();


        let xOffset = 800;
        // iterate over the vertices
        for (var i of get_keys) {

            this.add.image(window.innerWidth/2-xOffset, window.innerHeight*1/3, i.spriteKey);
            xOffset = xOffset - 300;
            // get the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j.name + " ";

            // print the vertex and its adjacency list
            console.log(i.name + " -> " + conc);
        }
    }

    

    createLevel() {
        let level1ID = this.getRandomNumber(3)
        let level2ID = this.getRandomNumber(3);
        let level3ID = this.getRandomNumber(3);
        this.upperLabel = this.add.text((width / 2) - 50, height / 6, "Choose 1:", { fontFamily: 'MyCustomFont', fontSize: '80px', fill: '#ded9cc' }).setScale(this.scaleRatio, this.scaleRatio);
        if (level1ID == 1) {
            this.stageOne = this.add.image(width / 3, height / 2, 'sword').setInteractive().on('pointerdown', () => this.clickStage(1));
        }
        else if (level1ID == 2) {
            this.stageOne = this.add.image(width / 3, height / 2, 'chest').setInteractive().on('pointerdown', () => this.clickStage(2));
        }
        else if (level1ID == 3) {
            this.stageOne = this.add.image(width / 3, height / 2, 'chest').setInteractive().on('pointerdown', () => this.clickStage(3));
        }

        if (level2ID == 1) {
            this.stageTwo = this.add.image(width / 2, height / 2, 'sword').setInteractive().on('pointerdown', () => this.clickStage(1));
        }
        else if (level2ID == 2) {
            this.stageTwo = this.add.image(width / 2, height / 2, 'chest').setInteractive().on('pointerdown', () => this.clickStage(2));
        }
        else if (level2ID == 3) {
            this.stageTwo = this.add.image(width / 2, height / 2, 'chest').setInteractive().on('pointerdown', () => this.clickStage(3));
        }

        if (level3ID == 1) {
            this.stageThree = this.add.image((2 * width) / 3, height / 2, 'sword').setInteractive().on('pointerdown', () => this.clickStage(1));
        }
        else if (level3ID == 2) {
            this.stageThree = this.add.image((2 * width) / 3, height / 2, 'chest').setInteractive().on('pointerdown', () => this.clickStage(2));
        }
        else if (level3ID == 3) {
            this.stageThree = this.add.image((2 * width) / 3, height / 2, 'chest').setInteractive().on('pointerdown', () => this.clickStage(3));
        }
    }

    clickStage(stageID) {
        this.stageOne.setVisible(false).setActive(false);
        this.stageTwo.setVisible(false).setActive(false);
        this.stageThree.setVisible(false).setActive(false);
        this.upperLabel.setVisible(false).setActive(false);
        if (stageID == 1) // sword icon
        {
            console.log("battle");
        }
        else if (stageID == 2) // chest icon
        {
            console.log("chest");
        }
        else if (stageID == 3) // heart icon
        {
            console.log("heal");
        }
    }


    responsiveUpdate() {
        scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        width = window.innerWidth;
        height = window.innerHeight;

        // LEVEL SELECT
        this.level.image.setPosition(width/15, height*8/10);


        // FIGHT
        this.playerSprite.setPosition(width/15, height*8/10);






        // this.stageOne.setPosition(width / 3, height / 2);
        // this.stageTwo.setPosition(width / 2, height / 2);
        // this.stageThree.setPosition((2 * width) / 3, height / 2);
        // this.upperLabel.setPosition((width / 2) - 200, height / 6);
        //this.levelImg1.setPosition(width / 3, height / 2);
        //this.levelImg2.setPosition(width / 2, height / 2);
        //this.levelImg3.setPosition((2*width) / 3, height / 2);
    }

    doNothing() {

    }

    generateRandomImg() {
        if (player.getPlayer().hp < player.getPlayer().maxHP || player.getPlayer().mana < player.getPlayer().maxMana) {
            let x = Math.floor(Math.random() * 3) + 1;
            if (x == 1) {
                return 'sword';
            }
            else if (x == 2) {
                return 'heart';
            }
            else if (x == 3) {
                return 'chest';
            }
        }
        else {
            let y = Math.floor(Math.random() * 2) + 1;
            if (y == 1) {
                return 'sword';
            }
            else if (y == 2) {
                return 'chest';
            }
        }

    }

    assignRandomCritEffect() {
        let effect = this.getRandomNumber(3) + 1;
        if (effect == 1) {
            player.getPlayer().critID = "Bonus Damage";
        }
        else if (effect == 2) {
            player.getPlayer().critID = "HP Restore";
        }
        else if (effect == 3) {
            player.getPlayer().critID = "Mana Restore";
        }
        else if (effect == 4) {
            player.getPlayer().critID = "Stat Changes";
        }
    }

    getRandomNumber(range) {
        let x = Math.floor(Math.random() * range) + 1;
        return x;
    }
}