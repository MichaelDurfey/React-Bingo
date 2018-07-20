import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import styles from '../styles/Board.css';

const Board = (props) => {
  const {
    board,
    hash,
    onClick,
    player,
  } = props;
  const squares = [];
  board.forEach((arr) => {
    arr.forEach((number) => {
      const selected = (number in hash);
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
        onClick={() => onClick(player)}
        className={styles.bingoButton}
      >
        Bingo!
      </button>
    </div>
  );
};

export default Board;

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]))).isRequired,
  hash: PropTypes.objectOf(PropTypes.bool).isRequired,
  onClick: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
};
