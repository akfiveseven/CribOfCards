import Phaser from 'phaser';

let width = 0;
let height = 0;
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


    create()
    {
        width = window.innerWidth;
        height = window.innerHeight; 
        this.scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        this.logoImage = this.add.image(width / 2, height / 2 , 'logo').setScale(this.scaleRatio, this.scaleRatio).setInteractive().on('pointerdown', () => this.nextThing());
        // var text = this.add.text(width / 2, height / 2, 'Play', { fontSize: '150px', fill: '#ded9cc' }).setInteractive().on('pointerdown', () => this.nextThing());

        this.dprText = this.add.text(30, 20, "DPR: " + window.devicePixelRatio).setFontSize(30);  
        this.widthText = this.add.text(30, 45, "Width: " + window.innerWidth).setFontSize(30);
        this.heightText = this.add.text(30, 70, "Height: " + window.innerHeight).setFontSize(30);
        // this.canvasWidthText = this.add.text(30, 95, "Canvas Width: " + this.sys.game.canvas.width).setFontSize(30);
        // this.canvasHeightText = this.add.text(30, 120, "Canvas Height: " + this.sys.game.canvas.height).setFontSize(30);
        // document.documentElement.requestFullscreen();



        //var text = this.add.text(100, 100, 'Hello, world!', { fontSize: '32px', fill: '#fff' });
        // window.addEventListener('resize', () => {
        //     location.reload();
        // }); 
    }

    nextThing() {
        console.log("DPR: " + window.devicePixelRatio);
        console.log("Inner Width: " + window.innerWidth);
        console.log("Inner Height: " + window.innerHeight);
        console.log("\n");
        this.dprText.setText("DPR: " + window.devicePixelRatio);
        this.widthText.setText("Width: " + window.innerWidth);
        this.heightText.setText("Height: " + window.innerHeight);
        // this.canvasWidthText.setText("Canvas Width: " + this.sys.game.canvas.width);
        // this.canvasHeightText.setText("Canvas Height: " + this.sys.game.canvas.height);
    }

    update()
    {

        width = window.innerWidth;
        height = window.innerHeight;
        this.logoImage.setPosition(width / 2, height / 2).setScale(this.scaleRatio, this.scaleRatio);

        // let x = width;
        // width = window.innerWidth;
        // if (x != width) {
        //    this.logoImage.setVisible(false).setActive(false);
        //    this.logoImage = this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 300, 'logo').setScale(this.scaleRatio, this.scaleRatio);
        // }

        // width = this.sys.game.canvas.width;
        // console.log(width);
        // window.addEventListener('resize', () => {
        //     console.log("resize");
        //     logoImage = logoImage;
        // });
    }

}