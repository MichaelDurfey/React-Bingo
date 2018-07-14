class BoardClass {
  constructor() {
    this.numbers = [];
    this.players = [];
    this.boards = {
      player1: [],
      player2: [],
      player3: [],
      player4: [],
    };
  }

  initialize() {
    this.numbers = Array.from({ length: 100 }, (a, b) => b + 1);
    this.players = ['player1', 'player2', 'player3', 'player4'];
    this.players.forEach(player => this.generateBoard(player));
  }

  shuffle() {
    const { numbers } = this;
    function swap(a, b) {
      const temp = numbers[a];
      numbers[a] = numbers[b];
      numbers[b] = temp;
    }
    for (let i = numbers.length - 1; i > 0; i -= 1) {
      const idx = Math.floor(Math.random() * i);
      swap(i, idx);
    }
  }

  generateBoard(player) {
    this.shuffle();
    const { numbers } = this;
    let counter = 0;
    function genRow() {
      return Array.from({ length: 5 }, () => numbers[counter++]);
    }
    this.boards[player] = Array(5).fill().map(genRow);
  }

  drawBall() {
    return this.numbers.pop();
  }
}

module.exports = new BoardClass();
