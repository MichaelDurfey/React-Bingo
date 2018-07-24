import React from 'react';
import renderer from 'react-test-renderer';
import Message from '../Message';

describe('Message', () => {
  test('it renders correctly with defaults', () => {
    const message = renderer
      .create(<Message message={''}/>)
      .toJSON();
    expect(message).toMatchSnapshot();
  });
  test('Message is shown depending on message existence', () => {
    const message = renderer
      .create(<Message message={'hi'} />)
      .toJSON();
    expect(message.props.className.includes('messageShown')).toBe(true);
  });
  test('Message is shown depending on message existence', () => {
    const message = renderer
      .create(<Message message={''} />)
      .toJSON();
    expect(message.props.className.includes('messageShown')).toBe(false);
    expect(message.props.className.includes('messageHidden')).toBe(true);
  });
});
