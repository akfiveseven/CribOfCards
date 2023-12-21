

function entry(turn, message) {
  this.turn = turn;
  this.message = message;
}

export default class log {
    constructor() {
      this.currentIndex = 0;
      this.entryList = [];
    }

    pushEntry(turn, message) {
      let myObject = new entry(turn, message);
      this.entryList.push(myObject);
    }

    getEntryList() {
      return this.entryList;
    }

    getEntry(index) {
      return this.entryList[index];
    }



}



