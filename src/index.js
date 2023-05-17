import Phaser from 'phaser';
import Preloader from "./util/preloader.js";
import MainMenu from "./scenes/mainmenu.js";
import Fight from "./scenes/fight.js";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#2e2e2e',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%'
    },
    pixelArt: true,
    scene: [Preloader, MainMenu, Fight]
};

const game = new Phaser.Game(config);
