import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import ListElement from './LIstElement';

jest.mock('../../config/apiURL', () => () => '/api');

describe('Testing ListElement component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    theme: 'dark',
    text: 'text',
    description: 'description',
    fontSize: '1em',
    variant: 'primary'
  };

  it('Should match snapshot', async () => {
    const component = mount(<ListElement {...props} />);
    await wait(0);
    await component.update();
    expect(component).toMatchSnapshot();
  });

  it('Should render with correct props', async () => {
    const component = mount(<ListElement {...props} />);
    await wait(0);
    await component.update();
    expect(component.prop('theme')).toBe('dark');
    expect(component.find('span').first().text()).toBe('text');
  });
});
