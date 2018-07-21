import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import styles from '../styles/Board.css';

class Board extends Component {
  shouldComponentUpdate(nextProps) {
    const { hash } = this.props;
    if (nextProps.lastBall in hash) {
      return true;
    }
    return false;
  }

  render() {
    const {
      board,
      checkWinner,
      player,
      playedHash,
    } = this.props;
    const squares = [];
    board.forEach((arr) => {
      arr.forEach((number) => {
        const selected = (number in playedHash);
        squares.push(<Square selected={selected} key={number} number={number} />);
      });
    });
    return (
      <div className={styles.boardContainer}>
        <div className={styles.board}>
          { squares }
        </div>
        <button
          type="submit"
          onClick={() => checkWinner(player)}
          className={styles.bingoButton}
        >
          Bingo!
        </button>
      </div>
    );
  }
}

export default Board;

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]))).isRequired,
  hash: PropTypes.objectOf(PropTypes.bool).isRequired,
  checkWinner: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
  lastBall: PropTypes.number.isRequired,
  playedHash: PropTypes.objectOf(PropTypes.bool).isRequired,
};
