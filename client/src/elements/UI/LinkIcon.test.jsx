import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import LinkIcon from './LinkIcon';

jest.mock('../../config/apiURL', () => () => '/api');

describe('Testing LinkIcon component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    text: 'text',
    theme: 'dark',
    variant: 'primary',
    icon: 'icon',
    link: 'link'
  };

  const Composition = () => (
    <LinkIcon userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    expect(component).toMatchSnapshot();
  });

  it('Should render with all child elements', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    expect(component.find('i')).toHaveLength(1);
    expect(component.find('span')).toHaveLength(1);

    expect(component.find('i').text()).toBe('icon');
    expect(component.find('span').text()).toBe('text');
  });

  it('Should render link with correct props', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    expect(component.find(LinkIcon).prop('link')).toBe('link');
  });

  it('Should trigger link click event', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    component.find(LinkIcon).at(0).simulate('click');
    expect(component.find(LinkIcon)).toHaveLength(1);
    expect(mockFunc).toHaveBeenCalled();
  });
});
