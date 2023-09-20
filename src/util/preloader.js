import Phaser from "phaser";
import logoImg from '../../assets/textures/crib_of_cards_logo.png';
import playImg from '../../assets/textures/play_button.png'
import biderImg from '../../assets/textures/bider.png'
import swordImg from '../../assets/textures/sword.png'
import heartImg from '../../assets/textures/heart.png'
import chestImg from '../../assets/textures/chest.png'
import slimeImg from '../../assets/textures/basic_slime.png';
import wizardImg from '../../assets/textures/wizz_64x64.png';
import hpSprite from '../../assets/textures/hp_spritesheet.png';


export default class Preloader extends Phaser.Scene
{
    constructor() 
    {
        super ({key: "preloader"});
    }

    preload()
    {


        // MUSIC ASSETS
        this.load.audio('titleMusic', 'assets/music/pog_looped.mp3');

        // MAIN MENU ASSETS
        this.load.image('logo', logoImg);
        this.load.image('play', playImg);

        // LEVEL SELECTOR ASSETS
        this.load.image('sword', swordImg);
        this.load.image('heart', heartImg);
        this.load.image('chest', chestImg);

        // FIGHT ASSETS
        this.load.image('bider', biderImg);
        this.load.image('slime', slimeImg);
        this.load.image('character', wizardImg);
        this.load.spritesheet('hpspritesheet', hpSprite, { frameWidth: 100, frameHeight: 35 });
    }

    create() {
        this.scene.start('mainmenu');
    }
}
