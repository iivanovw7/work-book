import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import useStoreon from 'storeon/react';
import styled, { ThemeProvider } from 'styled-components';
import QueryPosts from '../graphql/QueryPosts';
import MobileNavBar from '../components/Navigation/MobileNavbar';
import SideBar from '../components/Navigation/SideBar';
import TopBar from '../components/Navigation/TopBar';
import { wrapper, content, aside } from '../styles';
import { backgroundColor, textColor } from '../theme';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const StyledSection = styled.section`
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

const Posts = (props) => {
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
              onlyMobile={false}
              {...props}
            />
          </StyledSideBar>
          <StyledContainer>
            <QueryPosts locale={locale} text={localizedText} theme={theme} {...props} />
          </StyledContainer>
        </StyledWrapper>
        <section className="mobile">
          <MobileNavBar theme={theme} locale={locale} text={localizedText} {...props} />
        </section>
      </StyledSection>
    </ThemeProvider>
  );
};

Posts.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.any,
  userAccess: PropTypes.bool.isRequired
};

export default withRouter(Posts);
