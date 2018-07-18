import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './square';
import styles from '../styles/Board.css';

class Board extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { board } = this.props;
    const squares = [];
    board.forEach((arr) => {
      arr.forEach(number => squares.push(<Square selected={false} key={number} number={number} />));
    });
    return (
      <div className={styles.board}>
        { squares }
      </div>
    );
  }
}

export default Board;

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
