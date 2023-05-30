import Phaser from "phaser";
import logoImg from '../assets/crib_of_cards_logo.png';
import playImg from '../assets/play_button.png'
import biderImg from '../assets/bider.png'
import swordImg from '../assets/sword.png'
import heartImg from '../assets/heart.png'
import chestImg from '../assets/chest.png'
import slimeImg from '../assets/basic_slime.png';
import wizardImg from '../assets/wizz_64x64.png';
import hpSprite from '../assets/hp_spritesheet.png';


export default class Preloader extends Phaser.Scene
{
    constructor() 
    {
        super ({key: "preloader"});
    }

    preload()
    {
        this.load.image('logo', logoImg);
        this.load.image('play', playImg);
        this.load.image('bider', biderImg);
        this.load.image('sword', swordImg);
        this.load.image('heart', heartImg);
        this.load.image('chest', chestImg);
        this.load.image('slime', slimeImg);
        this.load.image('wizzsheet', wizardImg);
        this.load.spritesheet('hpspritesheet', hpSprite, { frameWidth: 100, frameHeight: 35 });
        this.load.audio('titleMusic', 'src/assets/music/pog_looped.mp3');
    }

    create() {
        this.scene.start('mainmenu');
    }
}