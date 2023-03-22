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
    }

    create() {
        this.scene.start('mainmenu');
    }
}