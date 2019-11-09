import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import styled, { ThemeProvider } from 'styled-components';
import ButtonTextIcon from '../UI/ButtonTextIcon';
import NavigationLink from '../UI/NavigationLink';
import { stylesConfig } from '../../config';
import { appBarColor } from '../../theme';
import * as utils from '../../utils';
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
  height: ${stylesConfig.appBarHeight}px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.24);
  background-color: ${appBarColor};
  padding: 0.5em 1em 0.5em 1em;
`;

const MobileNavBar = (props) => {
  const {
    history, userAccess, user, text, locale, theme
  } = props;
  const { dispatch, pages } = useStoreon('pages');

  // Base NavBar UI configuration
  const baseConfig = {
    theme,
    direction: 'column',
    variant: 'primary',
    padding: '0.5em',
    radius: '0.3em',
    fontSize: '0.9em'
  };

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <NavBarWrapper>
        {pages.map(page => (
          utils.setNavLinkAccess(page.isPublic, userAccess) && (
            <NavigationLink
              className="mobile"
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
            className="mobile"
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
          link="/"
          icon="invert_colors"
          className="mobile"
          text={text.navigation.theme[locale]}
          handleClick={(e) => {
            e.preventDefault();
            dispatch('switch');
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
