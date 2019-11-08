import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import SwitchedPostComponent from '../utils/postHelpers';
import MobileNavBar from '../components/Navigation/MobileNavbar';
import TopBar from '../components/Navigation/TopBar';
import SideBar from '../components/Navigation/SideBar';
import { wrapper, content, aside } from '../styles';
import { backgroundColor, textColor } from '../theme';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const StyledSection = styled.div`
  color: ${textColor};
  background-color: ${backgroundColor};
  min-width: 100%;
  box-sizing: content-box;
`;

const StyledWrapper = styled.section`
  ${wrapper}
`;

const StyledSideBar = styled.aside`
  ${aside}
`;

const StyledContainer = styled.div`
  ${content}
`;

const Post = (props) => {
  const { location } = props;
  const { theme, locale, localizedText } = useStoreon('theme', 'locale', 'localizedText');

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledSection className="container">
        <section>
          <TopBar locale={locale} text={localizedText} {...props} />
        </section>
        <StyledWrapper>
          <StyledSideBar>
            <SideBar
              theme={theme}
              location={location}
              locale={locale}
              text={localizedText}
              onlyMobile
              {...props}
            />
          </StyledSideBar>
          <StyledContainer>
            <SwitchedPostComponent
              location={location}
              theme={theme}
              locale={locale}
              text={localizedText}
            />
          </StyledContainer>
        </StyledWrapper>
        <section className="mobile">
          <MobileNavBar theme={theme} locale={locale} text={localizedText} {...props} />
        </section>
      </StyledSection>
    </ThemeProvider>
  );
};

Post.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userAccess: PropTypes.bool.isRequired
};

export default withRouter(Post);
