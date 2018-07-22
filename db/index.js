class BoardClass {
  constructor() {
    this.numbers = [];
    this.players = [];
    this.boards = {};
    this.played = {};
  }

  initialize() {
    this.numbers = Array.from({ length: 100 }, (a, b) => b + 1);
    this.players = ['player1', 'player2', 'player3', 'player4'];
    this.players.forEach((player) => {
      this.boards[player] = [];
      this.generateBoard(player);
    });
    this.played = {};
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

  checkMatch(a, b, c, d, e) {
    const { played } = this;
    return played[a] && played[b] && played[c] && played[d] && played[e];
  }

  checkRows(board) {
    for (let i = 0; i < board.length; i += 1) {
      const [a, b, c, d, e] = board[i];
      if (this.checkMatch(a, b, c, d, e)) {
        return true;
      }
    }
    return false;
  }

  checkColumns(board) {
    for (let i = 0; i < board.length; i += 1) {
      const [a, b, c, d, e] = [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i]];
      if (this.checkMatch(a, b, c, d, e)) {
        return true;
      }
    }
    return false;
  }

  checkDiagonals(board) {
    const majorDiag = [board[0][0], board[1][1], board[2][2], board[3][3], board[4][4]];
    const minorDiag = [board[0][4], board[1][3], board[2][2], board[3][1], board[4][0]];
    if (this.checkMatch(...majorDiag) || this.checkMatch(...minorDiag)) {
      return true;
    }
    return false;
  }

  checkWin(player) {
    const board = this.boards[player];
    if (this.checkDiagonals(board)) {
      return true;
    }
    if (this.checkRows(board)) {
      return true;
    }
    if (this.checkColumns(board)) {
      return true;
    }
    return false;
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
    this.shuffle();
    const popped = this.numbers.pop();
    this.played[popped] = true;
    return { num: popped };
  }
}

module.exports = new BoardClass();
