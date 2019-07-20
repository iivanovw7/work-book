import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import styled, { ThemeProvider } from 'styled-components';
import { stylesConfig } from '../../config';
import ButtonTextIcon from '../../elements/UI/ButtonTextIcon';
import NavigationLink from '../../elements/UI/NavigationLink';
import { appBarColor } from '../../theme';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const NavBarWrapper = styled.nav`
  width: 100%;
  position: fixed;
  display: flex;
  bottom: 0;   
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${stylesConfig.appBarHeight};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.24);
  background-color: ${appBarColor};
  padding: 0.5em 1em 0.5em 1em;
`;

const MobileNavBar = (props) => {
	const {
		history, userAccess, user, location, text, locale, theme
	} = props;
	const { dispatch, pages } = useStoreon('pages');

	// Base NavBar UI configuration
	const baseConfig = {
		direction: 'column',
		variant: 'primary',
		padding: '0.5em',
		radius: '0.5em',
		fontSize: '0.9em'
	};

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<NavBarWrapper>
				{pages.map(page => (
					<NavigationLink
						key={page.url}
						link={page.url}
						icon={page.icon}
						text={page.mobTitle[locale]}
						highlight={location.pathname === page.url}
						theme={theme}
						{...baseConfig}
					/>
				))}
				{userAccess && (
					<NavigationLink
						link={`/user/${user._id}`}
						icon="account_box"
						text={text.navigation.profile[locale]}
						theme={theme}
						highlight={location.pathname === `/user/${user._id}`}
						{...baseConfig}
					/>
				)}
				{userAccess && (
					<NavigationLink
						link="/posts/new"
						icon="add_box"
						text={text.navigation.addPost[locale]}
						theme={theme}
						highlight={location.pathname === '/posts/new'}
						{...baseConfig}
					/>
				)}
				{userAccess && (
					<ButtonTextIcon
						theme={theme}
						link="/"
						icon="exit_to_app"
						text={text.login.logoutButtonText[locale]}
						handleClick={(e) => {
							e.preventDefault();
							Cookies.remove('token');
							history.push('/login');
						}}
						{...baseConfig}
					/>
				)}
				<ButtonTextIcon
					theme={theme}
					link="/"
					icon="invert_colors"
					text={text.navigation.theme[locale]}
					handleClick={(e) => {
						e.preventDefault();
						dispatch('switch');
					}}
					{...baseConfig}
				/>
				<ButtonTextIcon
					theme={theme}
					icon="language"
					text={text.locales[locale]}
					handleClick={(e) => {
						e.preventDefault();
						dispatch('changeLocale');
					}}
					{...baseConfig}
				/>
			</NavBarWrapper>
		</ThemeProvider>
	);
};

NavBarWrapper.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary'])
};

NavBarWrapper.defaultProps = {
	variant: 'primary'
};

MobileNavBar.propTypes = {
	history: PropTypes.object.isRequired,
	locale: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired,
	text: PropTypes.object.isRequired,
	theme: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	userAccess: PropTypes.bool.isRequired
};

export default MobileNavBar;
