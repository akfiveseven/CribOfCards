import Phaser from "phaser";
import logoImg from '../assets/crib_of_cards_logo.png';


export default class Preloader extends Phaser.Scene
{
    constructor() 
    {
        super ({key: "preloader"});
    }

    preload()
    {
        this.load.image('logo', logoImg);
        this.load.audio('titleMusic', 'src/assets/music/pog_looped.mp3');
    }

    create() {
        this.scene.start('mainmenu');
    }
}