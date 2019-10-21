import React from 'react';
import chalk from 'chalk';
import SwitchedPostComponent from './postHelpers';
import 'jsdom-global/register';
import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => '/api');

jest.mock('../graphql/CreatePost', () => () => (
  <div id="CreatePost">
    CreatePost
  </div>
));

jest.mock('../graphql/QueryPost', () => () => (
  <div id="QueryPost">
    QueryPost
  </div>
));

jest.mock('../graphql/UpdatePost', () => () => (
  <div id="UpdatePost">
    UpdatePost
  </div>
));

describe('SwitchedPostComponent testing: ', () => {
  const props = {
    locale: 'rus',
    text: {},
    theme: 'dark'
  };

  it(`Should render correctly in [${chalk.yellow('"debug"')}] mode and to match snapshot`, () => {
    const location = {
      pathname: 'string1/string2/string3'
    };
    const component = testUtils.suppressConsoleWarnings(
      <SwitchedPostComponent debug location={location} {...props} />,
      'shallow',
      console
    );

    expect(component).toMatchSnapshot();
  });

  it(`Should return correct mocked component: [${chalk.yellow('QueryPost')}]`, () => {
    const location = {
      pathname: 'string1/string2/string3'
    };
    const wrapper = testUtils.suppressConsoleWarnings(
      <SwitchedPostComponent location={location} {...props} />,
      'mount',
      console
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('#QueryPost').length).toEqual(1);
  });

  it(`Should return correct mocked component: [${chalk.yellow('CreatePost')}]`, () => {
    const location = {
      pathname: 'string1/string2/new'
    };
    const wrapper = testUtils.suppressConsoleWarnings(
      <SwitchedPostComponent location={location} {...props} />,
      'mount',
      console
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('#CreatePost').length).toEqual(1);
  });

  it(`Should return correct mocked component: [${chalk.yellow('UpdatePost')}]`, () => {
    const location = {
      pathname: 'string1/string2/update'
    };
    const wrapper = testUtils.suppressConsoleWarnings(
      <SwitchedPostComponent location={location} {...props} />,
      'mount',
      console
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('#UpdatePost').length).toEqual(1);
  });
});
