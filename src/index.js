import Phaser from 'phaser';
import seedrandom from 'seedrandom';

import Preloader from "./util/preloader.js";
import MainMenu from "./scenes/mainmenu.js";
import Fight from "./scenes/fight.js";
import Level from "./scenes/level.js";
import Deck from "./scenes/deck.js"
//import Test from "./scenes/test.js";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#2e2e2e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%'
    },
    pixelArt: true,
    dom: {
      createContainer: true
    },
    scene: [Preloader, MainMenu, Level, Fight, Deck]
};

const game = new Phaser.Game(config);
