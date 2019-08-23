import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, NavLink } from 'react-router-dom';
import NavigationLink from './NavigationLink';

jest.mock('../../config/apiURL', () => () => '/api');

describe('Testing NavigationLink component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    text: 'text',
    theme: 'dark',
    variant: 'primary',
    icon: 'icon',
    link: 'link',
    highlight: true,
    direction: 'direction',
    padding: '10',
    fontSize: '12',
    radius: '5'
  };

  const Composition = () => (
    <MemoryRouter>
      <NavigationLink userAccess {...props} />
    </MemoryRouter>
  );

  it('Should match snapshot', () => {
    const component = mount(<Composition />);

    expect(component).toMatchSnapshot();
  });

  it('Should render with all child elements', () => {
    const component = mount(<Composition />);

    expect(component.find('i')).toHaveLength(1);
    expect(component.find('span')).toHaveLength(1);

    expect(component.find('i').text()).toBe('icon');
    expect(component.find('span').text()).toBe('text');
  });

  it('Should render link with correct props', () => {
    const component = mount(<Composition />);

    expect(component.find(NavigationLink).prop('link')).toBe('link');
    expect(component.find(NavLink).prop('to')).toBe('link');
    expect(component.find(NavigationLink).prop('padding')).toBe('10');
  });

  it('Should trigger link click event', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    component.find(NavigationLink).at(0).simulate('click');
    expect(component.find(NavigationLink)).toHaveLength(1);
    expect(mockFunc).toHaveBeenCalled();
  });
});
