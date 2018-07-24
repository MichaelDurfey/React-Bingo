import React from 'react';
import ReactDOM from 'react-dom';
import Landing from '../../containers/Landing';

describe('Landing', () => {
  test('it renders correctly with defaults', () => {
    const container = document.createElement('div');
    ReactDOM.render(<Landing />, container);
    console.log(container);
  });
})
