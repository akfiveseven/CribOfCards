import Phaser, { Scene } from "phaser";
import entity from "../util/entity";

import cards from "../util/cards"

var entityVar;
var flag = 0;

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene1' });
    }

    init(data) {
        entityVar = data.playerEn
    }

    preload() {

    }

    create() {
/*
        //console.log(flag)
        console.log(entityVar);
        if (flag == 0) {
            flag = 1;
            entityVar = new entity();
            //entityVar = new entity("PLAYER", 100, 100, 50, 50, 25, 25, 10, 10, 0.2, 'character', 100, 1);
        }
        //console.log(entityVar.stage);


        this.add.image(600, 400, 'bg3').setScale(3)



        //console.log(entityVar.getPlayer().gold);
        //console.log(entityVar.getPlayer().maxHP);
        //console.log(entityVar.getDeck());



        this.shopButton = this.add.image(200, 100, 'shop').setScale(0.75)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('shop', { playerEntity: entityVar }));

        this.shopButton.setActive(false).setVisible(false);

        console.log("stage " + entityVar.stage);

        this.button = this.add.image(200, 400, 'levelOne').setScale(6)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('fight', { entityPassed: entityVar }));


        if (entityVar.stage == 2) {
            this.button.setActive(false).setVisible(false);
            this.button2 = this.add.text(350, 400, 'levelTwo').setFontSize(35)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('fight', { entityPassed: entityVar }));
        }

        

        

        this.button3 = this.add.image(550, 400, 'levelThree').setScale(6)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('fight', { entityPassed: entityVar }));

        this.button4 = this.add.image(650, 400, 'needsSprite').setScale(1)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('fight', { entityPassed: entityVar }));

        //this.button2.setActive(false).setVisible(false);
        this.button3.setActive(false).setVisible(false);
        this.button4.setActive(false).setVisible(false);








*/

    }



    update() {
        if (entityVar.stage == 2) {
            this.button.setActive(false).setVisible(false);
            this.button2.setActive(true).setVisible(true)
        }
        else if (entityVar.stage == 3) {
            this.button.setActive(false).setVisible(false);
            this.button2.setActive(false).setVisible(false);
            this.button3.setActive(true).setVisible(true);
        }
        else if (entityVar.stage == 4) {
            this.button.setActive(false).setVisible(false);
            this.button2.setActive(false).setVisible(false);
            this.button3.setActive(false).setVisible(false);
            this.button4.setActive(true).setVisible(true);
        }
        else if (entityVar.stage == 5) {
            this.button.setActive(false).setVisible(false);
            this.button2.setActive(false).setVisible(false);
            this.button3.setActive(false).setVisible(false);
            this.button4.setActive(false).setVisible(false);
            this.shopButton.setActive(false).setVisible(false);
            this.add.text(500, 500, "YOU WIN").setScale(5);
        }


    }



}
