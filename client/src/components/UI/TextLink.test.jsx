import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import TextLink from './TextLink';

jest.mock('../../config/apiURL', () => () => '/api');

describe(`Testing [${chalk.yellow('TextLink')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    text: 'text',
    theme: 'dark',
    variant: 'primary',
    link: 'link'
  };

  const Composition = () => (
    <TextLink userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    expect(component).toMatchSnapshot();
  });

  it('Should render with all child elements', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    expect(component.find('a')).toHaveLength(1);
    expect(component.find('a').text()).toBe('text');
  });

  it('Should render with correct props', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    expect(component.find(TextLink).prop('link')).toBe('link');
  });

  it('Should trigger click event', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition onClick={mockFunc()} />);

    component.find(TextLink).at(0).simulate('click');
    expect(component.find(TextLink)).toHaveLength(1);
    expect(mockFunc).toHaveBeenCalled();
  });
});
