

var cardArray = [];

var slimeCardArray = [];

var catCardArray = [];

var restCards = [];

export default class cards {
    constructor(alias, nType, cardNumber, magnitude, mCost, sprite, annotation, caption) {
        this.name = alias;
        this.nID = nType;
        this.cNum = cardNumber;
        this.mag = magnitude;
        this.cost = mCost;
        this.spriteImage = sprite;
        this.ann = annotation;
        this.cap = caption;
    }


    getCardArray() {
        return cardArray;
    }

    getSlimeCardArray() {
        return slimeCardArray;
    }

    getCatCardArray() {
        return catCardArray;
    }

    getInCardArray(i) {
        if (i == 0) {
            return pokeCard
        }
        else if (i == 1) {
            return stabCard
        }
        else if (i == 2) {
            return arcaneShotCard
        }
        

    }

    getInSlimeCardArray(i) {
        if (i == 0) {
            return slimeCharge
        }
        else if (i == 1) {
            return slimeBounce
        }
        else if (i == 2) {
            return slimeHeal
        }
        else if (i == 3) {
            return slimeSmash
        }
    }

    getInCatCardArray(i) {
        if (i == 0) {
            return catClaw;
        }
    }

    getFireball() {
        return fireball
    }

    getHeal() {
        return heal
    }



    initPlayerCards() {
        cardArray.push(pokeCard);
        cardArray.push(stabCard);
        cardArray.push(arcaneShotCard);
        cardArray.push(arcanePulseCard);
        cardArray.push(arcaneStrikeCard);
        cardArray.push(arcaneBlastCard);
        cardArray.push(arcaneExplosionCard);
        cardArray.push(arcaneEruptionCard);
        cardArray.push(bandageCard);
        cardArray.push(meditateCard);
        cardArray.push(medkitCard);
        cardArray.push(channelCard);
        cardArray.push(beerCard);
        cardArray.push(studyCard);
        cardArray.push(friskCard);
        //for (let i = 0; i < 3; i++) {
            //this.pushACard();
        //}
    }

    pushACard() {
        let cIndex = this.getRandomNumber(10);
        if (cIndex == 0) {
            cardArray.push(stabCard);
        }
        else if (cIndex == 1) {
            cardArray.push(arcanePulseCard);
        }
        else if (cIndex == 2) {
            cardArray.push(arcaneBlastCard);
        }
        else if (cIndex == 3) {
            cardArray.push(arcaneExplosionCard);
        }
        else if (cIndex == 4) {
            cardArray.push(arcaneEruptionCard);
        }
        else if (cIndex == 5) {
            cardArray.push(bandageCard);
        }
        else if (cIndex == 6) {
            cardArray.push(meditateCard);
        }
        else if (cIndex == 7) {
            cardArray.push(medkitCard);
        }
        else if (cIndex == 8) {
            cardArray.push(channelCard);
        }
        else if (cIndex == 9) {
            cardArray.push(beerCard);
        }
        else if (cIndex == 10) {
            cardArray.push(friskCard);
        }
    }

    getRandomNumber(range) {
        // gets a random number from 0 to range
		let x = Math.floor(Math.random() * (range + 1));
		return x;
	}

    pushRandomCard() {
	    let b = Math.floor(Math.random() * restCards.length);	
	    cardArray.push(restCards[b]);
    }

    getRandomCard(randNum) {
      let a = Math.floor(randNum * cardArray.length);
      return cardArray[a];
    }

    initSlimeCards() {
        slimeCardArray.push(slimeCharge);
        slimeCardArray.push(slimeBounce);
        slimeCardArray.push(slimeSmash)
        slimeCardArray.push(slimeHeal);
    }

    initCatCards() {
        catCardArray.push(catClaw);
    }

    pushBigFireball() {
        cardArray.push(bigFireball);
    }

    setCaption() {
        //atkCard.cap = "hi: " + atkCard.mag;
        pokeCard.cap = "Attack Power (AP) attack - Base Power: " + pokeCard.mag + " Mana Cost: " + pokeCard.cost;
        stabCard.cap = "Magic Power (MP) attack - Base Power: " + stabCard.mag + " Mana Cost: " + stabCard.cost;
        arcaneShotCard.cap = "Magic Power (MP) attack - Base Power: " + arcaneShotCard.mag + " Mana Cost: " + arcaneShotCard.cost;
        arcanePulseCard.cap = "Magic Power (MP) attack - Base Power: " + arcanePulseCard.mag + " Mana Cost: " + arcanePulseCard.cost;
        arcaneStrikeCard.cap = "Magic Power (MP) attack - Base Power: " + arcaneStrikeCard.mag + " Mana Cost: " + arcaneStrikeCard.cost;
        arcaneBlastCard.cap = "Magic Power (MP) attack - Base Power: " + arcaneBlastCard.mag + " Mana Cost: " + arcaneBlastCard.cost;
        arcaneExplosionCard.cap = "Magic Power (MP) attack - Base Power: " + arcaneExplosionCard.mag + " Mana Cost: " + arcaneExplosionCard.cost;
        arcaneEruptionCard.cap = "Magic Power (MP) attack - Base Power: " + arcaneEruptionCard.mag + " Mana Cost: " + arcaneEruptionCard.cost;
        bandageCard.cap = "Restores " + bandageCard.mag + " HP - Mana Cost: " + bandageCard.cost;
        meditateCard.cap = "Restores " + meditateCard.mag + " Mana - Mana Cost: " + meditateCard.cost;
        medkitCard.cap = "Restores " + medkitCard.mag + " HP - Mana Cost: " + medkitCard.cost;
        channelCard.cap = "Restores " + channelCard.mag + " Mana - Mana Cost: " + channelCard.cost;
        beerCard.cap = "Restores " + beerCard.mag + " Mana - Mana Cost: " + beerCard.cost;
        studyCard.cap = "Raises Magic Power (MP) by " + studyCard.mag + "x - Mana Cost: " + studyCard.cost;
        friskCard.cap = "Raises Crit Chance by " + friskCard.mag + "x - Mana Cost: " + friskCard.cost; 
    }



}

//PLAYER CARDS
//var atkCard = new cards("atk", 1, 0, 10, 3, 'atkdmg', "Atk dmg", "X");
//var stabCard = new cards("Stab", 1, 0, 10, 2, 'atkdmg', "Stab", "");
//var sliceCard = new cards("Slice", 1, 1, 25, 6, 'atkdmg', "Slice", "");


//=======================================================
/*
nTypes:
0 - nothing
1 - deal damage
2 - hp/mana restore
3 - buff stat
*/

/* CARDS TO MAKE:

- light attack dmg
- light magic dmg
- light hp restore

- buff attack power by units/percentage
- buff magic power by units/percentage
- buff armor by units/percentage
- buff magic resist by units/percentage
- buff crit chance by units/percentage

*/

// type, nType, cardNumber, magnitude, mCost, sprite, annotation, accuracy

// SLIME CARDS
var slimeCharge = new cards("atk", 1, 0, 5, 0, '', "Slimey Charge", "X");
var slimeBounce = new cards("atk", 1, 1, 15, 0, '', "Slimey Bounce", "X");
var slimeSmash = new cards("mag", 1, 2, 35, 0, '', "Slimey SMASH", "X");
var slimeHeal = new cards("hp", 2, 3, 500, 0, '', "Slimey Heal", "X")

// PLAYER CARDS
var pokeCard = new cards("atk", 1, 0, 2, 0, 'blank', "Poke", "X");
var stabCard = new cards("atk", 1, 1, 9, 3, 'blank', "Stab", "X");
var arcaneShotCard = new cards("mag", 1, 2, 10, 3, 'blank', "Arcane\nShot", "X");
var arcanePulseCard = new cards("mag", 1, 3, 20, 3, 'blank', "Arcane\nPulse", "X");
var arcaneStrikeCard = new cards("mag", 1, 4, 40, 5, 'blank', "Arcane\nStrike", "X");
var arcaneBlastCard = new cards("mag", 1, 5, 100, 10, 'blank', "Arcane\nBlast", "X");
var arcaneExplosionCard = new cards("mag", 1, 6, 250, 20, 'blank', "Arcane\nExplosion", "X");
var arcaneEruptionCard = new cards("mag", 1, 7, 500, 75, 'blank', "Arcane\nEruption", "X");
var bandageCard = new cards("hp", 2, 8, 5, 1, 'blank', "Bandage", "X");
var meditateCard = new cards("mana", 2, 9, 12, 2, 'blank', "Meditate", "X");
var medkitCard = new cards("hp", 2, 10, 30, 5, 'blank', "Medkit", "X");
var channelCard = new cards("mana", 2, 11, 50, 10, 'blank', "Channel", "X");
var beerCard = new cards("mana", 2, 12, 95, 15, 'blank', "Beer", "X");
var studyCard = new cards("mag", 3, 13, 1.1, 15, 'blank', "Study", "X");
var friskCard = new cards("crit", 3, 14, 1.1, 10, 'blank', "Frisk", "X");


/* OLD PLAYER CARDS
var atkCard = new cards("atk", 1, 0, 10, 3, 'atkdmg', "Atk dmg", "X");
var magCard = new cards("mag", 1, 1, 25, 5, 'magdmg', "Mag Dmg", "X");
var hpRestoreCard = new cards("hp", 2, 2, 10, 2, 'hprestore', "Gain HP", "X");
var manaRestoreCard = new cards("mana", 2, 3, 25, 15, 'gainmana', "Gain Mana", "X");
var buffAtkCard = new cards("atk", 3, 4, 10, 5, 'blank', "Buff Atk", "X");
var buffMagCard = new cards("mag", 3, 5, 10, 5, 'blank', "Buff Mag", "X");
var buffArmorCard = new cards("armor", 3, 6, 10, 5, 'blank', "Buff Armor", "X");
var buffMagResCard = new cards("magresist", 3, 7, 10, 5, 'blank', "Buff MR", "X");
var buffCritCard = new cards("crit", 3, 8, 10, 5, 'buffcrit', "Buff Crit", "X");
var highAtkCard = new cards("highAtk", 1, 9, 40, 7, 'atkdmg', "High Atk", "X");


var fireball = new cards("Fireball", 0, 0, 10, 3, 'fireballSpell', "10 dmg", 100);
var heal = new cards("Heal", 1, 1, 15, 1, 'healCardSpell', "15 heal", 100);





var bigFireball = new cards("Big Fire", 0, 2, 45, 4, 'fireballSpell', "50 dmg", 100);
var bigHeal = new cards("Big Heal", 1, 3, 40, 5, 'healCardSpell', "40 heal", 100);

var badBall = new cards("Bad Ball", 0, 4, 5, 1, 'fireballSpell', "5 dmg", 100);
var badHeal = new cards("Bad Heal", 1, 5, 10, 3, 'healCardSpell', "10 heal", 100);


*/


// CAT CARDS

//var catClaw = new cards("Cat Claw", 0, 0, 10, 0, '', "Cat used Claw!", "90")
var catClaw = new cards("atk", 1, 0, 45, 0, '', "Bider Bite", "X")


