import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('App', () => {
  test('it renders correctly with defaults', () => {
    const container = document.createElement('div');
    ReactDOM.render(<App />, container);
    console.log(container);
  });
})
