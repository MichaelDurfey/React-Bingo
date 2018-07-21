import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Square.css';

class Square extends Component {
  shouldComponentUpdate() {
    const { selected } = this.props;
    if (selected === true) {
      return false;
    }
    return true;
  }

  render() {
    const { number, selected } = this.props;
    return (
      <div
        role="presentation"
        className={selected ? `${styles.squareSelected} ${styles.square}` : styles.square}
      >
        {number < 10 ? `0${number}` : `${number}`}
      </div>
    );
  }
};

export default Square;

Square.propTypes = {
  number: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};
