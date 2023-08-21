import Phaser, { Scene } from "phaser";
import Objects from "../util/objects.js"


var objs = new Objects();

var player;

var width, height;

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'level' });
  }


  preload() {
    width = window.innerWidth;
    height = window.innerHeight;
    player = objs.getPlayer();
  }


  create () {





    if (player.stage == 1) {
      this.levelText = this.add.text(width*66/200, height*2/24, "Level 1", { fontFamily: 'MyCustomFont', fontSize: '128px', fill: '#ded9cc' });
      this.add.image(width/2, height/2, 'sword').setInteractive().on('pointerdown', () => this.nextThing());
      //this.versionText = this.add.text(30, height - 100, "v.0.1.10", { fontFamily: 'MyCustomFont', fontSize: '80px', fill: '#ded9cc'});
      
    }
    else if (player.stage == 2) {
      this.levelText.setText("Level 2");
    }
  }

  nextThing() {
    let roll = this.getRandomNumberInRange(2);
    if (roll == 1) {
      // Fight
    }
    else if (roll == 2) {
      // Shop, Heal, Free Cards
    }
  }

  update() {

  }


  // Returns a random number from 1 to range specified
  getRandomNumberInRange(range) {
    return Math.floor(Math.random() * range) + 1;
  }

}
