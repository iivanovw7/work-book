import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import { opacify } from 'polished';
import styled, { ThemeProvider } from 'styled-components';
import { mdOffset } from '../../config';
import * as utils from '../../utils';
import QueryTags from '../../graphql/QueryTags';
import Switch from '../../elements/UI/Switch';
import NavigationLink from '../../elements/UI/NavigationLink';
import ButtonTextIcon from '../../elements/UI/ButtonTextIcon';
import SearchBar from '../Search/SearchBar';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const SideBarWrapper = styled.nav`
	@media screen and (min-width: ${mdOffset}rem) {
  	position: fixed;
   	max-width: 340px;
  	width: 19.5vw;
  	display: flex;
  	flex-direction: column;
  	transition: all 0.2s ease-in-out;
  	
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
  	transition: all 0.2s ease-in-out;
  	
  	@media screen and (max-width: ${mdOffset}rem) {
      display: ${props => (props.mobile || props.onlyMobile ? 'none' : 'flex')};
		}
`;

const SideBar = (props) => {
  const {
    history, userAccess, user, text, locale, onlyMobile
  } = props;
  const { theme, dispatch } = useStoreon('theme');
  const { pages } = useStoreon('pages');

  // Base NavBar UI configuration
  const baseConfig = {
    theme,
    direction: 'row',
    variant: 'primary',
    padding: '0.5em',
    radius: '0.3em',
    fontSize: '0.9em'
  };

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <SideBarWrapper>
        <StyledContentBlock onlyMobile={onlyMobile} mobile>
          {pages.map(page => (
            utils.setNavLinkAccess(page.isPublic, userAccess) && (
              <NavigationLink
                key={page.url}
                link={page.localeName === 'profile' ? `/user/${user._id}` : page.url}
                icon={page.icon}
                text={text.navigation[page.localeName][locale]}
                {...baseConfig}
              />
            )
          ))}
          {userAccess && (
            <ButtonTextIcon
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
          <Switch
            themeSwitch
            theme={theme}
            checked={theme === 'dark'}
            handleChange={() => {
              dispatch('switch');
            }}
          />
        </StyledContentBlock>
        <StyledContentBlock onlyMobile={onlyMobile}>
          <SearchBar
            theme={theme}
            text={text}
            locale={locale}
            history={history}
          />
        </StyledContentBlock>
        <StyledContentBlock onlyMobile={onlyMobile}>
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
  location: PropTypes.object.isRequired,
  userAccess: PropTypes.bool.isRequired,
  onlyMobile: PropTypes.bool.isRequired
};

export default SideBar;
