import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Square.css';

const Square = (props) => {
  const { number, selected } = props;
  return (
    <div
      role="presentation"
      onClick={() => props.handleClick()}
      className={selected ? styles.squareSelected : styles.square}
    >
      {number}
    </div>
  );
};

export default Square;

Square.propTypes = {
  number: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
