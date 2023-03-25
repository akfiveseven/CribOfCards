import Phaser from 'phaser';
let width = 0;
let height = 0;
var backMusic;
export default class MainMenu extends Phaser.Scene
{
    constructor() 
    {
        super ({key: 'mainmenu'});
    }
    preload()
    {

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
        backMusic.setVolume(0.1);
        backMusic.play();



        width = window.innerWidth;
        height = window.innerHeight; 
        this.scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        //this.logoImage = this.add.image(width / 2, height / 2 - 200, 'logo').setScale(this.scaleRatio, this.scaleRatio).setInteractive().on('pointerdown', () => this.nextThing());
        //var text = this.add.text(width / 2, height / 2 - 200, 'Crib of Cards', {fontFamily: 'monospace', fontSize: '64px', fill: '#2e2e2e' }).setInteractive().on('pointerdown', () => this.nextThing());
        this.titleText = this.add.text(width / 2 - 500, height / 2 - 300, "Crib of Cards", {fontSize: '128px', fill: '#ded9cc'}).setScale(this.scaleRatio, this.scaleRatio).setInteractive().on('pointerdown', () => this.nextThing());
        this.playText = this.add.text(width / 2 - 95, height / 2 + 100, "Play", {fontSize: '80px', fill: '#ded9cc'}).setScale(this.scaleRatio, this.scaleRatio).setInteractive().on('pointerdown', () => this.nextThing());
        this.versionText = this.add.text(30, height - 100, "v.0.1.10", {fontSize: '80px', fill: '#ded9cc'}).setScale(this.scaleRatio, this.scaleRatio);

        this.dprText = this.add.text(30, 20, "DPR: " + window.devicePixelRatio, { fill: "#ded9cc" }).setFontSize(26);  
        this.widthText = this.add.text(30, 45, "Width: " + window.innerWidth, { fill: "#ded9cc" }).setFontSize(26);
        this.heightText = this.add.text(30, 70, "Height: " + window.innerHeight, { fill: "#ded9cc" }).setFontSize(26);
        // this.canvasWidthText = this.add.text(30, 95, "Canvas Width: " + this.sys.game.canvas.width).setFontSize(30);
        // this.canvasHeightText = this.add.text(30, 120, "Canvas Height: " + this.sys.game.canvas.height).setFontSize(30);
        // document.documentElement.requestFullscreen();

        // this.add.line(0, 0, 100, 100, 200, 200, 0xded9cc);
        // this.add.line(0, 0, width / 2, 0, width / 2, height * 2, 0xded9cc);

        //var text = this.add.text(100, 100, 'Hello, world!', { fontSize: '32px', fill: '#fff' });
        // window.addEventListener('resize', () => {
        //     location.reload();
        // }); 
    }

    nextThing() {
        backMusic.setVolume(0);
        // this.scene.start('');
    }


    update()
    {
        this.responsiveUpdate();
    }



    responsiveUpdate() {

        this.scaleRatio = window.devicePixelRatio;
        width = window.innerWidth;
        height = window.innerHeight;


        // DEBUG TEXTS
        this.dprText.setText("DPR: " + window.devicePixelRatio);
        this.widthText.setText("Width: " + window.innerWidth);
        this.heightText.setText("Height: " + window.innerHeight);

        this.titleText.setPosition(width / 2 - 500, height / 2 - 300).setScale(this.scaleRatio, this.scaleRatio);
        this.playText.setPosition(width / 2 - 95, height / 2 + 100).setScale(this.scaleRatio, this.scaleRatio);
        this.versionText.setPosition(30, height - 100).setScale(this.scaleRatio, this.scaleRatio);
        if (window.innerWidth <= 1000) {
            this.titleText.setScale(0.5).setPosition(width / 2 - 250, height / 2 - 300);
            this.playText.setScale(0.5).setPosition(width / 2 - 50, height / 2 + 100);
            this.versionText.setScale(0.5).setPosition(30, height - 50);
            if (window.innerHeight <= 500) {
                this.playText.setScale(0.5).setPosition(width / 2 - 50, height /2 + 50);
                this.titleText.setScale(0.5).setPosition(width / 2 - 250, height / 2 - 150);
                this.versionText.setScale(0.5).setPosition(30, height - 50);

            }
        }
    }

}