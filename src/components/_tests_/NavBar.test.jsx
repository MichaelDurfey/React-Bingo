import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from '../NavBar';

describe('Message', () => {
  test('it renders correctly with defaults', () => {
    const navbar = renderer
      .create(<NavBar />)
      .toJSON();
    expect(navbar).toMatchSnapshot();
  });
  test('Navbar correctly renders children', () => {
    const navbar = renderer
      .create(<NavBar lastBall={25} played={[1, 2, 3, 4]} />)
      .toJSON();
    expect(navbar.children).toHaveLength(3);
  });
  test('PlayedNumbers div has correct length when passed 4 numbers', () => {
    const navbar = renderer
      .create(<NavBar lastBall={25} played={[1, 2, 3, 4]} />)
      .toJSON();
    expect(navbar.children[2].children[1].children.length).toBe(4);
  });
  test('lastBall exists when passed down', () => {
    const navbar = renderer
      .create(<NavBar lastBall={25} played={[1, 2, 3, 4]} />)
      .toJSON();
    expect(navbar.children[1].children.includes('25')).toBe(true);
  });
});