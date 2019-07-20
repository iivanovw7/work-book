import React from 'react';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as testUtils from '../testUtils';
import User from './User';

jest.mock('../config/apiURL', () => () => {
	return '/api';
});

jest.mock('storeon/react', () => () => {
	return {
		locale: 'eng',
		theme: 'dark'
	};
});
jest.mock('../components/MobileNavBar/MobileNavbar', () => () => (
	<div id="MobileNavbar" />
));
jest.mock('../components/TopBar/TopBar', () => () => (
	<div id="TopBar" />
));
jest.mock('../components/SideBar/SideBar', () => () => (
	<div id="SideBar" />
));
jest.mock('../queryBlocks/QueryUser', () => () => (
	<div id="QueryUser" />
));

describe('Testing USER screen: ', () => {

	afterAll(() => {
		jest.clearAllMocks();
	});

	const props = {
		localizedText: testUtils.localizedText,
		location: {},
		user: {},
		userAccess: true
	};

	const Composition = () => (
		<MemoryRouter>
			<User {...props} />
		</MemoryRouter>
	);

	it('Should render properly with props ', () => {
		const component = mount(<Composition />);
		expect(component.find('User').length).toEqual(1);
		expect(component.find('#MobileNavbar').length).toEqual(1);
		expect(component.find('#TopBar').length).toEqual(1);
		expect(component.find('#SideBar').length).toEqual(1);
	});

	it('Should render and match snapshot ', () => {
		const component = mount(<Composition />);
		expect(component).toMatchSnapshot();
	});
});
