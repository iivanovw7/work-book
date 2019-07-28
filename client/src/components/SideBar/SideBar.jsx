import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import { opacify } from 'polished';
import styled, { ThemeProvider } from 'styled-components';
import { mdOffset } from '../../config';
import QueryTags from '../../queryBlocks/QueryTags';
import Button from '../../elements/UI/Button';
import LinkIcon from '../../elements/UI/LinkIcon';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const SideBarWrapper = styled.nav`
	@media screen and (min-width: ${mdOffset}rem) {
  	position: fixed;
   	max-width: 340px;
  	width: 19.5vw;
  	display: flex;
  	flex-direction: column;
  	
  	>div: first-of-type {
  		flex-direction: column
  	}
  }
`;

const StyledContentBlock = styled.div`
 		padding: 1em;
 		margin-top: 0.5em;
 		margin-bottom: 0.5em;
  	background-color: ${opacify('0.01', 'rgba(25, 0, 0, 0.1)')};
  	display: flex;
  	flex-wrap: wrap;
  	
  	@media screen and (max-width: ${mdOffset}rem) {
      display: none;
		}
`;

const SideBar = (props) => {
	const {
		history, userAccess, user, text, locale
	} = props;
	const { theme, dispatch } = useStoreon('theme');

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<SideBarWrapper>
				<StyledContentBlock className="desktop">
					<LinkIcon
						link="/"
						icon="home"
						text={text.navigation.home[locale]}
						variant="primary"
						theme={theme}
						handleClick={(e) => {
							e.preventDefault();
							history.push('/');
						}}
					/>
					<LinkIcon
						theme={theme}
						link="/"
						icon="invert_colors"
						text={text.navigation.theme[locale]}
						variant="primary"
						handleClick={(e) => {
							e.preventDefault();
							dispatch('switch');
						}}
					/>
				</StyledContentBlock>
				{userAccess && (
					<StyledContentBlock>
						<Button
							variant="primary"
							text={text.navigation.profile[locale]}
							theme={theme}
							handleClick={() => {
								history.push(`/user/${user._id}`);
							}}
						/>
						<Button
							variant="primary"
							text={text.navigation.addPost[locale]}
							theme={theme}
							handleClick={() => {
								history.push('/posts/new');
							}}
						/>
						<Button
							variant="primary"
							text={text.login.logoutButtonText[locale]}
							theme={theme}
							handleClick={() => {
								Cookies.remove('token');
								history.push('/');
							}}
						/>
					</StyledContentBlock>
				)}
				<StyledContentBlock>
					<QueryTags theme={theme} history />
				</StyledContentBlock>
			</SideBarWrapper>
		</ThemeProvider>
	);
};

SideBarWrapper.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary'])
};

SideBarWrapper.defaultProps = {
	variant: 'primary'
};

SideBar.propTypes = {
	history: PropTypes.object.isRequired,
	locale: PropTypes.string.isRequired,
	text: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	userAccess: PropTypes.bool.isRequired
};

export default SideBar;
