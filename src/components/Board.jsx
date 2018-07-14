import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './square';

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
      arr.forEach(number => squares.push(<Square number={number} />));
    });
    return (
      <div>
        { squares }
      </div>
    );
  }
}

export default Board;

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
