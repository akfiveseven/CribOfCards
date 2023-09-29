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
import apIcon from '../../assets/textures/sprites/attack_power_sprite.png';
import adIcon from '../../assets/textures/sprites/attack_defense_sprite.png';
import mpIcon from '../../assets/textures/sprites/magic_power_sprite.png';
import mdIcon from '../../assets/textures/sprites/magic_defense_sprite.png';
import critIcon from '../../assets/textures/sprites/crit_effect_icon.png';
import critEffect from '../../assets/textures/sprites/crit_effect_sprite.png';
import coinIcon from '../../assets/textures/sprites/coin.png';
import heartIcon from '../../assets/textures/sprites/hearticon.png';
import manaIcon from '../../assets/textures/sprites/manaicon.png';
import deckIcon from '../../assets/textures/sprites/deckSprite.png';


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

        this.load.image('coin', coinIcon);
        this.load.image('apIcon', apIcon);
        this.load.image('adIcon', adIcon);
        this.load.image('mpIcon', mpIcon);
        this.load.image('mdIcon', mdIcon);
        this.load.image('critIcon', critIcon);
        this.load.image('critEffect', critEffect);
        this.load.image('heartIcon', heartIcon);
        this.load.image('manaIcon', manaIcon);
        this.load.image('deckIcon', deckIcon);

    }

    create() {
        this.scene.start('mainmenu');
    }
}
