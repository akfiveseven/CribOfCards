//fight.js
import Phaser, { Scene } from "phaser";
import entity from "../util/entity.js";
import cards from "../util/cards.js";
import level from "../util/level.js";

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


        if (player.getPlayer().stage == 1) {
            cVar.initPlayerCards();
            cVar.setCaption();
            cVar.initSlimeCards();
            // name, currHP, maxHP, currMana, maxMana, attackPower, magicPower, attackDefense, magicDefense, critChance, sprite, gold, stage

            let randomEnemyID = Math.floor(Math.random() * 2) + 1;
            if (randomEnemyID == 1) {
                enemy = new entity("Sticky Slime", 1, 1, 0, 0, 10, 10, 5, 0, 0, 'slime', 0, 0, 0);
            }
            else if (randomEnemyID == 2) {
                enemy = enemy = new entity("Bider", 1, 1, 0, 0, 10, 10, 5, 0, 0, 'bider', 0, 0, 0);
            }

        }
    }

    create() {
        //console.log(player.getPlayer());
        //this.levelImg1 = this.add.image(width / 3, height / 2, this.generateRandomImg()).setInteractive().on('pointerdown', () => this.testEvent(this));
        //this.levelImg2 = this.add.image(width / 2, height / 2, this.generateRandomImg());
        //this.levelImg3 = this.add.image((2*width) / 3, height / 2, this.generateRandomImg());

        // var h = new level(2);

        // h.addVertex("A");
        // h.addVertex("B");
        // h.addEdge("A", "B");
        // h.printGraph();
        // for (let i = 0; i < 10; i++) {
        //     h.getLevelSequence();
        // }

        //this.createLevel();


        // // Define the arrow dimensions
        // var arrowWidth = 20;
        // var arrowHeight = 40;

        // // Calculate the arrow's position to be in the center of the screen
        // var centerX = width / 2;
        // var centerY = height / 2;

        // // Create a new arrow shape
        // var arrow = new Phaser.Geom.Polygon([
        //     new Phaser.Geom.Point(centerX - arrowWidth / 2, centerY + arrowHeight / 2),
        //     new Phaser.Geom.Point(centerX + arrowWidth / 2, centerY + arrowHeight / 2),
        //     new Phaser.Geom.Point(centerX + arrowWidth / 2, centerY - arrowHeight / 2),
        //     new Phaser.Geom.Point(centerX + arrowWidth, centerY - arrowHeight / 2),
        //     new Phaser.Geom.Point(centerX, centerY - arrowHeight),
        //     new Phaser.Geom.Point(centerX - arrowWidth, centerY - arrowHeight / 2),
        //     new Phaser.Geom.Point(centerX - arrowWidth / 2, centerY - arrowHeight / 2)
        // ]);

        // // Set the line style and fill color for the arrow
        // var arrowStyle = { lineStyle: { width: 2, color: 0x000000 }, fillStyle: { color: 0x000000 } };

        // // Draw the arrow on the graphics object
        // var graphics = this.add.graphics();
        // graphics.fillStyle(arrowStyle.fillStyle.color);
        // graphics.lineStyle(arrowStyle.lineStyle.width, arrowStyle.lineStyle.color);
        // graphics.strokePoints(arrow.points, true);
        // graphics.fillPoints(arrow.points, true);

        var h = new level(3);
        h.createRandomVertex();
        this.displayGraph(h);
        h.createArrow.call(this, width/2-650, height*1/3);
        
        // h.createArrow.call(this, 100, 100);

        // h.createArrow.call(this, width/2, height/2);
        // h.createImage.call(this, width/2, height/2+50, 'sword');

        // this.createArrow.call(this, width/2, height/2);
        // this.createArrow.call(this, width/2+200, height/2);



    }

    update() {
        scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        width = window.innerWidth;
        height = window.innerHeight;
        //this.responsiveUpdate();
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
        this.stageOne.setPosition(width / 3, height / 2);
        this.stageTwo.setPosition(width / 2, height / 2);
        this.stageThree.setPosition((2 * width) / 3, height / 2);
        this.upperLabel.setPosition((width / 2) - 200, height / 6);
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