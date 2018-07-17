import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Square.css';

const Square = (props) => {
  const { selected } = props;
  const { number } = props;
  return (
    <div
      role="presentation"
      onClick={() => props.handleClick()}
      className={selected ? `${styles.squareSelected} ${styles.square}` : styles.square}
    >
      {number < 10 ? `0${number}` : number.toString()}
    </div>
  );
};

export default Square;

Square.propTypes = {
  number: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
