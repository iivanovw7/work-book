import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import TagButton from './TagButton';

jest.mock('../../config/apiURL', () => () => '/api');

describe('Testing TagButton component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    text: 'text',
    theme: 'dark',
    label: 'label',
    bgColor: 'bg',
    textColor: 'color'
  };

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();

    // Disabling PropTypes console.log warning until component is rendered
    const originalError = console.error;
    console.error = jest.fn();
    const component = mount(<TagButton handleClick={mockFunc()} {...props} />);
    console.error = originalError;

    expect(component).toMatchSnapshot();
  });

  it('Should render with correct props', () => {
    const mockFunc = jest.fn();

    // Disabling PropTypes console.log warning until component is rendered
    const originalError = console.error;
    console.error = jest.fn();
    const component = mount(<TagButton handleClick={mockFunc()} {...props} />);
    console.error = originalError;

    expect(component.find(TagButton).prop('textColor')).toBe('color');
    expect(component.find(TagButton).prop('bgColor')).toBe('bg');
  });

  it('Should trigger click event', () => {
    const mockFunc = jest.fn();

    // Disabling PropTypes console.log warning until component is rendered
    const originalError = console.error;
    console.error = jest.fn();
    const component = mount(<TagButton handleClick={mockFunc()} {...props} />);
    console.error = originalError;

    expect(component.find(TagButton)).toHaveLength(1);
    component.find(TagButton).at(0).simulate('click');
    expect(mockFunc).toHaveBeenCalled();
  });
});
