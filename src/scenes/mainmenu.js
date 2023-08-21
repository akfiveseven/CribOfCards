import Phaser from 'phaser';
var width = 0;
var height = 0;
var backMusic;

var battlesComplete;

export default class MainMenu extends Phaser.Scene
{
    constructor() 
    {
        super ({key: 'mainmenu'});
    }
    preload()
    {
        battlesComplete = 0;
    }


    // My ultrawide monitor: 3440x1329 DPR: 1
    // My normal monitor: 1920x969 DPR: 1
    // My macbook: 1440x774 (safari) 1440x747 (chrome) DPR: 2
    // My iPhone 13: 980x1666 DPR: 3


    // IPhone 13: 980x1666/1681 (vertical) 980x401/436 (horizontal) DPR: 3
    // [] just need to do horizontal

    create()
    {
        backMusic = this.sound.add('titleMusic');
        backMusic.setLoop(true);
        backMusic.setVolume(1);
        backMusic.play();



        width = window.innerWidth;
        height = window.innerHeight; 
        this.scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        this.titleImg = this.add.image(width / 2, height / 2 - 200, 'logo').setScale(this.scaleRatio, this.scaleRatio);
        //this.playText = this.add.text(width / 2 - 95, height / 2 + 100, "Play", { fontFamily: 'MyCustomFont', fontSize: '80px', fill: '#ded9cc' }).setScale(this.scaleRatio, this.scaleRatio).setInteractive().on('pointerdown', () => this.nextThing());
        this.playImg = this.add.image(width / 2 - 20, height /  2 + 100, 'play').setScale(this.scaleRatio, this.scaleRatio).setInteractive().on('pointerdown', () => this.nextThing());
        //this.bider = this.add.image(width / 2, height / 2, 'bider').setScale(this.scaleRatio, this.scaleRatio);
        this.versionText = this.add.text(30, height - 100, "v.0.1.10", { fontFamily: 'MyCustomFont', fontSize: '80px', fill: '#ded9cc'});

        this.dprText = this.add.text(30, 20, "DPR: " + window.devicePixelRatio, { fill: "#ded9cc" }).setFontSize(26);  
        //this.dprText = this.add.text(30, 20, "AAK" + window.devicePixelRatio, { fill: "#ded9cc" }).setFontSize()
        this.widthText = this.add.text(30, 45, "Width: " + window.innerWidth, { fill: "#ded9cc" }).setFontSize(26);
        this.heightText = this.add.text(30, 70, "Height: " + window.innerHeight, { fill: "#ded9cc" }).setFontSize(26);

    }

    nextThing() {
        backMusic.setVolume(0);
        this.scene.start('level');
    }


    update()
    {
        //this.responsiveUpdate();
    }



    responsiveUpdate() {

        this.scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        width = window.innerWidth;
        height = window.innerHeight;


        // DEBUG TEXTS
        this.dprText.setText("DPR: " + window.devicePixelRatio);
        this.widthText.setText("Width: " + window.innerWidth);
        this.heightText.setText("Height: " + window.innerHeight);

        this.titleImg.setPosition(width / 2, height / 2 - 200).setScale(this.scaleRatio, this.scaleRatio);
        this.playImg.setPosition(width / 2 - 20, height / 2 + 100).setScale(this.scaleRatio, this.scaleRatio);
        //this.bider.setPosition(width / 2, height / 2).setScale(this.scaleRatio, this.scaleRatio);
        this.versionText.setPosition(30, height - 100).setScale(this.scaleRatio, this.scaleRatio);
    }

}
