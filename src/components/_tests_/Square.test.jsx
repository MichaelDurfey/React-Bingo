import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../Square';

describe('Square', () => {
  test('the component renders with correct classNames if Selected', () => {
    const square = renderer
      .create(<Square selected={false} number={63} />)
      .toJSON();
    // console.log(wrapper.html())
    expect(square).toMatchSnapshot();
  });
  test('the component renders with correct classNames if not Selected', () => {
    const square = renderer
      .create(<Square selected={false} number={25} />)
      .toJSON();
    expect(square).toMatchSnapshot();
  });
});
