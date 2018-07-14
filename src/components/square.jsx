import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      onClick={ () => this.handleClick() }
      onKeyPress={ (e) => {
        console.log(e)
      }}
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
