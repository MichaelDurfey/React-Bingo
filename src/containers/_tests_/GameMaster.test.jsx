import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import GameMaster from '../GameMaster';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([]);

function setup() {
  const props = {
    draw: jest.fn()
  };
  const store = mockStore({});

  const wrapper = mount(
    <Provider store={store}>
      <GameMaster {...props} />
    </Provider>
  )

  return {
    props,
    wrapper,
  };
};

describe('GameMaster', () => {
  it('renders self and children', () => {
    const { wrapper } = setup();
    console.log(wrapper.find('button'))
    expect(wrapper.find('.gameMaster'))
  });
  it('should call Draw() when clicked', () => {
    const { wrapper, props } = setup();
    const button = wrapper.find('.button');
    expect(button.simulate('click').length).toBe(1);
  })
})