import Phaser from 'phaser';
import seedrandom from 'seedrandom';
import Objects from '../util/objects.js';

var width = 0;
var height = 0;
var backMusic;
var centerX, centerY;

var battlesComplete;

var seed, seedSize, seedIndex;

var mainFontColor, bgColor;
var mainFontFamily;

var inputField;

var playClicked;

var seedObject;
var versionString;

var objs;

export default class MainMenu extends Phaser.Scene
{
    constructor() 
    {
        playClicked = false;
        super ({key: 'mainmenu'});
        width = window.innerWidth;
        height = window.innerHeight; 
        battlesComplete = 0;
        centerX = width/2;
        centerY  = height/2;
        mainFontColor = '#ded9cc';
        bgColor = '#2e2e2e';
        mainFontFamily = 'MyCustomFont';
        versionString = "v0.2.3a";

        objs = new Objects();


        console.log("Initial window width: " + width);        
        console.log("Initial window height: " + height);        
        console.log("Initial device pixel ratio (dpr): " + window.devicePixelRatio);        
        //console.log("Initial dpr scale : " + (window.devicePixelRatio / window.devicePixelRatio));
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
        backMusic.setVolume(1);
        backMusic.play();
        
        inputField = this.add.dom(width*(0.105), height*(0.93), 'input', 'background-color: white;');
        inputField.setOrigin(0.5, 0.5);
        inputField.node.setAttribute('placeholder', 'random seed');

        inputField.node.style.color = "#ded9cc";
        inputField.node.style.textDecoration = "none";
        inputField.node.style.fontSize = "3em";
        inputField.node.style.fontFamily = mainFontFamily;
        inputField.node.style.background = "none";
        inputField.node.style.border = "none";
        inputField.node.style.outline = "none";
        inputField.node.style.width = "75%";

        var submitButton = this.add.dom(centerX*(0.90), centerY*(1.3), 'button', '', 'play');

        submitButton.node.setAttribute('type', 'submit');
        
        submitButton.node.style.color = "#ded9cc";
        submitButton.node.style.textDecoration = "none";
        submitButton.node.style.fontSize = "3em";
        submitButton.node.style.fontFamily = mainFontFamily;
        submitButton.node.style.background = "none";
        submitButton.node.style.border = "none";
        
        
        //submitButton.node.addEventListener('click', function () {
          //const inputValue = inputField.node.value;
          //seed = inputValue;          
        //});

        //submitButton.node.addEventListener('click', function () { const inputValue = inputField.node.value; seed = inputValue; } );
      
      
        submitButton.node.addEventListener('click', this.initSeed );


        this.scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        this.titleImg = this.add.image(centerX, height*(0.15), 'logo').setScale(this.scaleRatio, this.scaleRatio);
        this.versionText = this.add.text(width*(0.85), height*(0.93), versionString, { fontFamily: 'MyCustomFont', fontSize: '3em', fill: '#ded9cc'});


    }

    nextThing() {
        backMusic.setVolume(0);
        this.scene.start('level');
    }


    update()
    {
        if (playClicked == true) {
          this.scene.start('level', { seedPassed: seed, seedSizePassed: seedSize, seedIndexPassed: seedIndex, objsPassed: objs});  
        }
    }




    initSeed() {

      seedIndex = 0;



      let inputSeed = inputField.node.value;
      if (inputSeed != "") {
        console.log("INPUT SEED: " + inputSeed);
        //seed = Number(inputSeed); 
        seed = inputSeed; 
        if (inputSeed[0] == "0" && inputSeed[1] == ".") {
          seed = Number(inputSeed);
        }
      }
      else {
        seed = Math.random();
        console.log("RANDOM SEED IS: " + seed);
      }


      const generator = seedrandom(seed);

      const randomNumber = generator();

      seed = randomNumber;

      const nS = seed.toString()
      const parts = nS.split('.');
      const iD = parts[0].length;

      let totalDigits = iD;

      if (parts.length === 2) {
        totalDigits += parts[1].length;
      }

      totalDigits = totalDigits - 1;

      seedSize = totalDigits;

      console.log("seed created: " + seed);      
      console.log(seedSize);
      console.log(seedIndex);

      //seedObject = {
        
      //};

      playClicked = true;
    }

    sizeOfSeed(number) {
      // Convert the number to a string
      const numberString = number.toString();

      // Split the string into integer and fractional parts (if applicable)
      const parts = numberString.split('.');

      // Count the digits in the integer part
      const integerDigits = parts[0].length;

      // If there is a fractional part, add its length to the count
      let totalDigits = integerDigits;
      if (parts.length === 2) {
        totalDigits += parts[1].length;
      }

      totalDigits = totalDigits - 1;

      return totalDigits;
    }
}
