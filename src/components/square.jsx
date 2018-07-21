import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Square.css';

const Square = (props) => {
  const { number, selected } = props;
  return (
    <div
      role="presentation"
      className={selected ? `${styles.squareSelected} ${styles.square}` : styles.square}
    >
      {number < 10 ? `0${number}` : `${number}`}
    </div>
  );
};

export default Square;

Square.propTypes = {
  number: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};
