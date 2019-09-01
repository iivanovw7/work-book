import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import SvgButton from './SvgButton';

// In order to make webpack svgr loader with jest
// check /__mocks__/svgrMock.js and /jest.config.js
import { ReactComponent as IconEng } from '../../assets/img/eng.svg';

jest.mock('../../config/apiURL', () => () => '/api');

describe('Testing SVG Button component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    Image: IconEng,
    variant: 'primary',
    height: '10',
    width: '10',
    text: 'text'
  };

  const Composition = () => (
    <SvgButton userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const component = mount(<Composition />);

    expect(component).toMatchSnapshot();
  });

  it('Should render with all child elements', () => {
    const component = mount(<Composition />);

    expect(component.find('icon-mock')).toHaveLength(1);
    expect(component.find('icon-mock').prop('alt')).toBe('text');
  });

  it('Should render with correct props', () => {
    const component = mount(<Composition />);

    expect(component.find(SvgButton).prop('height')).toBe('10');
    expect(component.find(SvgButton).prop('width')).toBe('10');
  });

  it('Should trigger click event', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);

    component.find(SvgButton).at(0).simulate('click');
    expect(component.find(SvgButton)).toHaveLength(1);
    expect(mockFunc).toHaveBeenCalled();
  });
});
