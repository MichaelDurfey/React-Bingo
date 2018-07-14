import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Square.css';

class Square extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  handleClick() {
    this.setState(prev => ({ selected: !prev.selected }));
  }

  render() {
    const { number } = this.props;
    return (
      <div
        role="presentation"
        onClick={() => this.handleClick()}
        className={styles.square}
      >
        {number}
      </div>
    );
  }
}

export default Square;

Square.propTypes = {
  number: PropTypes.number.isRequired,
};
